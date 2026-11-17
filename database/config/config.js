const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../../backend/.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const dbHost = (!process.env.DB_HOST || process.env.DB_HOST === 'localhost') ? '127.0.0.1' : process.env.DB_HOST;
const dbPort = parseInt(process.env.DB_PORT, 10) || 3306;

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || 'labowork_db',
    host: dbHost,
    port: dbPort,
    dialect: 'mysql'
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || null,
    database: `${process.env.DB_NAME || 'labowork_db'}_test`,
    host: dbHost,
    port: dbPort,
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: dbHost,
    port: dbPort,
    dialect: 'mysql'
  }
};