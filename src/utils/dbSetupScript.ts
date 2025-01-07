import pool from './MySqlClient.js'

export async function setupDatabase():Promise<void> {
    try {
        console.log('Starting database setup...');

        await pool.query('CREATE DATABASE IF NOT EXISTS weather_data_collection_service');
        console.log('Database created or already exists');

        await pool.query('USE weather_data_collection_service')
        console.log('Using weather_data_collection_service database.');

        await pool.query(`CREATE TABLE IF NOT EXISTS city (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                country CHAR(2),
                lat DOUBLE NOT NULL,
                lon DOUBLE NOT NULL,
                timezone INT
            )
        `)
        console.log('City table created or already exists');

        await pool.query(`CREATE TABLE IF NOT EXISTS current_weather (
                city_id INT NOT NULL,
                forecast_time INT NOT NULL,
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
                PRIMARY KEY (city_id, forecast_time),
                FOREIGN KEY (city_id) REFERENCES city(id)
            )
        `)
        console.log('Current_weather table created or already exists');

        await pool.query(`CREATE TABLE IF NOT EXISTS forecast_weather (
                city_id INT NOT NULL,
                forecast_time INT NOT NULL,
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
                PRIMARY KEY (city_id, forecast_time),
                FOREIGN KEY (city_id) REFERENCES city(id)
            )
        `)
        console.log('Forecast_weather created or already exists');

        console.log('Database setup completed successfully');
    } catch (error: any) {
        console.error('Error occuring during database setup: ', error.message)
        throw new Error('Database setup failed. See logs for details.');
    }
}