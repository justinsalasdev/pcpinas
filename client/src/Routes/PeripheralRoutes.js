import React from "react";
import { Route } from "react-router-dom";
import Peripherals from "../components/Shop/Peripherals/Peripherals";
import CreatePeripheral from "../components/Shop/Peripherals/CreatePeripheral";

export default () => (
	<>
		<Route exact path="/shop/peripherals" component={Peripherals} />
		<Route exact path="/shop/peripherals/create" component={CreatePeripheral} />
	</>
);
