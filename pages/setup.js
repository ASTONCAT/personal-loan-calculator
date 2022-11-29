import { connectToDatabase } from '../util/mongodb'
import { rapidApi } from '../util/rapidapi'
import React, {useState} from 'react'
import Head from 'next/head'
import SetupForm from '../components/SetupForm'
import axios from 'axios'


export default function LoanCalcSetup({ initSetup }) {
	const [message, setMessage] = useState({error: false, text: ''})

    async function submitDataHandler(enteredData){
        try {
			// GET monthlyPayment from Rapid API
			const resp = await axios.get(rapidApi.url, {
				headers: {
					'X-RapidAPI-Key': rapidApi.key,
					'X-RapidAPI-Host': rapidApi.host
				},
				params: {
					loanAmount: enteredData.reqAmount,
					interestRate: enteredData.interestRate,
					terms: enteredData.reqTerm
				}
			})

			// CALC totalPayment 
			// ADD into enteredData docId, monthlyPayment and totalPayment
			const monthlyPaymentInclInsurance = enteredData.insurance
				? resp.data.monthlyPayment + enteredData.insuranceAmount
				: resp.data.monthlyPayment
			enteredData.docId = initSetup._id 
			enteredData.monthlyPayment = resp.data.monthlyPayment
			enteredData.totalPayment =
				monthlyPaymentInclInsurance * enteredData.reqTerm +
				enteredData.arrangingFee

			// SAVE enteredData in database
			const response = await fetch('/api/setup', {
				method: 'POST',
				body: JSON.stringify(enteredData),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			// GET response and show message on frontend
			const result = await response.json()
			setMessage({error: result.error, text: result.message})

        }
     
        catch(error){
		   setMessage({error: true, text: error.message.concat('. ',error.response.data.message)})
        }

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
