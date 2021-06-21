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

const messages = (socket) => {
  let messageList = [];
  let to = '';
  socket.on('loadUser', (user) => { to = user; });
  socket.on('loadMessages', async (userName = to) => {
    messageList = await chat.getMessages(userName);
    socket.emit('loadMessages', messageList);
  });

  socket.on('sendMessage', ({ message, userName }) => {
    messageList.push({ message, userName, time: formatDateHour() });
    chat.add(message, userName, formatDateHour());
    io.emit('serverMessage', { message, userName, time: formatDateHour() });
  });

  socket.on('adminMessage', ({ message }) => {
    messageList.push({ message, userName: 'Loja', time: formatDateHour() });
    chat.add(message, 'Loja', formatDateHour(), to);
    io.emit('serverMessage', { message, userName: 'Loja', time: formatDateHour() });
  });
};

io.on('connection', async (socket) => {
  messages(socket);
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
app.use(product);
app.use(sale);

http.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
