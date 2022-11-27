import { connectToDatabase } from '../util/mongodb'
import Head from 'next/head'
import SetupForm from '../components/SetupForm'
import React from 'react'

export default function LoanCalcSetup({ initSetup }) {
	const [message, setMessage] = React.useState({error: false, text: ''})

	async function submitDataHandler(enteredData) {
		enteredData.docId = initSetup._id // add the db document id
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
				minValue={initSetup.minAmount}
				maxValue={initSetup.maxAmount}
				reqValue={initSetup.reqAmount}
				minTerm={initSetup.minTerm}
				maxTerm={initSetup.maxTerm}
				reqTerm={initSetup.reqTerm}
				interestRate={initSetup.interestRate}
				insurance={initSetup.insurance}
				insuranceAmount={initSetup.insuranceAmount}
				arrangingFee={initSetup.arrangingFee}
				onSubmitData={submitDataHandler}
				message={message}
			/>
		</>
	)
}

export async function getServerSideProps() {
	const { db } = await connectToDatabase()

	const calcSetup = await db.collection('initialvalues').find({}).limit(1).toArray()

	const arrSetup = JSON.parse(JSON.stringify(calcSetup))
	let initSetup = {}
	Object.assign(initSetup, arrSetup[0])

	return {
		props: {
			initSetup: initSetup
		}
	}
}
