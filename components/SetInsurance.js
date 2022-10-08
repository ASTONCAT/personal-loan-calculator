import { useSelector, useDispatch } from 'react-redux'
import { updateInsurance } from '../redux/calcPayments'
import Heading from './ui/Heading'
import RadioButton from './ui/RadioButton'
import classes from './SetInsurance.module.css'

export default function SetInsurance() {
	const payments = useSelector((state) => state.payments)
	const term = useSelector((state) => state.term)
	const dispatch = useDispatch()

	function handleInsuranceChange(event) {
		const insurance = event.target.value === 'with insurance' ? true : false
		return dispatch(updateInsurance(insurance, term.requested))
	}

	return (
		<>
			<Heading>Pojištění proti neschopnosti půjčku splácet</Heading>

			<div className={classes.insurance}>
				<RadioButton>
					<input
						type="radio"
						name='insurance'
						id="with-insurance"
						value="with insurance"
						checked={payments.insurance}
						onChange={handleInsuranceChange}
					/>
					<label htmlFor="with-insurance">S pojištěním</label>
				</RadioButton>
				<RadioButton>
					<input
						type="radio"
						name='insurance'
						id="without-insurance"
						value="without insurance"
						checked={!payments.insurance}
						onChange={handleInsuranceChange}
					/>
					<label htmlFor="without-insurance">Bez pojištění</label>
				</RadioButton>
			</div>
		</>
	)
}
