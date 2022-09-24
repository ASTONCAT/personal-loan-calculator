import classes from './CalcForm.module.css'

export default function CalcForm(props) {
    return <form className={classes.loanCalc}>{props.children}</form>
  }