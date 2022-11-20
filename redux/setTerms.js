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
		case 'SET_INIT_TERMS':
			return {
				...term,
				min: action.payload.min,
				max: action.payload.max,
				requested: action.payload.requested
			}
		case 'SET_TERM':
			return {
				...term,
				requested: action.payload
			}
		default:
			return term
	}
}

export default termReducer
