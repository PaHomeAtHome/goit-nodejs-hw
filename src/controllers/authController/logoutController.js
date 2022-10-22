const { logout } = require("../../services/authService");

const logoutController = async (req, res) => {
  await logout(req.user);

  res.status(204).json();
};

module.exports = logoutController;
