import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Loading from "./loader/Loading";

///checkAuthenticated
export default function ProtectRoute(props) {
	const [isAuthenticated, setIsAuthenticated] = useState(null);
	useEffect(() => {
		axios("/checkAuthenticated").then((response) => {
			setIsAuthenticated(response.data);
		});
	});

	return isAuthenticated ? (
		props.children
	) : isAuthenticated !== null ? (
		<Navigate to="/login" />
	) : (
		<Loading />
	);
}
