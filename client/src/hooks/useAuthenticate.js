import { useReducer } from "react"

const initialState = {
	entering: false,
	entered: false,
	error: null,
	alertShown: false
}

function reducer(state, action) {
	switch (action.type) {
		case "start":
			return { ...initialState, entering: true }
		case "fail":
			return {
				...state,
				entering: false,
				error: action.payload,
				alertShown: true
			}
		case "store":
			return { ...state, entering: false, entered: true }
		case "acknowledge":
			return { ...state, alertShown: false }

		default:
			return state
	}
}

export default (history, authDispatch) => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const acknowledgeAlert = () => {
		dispatch({ type: "acknowledge" })
	}
	const login = signinData => {
		dispatch({ type: "start" })

		fetch(`/api/login`, {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(signinData)
		})
			.then(response => response.json())
			.then(data => {
				if (data.error && data.error.type === "client") {
					dispatch({ type: "fail", payload: data.error })
				} else {
					const { token, user } = data
					localStorage.setItem("user", JSON.stringify(user))
					localStorage.setItem("token", token)
					dispatch({ type: "store" })
					authDispatch({ type: "store", payload: { user, token } })
					history.replace("/")
				}
			})
			.catch(() => {
				const customError = {
					type: "crash",
					message: "Something wen't wrong"
				}

				dispatch({ type: "fail", payload: customError })
			})
	}

	return [state, login, acknowledgeAlert]
}
