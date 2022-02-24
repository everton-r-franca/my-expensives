import passport from "passport";
import session from "express-session";
import bcrypt from "bcrypt";
import passportLocal from "passport-local";
const localStrategy = passportLocal.Strategy;

import express from "express";
import User from "../database/models/User.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const checkAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.json({ message: "acesso proibido" });
	}
};

const checkLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		res.json({ message: "já logado" });
	} else {
		next();
	}
};

app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

const authUser = (email, password, done) => {
	const findUser = User.findOne({ where: { email: email }, raw: true }).then(
		(e) => {
			console.log(e, "user");
			if (!e) return done(null, false);
			if (!bcrypt.compareSync(password, e.password))
				return done(null, false);
			let authenticated_user = { id: e.id, name: e.name };
			return done(null, authenticated_user);
		}
	);
};

passport.serializeUser((userObj, done) => {
	done(null, userObj);
});

passport.deserializeUser((userObj, done) => {
	done(null, userObj);
});

passport.use(
	new localStrategy(
		{ usernameField: "email", passwordField: "password" },
		authUser
	)
);

app.post(
	"/",
	checkLoggedIn,
	passport.authenticate("local"),
	function (req, res) {
		console.log(req.user.id);
		res.json({ message: "success", id: req.user.id });
	}
);

app.delete("/", (req, res) => {
	req.logout();
	res.json({ message: "logout efetuado com sucesso." });
});

app.get("/dashboard", checkAuthenticated, (req, res) => {
	res.json({ message: "Bem vindo ao dashboard", id: req.user.id });
});

export default app;
