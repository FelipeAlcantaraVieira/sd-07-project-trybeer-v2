const contentType = { 'Content-Type': 'application/json' };

const userLogin = ({ email, password }) => fetch('http://localhost:3001/login', {
  method: 'POST',
  headers: contentType,
  body: JSON.stringify({ email, password }),
})
  .then((response) => response.json());

const registerUser = ({ name, email, password, role }) => fetch('http://localhost:3001/user', {
  method: 'POST',
  headers: contentType,
  body: JSON.stringify({ name, email, password, role }),
})
  .then((response) => response.json());

const updateUser = (token, { name, email }) => fetch('http://localhost:3001/user', {
  method: 'PUT',
  headers: { ...contentType, authorization: token },
  body: JSON.stringify({ name, email }),
})
  .then((response) => response.json());

const getProducts = (token) => fetch('http://localhost:3001/products', {
  method: 'GET',
  headers: { ...contentType, authorization: token },
})
  .then((response) => response.json());

const getUserSalesInfo = (token) => fetch('http://localhost:3001/sales/users', {
  method: 'GET',
  headers: { ...contentType, authorization: token },
})
  .then((response) => response.json());

const getUserSaleDetails = (token, saleId) => fetch(`http://localhost:3001/sales/users/${saleId}`, {
  method: 'GET',
  headers: { ...contentType, authorization: token },
})
  .then((response) => response.json());

const createSale = (token, products) => fetch('http://localhost:3001/sales/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', authorization: token },
  body: JSON.stringify(products),
})
  .then((response) => response.json());

const getAdminSales = (token) => fetch('http://localhost:3001/sales/admin', {
  method: 'GET',
  headers: { ...contentType, authorization: token },
})
  .then((response) => response.json());

const getAdminSalesDetails = (token, saleId) => fetch(`http://localhost:3001/sales/admin/${saleId}`, {
  method: 'GET',
  headers: { ...contentType, authorization: token },
})
  .then((response) => response.json());

const updateSalesStatus = (token, status, saleId) => fetch(`http://localhost:3001/sales/admin/${saleId}`, {
  method: 'PUT',
  headers: { ...contentType, authorization: token },
  body: JSON.stringify({ status }),
})
  .then((response) => response.json());

export {
  userLogin,
  registerUser,
  updateUser,
  getProducts,
  getUserSalesInfo,
  getUserSaleDetails,
  createSale,
  getAdminSales,
  getAdminSalesDetails,
  updateSalesStatus,
};
