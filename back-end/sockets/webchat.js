const moment = require('moment');
const { save } = require('../resources/message/service');
const { findByEmail } = require('../resources/message/model');

const webchat = (io) => {
  io.on('connection', (client) => {
    client.on('createClient', async (email) => {
      const allMesssagens = await findByEmail(email);
      client.join(email);
      console.log('createClient join To: ', email);
      client.emit('createdClient', allMesssagens);
    });
    client.on('sendMessage', async ({ messageInput, messageFrom }) => {
      const data = moment().format();
      const result = await
        save({ client: messageFrom, text: messageInput, date: data, from: 'client' });
      console.log('Client sendMessage to Room: ', messageFrom);
      io.in(messageFrom).emit('allMessage', result);
    });
    client.on('sendMessageAdmin', async ({ messageInput, messageTo }) => {
      const data = moment().format();
      const result = await
        save({ client: messageTo, text: messageInput, date: data, from: 'admin' });
      io.in(messageTo).emit('allMessage', result);
      console.log('Admin sendMessageAdmin to room: ', messageTo);
    });
  });
};

module.exports = {
  webchat,
};
