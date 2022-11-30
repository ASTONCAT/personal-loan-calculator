import { NumericFormat } from 'react-number-format'
import classes from './NumberInput.module.css'

export default function NumberInput(props) {
	const absValue = Math.abs(props.value)
	return (
		<>
			<NumericFormat
				className={classes.hideArrows}
				displayType="input"
				decimalScale={0}
				thousandSeparator=" "
				value={props.value}
				step={props.step}
				onChange={props.handleChange}
			/>
			<div className={classes.units}>
				{absValue > 4
					? props.units.plurals
					: absValue > 1
					? props.units.plural
					: absValue > 0
					? props.units.singular
					: props.units.plurals}
			</div>
		</>
	)
}
