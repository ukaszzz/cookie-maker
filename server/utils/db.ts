import { createPool } from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'Cookie_maker',
    password: process.env.DB_PASSWORD,
    namedPlaceholders: true,
    decimalNumbers: true
});
