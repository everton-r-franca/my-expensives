import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import RouteAPI from "./routes/API.js";
import User from "./database/models/User.js";

//const salt = await bcrypt.genSalt(15);
//console.log(await bcrypt.hash(password, salt));
//await bcrypt.compare("W17l20e07lidwaleve", user.password),

dotenv.config();
const app = express();

const PORT = process.env.APP_PORT || 3001;

app.use("/api", RouteAPI);

app.listen(PORT, (req, res) => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
