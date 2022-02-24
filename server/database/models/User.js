import DatabaseConnect from "../DatabaseConnect.js";
import { DataTypes } from "sequelize";

const sequelize = DatabaseConnect;

const User = sequelize.define("User", {
	id: {
		type: DataTypes.BIGINT.UNSIGNED,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

export default User;
