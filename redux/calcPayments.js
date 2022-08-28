import axios from 'axios'

export function showLoader() {
	return {
		type: 'SHOW_LOADER'
	}
}

export function hideLoader() {
	return {
		type: 'HIDE_LOADER'
	}
}

export function doCalc() {
	return (dispatch, getState) => {
		dispatch(showLoader())
		const { amount } = getState()
		dispatch(calc(amount.requested))
		setTimeout(() => {
			dispatch(hideLoader())
		}, 1000)
	}
}

export function calc(amount) {
	return {
		type: 'CALC',
		payload: amount
	}
}

const initialValues = {
	loader: false,
	interestRate: 0.069,
	monthlyPayment: 1358,
	insurance: false,
	insuranceAmount: 120,
	arrangingFee: 0,
	totalPayment: 118560
}

function paymentsReducer(payments = initialValues, action) {
	switch (action.type) {
		case 'SHOW_LOADER':
			return {
				...payments,
				loader: true
			}
		case 'HIDE_LOADER':
			return {
				...payments,
				loader: false
			}
		case 'CALC':
			const simpleCalc = (action.payload * 1.07) / 12
			return {
				...payments,
				monthlyPayments: simpleCalc
			}
		default:
			return payments
	}
}

export default paymentsReducer
