import classes from './NumberInput.module.css'

export default function NumberInput(props) {
	const absValue = Math.abs(props.value)
	return (
		<>
			<input
				className={`${classes.hideArrows} ${
					props.value >= props.min && props.value <= props.max
						? classes.rightAmount
						: classes.wrongAmount
				}`}
				type="number"
				pattern="[0-9]{3}-[0-9]{3}"
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
