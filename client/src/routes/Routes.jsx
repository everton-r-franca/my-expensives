import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";

function MyRoutes(props) {
	return (
		<React.Fragment>
			<Routes>
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/dashboard" element={<Dashboard />} />
			</Routes>
		</React.Fragment>
	);
}

export default MyRoutes;
