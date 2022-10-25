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
    cb(null, `${uuidv4()}.${extension}`);
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
} = require("../../controllers/authController");
const uploadMiddleware = multer({ storage });

router.post("/registration", asyncWrapper(registrationController));
router.post("/login", asyncWrapper(loginController));
router.post("/logout", authMiddleware, asyncWrapper(logoutController));
router.get("/current", authMiddleware, asyncWrapper(currentUserController));
router.patch(
  "/avatars",
  [authMiddleware, uploadMiddleware.single("avatar")],
  asyncWrapper(avatarUserController)
);

module.exports = { authRouter: router };
