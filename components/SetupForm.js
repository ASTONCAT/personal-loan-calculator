import { useRef } from 'react'
import Card from './ui/Card'
import classes from './SetupForm.module.css'

function SetupForm(props) {
	const requestedAmountInputRef = useRef()
	const minAmountInputRef = useRef()
	const maxAmountInputRef = useRef()

	function submitHandler(event) {
		event.preventDefault()

		const enteredData = {
			reqAmount: Number(requestedAmountInputRef.current.value),
			minAmount: Number(minAmountInputRef.current.value),
			maxAmount: Number(maxAmountInputRef.current.value)
		}

		props.onSubmitData(enteredData)
	}

	return (
		<Card>
			<h2 className={classes.title}>Calculator Limit Values</h2>
			<h4 className={classes.subtitle}>Change the loan calculator limit values</h4>
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
						ref={requestedAmountInputRef}
						step="100"
						min="100"
						max="67108864"
					/>
				</div>
				<div className={classes.submit}>
					<div></div>
					<button>Submit</button>
				</div>
			</form>
			<div className={props.message.error ? classes.wrongAmount : classes.rightAmount}>
				{props.message.text}
			</div>
		</Card>
	)
}

export default SetupForm
