const { verify } = require("../../services/authService");

const verifyController = async (req, res) => {
  const { email } = req.body;

  await verify(email);

  res.status(200).json({ message: "Verification email sent" });
};

module.exports = verifyController;
