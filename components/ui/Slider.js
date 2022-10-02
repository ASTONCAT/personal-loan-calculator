import classes from './Slider.module.css'

export default function Slider(props) {
	return (
		<>
			<input
				className={classes.rangeSlider}
				type={props.type}
				min={props.min}
				max={props.max}
				value={props.value}
				step={props.step}
				onChange={props.handleChange}
				style={{
					backgroundSize: `${
						((props.value - props.min) * 100) / (props.max - props.min)
					}% 100%`
				}}
			/>
			<div className={classes.min}>{`${props.min} ${
				props.min > 4
					? props.units.plurals
					: props.min > 1
					? props.units.plural
					: props.units.singular
			}`}</div>
			<div className={classes.max}>{`${props.max} ${
				props.max > 4
					? props.units.plurals
					: props.max > 1
					? props.units.plural
					: props.units.singular
			}`}</div>
		</>
	)
}
