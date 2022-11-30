import { NumericFormat } from 'react-number-format'
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
			<NumericFormat 
				className={classes.min}
				displayType="text"
				value={props.min}
				thousandSeparator=" "
				suffix={`${' '} ${
					props.min > 4
						? props.units.plurals
						: props.min > 1
						? props.units.plural
						: props.units.singular
					}`}
			/>
			<NumericFormat 
				className={classes.max}
				displayType="text"
				value={props.max}
				thousandSeparator=" "
				suffix={`${' '} ${
					props.max > 4
						? props.units.plurals
						: props.max > 1
						? props.units.plural
						: props.units.singular
					}`}
			/>
		</>
	)
}
