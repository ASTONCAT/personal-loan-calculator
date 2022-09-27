import classes from './Heading.module.css'

export default function Heading(props) {
    return <h2 className={classes.h2}>{props.children}</h2>
  }