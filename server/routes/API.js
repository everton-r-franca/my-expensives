import UserController from "../controllers/UserController.js";
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/user", function (req, res) {
	res.json({ name: req.body.name });
});

app.get("/user", UserController.getAllUsers);

export default app;
