import passport from "passport";
import session from "express-session";
import bcrypt from "bcrypt";
import passportLocal from "passport-local";
const localStrategy = passportLocal.Strategy;
import User from "../../database/models/User.js";

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

const authUser = (email, password, done) => {
	User.findOne({ where: { email: email }, raw: true }).then((user) => {
		if (!user) return done(null, false);
		if (!bcrypt.compareSync(password, user.password))
			return done(null, false);
		return done(null, { id: user.id, name: user.name });
	});
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

const Session = session({
	secret: "secret",
	resave: false,
	saveUninitialized: true,
});

export default { passport, Session, checkAuthenticated, checkLoggedIn };
