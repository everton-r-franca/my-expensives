import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DB_DRIVER = process.env.DB_DRIVER;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = process.env.DB_PORT || 3306;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_HOST = process.env.DB_HOST || "localhost";

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
	host: DB_HOST,
	dialect: DB_DRIVER,
	port: DB_PORT,
});

export default sequelize;
