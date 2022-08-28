import classes from './Calculator.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, setAmount } from '../redux/setAmounts'
import { oneSecIncrement } from '../redux/calcMonthlyPayment'

function Calculator() {
	const amount = useSelector((state) => state.amount)

	const dispatch = useDispatch()

	function handleChange(event) {
		return dispatch(setAmount(event.target.value))
	}

	function zvetsit() {
		return dispatch(increment())
	}

	function zaChviliZvetsit() {
		return dispatch(oneSecIncrement())
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
				<button type="button" onMouseDown={zvetsit} onMouseUp={zaChviliZvetsit}>
					+
				</button>
				<button type="button" onMouseDown={() => dispatch(decrement())}>
					-
				</button>
			</div>
		</form>
	)
}

export default Calculator
