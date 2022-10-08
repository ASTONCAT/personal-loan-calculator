import classes from './RadioButton.module.css'

export default function RadioButton(props) {
    return <div className={classes.radio}>{props.children}</div>
  }