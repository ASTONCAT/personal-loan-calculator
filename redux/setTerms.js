// setting the minimum, maximum the requested loan terms

export function addMonth() {
	return {
		type: 'ADD_MONTH',
		payload: 1
	}
}

export function deductMonth() {
	return {
		type: 'DEDUCT_MONTH',
		payload: 1
	}
}

export function setTerm(months) {
	return {
		type: 'SET_TERM',
		payload: months
	}
}

const initialValues = {
	min: 24,
	max: 96,
	requested: 60
}

function termReducer(term = initialValues, action) {
	switch (action.type) {
		case 'ADD_MONTH':
			const sum = term.requested + action.payload
			return {
				...term,
				requested: sum <= term.max ? sum : term.requested
			}
		case 'DEDUCT_MONTH':
			const diff = term.requested - action.payload
			return {
				...term,
				requested: diff >= term.min ? diff : term.requested
			}
		case 'SET_TERM':
			return {
				...term,
				requested: action.payload
			}
		case 'SET_MIN_TERM':
			return {
				...term,
				min: action.payload
			}
		case 'SET_MAX_TERM':
			return {
				...term,
				max: action.payload
			}
		default:
			return term
	}
}

export default termReducer
