const conn = require('../config/connect');


const dropDatabase = async () => await conn.
  execute('DROP DATABASE IF EXISTS Trybeer');

const createDataBase = async () => await conn.
  execute('CREATE DATABASE IF NOT EXISTS Trybeer');

const createTableUsers = async () => await conn.
  execute(
    `CREATE TABLE Trybeer.users 
    (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL, password VARCHAR(20) NOT NULL, role VARCHAR(20) NOT NULL, PRIMARY KEY (id), UNIQUE KEY email_un (email))`);


const createTableSales = async () => await conn.
  execute(
    `CREATE TABLE Trybeer.sales 
    (id INT NOT NULL AUTO_INCREMENT, user_id INT NOT NULL, total_price DECIMAL(9,2) NOT NULL, delivery_address VARCHAR(100) NOT NULL, delivery_number VARCHAR(50) NOT NULL, sale_date DATETIME NOT NULL, status VARCHAR(50) NOT NULL, PRIMARY KEY(id), FOREIGN KEY (user_id) REFERENCES users(id))`);

const createTableProducts = async () => await conn.
  execute(
    `CREATE TABLE Trybeer.products
    (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(100) NOT NULL, price DECIMAL(4,2) NOT NULL, url_image VARCHAR(200) NOT NULL DEFAULT '', PRIMARY KEY(id), UNIQUE KEY name(name))`);

const createTableSalesProducts = async () => await conn.
  execute(
    `CREATE TABLE Trybeer.sales_products 
    (sale_id INT NOT NULL, product_id INT NOT NULL, quantity VARCHAR(10) NOT NULL, PRIMARY KEY(sale_id, product_id), FOREIGN KEY(sale_id) REFERENCES sales(id), FOREIGN KEY(product_id) REFERENCES products(id))`);

const closeConnection = async () => await conn.close();

const deleteAndCreateDataBase = async () => {
  await dropDatabase();
  await createDataBase();
}

const createTables = async () => {    
  await createTableUsers();
  await createTableSales();
  await createTableProducts();
  await createTableSalesProducts();  
}

module.exports = {
  deleteAndCreateDataBase,
  createTables,
  closeConnection,
}