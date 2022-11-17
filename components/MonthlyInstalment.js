import { useSelector } from 'react-redux'
import { NumericFormat } from 'react-number-format'
import classes from './MonthlyInstalment.module.css'
import IconFormat from './ui/IconFormat'

function handleClick() {
	alert('Tlačítko je prozatím nefunkční')
}

export default function MonthlyInstalment() {
	const payments = useSelector((state) => state.payments)
	const monthlyPayment = payments.insurance
		? payments.monthlyPayment + payments.insuranceAmount
		: payments.monthlyPayment
	return (
		<div className={classes.box}>
			<h2>Měsíčně zaplatíte</h2>
			<NumericFormat
				displayType="text"
				value={monthlyPayment}
				decimalScale={0}
				thousandSeparator=" "
				suffix={' Kč'}
			/>
			<button onClick={handleClick}>Pokračovat</button>
			<IconFormat text="nebo Vám zavoláme" />
		</div>
	)
}
