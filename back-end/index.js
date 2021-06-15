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

const formatDateHour = () => {
  const time = moment().format('HH:mm:ss');
  return time;
};

const getUserMessages = async () => {
  const allUsers = await models.user.findAll();
  const usersMessages = await Promise.all(
    allUsers.map(async (user) => {
      const messages = await chat.getUserMessages(user.email);
      if (user.role !== 'administrator') return messages[messages.length - 1];
    }),
  );
  return usersMessages.filter((e) => e !== undefined);
};

const adminListOfMessages = async (socket) => {
  const messages = await getUserMessages();
  socket.emit('adminListMessages', messages);
};

const sendMessage = async (socket) => {
  let temporaryMessages = [];
  socket.on('userMessage', ({ message, userName }) => {
    temporaryMessages.push({ message, userName, time: formatDateHour() });
    chat.add(message, userName, formatDateHour());
    io.emit('serverMessage', temporaryMessages);
  });
  socket.on('adminMessage', ({ message }) => {
    temporaryMessages.push({ message, userName: 'Loja', time: formatDateHour() });
    io.emit('serverMessage', temporaryMessages);
  });
  socket.on('loadMessages', async (email) => {
    const messages = await chat.getUserMessages(email);
    temporaryMessages = messages;
    const admMessage = await chat.getAdminMessages(email);
    admMessage.forEach((item) => temporaryMessages.push(item));
    socket.emit('serverMessage', temporaryMessages.sort((a, b) => a.time - b.time));
  });
};

const adminMessages = async (socket) => {
  let messages = [];
  let to = '';
  socket.on('loadAdminMessage', async (userName) => {
    to = 'zebirita@gmail.com';
    messages = await chat.getUserMessages(userName);
    const admMessage = await chat.getAdminMessages(to);
    admMessage.forEach((item) => messages.push(item));
    io.emit('loadAdminMessage', messages);
  });
  socket.on('userMessage', ({ message, userName }) => {
    messages.push({ message, userName, time: formatDateHour() });
    io.emit('loadAdminMessage', messages);
  });
  socket.on('adminMessage', ({ message }) => {
    messages.push({ message, userName: 'Loja', time: formatDateHour() });
    chat.add(message, 'Loja', formatDateHour(), to);
    socket.emit('loadAdminMessage', messages);
  });
};

io.on('connection', async (socket) => {
  adminMessages(socket);
  sendMessage(socket);
  adminListOfMessages(socket);
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
