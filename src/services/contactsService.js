const { Contact } = require("../db/contactModel");
const { WrongParametersError } = require("../helpers/errors");

const getContacts = async (owner) => {
  const contacts = await Contact.find({ owner });
  return contacts;
};

const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({ _id: contactId, owner: userId });

  if (!contact) {
    throw new WrongParametersError(`no posts with id ${contactId} found`);
  }
  return contact;
};

const addContact = async ({ name, email, phone, favorite }, owner) => {
  const contact = new Contact({ name, email, phone, favorite, owner });
  await contact.save();
};

const changeContactById = async (
  { contactId, name, email, phone, favorite },
  userId
) => {
  await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    {
      $set: { name, email, phone, favorite },
    }
  );
};

const deleteContactById = async (contactId, userId) => {
  await Contact.findOneAndRemove({ _id: contactId, owner: userId });
};

const updateStatusContact = async (
  contactId,
  userId,
  { name, email, phone, favorite }
) => {
  await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    {
      $set: { name, email, phone, favorite },
    }
  );
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  changeContactById,
  deleteContactById,
  updateStatusContact,
};
