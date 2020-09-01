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
			return {
				...state,
				saving: false,
				saved: true,
				error: null
			}
		case "acknowledge":
			return { ...state, alertShown: false }

		default:
			return state
	}
}

export default (
	user,
	token,
	collection,
	colDispatch,
	mode,
	productId,
	history
) => {
	//productId is '' if not edit mode
	const [state, dispatch] = useReducer(reducer, initialState)
	const isEdit = mode === "edit"

	const saveProduct = productFormData => {
		dispatch({ collection: "start" })
		fetch(`${API}/product/${mode}/${collection}/${user.userId}/${productId}`, {
			method: isEdit ? "put" : "post",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`
			},
			body: productFormData
		})
			.then(response => response.json())
			.then(data => {
				if (data.error && data.error.type === "client") {
					dispatch({ type: "fail", payload: data.error })
				} else if (data.info) {
					dispatch({ type: "success" })
					colDispatch({
						type: isEdit ? "edit" : "add",
						payload: {
							collection,
							product: isEdit ? data.updatedProduct : data.savedProduct
						}
					})
					history.replace(`/shop/${collection}`)
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
	return [state, dispatch, saveProduct]
}
