import React, { useEffect } from "react";
import { NavLink, Route, useHistory } from "react-router-dom";
import Motherboards from "./Motherboard/Motherboards";
import CreateMotherboard from "./Motherboard/CreateMotherboard";
import PowerSupplies from "./PowerSupply/PowerSupplies";
import CreatePowerSupply from "./PowerSupply/CreatePowerSupply";
import Storage from "./Storage/Storage";
import CreateStorage from "./Storage/CreateStorage";
import Peripherals from "./Peripherals/Peripherals";
import CreatePeripheral from "./Peripherals/CreatePeripheral";
import Processors from "./Processors/Processors";
import CreateProcessor from "./Processors/CreateProcessor";
import Screens from "./Screens/Screens";
import CreateScreen from "./Screens/CreateScreen";
import Graphics from "./Graphics/Graphics";
import CreateGraphics from "./Graphics/CreateGraphics";
import EditGraphics from "./Graphics/EditGraphics";

const links = [
	{ name: "Motherboards", path: "motherboards" },
	{ name: "Power Supplies", path: "powersupplies" },
	{ name: "Storage", path: "storage" },
	{ name: "Peripherals", path: "peripherals" },
	{ name: "Processors", path: "processors" },
	{ name: "Screens", path: "screens" },
	{ name: "Graphics", path: "graphics" },
];

export default () => {
	const history = useHistory();
	useEffect(() => {
		history.replace("/shop/motherboards");
		// eslint-disable-next-line
	}, []);

	return (
		<div className="shop">
			<ul className="shop__links">
				{links.map(({ name, path }) => {
					return (
						<li key={name}>
							<NavLink
								activeClassName="link--active"
								className="link--nav"
								to={`/shop/${path}`}
							>
								{name}
							</NavLink>
						</li>
					);
				})}
			</ul>
			<Route exact path="/shop/motherboards" component={Motherboards} />
			<Route path="/shop/motherboards/create" component={CreateMotherboard} />
			<Route exact path="/shop/powersupplies" component={PowerSupplies} />
			<Route path="/shop/powersupplies/create" component={CreatePowerSupply} />
			<Route exact path="/shop/storage" component={Storage} />
			<Route path="/shop/storage/create" component={CreateStorage} />
			<Route exact path="/shop/peripherals" component={Peripherals} />
			<Route path="/shop/peripherals/create" component={CreatePeripheral} />
			<Route exact path="/shop/processors" component={Processors} />
			<Route path="/shop/processors/create" component={CreateProcessor} />
			<Route exact path="/shop/screens" component={Screens} />
			<Route path="/shop/screens/create" component={CreateScreen} />
			<Route exact path="/shop/graphics" component={Graphics} />
			<Route path="/shop/graphics/create" component={CreateGraphics} />
			<Route path="/shop/graphics/edit" component={EditGraphics} />
		</div>
	);
};
