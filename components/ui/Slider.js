import classes from './Slider.module.css'

export default function Slider(props) {
    return (
        <input
            className={classes.rangeSlider}
            type={props.type}
            min={props.min}
            max={props.max}
            value={props.value}
            step={props.step}
            onInput={props.handleMove}
            onChange={props.handleCalc}
            style={{
                backgroundSize: `${
                    ((props.value - props.min) * 100) / (props.max - props.min)
                }% 100%`
            }}
        />
    )
}
