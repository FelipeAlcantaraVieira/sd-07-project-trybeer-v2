require('dotenv').config();

module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.SCHEMA,
    host: process.env.HOSTNAME,
    dialect: 'mysql',
    logging: false,
    apiport: process.env.PORT || 3001,
    secret: process.env.SECRET || 'forabolsonaro',
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.SCHEMA,
    host: process.env.HOSTNAME,
    dialect: 'mysql',
    logging: false,
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.SCHEMA,
    host: process.env.HOSTNAME,
    dialect: 'mysql',
    logging: false,
  },
};
