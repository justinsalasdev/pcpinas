import React from "react";
import { Route } from "react-router-dom";
import Motherboards from "../components/Shop/Motherboard/Motherboards";
import CreateMotherboard from "../components/Shop/Motherboard/CreateMotherboard";

export default () => (
	<>
		<Route exact path="/shop/motherboards" component={Motherboards} />
		<Route
			exact
			path="/shop/motherboards/create"
			component={CreateMotherboard}
		/>
	</>
);
