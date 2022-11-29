import { useSelector, useDispatch } from 'react-redux'
import { setAmount } from '../redux/setAmounts'
import { doCalc } from '../redux/calcPayments'
import Slider from './ui/Slider'
import NumberInput from './ui/NumberInput'
import SliderGrid from './ui/SliderGrid'
import Heading from './ui/Heading'

export default function SetAmount() {
	const amount = useSelector((state) => state.amount)
	const dispatch = useDispatch()
	const units = { singular: 'Kč', plural: 'Kč', plurals: 'Kč' }

	function calculate(curData) {
		return dispatch(doCalc(curData))
	}

	function handleAmountChange(event) {
		if (event.target.value >= amount.min && event.target.value <= amount.max) {
			const curData = { reqAmount: event.target.value, curTerms: false }
			calculate(curData)
			return dispatch(setAmount(curData.reqAmount))
		}
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
				units={units}
			/>
			<Slider
				type="range"
				min={amount.min}
				max={amount.max}
				value={amount.requested}
				step="100"
				handleChange={handleAmountChange}
				units={units}
			/>
		</SliderGrid>
	)
}
