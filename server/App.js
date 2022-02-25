import express from "express";
import dotenv from "dotenv";
import RouteAPI from "./routes/API.js";
import RouteLogin from "./routes/Login.js";
dotenv.config();
const app = express();
const PORT = process.env.APP_PORT || 3001;
//const salt = await bcrypt.genSalt(15);
//console.log(await bcrypt.hash(password, salt));
//await bcrypt.compare("W17l20e07lidwaleve", user.password),

app.use("/", RouteLogin);
app.use("/api", RouteAPI);

app.listen(PORT, (req, res) => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
