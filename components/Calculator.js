import classes from './Calculator.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, setAmount } from '../redux/setAmounts'
import { addMonth, deductMonth, setTerm } from '../redux/setTerms'
import { doCalc } from '../redux/calcPayments'

function Calculator() {
	const amount = useSelector((state) => state.amount)
	const term = useSelector((state) => state.term)

	const dispatch = useDispatch()

	function handleAmountChange(event) {
		return dispatch(setAmount(event.target.value))
	}

	function handleAmountMove(event) {
		return dispatch(setAmount(event.target.value))
	}

	function handleTermChange(event) {
		return dispatch(setTerm(event.target.value))
	}

	function handleTermMove(event) {
		return dispatch(setTerm(event.target.value))
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
				onChange={handleAmountChange}
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
				onInput={handleAmountMove}
				onChange={calculate}
				style={{
					backgroundSize: `${
						((amount.requested - amount.min) * 100) / (amount.max - amount.min)
					}% 100%`
				}}
			/>

			<div className={classes.slider}>
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

			<input
				className={`${classes.hideArrows} ${
					term.requested >= term.min && term.requested <= term.max
						? classes.rightAmount
						: classes.wrongAmount
				}`}
				type="number"
				pattern="[0-9]{4,6}"
				id="term"
				value={term.requested}
				onChange={handleTermChange}
			/>
			<br />
			<br />
			<input
				id="req-term-slider"
				className={classes.rangeSlider}
				type="range"
				min={term.min}
				max={term.max}
				value={term.requested}
				step="1"
				onInput={handleTermMove}
				onChange={calculate}
				style={{
					backgroundSize: `${
						((term.requested - term.min) * 100) / (term.max - term.min)
					}% 100%`
				}}
			/>

			<div className={classes.slider}>
				<button
					type="button"
					onMouseDown={() => dispatch(addMonth())}
					onMouseUp={calculate}
				>
					+
				</button>
				<button
					type="button"
					onMouseDown={() => dispatch(deductMonth())}
					onMouseUp={calculate}
				>
					-
				</button>
			</div>

		</form>
	)
}

export default Calculator
