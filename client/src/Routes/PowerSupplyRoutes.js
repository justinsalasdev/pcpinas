import React from "react";
import { Route } from "react-router-dom";
import PowerSupplies from "../components/Shop/PowerSupply/PowerSupplies";
import CreatePowerSupply from "../components/Shop/PowerSupply/CreatePowerSupply";

export default () => (
	<>
		<Route exact path="/shop/powersupplies" component={PowerSupplies} />
		<Route
			exact
			path="/shop/powersupplies/create"
			component={CreatePowerSupply}
		/>
	</>
);
