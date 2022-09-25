import classes from './SetAmount.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { setAmount } from '../redux/setAmounts'
import { doCalc } from '../redux/calcPayments'
import Slider from './ui/Slider'
import NumberInput from './ui/NumberInput'

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
			<NumberInput 
				min={amount.min}
				max={amount.max}
				value={amount.requested}
				step="100"
				handleChange={handleAmountChange}
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
