import React, { useState } from "react";
import axios from "axios";
import Login from "../pages/login/Login";
import { useEffect } from "react";

///checkAuthenticated
export default function ProtectRoute(props) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	useEffect(() => {
		axios("/checkAuthenticated").then((response) => {
			setIsAuthenticated(response.data);
		});
	});

	return isAuthenticated ? props.children : <Login />;
}
