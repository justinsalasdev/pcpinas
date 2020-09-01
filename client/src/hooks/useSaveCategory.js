import { useReducer } from "react"
import { API } from "../config"

const initialState = {
	saving: false,
	saved: false,
	error: null,
	alertShown: false
}

function reducer(state, action) {
	switch (action.type) {
		case "start":
			return { ...initialState, saving: true }
		case "fail":
			return {
				...state,
				saving: false,
				error: action.payload,
				alertShown: true
			}
		case "success":
			return { ...state, saving: false, saved: true, alertShown: true }
		case "acknowledge":
			return { ...state, alertShown: false }
		default:
			return state
	}
}

export default (user, token) => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const acknowledgeAlert = () => {
		dispatch({ type: "acknowledge" })
	}
	const saveCategory = categoryData => {
		dispatch({ type: "start" })
		fetch(`${API}/category/create/${user.userId}`, {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(categoryData)
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
	return [state, saveCategory, acknowledgeAlert]
}
