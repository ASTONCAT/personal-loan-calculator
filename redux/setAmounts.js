// setting the minimum and maximum loan amount and the requested loan amount 

export function increment() {
    return {
        type: "INCREMENT",
        payload: 100
    }
}

export function decrement() {
    return {
        type: "DECREMENT",
        payload: 100
    }
}

export function setAmount(amount) {
    return {
        type: "SET_AMOUNT",
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
        case "INCREMENT":
            const sum = amount.requested + action.payload
            return {
                ...amount,
                requested: sum <= amount.max ? sum : amount.requested
            }
        case "DECREMENT":
            const diff = amount.requested - action.payload
            return {
                ...amount,
                requested: diff >= amount.min ? diff : amount.requested
            }
        case "SET_AMOUNT":
            return {
                ...amount,
                requested: action.payload
            }
        case "SET_MIN_AMOUNT":
            return {
                ...amount,
                min: action.payload
            }
        case "SET_MAX_AMOUNT":
            return {
                ...amount,
                max: action.payload
            }
        default:
            return amount
    }
  }

  export default amountReducer