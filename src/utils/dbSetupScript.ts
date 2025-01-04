import pool from './MySqlClient.js'

async function setupDatabase() {
    try {
        await pool.query('CREATE DATABASE IF NOT EXISTS weather_data_collection_service');

        await pool.query('USE weather_data_collection_service')

        await pool.query(`CREATE TABLE IF NOT EXISTS cities (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                country VARCHAR(50) NOT NULL,
                lat DOUBLE NOT NULL,
                lon DOUBLE NOT NULL,
                timezone INT
            )
        `)

        // add current weather and forecast weather tables
    } catch (error) {
        // add error handling
    }
}