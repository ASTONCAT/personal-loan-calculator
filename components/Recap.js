import { useSelector } from 'react-redux'
import { NumericFormat } from 'react-number-format'
import classes from './Recap.module.css'

export default function Recap() {
	const payments = useSelector((state) => state.payments)
	return (
		<p className={classes.paragraph}>
			<span>Úroková sazba od </span>
			<NumericFormat
				className={classes.value}
				displayType="text"
				value={100 * payments.interestRate}
				decimalScale={2}
				decimalSeparator=","
				suffix={' %'}
			/>
			<span>, RPSN od </span>
			<NumericFormat
				className={classes.value}
				displayType="text"
				value="7,11"
				decimalScale={2}
				decimalSeparator=","
				suffix={' %'}
			/>
			<span>, pojištění </span>
			<NumericFormat
				className={classes.value}
				displayType="text"
				value={payments.insuranceAmount}
				decimalScale={0}
				suffix={' Kč/měsíčně'}
			/>
			<span>, poplatek za sjednání online </span>
			<NumericFormat
				className={classes.value}
				displayType="text"
				value={payments.arrangingFee}
				decimalScale={0}
				suffix={' Kč'}
			/>
			<span>, celkem zaplatíte </span>
			<NumericFormat
				className={classes.value}
				displayType="text"
				value={payments.totalPayment}
				decimalScale={2}
				decimalSeparator=","
				thousandSeparator=" "
				suffix={' Kč'}
			/>
			<span>.</span>
		</p>
	)
}
