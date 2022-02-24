import express from "express";
import dotenv from "dotenv";
import RouteAPI from "./routes/API.js";
import User from "./database/models/User.js";
/**
 *  Auth
 */
import passport from "passport";
import session from "express-session";
import bcrypt from "bcrypt";
import passportLocal from "passport-local";
const localStrategy = passportLocal.Strategy;
/**
 * default config
 */
dotenv.config();
const app = express();
const PORT = process.env.APP_PORT || 3001;
//const salt = await bcrypt.genSalt(15);
//console.log(await bcrypt.hash(password, salt));
//await bcrypt.compare("W17l20e07lidwaleve", user.password),

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
		res.redirect("/dashboard");
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

app.post("/login", passport.authenticate("local"), function (req, res) {
	console.log(req.user.id);
	res.json({ message: "success", id: req.user.id });
});

app.delete("/login", (req, res) => {
	req.logout();
	res.json({ message: "logout efetuado com sucesso." });
});

app.get("/dashboard", checkAuthenticated, (req, res) => {
	res.json({ message: "Bem vindo ao dashboard", id: req.user.id });
});

app.use("/api", RouteAPI);

app.listen(PORT, (req, res) => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
