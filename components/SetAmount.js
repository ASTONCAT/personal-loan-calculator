import classes from './SetAmount.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { setAmount } from '../redux/setAmounts'
import { doCalc } from '../redux/calcPayments'
import Slider from './ui/Slider'

export default function SetAmount() {
	const amount = useSelector((state) => state.amount)

	const dispatch = useDispatch()

	function handleAmountChange(event) {
		return dispatch(setAmount(event.target.value))
	}

	function handleAmountMove(event) {
		return dispatch(setAmount(event.target.value))
	}

	function calculate() {
		return dispatch(doCalc())
	}

	return (
		<>
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
				step="100"
				onChange={handleAmountChange}
			/>
			<br />
			<br />
            <Slider 
                type="range"
				min={amount.min}
				max={amount.max}
				value={amount.requested}
				step="100"
				handleMove={handleAmountMove}
				handleCalc={calculate}
            />
			<br />
			<br />
		</>
	)
}
