const express = require('express');
const cors = require('cors');
const app2 = require('express')();
const http = require('http').createServer(app2);

const env = process.env.NODE_ENV || 'development';
const moment = require('moment');
const io = require('socket.io')(http, {
  cors: {
    origin: ['http://localhost:3002', 'http://localhost:3001', 'http://localhost:3000'],
    methods: ['POST', 'GET'],
  },
});
const { apiport } = require('./config/config')[env];

const PORT2 = 3002;
const { user, auth, product, sales } = require('./resources');
// const bodyParser = require('body-parser');

const messages = {};

io.on('connection', (client) => {
  io.emit('allMessage', messages);
  // console.log(`Novo usuário conectado ${client.id}`);
  client.on('sendMessage', ({ messageInput, messageFrom, messageTo }) => {
    const data = moment().format();
    const message = { messageInput, messageFrom, messageTo, data };
    if (messages[messageFrom] === undefined) messages[messageFrom] = [message];
    else messages[messageFrom] = [...messages[messageFrom], message];
    console.log('messages', messages);
    io.emit('allMessage', messages);
  });
  client.on('sendMessageAdmin', ({ messageInput, messageFrom, messageTo }) => {
    console.log('messageInput', messageInput);
    console.log('messageFrom', messageFrom);
    console.log('messageTo', messageTo);
    const data = moment().format();
    const message = { messageInput, messageFrom, messageTo, data };
    if (messages[messageTo] === undefined) messages[messageTo] = [message];
    else messages[messageTo] = [...messages[messageTo], message];
    console.log('messages', messages);
    io.emit('allMessage', messages);
  });

  client.on('createClient', (email) => {
    messages[email] = [];
    io.emit('createdClient', messages);
  });
});

const app = express();
app.use(cors());
// app.use(bodyParser.json());
// const { user, auth, product, sales } = require('./resources');

app.use(express.json());

app.use(user.route);
app.use(auth.route);
app.use(product.route);
app.use(sales.route);

app.listen(apiport, () => {
  console.log(`Trybeer API ON and listen at ${apiport}!`);
});

http.listen(PORT2, () => {
  console.log(`Trybeer API ON and listen at ${PORT2}!`);
});
