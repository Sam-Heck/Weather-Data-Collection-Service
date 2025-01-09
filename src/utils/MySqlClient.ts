import mysql from 'mysql2/promise.js'
import 'dotenv/config'

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
});