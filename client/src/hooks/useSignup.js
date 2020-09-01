import { useReducer } from "react"

const initialState = {
	creating: false,
	created: false,
	error: null,
	alertShown: false
}

function reducer(state, action) {
	switch (action.type) {
		case "start":
			return { ...initialState, creating: true }
		case "fail":
			return {
				...state,
				creating: false,
				error: action.payload,
				alertShown: true
			}
		case "success":
			return { ...state, creating: false, created: true, alertShown: true }
		case "acknowledge":
			return { ...state, alertShown: false }

		default:
			return state
	}
}

export default () => {
	const [state, dispatch] = useReducer(reducer, initialState)

	const signup = signupData => {
		dispatch({ type: "start" })
		fetch(`/api/signup`, {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(signupData)
		})
			.then(response => response.json())
			.then(data => {
				if (data.error && data.error.type === "client") {
					dispatch({ type: "fail", payload: data.error })
				} else if (data.info) {
					dispatch({ type: "success" })
				} else {
					return Promise.reject()
				}
			})
			.catch(() => {
				const customError = {
					type: "crash",
					message: "Something went wrong"
				}
				dispatch({ type: "fail", payload: customError })
			})
	}
	return [state, dispatch, signup]
}
