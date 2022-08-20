export function calc(amount) {
    return {
        type: "CALC",
        payload: amount
    }
}

function monthlyPaymentReducer(monthlyPayment = 1358, action) {
    switch (action.type) {
        case "CALC":
            const fakeCalc = (action.payload * 0.07) / 12
            return fakeCalc
        default:
            return monthlyPayment
    }
  }

  export default monthlyPaymentReducer