import User from "../database/models/User.js";

class LoginController {
	static login(req, res) {
		res.json({ message: "success", id: req.user.id });
	}

	static logout(req, res) {
		req.logout();
		res.json({ message: "logout efetuado com sucesso." });
	}
}

export default LoginController;
