const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const Jimp = require("jimp");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const PORT = process.env.PORT || 3000;
const EMAIL = process.env.SENDGRID_EMAIL;

const { User } = require("../db/userModel");
const {
  NotAuthorizedError,
  WrongParametersError,
  NotFoundError,
} = require("../helpers/errors");

const registration = async (email, password) => {
  const httpsUrl = gravatar.url(email, {
    protocol: "https",
  });

  const verificationToken = uuidv4();

  const user = new User({
    email,
    password,
    avatarURL: httpsUrl,
    verificationToken,
  });

  const result = await user.save();

  const msg = {
    to: email, // Change to your recipient
    from: EMAIL, // Change to your verified sender
    subject: "Registration verification",
    text: `Please confirm Your email adress GET localhost:${PORT}/api/users/verify/${verificationToken}`,
    html: `<strong>Please confirm Your email adress GET localhost:${PORT}/api/users/verify/${verificationToken} </strong>`,
  };

  sgMail.send(msg);

  const { subscription } = result;
  return { email, subscription, avatarURL: httpsUrl };
};

const registrationVerification = async (verificationToken) => {
  const verification = await User.findOneAndUpdate(
    { verificationToken },
    { verify: true, verificationToken: null }
  );

  if (!verification) {
    throw new NotFoundError("User not found");
  }

  const msg = {
    to: verification.email, // Change to your recipient
    from: EMAIL, // Change to your verified sender
    subject: "Thank You for registration",
    text: `Email confirmed successfully`,
    html: `<strong>Email confirmed successfully </strong>`,
  };

  sgMail.send(msg);
};

const login = async (email, password) => {
  const user = await User.findOne({ email, verify: true });

  if (!user) {
    throw new NotAuthorizedError(`No user with email '${email}' found`);
  }

  const { subscription } = user;

  if (!password) {
    throw new WrongParametersError(`Password is required`);
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError(`Wrong password`);
  }

  const token = jwt.sign(
    {
      _id: user._id,
      createdAt: user.createdAt,
    },
    process.env.JWT_SECRET
  );

  return { token, user: { email, subscription } };
};

const logout = async (user) => {
  user.token = null;
};

const currentUser = async (userId) => {
  const user = await User.findById(userId);
  const { email, subscription } = user;
  return { email, subscription };
};

const avatarUser = async (avatarName, user) => {
  const name = avatarName;
  Jimp.read(`./tmp/${name}`, (err, avatar) => {
    if (err) throw err;
    avatar.cover(250, 250).write(`./public/avatars/${name}`);
  });
  const avatarURL = `localhost:${PORT}/api/avatars/${name}`;
  await User.findByIdAndUpdate(
    { _id: user._id },
    {
      $set: { avatarURL: avatarURL },
    }
  );
  return avatarURL;
};

module.exports = {
  registration,
  registrationVerification,
  login,
  logout,
  currentUser,
  avatarUser,
};
