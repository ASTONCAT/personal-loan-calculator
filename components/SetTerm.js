import { useSelector, useDispatch } from 'react-redux'
import { setTerm } from '../redux/setTerms'
import { doCalc } from '../redux/calcPayments'
import Slider from './ui/Slider'
import NumberInput from './ui/NumberInput'
import SliderGrid from './ui/sliderGrid'
import Heading from './ui/Heading'

export default function SetTerm() {
	const term = useSelector((state) => state.term)
	const dispatch = useDispatch()
	const units = { singular: 'měsíc', plural: 'měsíce', plurals: 'měsíců' }

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
		<SliderGrid>
			<Heading>Na jak dlouho</Heading>
			<NumberInput
				min={term.min}
				max={term.max}
				value={term.requested}
				step="1"
				handleChange={handleTermChange}
				units={units}
			/>
			<Slider
				type="range"
				min={term.min}
				max={term.max}
				value={term.requested}
				step="1"
				handleMove={handleTermMove}
				handleCalc={calculate}
				units={units}
			/>
		</SliderGrid>
	)
}
