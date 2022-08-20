import { connectToDatabase } from '../util/mongodb'
import SetupForm from '../components/SetupForm'
import React from 'react'
// our-domain.com/setup

export default function LoanCalcSetup({ calcSetup }) {
	const [message, setMessage] = React.useState({error: false, text: ''})

	async function submitDataHandler(enteredData) {
		enteredData.docId = calcSetup[0]._id // add the db document id
		const response = await fetch('/api/setup', {
			method: 'POST',
			body: JSON.stringify(enteredData),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		const result = await response.json()
		setMessage({error: result.error, text: result.message})
	}
	return (
		<SetupForm
			reqValue={calcSetup[0].reqAmount}
			minValue={calcSetup[0].minAmount}
			maxValue={calcSetup[0].maxAmount}
			onSubmitData={submitDataHandler}
			message={message}
		/>
	)
}

export async function getServerSideProps() {
	const { db } = await connectToDatabase()

	const calcSetup = await db.collection('set').find({}).limit(1).toArray()

	return {
		props: {
			calcSetup: JSON.parse(JSON.stringify(calcSetup))
		}
	}
}
