import React, { Component } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import "./Login.css";
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
			<div className="card login-form">
				<div className="card-body">
					<div className="lead">Login</div>
					<form className="mt-5">
						<input
							type="text"
							className="form-control"
							value={this.state.email}
							onChange={(e) => this.validEmail(e)}
							placeholder="email@example.com"
						/>
						<div className="text-left emailInfo mt-2 mb-2 text-muted">
							{this.state.emailInfo}
						</div>
						<input
							type="password"
							className="form-control"
							value={this.state.password}
							onChange={(e) => this.validPassword(e)}
							placeholder="Senha mais segura"
						/>
						<div className="text-left passwordInfo mt-2 mb-4 text-muted">
							{this.state.passwordInfo}
						</div>
						<button
							type="button"
							className="btn btn-primary"
							onClick={(e) => this.submit(e)}
						>
							Acessar
						</button>
						<div className="loginState mt-4">
							{this.state.loginState === "success" ? (
								<Navigate to="/" />
							) : (
								this.state.loginState
							)}
						</div>
					</form>
				</div>
			</div>
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
