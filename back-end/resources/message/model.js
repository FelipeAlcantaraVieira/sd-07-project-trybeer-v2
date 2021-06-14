const { ObjectId } = require('mongodb');
const connection = require('../../config/configMongo');

const COLLECTION_NAME = 'webchat';

const create = async ({ client, text, date, from }) => {
  const newMessage = await connection().then((db) =>
    db.collection(COLLECTION_NAME)
      .insertOne({
        client,
        timeLastMessage: date,
        messages: [{ text, date, from }],
      }));

  return newMessage;
};
const update = async ({ _id, timeLastMessage, newMessage }) => {
  const { modifiedCount } = await connection().then((db) =>
    db.collection(COLLECTION_NAME)
      .updateOne(
        { _id: ObjectId(_id) },
        {
          $set: { timeLastMessage },
          $push: { messages: newMessage },
        },
      ));
  if (modifiedCount) {
    return true;
  }
  return null;
};

const findByEmail = async (email) => {
  const chat = await connection().then((db) =>
    db.collection(COLLECTION_NAME)
      .findOne({
        client: email,
      }));
  return chat;
};

module.exports = {
  create,
  findByEmail,
  update,
};