const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");

const { schemaJoi } = require("../schemas/schemaJoi");

const getContactsController = async (req, res) => {
  const contacts = await listContacts();
  res.json({ contacts: contacts });
};

const getContactsByIdController = async (req, res) => {
  const contact = await getContactById(req.params.contactId);
  contact ? res.json(contact) : res.status(404).json({ message: "Not found" });
};

const addContactsController = async (req, res) => {
  const { name, email, phone } = req.body;

  const validation = schemaJoi.validate(req.body);
  console.log(validation);
  if (validation.error) {
    return res
      .status(400)
      .json({ status: validation.error.details[0].message });
  }

  const result = await addContact({ name, email, phone });
  if (!result) {
    return res.status(500).json({ message: "Internal server error" });
  }
  typeof result === "string"
    ? res.status(400).json({ message: result })
    : res.status(201).json({ result });
};

const changeContactsController = async (req, res) => {
  const validation = schemaJoi.validate(req.body);

  if (validation.error) {
    return res
      .status(400)
      .json({ status: validation.error.details[0].message });
  }

  const result = await updateContact(req.params.contactId, req.body);
  result
    ? res.status(200).json({ result })
    : res.status(404).json({ message: "Not found" });
};

const deleteContactsController = async (req, res) => {
  const result = await removeContact(req.params.contactId);
  result
    ? res.status(200).json({ message: "contact deleted", result })
    : res.status(404).json({ message: "Not found" });
};

module.exports = {
  getContactsController,
  getContactsByIdController,
  addContactsController,
  changeContactsController,
  deleteContactsController,
};
