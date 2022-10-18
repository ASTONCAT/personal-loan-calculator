import { useSelector, useDispatch } from 'react-redux'
import { setTerm } from '../redux/setTerms'
import { doCalc } from '../redux/calcPayments'
import Slider from './ui/Slider'
import NumberInput from './ui/NumberInput'
import SliderGrid from './ui/SliderGrid'
import Heading from './ui/Heading'

export default function SetTerm() {
	const term = useSelector((state) => state.term)
	const dispatch = useDispatch()
	const units = { singular: 'měsíc', plural: 'měsíce', plurals: 'měsíců' }

	function calculate(curData) {
		return dispatch(doCalc(curData))
	}

	function handleTermChange(event) {
		const curData = { reqAmount: false, curTerms: event.target.value }
		calculate(curData)
		return dispatch(setTerm(curData.curTerms))
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
				handleChange={handleTermChange}
				units={units}
			/>
		</SliderGrid>
	)
}
