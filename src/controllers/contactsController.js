const {
  getContacts,
  getContactById,
  addContact,
  changeContactById,
  deleteContactById,
  updateStatusContact,
} = require("../services/contactsService");

const getContactsController = async (req, res) => {
  const { _id: userId } = req.user;

  const contacts = await getContacts(userId);
  res.json({ contacts: contacts });
};

const getContactsByIdController = async (req, res) => {
  const { _id: userId } = req.user;

  const { contactId } = req.params;
  const contact = await getContactById(contactId, userId);
  contact ? res.json(contact) : res.status(404).json({ message: "Not found" });
};

const addContactsController = async (req, res) => {
  const { _id: userId } = req.user;
  const { name, email, phone, favorite } = req.body;

  await addContact({ name, email, phone, favorite }, userId);
  res.status(201).json({ message: name, email, phone, favorite });
};

const changeContactsController = async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  const { _id: userId } = req.user;

  const { contactId } = req.params;
  await changeContactById({ contactId, name, email, phone, favorite }, userId);
  res.status(200).json({ name, email, phone, favorite });
};

const deleteContactsController = async (req, res) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;
  await deleteContactById(contactId, userId);
  res.status(200).json({ message: "contact deleted" });
};

const updateStatusContactController = async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  const { _id: userId } = req.user;
  const { contactId } = req.params;
  if (!favorite) {
    res.status(400).json({ message: "missing field favorite" });
  }
  await updateStatusContact(contactId, userId, req.body);
  res.status(200).json({ name, email, phone, favorite });
};

module.exports = {
  getContactsController,
  getContactsByIdController,
  addContactsController,
  changeContactsController,
  deleteContactsController,
  updateStatusContactController,
};
