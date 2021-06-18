const { create, findByEmail, update } = require('./model');

const save = async ({ client, text, date, from }) => {
  const chat = await findByEmail(client);
  let result;

  if (chat) {
    // update with a new message
    const { _id } = chat;
    result = await update({
      _id,
      timeLastMessage: date,
      newMessage: { text, date, from },
    });
  } else {
    // create a new chat
    result = await create({ client, text, date, from });
  }
  return result;
};

module.exports = {
  save,
};
