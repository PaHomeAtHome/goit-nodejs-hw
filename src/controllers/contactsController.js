const ObjectId = require("mongodb").ObjectId;

const getContactsController = async (req, res) => {
  const contacts = await req.db.Contacts.find({}).toArray();
  res.json({ contacts: contacts });
};

const getContactsByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await req.db.Contacts.findOne({
    _id: new ObjectId(contactId),
  });
  contact ? res.json(contact) : res.status(404).json({ message: "Not found" });
};

const addContactsController = async (req, res) => {
  const { name, email, phone, favorite } = req.body;

  await req.db.Contacts.insert({
    name,
    email,
    phone,
    favorite,
  });

  res.status(400).json({ message: name, email, phone, favorite });
};

const changeContactsController = async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  const { contactId } = req.params;

  await req.db.Contacts.updateOne(
    { _id: new ObjectId(contactId) },
    { $set: { name, email, phone, favorite } }
  );

  res.status(200).json({ name, email, phone, favorite });
};

const deleteContactsController = async (req, res) => {
  const { contactId } = req.params;
  await req.db.Contacts.deleteOne({ _id: new ObjectId(contactId) });
  res.status(200).json({ message: "contact deleted" });
};

module.exports = {
  getContactsController,
  getContactsByIdController,
  addContactsController,
  changeContactsController,
  deleteContactsController,
};
