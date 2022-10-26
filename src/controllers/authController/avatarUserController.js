const { avatarUser } = require("../../services/authService");

const avatarUserController = async (req, res) => {
  const { avatarName, user } = req;
  const avatarURL = await avatarUser(avatarName, user);
  res.status(200).json({ avatarURL });
};

module.exports = avatarUserController;
