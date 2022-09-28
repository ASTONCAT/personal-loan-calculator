import classes from './Title.module.css'

export default function Title(props) {
	return <h1 className={classes.h1}>{props.children}</h1>
}
