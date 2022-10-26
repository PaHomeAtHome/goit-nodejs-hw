const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const Jimp = require("jimp");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const { User } = require("../db/userModel");
const {
  NotAuthorizedError,
  WrongParametersError,
} = require("../helpers/errors");

const registration = async (email, password) => {
  const httpsUrl = gravatar.url(email, {
    protocol: "https",
  });

  const user = new User({ email, password, avatarURL: httpsUrl });

  const result = await user.save();
  const { subscription } = result;
  return { email, subscription, avatarURL: httpsUrl };
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

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
  login,
  logout,
  currentUser,
  avatarUser,
};
