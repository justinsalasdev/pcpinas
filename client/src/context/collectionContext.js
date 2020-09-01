import React from "react"
const ColStateContext = React.createContext()
const ColDispatchContext = React.createContext()

const initialState = {
	getting: false,
	got: false,
	error: null,
	alertShown: false,
	status: {
		motherboards: "outdated",
		powersupplies: "outdated",
		storage: "outdated",
		peripherals: "outdated",
		processors: "outdated",
		screens: "outdated",
		graphics: "outdated"
	},
	products: {
		motherboards: [],
		powersupplies: [],
		storage: [],
		peripherals: [],
		processors: [],
		screens: [],
		graphics: []
	}
}

function reducer(state, action) {
	switch (action.type) {
		case "start":
			return { ...state, getting: true }
		case "fail":
			return {
				...state,
				getting: false,
				error: action.payload,
				alertShown: true
			}
		case "outdate": {
			const collection = action.payload
			return {
				...state,
				status: { ...state.status, [collection]: "outdated" }
			}
		}
		case "delete": {
			const { collection, productId } = action.payload
			return {
				...state,
				products: {
					...state.products,
					[collection]: state.products[collection].filter(product => {
						return product._id !== productId
					})
				}
			}
		}
		case "add": {
			const { collection, product } = action.payload
			return {
				...state,
				products: {
					...state.products,
					[collection]: state.products[collection].concat([product])
				}
			}
		}
		case "edit": {
			const { collection, product } = action.payload
			let newProducts = [].concat(state.products[collection])
			const index = state.products[collection].findIndex(storedProduct => {
				return product._id === storedProduct._id
			})

			newProducts[index] = product
			return {
				...state,
				products: {
					...state.products,
					[collection]: newProducts
				}
			}
		}
		case "success": {
			const { collection, products } = action.payload
			return {
				...state,
				getting: false,
				got: true,
				error: null,
				status: {
					...state.status,
					[collection]: "updated"
				},
				products: {
					...state.products,
					[collection]: products
				}
			}
		}
		case "acknowledge":
			return { ...state, alertShown: false }

		default:
			return state
	}
}

function ColStatProvider({ children }) {
	const [state, dispatch] = React.useReducer(reducer, initialState)
	return (
		<ColStateContext.Provider value={state}>
			<ColDispatchContext.Provider value={dispatch}>
				{children}
			</ColDispatchContext.Provider>
		</ColStateContext.Provider>
	)
}

function useColState() {
	const context = React.useContext(ColStateContext)
	if (context === undefined) {
		throw new Error("useColState must be used within a ColStatProvider")
	}
	return context
}

function useColDispatch() {
	const context = React.useContext(ColDispatchContext)
	if (context === undefined) {
		throw new Error("useColDispatch must be used within a ColStatProvider")
	}
	return context
}
export { ColStatProvider, useColState, useColDispatch }
