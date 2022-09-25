import classes from './NumberInput.module.css'

export default function NumberInput(props) {
    return (
        <input 
            className={`${classes.hideArrows} ${
                props.value >= props.min && props.value <= props.max
                    ? classes.rightAmount
                    : classes.wrongAmount
            }`}
            type="number"
            pattern="[0-9]{4,6}"
            value={props.value}
            step={props.step}
            onChange={props.handleChange}   
        />
    )
}