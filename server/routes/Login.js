import express from "express";
import Auth from "./auth/common.js";
import LoginController from "../controllers/LoginController.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Auth.Session);
app.use(Auth.passport.initialize());
app.use(Auth.passport.session());

app.get("/checkAuthenticated", LoginController.checkAuthenticated);

app.post(
	"/login",
	Auth.checkLoggedIn,
	Auth.passport.authenticate("local"),
	LoginController.login
);

app.delete("/login", LoginController.logout);

export default app;
