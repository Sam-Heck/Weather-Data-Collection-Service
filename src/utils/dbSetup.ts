import mysql from 'mysql2/promise.js'
import 'dotenv/config'


async function setupDatabase():Promise<void> {
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });
    
    try {
        console.log('Starting database setup...');

        await pool.query('CREATE DATABASE IF NOT EXISTS weather_data_collection_service');
        console.log('Database created or already exists');

        await pool.query('USE weather_data_collection_service')
        console.log('Using weather_data_collection_service database.');

        await pool.query(`CREATE TABLE IF NOT EXISTS current_weather (
                lat FLOAT NOT NULL,
                lon FLOAT NOT NULL,
                dt INT NOT NULL,
                weather_condition VARCHAR(50),
                condition_desc VARCHAR(100),
                temp FLOAT,
                feels_like FLOAT,
                pressure SMALLINT UNSIGNED,
                humidity TINYINT UNSIGNED,
                visibility INT,
                wind_speed FLOAT,
                wind_deg SMALLINT UNSIGNED,
                clouds TINYINT UNSIGNED,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (lat, lon, dt)
            )
        `)
        console.log('Current_weather table created or already exists');

        await pool.query(`CREATE TABLE IF NOT EXISTS forecast_weather (
                lat FLOAT NOT NULL,
                lon FLOAT NOT NULL,
                dt INT NOT NULL,
                weather_condition VARCHAR(50),
                condition_desc VARCHAR(100),
                temp FLOAT,
                feels_like FLOAT,
                pressure SMALLINT UNSIGNED,
                humidity TINYINT UNSIGNED,
                visibility INT,
                wind_speed FLOAT,
                wind_deg SMALLINT UNSIGNED,
                clouds TINYINT UNSIGNED,
                precipitation FLOAT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (lat, lon, dt)
            )
        `)
        console.log('Forecast_weather created or already exists');

        console.log('Database setup completed successfully');
        process.exit(0);
    } catch (error: any) {
        console.error('Error occuring during database setup: ', error.message)
        process.exit(1);
    }
}

setupDatabase();