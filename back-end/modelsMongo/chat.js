const connect = require('./connect');

const add = async (message, userName = 'Loja', time, to = 'Loja') =>
connect().then(async (db) => {
    const messages = await db.collection('messages').insertOne({ message, userName, time, to });

    return messages.ops[0];
  });

const getUserMessages = async (userName) => connect()
  .then((db) => db.collection('messages').find({ userName }).toArray());

const getMessages = async (userName) => connect()
  .then((db) => db.collection('messages')
  .find({ $or: [{ userName }, { to: userName }] }).toArray());

module.exports = {
  add,
  getUserMessages,
  getMessages,
};