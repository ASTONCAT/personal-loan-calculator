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

	function handleMove(event) {
		return dispatch(setAmount(event.target.value))
	}

	function calculate() {
		return dispatch(doCalc())
	}

	return (
		<form className={classes.calculator}>
			<input
				className={`${classes.hideArrows} ${
					amount.requested >= amount.min && amount.requested <= amount.max
						? classes.rightAmount
						: classes.wrongAmount
				}`}
				type="number"
				pattern="[0-9]{4,6}"
				id="amount"
				value={amount.requested}
				onChange={handleChange}
			/>
			<br />
			<br />
			<input
				id="req-amount-slider"
				className={classes.rangeSlider}
				type="range"
				min={amount.min}
				max={amount.max}
				value={amount.requested}
				step="100"
				onInput={handleMove}
				onChange={calculate}
				style={{
					backgroundSize: `${
						((amount.requested - amount.min) * 100) / (amount.max - amount.min)
					}% 100%`
				}}
			/>

			<div className={classes.amountSlider}>
				<button
					type="button"
					onMouseDown={() => dispatch(increment())}
					onMouseUp={calculate}
				>
					+
				</button>
				<button
					type="button"
					onMouseDown={() => dispatch(decrement())}
					onMouseUp={calculate}
				>
					-
				</button>
			</div>
		</form>
	)
}

export default Calculator
