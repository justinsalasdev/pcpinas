import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Test from "../components/Test";
import { useAuthState } from "../context/authContext";
import Shop from "../components/Shop/Shop";

export default () => {
	const { user, token } = useAuthState();
	const isAuthenticated = token && token !== null;
	const isAdmin = user && user.role === 1;

	const renderRoutes = (isAuthenticated) => {
		if (isAuthenticated) {
			return (
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/shop" component={Shop} />
					<Route exact path="/test" component={Test} />
					<Redirect to="/" />
				</Switch>
			);
		} else {
			return (
				<Switch>
					<Route exact path="/test" component={Test} />
					<Route exact path="/" component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/signup" component={Signup} />
					<Redirect to="/" />
				</Switch>
			);
		}
	};

	return renderRoutes(isAuthenticated, isAdmin);
};
