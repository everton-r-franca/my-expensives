import express from "express";
import Auth from "./auth/common.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(Auth.Session);

app.use(Auth.passport.initialize());
app.use(Auth.passport.session());

app.post(
	"/",
	Auth.checkLoggedIn,
	Auth.passport.authenticate("local"),
	function (req, res) {
		console.log(req.user.id);
		res.json({ message: "success", id: req.user.id });
	}
);

app.delete("/", (req, res) => {
	req.logout();
	res.json({ message: "logout efetuado com sucesso." });
});

app.get("/dashboard", Auth.checkAuthenticated, (req, res) => {
	res.json({ message: "Bem vindo ao dashboard", id: req.user.id });
});

export default app;
