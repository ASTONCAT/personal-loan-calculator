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

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
	const { db } = await connectToDatabase()
	const calcSetup = await db.collection('setting').find({}).limit(1).toArray()

	store.dispatch({
		type: 'SET_MIN_AMOUNT',
		payload: calcSetup[0].minAmount
	})

	store.dispatch({
		type: 'SET_MAX_AMOUNT',
		payload: calcSetup[0].maxAmount
	})

	store.dispatch({
		type: 'SET_AMOUNT',
		payload: calcSetup[0].reqAmount
	})

	store.dispatch({
		type: 'SET_MIN_TERM',
		payload: calcSetup[0].minTerm
	})

	store.dispatch({
		type: 'SET_MAX_TERM',
		payload: calcSetup[0].maxTerm
	})

	store.dispatch({
		type: 'SET_TERM',
		payload: calcSetup[0].reqTerm
	})

	store.dispatch({
		type: 'SET_INTERESTS_RATE',
		payload: calcSetup[0].interestRate
	})

	store.dispatch({
		type: 'SET_INSURANCE',
		payload: calcSetup[0].insurance
	})

	store.dispatch({
		type: 'SET_INSURANCE_AMOUNT',
		payload: calcSetup[0].insuranceAmount
	})

	store.dispatch({
		type: 'SET_ARRANGING_FEE',
		payload: calcSetup[0].arrangingFee
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

				<Disclaimer>
					Výše uvedené splátky je pouze orientační a od výsledné schválené výše
					splátky se může lišit.
				</Disclaimer>
			</Card>
		</>
	)
}
