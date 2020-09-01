import "./assets/styles/index.scss";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { ColStatProvider } from "./context/collectionContext";

ReactDOM.render(
	// <React.StrictMode>
	<BrowserRouter>
		<AuthProvider>
			<ColStatProvider>
				<App />
			</ColStatProvider>
		</AuthProvider>
	</BrowserRouter>,
	// </React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
