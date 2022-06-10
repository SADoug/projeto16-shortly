import pg from "pg";
import "dotenv/config"

const { Pool } = pg;

const db = new Pool({
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  }
});
export default db
