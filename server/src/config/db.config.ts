import mysql from "mysql2"
import dotenv from "dotenv"
dotenv.config()
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME,
    port:Number(process.env.PORT)
})
const database=pool.promise()
export default database