const express = require("express");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  addContactsController,
  changeContactsController,
  deleteContactsController,
  getContactsByIdController,
  getContactsController,
} = require("../../controllers/contactsController");

const router = express.Router();

router.get("/", asyncWrapper(getContactsController));

router.get("/:contactId", asyncWrapper(getContactsByIdController));

router.post("/", asyncWrapper(addContactsController));

router.put("/:contactId", asyncWrapper(changeContactsController));

router.delete("/:contactId", asyncWrapper(deleteContactsController));

module.exports = router;
