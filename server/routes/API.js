import UserController from "../controllers/UserController.js";
import express from "express";
import dotenv from "dotenv";
import Auth from "./auth/common.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Auth.Session);
app.use(Auth.passport.initialize());
app.use(Auth.passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/user", function (req, res) {
	res.json({ name: req.body.name });
});

app.get("/user", Auth.checkAuthenticated, UserController.getAllUsers);

export default app;
