import { useSelector } from 'react-redux'
import classes from './Recap.module.css'

export default function Recap() {
	const payments = useSelector((state) => state.payments)
	const interestRate = (100 * payments.interestRate).toFixed(2)
	const insuranceAmount = Math.round(payments.insuranceAmount)
	const fee = Math.round(payments.arrangingFee)
	const total = payments.totalPayment.toFixed(2)
	return (
		<p className={classes.paragraph}>
			<span>Úroková sazba od </span>
			<strong>{interestRate}&nbsp;%</strong>
			<span>, RPSN od </span>
			<strong>7,11&nbsp;%</strong>
			<span>, pojištění </span>
			<strong>{insuranceAmount}&nbsp;Kč/měsíčně</strong>
			<span>, poplatek za sjednání online </span>
			<strong>{fee}&nbsp;Kč</strong>
			<span>, celkem zaplatíte </span>
			<strong>{total}&nbsp;Kč</strong>
			<span>.</span>
		</p>
	)
}
