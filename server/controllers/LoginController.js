import User from "../database/models/User.js";

class LoginController {
	static login(req, res) {
		res.json({ message: "success" });
	}

	static logout(req, res) {
		req.logout();
		res.json({ message: "logout efetuado com sucesso." });
	}
	static checkAuthenticated(req, res) {
		if (req.isAuthenticated()) {
			res.send(true);
		} else {
			res.send(false);
		}
	}
}

export default LoginController;
