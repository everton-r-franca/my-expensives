import React from "react";
import { Route, Routes } from "react-router-dom";

import ProtectRoute from "../components/ProtectRoute";
import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";

function MyRoutes(props) {
	return (
		<React.Fragment>
			<Routes>
				<Route
					exact
					path="/"
					element={
						<ProtectRoute>
							<Dashboard />
						</ProtectRoute>
					}
				/>
				<Route exact path="/login" element={<Login />} />
			</Routes>
		</React.Fragment>
	);
}

export default MyRoutes;
