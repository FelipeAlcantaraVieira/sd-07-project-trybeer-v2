const express = require('express');
const cors = require('cors');
const moment = require('moment');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const chat = require('./modelsMongo/chat');
const models = require('./models');

const getUserMessages = async () => {
  const allUsers = await models.user.findAll();
  const usersMessages = await Promise.all(allUsers.map(async (user) => {
    const messages = await chat.getUserMessages(user.email);
    return messages[messages.length - 1];
  }));
  return usersMessages.filter((e) => e !== undefined);
};

const adminListOfMessages = async (socket) => {
  const messages = await getUserMessages();
  socket.emit('adminListMessages', messages);
};

// const chageUserSession = async (username) => {
//   const users = await models.user.findOne({ where: { email: username } });
//   if (users.role === 'administrator' || users.role === null) return 'administrator';
//   return username;
// };

const sendMessage = async (socket) => {
  let temporaryMessages = [];
  socket.on('userMessage', ({ message, userName }) => {
    const time = moment().format('HH:mm');
    temporaryMessages.push({ message, userName, time });
    chat.add(message, userName, time);
    io.emit('serverMessage', temporaryMessages);
  });
  socket.on('loadMessages', async (email) => {
    const messages = await chat.getUserMessages(email);
    temporaryMessages = messages;
    io.emit('serverMessage', temporaryMessages);
  });
};

io.on('connection', async (socket) => {
  adminListOfMessages(socket);
  sendMessage(socket);
});

const { login, user, product, sale } = require('./routes');
require('dotenv').config();

app.use(express.json());

const PORT = 3001;

app.use('/images', express.static(`${__dirname}/images`));
app.use(cors());

app.use(login);
app.use(user);
// app.use(image);
app.use(product);
app.use(sale);

http.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
