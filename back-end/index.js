const express = require('express');
const { login, user, product, sale } = require('./routes');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = 3001;

app.use('/images', express.static(`${__dirname}/images`));

app.use(login);
app.use(user);
// app.use(image);
app.use(product);
app.use(sale);

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
