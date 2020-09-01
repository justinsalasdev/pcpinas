import { useReducer } from "react"
import { API } from "../config"

const initialState = {
	initiated: false,
	deleting: false,
	deleted: false,
	error: null,
	alertShown: false
}

function reducer(state, action) {
	switch (action.type) {
		case "initiate":
			return { ...initialState, initiated: true }
		case "cancel":
			return { ...state, initiated: false }
		case "start":
			return { ...state, initiated: false, deleting: true }
		case "fail":
			return {
				...state,
				deleting: false,
				error: action.payload,
				alertShown: true
			}

		case "success":
			return {
				...state,
				deleting: false,
				deleted: true,
				error: null,
				alertShown: true
			}

		case "acknowledge":
			return { ...state, alertShown: false }
		default:
			return state
	}
}

export default (user, token, collection, productId, colDispatch) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	const deleteProduct = () => {
		dispatch({ type: "start" })
		fetch(`${API}/product/delete/${collection}/${user.userId}/${productId}`, {
			method: "delete",
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then(response => response.json())
			.then(data => {
				if (data.error) {
					return Promise.reject()
				} else {
					dispatch({ type: "success" })
					// colDispatch({ type: "outdate", payload: collection });
					colDispatch({
						type: "delete",
						payload: {
							collection,
							productId
						}
					})
				}
			})
			.catch(() => {
				const customError = {
					type: "crash",
					message: "Error deleting product"
				}
				dispatch({ type: "fail", payload: customError })
			})
	}

	return [state, dispatch, deleteProduct]
}
