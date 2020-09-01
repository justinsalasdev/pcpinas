import React from "react";
import { Route } from "react-router-dom";
import Storage from "../components/Shop/Storage/Storage";
import CreateStorage from "../components/Shop/Storage/CreateStorage";

export default () => (
	<>
		<Route exact path="/shop/storage" component={Storage} />
		<Route exact path="/shop/storage/create" component={CreateStorage} />
	</>
);
