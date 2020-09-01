import React from "react"
const AuthStateContext = React.createContext()
const AuthDispatchContext = React.createContext()

const initialState = {
	user: null,
	token: null
}

function reducer(state, action) {
	switch (action.type) {
		case "store":
			const { user, token } = action.payload
			return { ...state, user, token }
		case "clear":
			localStorage.removeItem("user")
			localStorage.removeItem("token")
			return initialState
		default:
			return initialState
	}
}

function AuthProvider({ children }) {
	const [state, dispatch] = React.useReducer(reducer, initialState)
	return (
		<AuthStateContext.Provider value={state}>
			<AuthDispatchContext.Provider value={dispatch}>
				{children}
			</AuthDispatchContext.Provider>
		</AuthStateContext.Provider>
	)
}

function useAuthState() {
	const context = React.useContext(AuthStateContext)
	if (context === undefined) {
		throw new Error("useAuthState must be used within a AuthProvider")
	}
	return context
}

function useAuthDispatch() {
	const context = React.useContext(AuthDispatchContext)
	if (context === undefined) {
		throw new Error("useAuthDispatch must be used within a AuthProvider")
	}
	return context
}
export { AuthProvider, useAuthState, useAuthDispatch }
