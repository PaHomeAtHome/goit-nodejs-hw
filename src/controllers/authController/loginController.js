const { login } = require("../../services/authService");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const token = await login(email, password);

  res.json({ status: "Success", token });
};

module.exports = loginController;
