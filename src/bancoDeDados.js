import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;
console.log( process.env.DATABASE_URL)
const dbconfig = {
  connectionString: process.env.DATABASE_URL,
};
if(process.env.MODE === "PROD") {
  dbconfig.ssl = {
    rejectUnauthorized: false
  }
}

const db = new Pool(dbconfig);
export default db


/*
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
export default db;*/