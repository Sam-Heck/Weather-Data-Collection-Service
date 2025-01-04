import mysql from 'mysql2/promise.js'
import dotenv from 'dotenv/config.js'

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
});

export default pool;