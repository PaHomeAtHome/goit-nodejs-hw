const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const SHARE_FILE_DIR = path.resolve("./public/avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, SHARE_FILE_DIR);
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split(".");
    cb(null, `${uuidv4()}.${extension}`);
  },
});

const { asyncWrapper } = require("../../helpers/apiHelpers");

const router = express.Router();

const { avatarController } = require("../../controllers/avatarController");

// router.post("/avatars", asyncWrapper(avatarController));
router.use("/", express.static(SHARE_FILE_DIR));

module.exports = { avatarRouter: router };
