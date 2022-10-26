const { login } = require("../../services/authService");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await login(email, password);

  res.status(200).json(user);
};

module.exports = loginController;
