import { useSelector } from 'react-redux'
import { wrapper } from '../redux'
import { connectToDatabase } from '../util/mongodb'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Calculator from '../components/Calculator'

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
		<div className={styles.container}>
			<Head>
				<title>Redux Next App</title>
				<meta
					name="description"
					content="Next App using Redux, React and Redux Thunk"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Expres půjčku schválíme online do 5 minut
				</h1>

				<Calculator />

				<p className={styles.disclaimer}>
					Výše uvedené splátky je pouze orientační a od výsledné schválené výše
					splátky se může lišit.
				</p>
			</main>

			<footer className={styles.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{' '}
					<span className={styles.logo}>
						<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
					</span>
				</a>
			</footer>
		</div>
	)
}
