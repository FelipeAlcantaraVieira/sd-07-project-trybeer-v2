const { create, findByEmail, update } = require('./model');

const save = async ({ client, text, date, from }) => {
  const chat = await findByEmail(client);
  let result;

  if (chat) {
    console.log('Atualizar');
    result = await update({ _id: chat._id, timeLastMessage: date, newMessage: { text, date, from } });
  } else {
    
    // create a new chat
    result = await create({ client, text, date, from });
  }
  return result;
};

module.exports = {
  save,
};