const connect = require('./connect');

const add = async (message, userName, time) =>
connect().then(async (db) => {
    const messages = await db.collection('messages').insertOne({ message, userName, time });

    return messages.ops[0];
  });

const getUserMessages = async (userName) => connect()
  .then((db) => db.collection('messages').find({ userName }).toArray());

module.exports = {
  add,
  getUserMessages,
};