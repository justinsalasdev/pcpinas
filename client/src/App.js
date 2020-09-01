import React, { useLayoutEffect } from "react"
import Routes from "./Routes/Routes"

import Toolbar from "./components/Toolbar"
import { useAuthDispatch } from "./context/authContext"

function App() {
	const localToken = localStorage.getItem("token")
	const localUser = JSON.parse(localStorage.getItem("user"))

	const authDispatch = useAuthDispatch()

	useLayoutEffect(() => {
		if (localUser && localToken) {
			authDispatch({
				type: "store",
				payload: { user: localUser, token: localToken }
			})
		} else {
			return
		}
		// eslint-disable-next-line
	}, [])

	return (
		<>
			<Toolbar />
			<main className="root__main">
				<Routes />
			</main>

			<footer>Footer</footer>
		</>
	)
}

export default App
