import { useSelector, useDispatch } from 'react-redux'
import { setAmount } from '../redux/setAmounts'
import { doCalc } from '../redux/calcPayments'
import Slider from './ui/Slider'
import NumberInput from './ui/NumberInput'
import SliderGrid from './ui/sliderGrid'
import Heading from './ui/Heading'

export default function SetAmount() {
	const amount = useSelector((state) => state.amount)
	const dispatch = useDispatch()
	const units = { singular: 'Kč', plural: 'Kč', plurals: 'Kč' }

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
		<SliderGrid>
			<Heading>Kolik si chci půjčit</Heading>
			<NumberInput 
				min={amount.min}
				max={amount.max}
				value={amount.requested}
				step="100"
				handleChange={handleAmountChange}
				handleInput={calculate}
				units={units}
			/>
            <Slider 
                type="range"
				min={amount.min}
				max={amount.max}
				value={amount.requested}
				step="100"
				handleMove={handleAmountMove}
				handleCalc={calculate}
				units={units}
            />
		</SliderGrid>
	)
}
