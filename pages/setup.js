import { connectToDatabase } from '../util/mongodb'
import Head from 'next/head'
import SetupForm from '../components/SetupForm'
import React from 'react'

export default function LoanCalcSetup({ calcSetup }) {
	const [message, setMessage] = React.useState({error: false, text: ''})

	async function submitDataHandler(enteredData) {
		enteredData.docId = calcSetup[0]._id // add the db document id
		enteredData.monthlyPayment = 2240 // from Rapid API later
		enteredData.totalPayment = 114221 // from Rapid API later
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
		<>
			<Head>
				<title>Personal Loan Calculator - Limit Values Setting</title>
				<meta
					name="description"
					content="Here you can change the loan calculator limit values"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<SetupForm
				minValue={calcSetup[0].minAmount}
				maxValue={calcSetup[0].maxAmount}
				reqValue={calcSetup[0].reqAmount}
				minTerm={calcSetup[0].minTerm}
				maxTerm={calcSetup[0].maxTerm}
				reqTerm={calcSetup[0].reqTerm}
				interestRate={calcSetup[0].interestRate}
				insurance={calcSetup[0].insurance}
				insuranceAmount={calcSetup[0].insuranceAmount}
				arrangingFee={calcSetup[0].arrangingFee}
				onSubmitData={submitDataHandler}
				message={message}
			/>
		</>
	)
}

export async function getServerSideProps() {
	const { db } = await connectToDatabase()

	const calcSetup = await db.collection('initialvalues').find({}).limit(1).toArray()

	return {
		props: {
			calcSetup: JSON.parse(JSON.stringify(calcSetup))
		}
	}
}
