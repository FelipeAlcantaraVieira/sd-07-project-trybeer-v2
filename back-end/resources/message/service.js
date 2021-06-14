const { create, findByEmail, update } = require('./model');

const save = async ({ client, text, date, from }) => {
  const chat = await findByEmail(client);
  console.log(chat);
  if (chat) {
    await update({ _id: chat.id, timeLastMessage: date, newMessage: { text, date, from } });
  } else {
    // create a new chat
    await create({ client, text, date, from });
  }
};

module.exports = {
  save,
};