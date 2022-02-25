import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			emailInfo: "",
			password: "",
			passwordInfo: "",
			error: true,
			loginState: "",
		};
	}

	render() {
		return (
			<form>
				<input
					type="text"
					value={this.state.email}
					onChange={(e) => this.validEmail(e)}
				/>
				<div className="emailInfo">{this.state.emailInfo}</div>
				<input
					type="password"
					value={this.state.password}
					onChange={(e) => this.validPassword(e)}
				/>
				<div className="passwordInfo">
					{this.state.passwordInfo}
				</div>
				<button onClick={(e) => this.submit(e)}>Acessar</button>
				<div className="loginState">{this.state.loginState}</div>
			</form>
		);
	}
	validEmail(e) {
		const email = e.target.value;
		this.setState({ email: email });
		if (email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm)) {
			this.setState({ error: false, emailInfo: "" });
		} else {
			this.setState({ error: true, emailInfo: "Email inválido" });
		}
	}
	validPassword(e) {
		const password = e.target.value;
		this.setState({ password: password });
		if (password.length > 5) {
			this.setState({ error: false, passwordInfo: "" });
		} else {
			this.setState({ error: true, passwordInfo: "senha inválida" });
		}
	}
	submit(e) {
		e.preventDefault();

		if (!this.state.error) {
			axios.post("/login", {
				email: this.state.email,
				password: this.state.password,
			})
				.then((response) => {
					this.setState({ loginState: response.data.message });
				})
				.catch((e) => {
					console.log(e.response.status);
					if (e.response.status === 401) {
						this.setState({
							loginState: "Senha ou usário inválidos.",
						});
					} else {
						this.setState({
							loginState: e.data.message,
						});
					}
				});
		}
	}
}