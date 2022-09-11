import axios from 'axios'
import { rapidApi } from '../util/rapidapi'

export function fetchMonthlyPaymentRequest() {
	return {
		type: 'FETCH_MONTHLY_PAYMENT_REQUEST'
	}
}

export function fetchMonthlyPaymentSuccess(monthlyPayment) {
	return {
		type: 'FETCH_MONTHLY_PAYMENT_SUCCESS',
		payload: monthlyPayment
	}
}

export function fetchMonthlyPaymentFailure(errorMessage) {
	return {
		type: 'FETCH_MONTHLY_PAYMENT_FAILURE',
		payload: errorMessage
	}
}

export function doCalc() {
	return (dispatch, getState) => {
		dispatch(fetchMonthlyPaymentRequest())

		const curState = getState()
		const reqAmount = curState.amount.requested
		const curRate = curState.payments.interestRate
		const curTerms = curState.term.requested

		const options = {
			method: 'GET',
			url: rapidApi.url,
			params: { loanAmount: reqAmount, interestRate: curRate, terms: curTerms },
			headers: {
				'X-RapidAPI-Key': rapidApi.key,
				'X-RapidAPI-Host': rapidApi.host
			}
		}

		axios
			.request(options)
			.then(function (response) {
				console.log(response.data)
				dispatch(fetchMonthlyPaymentSuccess(response.data))
			})
			.catch(function (error) {
				console.error(error)
				dispatch(fetchMonthlyPaymentFailure(error.message))
			})
	}
}

const initialValues = {
	loader: false,
	interestRate: 0.069,
	monthlyPayment: 1358,
	insurance: false,
	insuranceAmount: 120,
	arrangingFee: 0,
	totalPayment: 118560,
	error: ''
}

function paymentsReducer(payments = initialValues, action) {
	switch (action.type) {
		case 'FETCH_MONTHLY_PAYMENT_REQUEST':
			return {
				...payments,
				loader: true
			}
		case 'FETCH_MONTHLY_PAYMENT_SUCCESS':
			return {
				...payments,
				loader: false,
				monthlyPayment: action.payload
			}
		case 'FETCH_MONTHLY_PAYMENT_FAILURE':
			return {
				...payments,
				loader: false,
				error: action.payload
			}
		case 'SET_INTERESTS_RATE':
			return {
				...payments,
				interestRate: action.payload
			}
		case 'SET_INSURANCE':
			return {
				...payments,
				insurance: action.payload
			}
		case 'SET_INSURANCE_AMOUNT':
			return {
				...payments,
				insuranceAmount: action.payload
			}
		case 'SET_ARRANGING_FEE':
			return {
				...payments,
				arrangingFee: action.payload
			}
		default:
			return payments
	}
}

export default paymentsReducer
