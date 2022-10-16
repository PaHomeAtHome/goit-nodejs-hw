const {
  getContacts,
  getContactById,
  addContact,
  changeContactById,
  deleteContactById,
} = require("../services/contactsService");

const getContactsController = async (req, res) => {
  const contacts = await getContacts();
  res.json({ contacts: contacts });
};

const getContactsByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  contact ? res.json(contact) : res.status(404).json({ message: "Not found" });
};

const addContactsController = async (req, res) => {
  const { name, email, phone, favorite } = req.body;

  await addContact({ name, email, phone, favorite });
  res.status(201).json({ message: name, email, phone, favorite });
};

const changeContactsController = async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  const { contactId } = req.params;
  await changeContactById({ contactId, name, email, phone, favorite });
  res.status(200).json({ name, email, phone, favorite });
};

const deleteContactsController = async (req, res) => {
  const { contactId } = req.params;
  await deleteContactById(contactId);
  res.status(200).json({ message: "contact deleted" });
};

module.exports = {
  getContactsController,
  getContactsByIdController,
  addContactsController,
  changeContactsController,
  deleteContactsController,
};
