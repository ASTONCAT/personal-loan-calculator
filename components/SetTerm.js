import classes from './SetTerm.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { setTerm } from '../redux/setTerms'
import { doCalc } from '../redux/calcPayments'
import Slider from './ui/Slider'
import NumberInput from './ui/NumberInput'

export default function SetTerm() {
    const term = useSelector((state) => state.term)

	const dispatch = useDispatch()

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
		<>
			<NumberInput 
				min={term.min}
				max={term.max}
				value={term.requested}
				step="1"
				handleChange={handleTermChange}
			/>
			<br />
			<br />
            <Slider 
                type="range"
				min={term.min}
				max={term.max}
				value={term.requested}
				step="1"
				handleMove={handleTermMove}
				handleCalc={calculate}
            />
			<br />
			<br />
		</>
	)
}
