import { useRouter } from 'next/router'
import classes from './Card.module.css'

function Card(props) {
	const router = useRouter()
	const cardClasses =
		router.pathname === '/setup'
			? classes.card
			: `${classes.card} ${classes.calculator}`
	return <div className={cardClasses}>{props.children}</div>
}

export default Card
