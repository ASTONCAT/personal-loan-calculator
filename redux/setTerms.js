// setting the minimum, maximum the requested loan terms

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
