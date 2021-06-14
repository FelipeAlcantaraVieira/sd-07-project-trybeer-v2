const mongoClient = require('mongodb').MongoClient;
const { mongoUrl, mongoDataBase } = require('./config');

let schema = null;

const connection = async () => {
  if (schema) return Promise.resolve(schema);

  return mongoClient
    .connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(mongoDataBase))
    .then((dbSchema) => {
      schema = dbSchema;
      return schema;
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};
module.exports = connection;
