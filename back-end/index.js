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
  socket.on('adminListMessages', () => {
    socket.emit('adminListMessages', messages);
  });
};

const getMessages = async (email) => {
  const userMessages = await chat.getUserMessages(email);
  const adminMessages = await chat.getAdminMessages(email);
  const messages = userMessages.concat(adminMessages);
  const sortedMessages = messages.sort((a, b) => a.time - b.time);
  return sortedMessages;
};

const sendMessage = async (socket) => {
  let messages = [];
  socket.on('userMessage', ({ message, userName }) => {
    messages.push({ message, userName, time: formatDateHour() });
    chat.add(message, userName, formatDateHour());
    io.emit('serverMessage', messages);
  });
  socket.on('adminMessage', ({ message }) => {
    messages.push({ message, userName: 'Loja', time: formatDateHour() });
    io.emit('serverMessage', messages);
  });
  socket.on('loadMessages', async (email) => {
    socket.join(email);
    console.log(socket.rooms);
    messages = await getMessages(email);
    socket.emit('serverMessage', messages);
  });
};

const adminMessages = async (socket) => {
  let messages = [];
  let to = '';
  socket.on('loadAdminMessage', async (userName) => {
    socket.join(userName);
    console.log(socket.rooms);
    to = 'zebirita@gmail.com';
    messages = await getMessages(userName);
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
