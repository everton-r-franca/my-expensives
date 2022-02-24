import express from "express";
import dotenv from "dotenv";

import User from "./database/models/User.js";

console.log(
	await User.findOne({
		where: { email: "carol.kuller@gmail.com" },
		raw: true,
	})
);

dotenv.config();
const app = express();

const PORT = process.env.APP_PORT || 3001;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.post("/", function (req, res) {
	console.log(req.body.name);
	res.json({ name: req.body.name });
});

app.get("/api/user/:email", (req, res) => {
	async function teste() {
		const user = await User.findOne({
			where: { email: req.params.email },
			raw: true,
		});
		res.json({ user });
	}
	teste();
});

app.get("/", function (req, res) {
	res.json({ message: "Sucessagem" });
});

app.listen(PORT, (req, res) => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
