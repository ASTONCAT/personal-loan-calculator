import classes from './Layout.module.css'
import { useRouter } from 'next/router'

function Layout(props) {
	const router = useRouter()

	return (
		<div>
			<div className={classes.topbar}>TopBar</div>
			<main
				className={router.pathname === '/setup' ? classes.setup : classes.main}
			>
				{props.children}
			</main>
		</div>
	)
}

export default Layout
