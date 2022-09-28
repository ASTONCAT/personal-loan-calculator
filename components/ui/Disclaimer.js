import classes from './Disclaimer.module.css'

export default function Disclaimer(props) {
	return <h5 className={classes.h5}>{props.children}</h5>
}
