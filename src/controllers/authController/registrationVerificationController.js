const { registrationVerification } = require("../../services/authService");

const registrationVerificationController = async (req, res) => {
  const { verificationToken } = req.params;

  await registrationVerification(verificationToken);

  res.status(200).json({ message: "Verification successful" });
};

module.exports = registrationVerificationController;
