const connect = require('./connect');

const add = async (message, userName = 'Loja', time, to = 'Loja') =>
connect().then(async (db) => {
    const messages = await db.collection('messages').insertOne({ message, userName, time, to });

    return messages.ops[0];
  });

const getUserMessages = async (userName) => connect()
  .then((db) => db.collection('messages').find({ userName }).toArray());

const getAdminMessages = async (to) => connect()
  .then((db) => db.collection('messages').find({ to }).toArray());

module.exports = {
  add,
  getUserMessages,
  getAdminMessages,
};