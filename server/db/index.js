const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'hireview',
  user: 'postgres',
  password: process.env.DB_PASSWORD,
});

pool.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to PostgreSQL successfully');
  }
});

module.exports = pool;