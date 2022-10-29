const express = require("express");

const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const FILE_DIR = path.resolve("./tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, FILE_DIR);
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split(".");
    const newName = `${uuidv4()}.${extension}`;
    cb(null, newName);
    req.avatar = file;
    req.avatarName = newName;
  },
});

const { asyncWrapper } = require("../../helpers/apiHelpers");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = express.Router();

const {
  loginController,
  registrationController,
  logoutController,
  currentUserController,
  avatarUserController,
  registrationVerificationController,
  verifyController,
} = require("../../controllers/authController");
const uploadMiddleware = multer({ storage });

router.post("/registration", asyncWrapper(registrationController));
router.post("/verify", asyncWrapper(verifyController));
router.get(
  "/verify/:verificationToken",
  asyncWrapper(registrationVerificationController)
);
router.post("/login", asyncWrapper(loginController));
router.post("/logout", authMiddleware, asyncWrapper(logoutController));
router.get("/current", authMiddleware, asyncWrapper(currentUserController));
router.patch(
  "/avatars",
  [authMiddleware, uploadMiddleware.single("avatar")],
  asyncWrapper(avatarUserController)
);

module.exports = { authRouter: router };
