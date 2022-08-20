// inspired by https://github.com/vercel/next.js/blob/canary/examples/with-redux-wrapper/store/store.js
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'

import amountReducer from './requestedAmount'
import monthlyPaymentReducer from './monthlyPayment'
import loaderReducer from './spinnerLoader'

const bindMiddleware = (middleware) => {
	if (process.env.NODE_ENV !== 'production') {
		// this is required only in dev environment
		const { composeWithDevTools } = require('redux-devtools-extension')
		return composeWithDevTools(applyMiddleware(...middleware))
	}
	return applyMiddleware(...middleware)
}

const rootReducer = combineReducers({
	amount: amountReducer,
	monthlyPayment: monthlyPaymentReducer,
	loader: loaderReducer
})

const reducer = (state, action) => {
	if (action.type === HYDRATE) {
		const nextState = {
			...state, // use previous state
			...action.payload // apply data from hydration
		}
		return nextState
	} else {
		return rootReducer(state, action)
	}
}

const initStore = () => {
	return createStore(reducer, bindMiddleware([thunkMiddleware]))
}

export const wrapper = createWrapper(initStore)
