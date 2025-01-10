# Weather Data Collection Service

## Overview
The **Weather Data Collection Service** is a Node.js application designed to regularly fetch weather data from OpenWeatherMap and store it in a MySQL database. The service supports the retrieval of both current weather and five-day forecasts for specified cities, with customizable update intervals.

## Features
- Fetches weather data from OpenWeatherMap API.
- Saves current weather and forecast data into a MySQL database.
- Designed for scalability and ease of integration.

---

## Setup Instructions

### Prerequisites
1. **Node.js**: Ensure you have Node.js installed (v16 or higher).
2. **MySQL Database**: Ensure you have access to a MySQL database server.
3. **OpenWeatherMap API Key**: Obtain an API key from [OpenWeatherMap](https://openweathermap.org/api).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sam-Heck/Weather-Data-Collection-Service
   cd weather_data_collection_service
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory with the following:
   ```env
   WEATHER_API_KEY=<your_api_key>
   DB_HOST=<your_db_host>
   DB_USER=<your_db_user>
   DB_PASSWORD=<your_db_password>
   DB_NAME=weather_data_collection_service
   ```

4. Build the project
    ```bash
    npm run build
    ```

5. Initialize the database:
   - Run the `dbSetup` script to create the database and necessary tables:
     ```bash
     npm run setup-db
     ```

6. Start the service:
   ```bash
   npm start
   ```

---

## Architecture Overview

### Key Components
1. **WeatherService**:
   - Responsible for fetching data from the OpenWeatherMap API.
   - Transforms raw API responses into database-ready formats.

2. **WeatherRepository**:
   - Handles database interactions (insert/update queries).
   - Supports saving current weather and forecast data.

3. **FetchWeatherTask**:
   - Orchestrates periodic fetching and saving of weather data for a list of cities.
   - Uses `setInterval` for scheduling updates.

4. **Cities Configuration**:
   - Defines the cities for which weather data is fetched.
   - Configured via a `cities.js` file.

5. **Database**:
   - MySQL database storing current weather and forecast data.
   - Tables:
     - `current_weather`
     - `forecast_weather`

---

## Design Decisions

### 1. **Separation of Concerns**
- The application separates concerns into distinct classes (`WeatherService`, `WeatherRepository`, and `FetchWeatherTask`) to enhance maintainability and testability.

### 2. **Use of Promises and Async/Await**
- The codebase leverages `async/await` for clean and readable asynchronous operations, particularly for API calls and database queries.

### 3. **Database Setup Script**
- A dedicated `dbSetup` script creates the database and tables programmatically, eliminating the need for manual SQL execution and ensuring a consistent setup process.

### 4. **Environment Variables for Configuration**
- Sensitive information (e.g., API keys and database credentials) are managed via environment variables to improve security and flexibility.

### 5. **Scalable Scheduling**
- The `FetchWeatherTask` class uses a configurable `intervalMs` value for update intervals, allowing users to tailor the frequency of data collection as needed.

---

## Future Enhancements
- Add support for additional weather APIs.
- Implement caching mechanisms to reduce redundant API calls.
- Create a web-based dashboard for real-time data monitoring.
- Extend the database schema to support historical data storage.

---

## Contributing
Contributions are welcome! Please fork the repository and create a pull request for any changes or features you'd like to add.

