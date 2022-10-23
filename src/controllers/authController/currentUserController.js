const { currentUser } = require("../../services/authService");

const currentUserController = async (req, res) => {
  const user = await currentUser(req.user._id);
  res.status(200).json({ user });
};

module.exports = currentUserController;
