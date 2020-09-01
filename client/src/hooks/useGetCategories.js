import { useReducer, useEffect } from "react"

const initialState = {
	status: "outdated",
	getting: false,
	got: false,
	error: null,
	alertShown: false,
	categories: []
}

function reducer(state, action) {
	switch (action.type) {
		case "start":
			return { ...initialState, getting: true }
		case "fail":
			return {
				...state,
				getting: false,
				error: action.payload,
				alertShown: true
			}
		case "new":
			return { ...state, status: "outdated" }

		case "success":
			return {
				...state,
				status: "updated",
				getting: false,
				got: true,
				error: null,
				categories: [...action.payload],
				alertShown: true
			}
		case "acknowledge":
			return { ...state, alertShown: false }
		default:
			return state
	}
}

export default () => {
	const [state, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		if (state.status === "outdated") {
			dispatch({ type: "start" })
			fetch(`/categories`, {
				method: "get",
				headers: {
					Accept: "application/json"
				}
			})
				.then(response => response.json())
				.then(data => {
					if (data.error && data.error.type === "client") {
						dispatch({ type: "fail", payload: data.error })
					} else if (data && data.length > 0) {
						dispatch({ type: "success", payload: data })
					} else {
						return Promise.reject()
					}
				})
				.catch(() => {
					const customError = {
						type: "crash",
						message:
							"Error retrieving categories. Please check network connection"
					}
					dispatch({ type: "fail", payload: customError })
				})
		} else {
			return
		}
		// eslint-disable-next-line
	}, [state.status])
	return [state, dispatch]
}
