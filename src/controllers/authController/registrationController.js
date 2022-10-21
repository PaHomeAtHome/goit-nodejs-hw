const { registration } = require("../../services/authService");

const registrationController = async (req, res) => {
  const { email, password } = req.body;

  await registration(email, password);

  res.json({ status: "Success" });
};

module.exports = registrationController;
