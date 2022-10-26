const express = require("express");

const path = require("path");

const FILE_DIR = path.resolve("./public/avatars");

const router = express.Router();

router.use("/", express.static(FILE_DIR));

module.exports = { shareRouter: router };
