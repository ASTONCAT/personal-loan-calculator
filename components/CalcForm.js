import classes from './CalcForm.module.css'
import SetAmount from './SetAmount'
import SetInsurance from './SetInsurance'
import SetTerm from './SetTerm'

export default function CalcForm(props) {
    return (
        <form className={classes.loanCalc}>

            <SetAmount />

            <SetTerm />

            <SetInsurance />

        </form>
    )
  }