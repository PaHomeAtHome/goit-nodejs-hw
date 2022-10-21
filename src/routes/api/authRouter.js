const express = require("express");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const router = express.Router();

const {
  loginController,
  registrationController,
} = require("../../controllers/authController");

router.post("/registration", asyncWrapper(registrationController));

router.post("/login", asyncWrapper(loginController));

module.exports = { authRouter: router };
