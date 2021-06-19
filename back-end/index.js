const express = require('express');
const cors = require('cors');
const app2 = require('express')();
const http = require('http').createServer(app2);

const env = process.env.NODE_ENV || 'development';
const io = require('socket.io')(http, {
  cors: {
    origin: [
      'http://localhost:3002',
      'http://localhost:3001',
      'http://localhost:3000',
    ],
    methods: ['POST', 'GET'],
  },
});
const { apiport } = require('./config/config')[env];

const PORT2 = 3002;
const { user, auth, product, sales, messages } = require('./resources');
const { webchat } = require('./sockets/webchat');

webchat(io);

const app = express();
app.use(cors());
// app.use(bodyParser.json());
// const { user, auth, product, sales } = require('./resources');

app.use(express.json());

app.use(user.route);
app.use(auth.route);
app.use(product.route);
app.use(sales.route);
app.use(messages.route);

app.listen(apiport, () => {
  console.log(`Trybeer API ON and listen at ${apiport}!`);
});

http.listen(PORT2, () => {
  console.log(`Trybeer API ON and listen at ${PORT2}!`);
});
