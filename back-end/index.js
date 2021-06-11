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

io.on('connection', (socket) => {
  let temporaryMessages = [];
  socket.on('userMessage', ({ message, userName }) => {
    const time = moment().format('HH:MM');
    temporaryMessages.push({ message, userName, time });
    chat.add(message, userName, time);
    io.emit('serverMessage', temporaryMessages);
  });
  socket.on('loadMessages', async (email) => {
    const messages = await chat.getUserMessages(email);
    temporaryMessages = messages;
    io.emit('serverMessage', temporaryMessages);
  });
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
