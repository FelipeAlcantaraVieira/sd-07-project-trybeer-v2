const { save } = require('../resources/message/service');
const moment = require('moment');
const { findByEmail } = require('../resources/message/model')


const webchat = (io) => {
  

  io.on('connection', (client) => {

    client.on('createClient', async (email) => {
      console.log(email);
      const allMesssagens = await findByEmail(email);
      console.log('allMesssagens', allMesssagens);
      io.emit('createdClient', allMesssagens)
    });
    client.on('sendMessage', async ({ messageInput, messageFrom, messageTo }) => {
      const data = moment().format();
      const result = await save({ client: messageFrom, text: messageInput, date: data, from: 'client' });
      io.emit('allMessage', result);
    });
    client.on('sendMessageAdmin', async ({ messageInput, messageFrom, messageTo }) => {
      const data = moment().format();
      const result = await save({ client: messageTo, text: messageInput, date: data, from: 'admin' });
      io.emit('allMessage', result);
    });
  });

}

module.exports = {
  webchat,
};
