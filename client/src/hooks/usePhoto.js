import { useReducer } from "react"
import { API } from "../config"

const initialState = {
	photos: [],
	error: null
}

function reducer(state, action) {
	switch (action.type) {
		default:
			return state
	}
}

export default () => {
	const [state, dispatch] = useReducer(reducer, initialState)
	return [state, dispatch]
}
