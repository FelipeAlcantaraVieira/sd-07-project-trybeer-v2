const moment = require('moment');
const { save } = require('../resources/message/service');
const { findByEmail } = require('../resources/message/model');

const clientOnAllMessagesHistory = (client) => {
  client.on('createClient', async (email) => {
    const allMessages = await findByEmail(email);
    console.log('createClient join To: ', email);
    client.emit('createdClient', allMessages);
    client.join(email);
  });
};

const clientEmitMessageToAdmin = (client, io) => {
  client.on('sendMessage', async ({ messageInput, messageFrom }) => {
    const data = moment().format('HH:mm:ss');
    const result = await save({
      client: messageFrom,
      text: messageInput,
      date: data,
      from: messageFrom,
    });
    io.in(messageFrom).emit('allMessage', result);
    console.log('Client sendMessage to Room: ', messageFrom);
  });
};

const adminEmitMessageToCLient = (client, io) => {
  client.on('sendMessageAdmin', async ({ messageInput, messageTo }) => {
    const data = moment().format('HH:mm:ss');
    const result = await save({
      client: messageTo,
      text: messageInput,
      date: data,
      from: 'Loja',
    });
    io.in(messageTo).emit('allMessage', result);
    console.log('Admin sendMessageAdmin to room: ', messageTo);
  });
};

const webchat = (io) => {
  io.on('connection', (client) => {
    clientOnAllMessagesHistory(client);
    clientEmitMessageToAdmin(client, io);
    adminEmitMessageToCLient(client, io);
  });
};

module.exports = {
  webchat,
};
