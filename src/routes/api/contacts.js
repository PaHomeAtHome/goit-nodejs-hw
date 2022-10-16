const express = require("express");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const modelsMiddleware = require("../../middlewares/models");
const {
  addContactValidation,
} = require("../../middlewares/validationMiddleware");

const {
  addContactsController,
  changeContactsController,
  deleteContactsController,
  getContactsByIdController,
  getContactsController,
} = require("../../controllers/contactsController");

const router = express.Router();

router.use(modelsMiddleware);

router.get("/", asyncWrapper(getContactsController));

router.get("/:contactId", asyncWrapper(getContactsByIdController));

router.post("/", addContactValidation, asyncWrapper(addContactsController));

router.put(
  "/:contactId",
  addContactValidation,
  asyncWrapper(changeContactsController)
);

router.delete("/:contactId", asyncWrapper(deleteContactsController));

module.exports = router;