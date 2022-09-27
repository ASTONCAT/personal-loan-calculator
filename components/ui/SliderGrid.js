import classes from './SliderGrid.module.css'

export default function SliderGrid(props) {
    return <div className={classes.container}>{props.children}</div>
  }