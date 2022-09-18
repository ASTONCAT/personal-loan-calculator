import { useRef } from 'react'
import Card from './ui/Card'
import classes from './SetupForm.module.css'

function SetupForm(props) {
	const minAmountInputRef = useRef()
	const maxAmountInputRef = useRef()
	const reqAmountInputRef = useRef()
	const minTermInputRef = useRef()
	const maxTermInputRef = useRef()
	const reqTermInputRef = useRef()
	const interestRateInputRef = useRef()
	const arrangingFeeInputRef = useRef()
	const insuranceInputRef = useRef()
	const insuranceAmountInputRef = useRef()

	function submitHandler(event) {
		event.preventDefault()

		const enteredData = {
			minAmount: Number(minAmountInputRef.current.value),
			maxAmount: Number(maxAmountInputRef.current.value),
			reqAmount: Number(reqAmountInputRef.current.value),
            minTerm: Number(minTermInputRef.current.value),
            maxTerm: Number(maxTermInputRef.current.value),
            reqTerm: Number(reqTermInputRef.current.value),
            interestRate: Number(interestRateInputRef.current.value),
            insurance: insuranceInputRef.current.checked,
            insuranceAmount: Number(insuranceAmountInputRef.current.value),
            arrangingFee: Number(arrangingFeeInputRef.current.value)
		}

		props.onSubmitData(enteredData)
	}

	return (
		<Card>
			<h2 className={classes.title}>Calculator Limit Values</h2>
			<h4 className={classes.subtitle}>
				Change the loan calculator limit values
			</h4>
			<form className={classes.form} onSubmit={submitHandler}>
				<div className={classes.field}>
					<label htmlFor="minAmount">Min Amount</label>
					<input
						type="number"
						defaultValue={props.minValue}
						required
						id="minAmount"
						ref={minAmountInputRef}
						step="100"
						min="100"
						max="67108864"
					/>
				</div>
				<div className={classes.field}>
					<label htmlFor="maxAmount">Max Amount</label>
					<input
						type="number"
						defaultValue={props.maxValue}
						required
						id="maxAmount"
						ref={maxAmountInputRef}
						step="100"
						min="200"
						max="67108864"
					/>
				</div>
				<div className={classes.field}>
					<label htmlFor="requestedAmount">Requested Amount</label>
					<input
						type="number"
						defaultValue={props.reqValue}
						required
						id="requestedAmount"
						ref={reqAmountInputRef}
						step="100"
						min="100"
						max="67108864"
					/>
				</div>
				<div className={classes.field}>
					<label htmlFor="minTerm">Min Term</label>
					<input
						type="number"
						defaultValue={props.minTerm}
						required
						id="minTerm"
						ref={minTermInputRef}
						min="1"
						max="2400"
					/>
				</div>
				<div className={classes.field}>
					<label htmlFor="maxTerm">Max Term</label>
					<input
						type="number"
						defaultValue={props.maxTerm}
						required
						id="maxTerm"
						ref={maxTermInputRef}
						min="2"
						max="2400"
					/>
				</div>
				<div className={classes.field}>
					<label htmlFor="requestedTerm">Requested Term</label>
					<input
						type="number"
						defaultValue={props.reqTerm}
						required
						id="requestedTerm"
						ref={reqTermInputRef}
						min="1"
						max="2400"
					/>
				</div>
				<div className={classes.field}>
					<label htmlFor="interestRate">Interest Rate</label>
					<input
						type="number"
						defaultValue={props.interestRate}
						required
						id="interestRate"
						ref={interestRateInputRef}
						step="0.001"
						min="0"
						max="1"
					/>
				</div>
				<div className={classes.field}>
					<label htmlFor="arrangingFee">Arranging Fee</label>
					<input
						type="number"
						defaultValue={props.arrangingFee}
						required
						id="arrangingFee"
						ref={arrangingFeeInputRef}
						min="0"
						max="9999999"
					/>
				</div>
				<div className={classes.box}>
					<label htmlFor="insurance">Insurance</label>
					<input
						className={classes.customCheckBox}
						id="insurance"
						type="checkbox"
						defaultChecked={props.insurance}
						ref={insuranceInputRef}
					/>
				</div>
				<div className={classes.field}>
					<label htmlFor="insuranceAmount">Insurance Amount</label>
					<input
						type="number"
						defaultValue={props.insuranceAmount}
						required
						id="insuranceAmount"
						ref={insuranceAmountInputRef}
						min="0"
						max="9999999"
					/>
				</div>
				<div className={classes.submit}>
					<div></div>
					<button>Submit</button>
				</div>
			</form>
			<div
				className={
					props.message.error ? classes.wrongAmount : classes.rightAmount
				}
			>
				{props.message.text}
			</div>
		</Card>
	)
}

export default SetupForm
