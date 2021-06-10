const express = require('express');
const cors = require('cors');

const env = process.env.NODE_ENV || 'development';
const { apiport } = require('./config/config')[env];
const { user, auth, product, sales } = require('./resources');

const app = express();
app.use(cors());
app.use(express.json());

app.use(user.route);
app.use(auth.route);
app.use(product.route);
app.use(sales.route);

app.listen(apiport, () => {
  console.log(`Trybeer API ON and listen at ${apiport}!`);
});
