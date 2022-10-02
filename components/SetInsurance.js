import { useSelector, useDispatch } from 'react-redux'
import { updateInsurance } from '../redux/calcPayments'
import Heading from './ui/Heading'

export default function SetInsurance() {
	const payments = useSelector((state) => state.payments)
	const term = useSelector((state) => state.term)
	const dispatch = useDispatch()

	function handleInsuranceChange(event) {
		const insurance = event.target.value === "with insurance" ? true : false
		return dispatch(updateInsurance(insurance, term.requested))
	}

	return (
		<>
			<Heading>Pojištění proti neschopnosti půjčku splácet</Heading>

			<div className="insurance">
				<label>
					<input
						type="radio"
						value="with insurance"
						checked={payments.insurance}
						onChange={handleInsuranceChange}
					/>{' '}
					S pojištěním
				</label>

				<label>
					<input
						type="radio"
						value="without insurance"
						checked={!payments.insurance}
						onChange={handleInsuranceChange}
					/>{' '}
					Bez pojištění
				</label>
			</div>
		</>
	)
}
