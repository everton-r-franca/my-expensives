import User from "../database/models/User.js";

class UserController {
	static async getAllUsers(req, res) {
		const response = await User.findAll({ raw: true });
		res.json({ response });
	}
	static async addNewUsers(req, res) {}
}

export default UserController;
