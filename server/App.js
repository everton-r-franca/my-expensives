import express from "express";
import dotenv from "dotenv";
import RouteAPI from "./routes/api.js";
import RouteLogin from "./routes/login.js";

dotenv.config();
const app = express();
const PORT = process.env.APP_PORT || 3001;

//const salt = await bcrypt.genSalt(15);
//console.log(await bcrypt.hash(password, salt));
//await bcrypt.compare("We", user.password),

app.use("/", RouteLogin);
app.use("/api", RouteAPI);

app.listen(PORT, (req, res) => {
	console.log(
		`APP ${process.env.APP_NAME} - Server listening on http://localhost:${PORT}`
	);
});
