import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useAuthState, useAuthDispatch } from "../context/authContext";
// import { FaBeer } from "react-icons/fa";

export default () => {
	const { token } = useAuthState();
	const history = useHistory();
	const authDispatch = useAuthDispatch();
	const isAuthenticated = token && token !== null;

	return (
		<nav className="navigation">
			<ul className="navigation__list">
				<li className="navigation__item">
					<NavLink
						className="link--nav"
						activeClassName="link--active"
						to="/test"
					>
						Test
					</NavLink>
				</li>

				<li className="navigation__item">
					<NavLink
						className="link--nav"
						activeClassName="link--active"
						exact
						to="/"
					>
						Home
					</NavLink>
				</li>

				{isAuthenticated ? null : (
					<li className="navigation__item">
						<NavLink
							className="link--nav"
							activeClassName="link--active"
							to="/login"
						>
							Login
						</NavLink>
					</li>
				)}

				{!isAuthenticated ? null : (
					<li className="navigation__item">
						<NavLink
							className="link--nav"
							activeClassName="link--active"
							to="/shop"
						>
							{/* <FaBeer /> */}
							Shop
						</NavLink>
					</li>
				)}

				{!isAuthenticated ? null : (
					<li className="navigation__item">
						<a
							href="/"
							className="link--nav"
							onClick={(e) => {
								e.preventDefault();
								authDispatch({ type: "clear" });
								history.replace("/");
							}}
						>
							Logout
						</a>
					</li>
				)}

				{isAuthenticated ? null : (
					<li className="navigation__item">
						<NavLink
							className="link--nav"
							activeClassName="link--active"
							to="/signup"
						>
							Create Account
						</NavLink>
					</li>
				)}
			</ul>
		</nav>
	);
};
