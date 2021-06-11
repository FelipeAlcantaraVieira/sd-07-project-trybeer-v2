const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

/* const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
}); */

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