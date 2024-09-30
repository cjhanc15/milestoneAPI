import mysql from 'mysql2/promise';

// Create a connection pool to handle database interactions
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'habit_hero'
});

export default pool;
