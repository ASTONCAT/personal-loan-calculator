import { wrapper } from '../redux'
import { connectToDatabase } from '../util/mongodb'
import Head from 'next/head'
import Card from '../components/ui/Card'
import Title from '../components/ui/Title'
import CalcForm from '../components/ui/CalcForm'
import SetAmount from '../components/SetAmount'
import SetInsurance from '../components/SetInsurance'
import SetTerm from '../components/SetTerm'
import Disclaimer from '../components/ui/Disclaimer'
import Recap from '../components/Recap'
import MonthlyInstalment from '../components/MonthlyInstalment'

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
	const { db } = await connectToDatabase()
	const calcSetup = await db
		.collection('initialvalues')
		.find({})
		.limit(1)
		.toArray()

	store.dispatch({
		type: 'SET_INIT_AMOUNTS',
		payload: {
			min: calcSetup[0].minAmount,
			max: calcSetup[0].maxAmount,
			requested: calcSetup[0].reqAmount
		}
	})

	store.dispatch({
		type: 'SET_INIT_TERMS',
		payload: {
			min: calcSetup[0].minTerm,
			max: calcSetup[0].maxTerm,
			requested: calcSetup[0].reqTerm
		}
	})

	store.dispatch({
		type: 'SET_INIT_OTHER_VALUES',
		payload: {
			insurance: calcSetup[0].insurance,
			insuranceAmount: calcSetup[0].insuranceAmount,
			arrangingFee: calcSetup[0].arrangingFee,
			interestRate: calcSetup[0].interestRate,
			monthlyPayment: calcSetup[0].monthlyPayment,
			totalPayment: calcSetup[0].totalPayment
		}
	})

	return {
		props: {
			message: 'revalidace'
		},
		revalidate: 180 // In seconds
	}
})

export default function Home() {
	return (
		<>
			<Head>
				<title>Personal Loan Calculator - React, Redux, Next App</title>
				<meta
					name="description"
					content="Next App using Redux, React and Redux Thunk"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Card>
				<Title>Expres půjčku schválíme online do&nbsp;5&nbsp;minut</Title>

				<CalcForm>
					<SetAmount />
					<SetTerm />
					<SetInsurance />
				</CalcForm>

				<Recap />

				<MonthlyInstalment />

				<Disclaimer>
					Výše uvedené splátky je pouze orientační a od výsledné schválené výše
					splátky se může lišit.
				</Disclaimer>
			</Card>
		</>
	)
}
