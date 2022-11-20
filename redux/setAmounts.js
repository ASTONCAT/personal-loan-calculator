// setting the minimum and maximum loan amount and the requested loan amount

export function setAmount(amount) {
	return {
		type: 'SET_AMOUNT',
		payload: amount
	}
}

const initialValues = {
	requested: 100000,
	min: 20000,
	max: 800000
}

function amountReducer(amount = initialValues, action) {
	switch (action.type) {
		case 'SET_INIT_AMOUNTS':
			return {
				...amount,
				min: action.payload.min,
				max: action.payload.max,
				requested: action.payload.requested
			}
		case 'SET_AMOUNT':
			return {
				...amount,
				requested: action.payload
			}
		default:
			return amount
	}
}

export default amountReducer
