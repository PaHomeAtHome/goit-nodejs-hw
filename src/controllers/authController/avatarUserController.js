const { avatarUser } = require("../../services/authService");

const avatarUserController = async (req, res) => {
  await avatarUser(req.avatar);
  res.status(200).json();
};

module.exports = avatarUserController;
