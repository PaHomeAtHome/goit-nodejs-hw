const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { errorHandler } = require("./src/helpers/apiHelpers");

const contactsRouter = require("./src/routes/api/contacts");
const { authRouter } = require("./src/routes/api/authRouter");
const { shareRouter } = require("./src/routes/api/shareRouter");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter);
app.use("/api/avatars", shareRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(errorHandler);

// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message });
// });

module.exports = app;
