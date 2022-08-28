import classes from './Calculator.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, setAmount } from '../redux/setAmounts'
import { doCalc } from '../redux/calcPayments'

function Calculator() {
	const amount = useSelector((state) => state.amount)

	const dispatch = useDispatch()

	function handleChange(event) {
		return dispatch(setAmount(event.target.value))
	}

	function calculate() {
        return dispatch(doCalc())
	}

	return (
		<form className={classes.calculator}>
			<input
				className={
					amount.requested >= amount.min && amount.requested <= amount.max
						? classes.rightAmount
						: classes.wrongAmount
				}
				type="number"
				pattern="[0-9]{4,6}"
				id="amount"
				value={amount.requested}
				onChange={handleChange}
			/>

			<div className={classes.amountSlider}>
				<button type="button" onMouseDown={() => dispatch(increment())} onMouseUp={calculate}>
					+
				</button>
				<button type="button" onMouseDown={() => dispatch(decrement())} onMouseUp={calculate}>
					-
				</button>
			</div>
		</form>
	)
}

export default Calculator