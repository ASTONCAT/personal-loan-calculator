import classes from './Layout.module.css'
import { useRouter } from 'next/router'
import Image from 'next/image'

function Layout(props) {
	const router = useRouter()

	return (
		<>
			<div className={classes.topbar}>Cz | En</div>
			<main
				className={router.pathname === '/setup' ? classes.setup : classes.main}
			>
				{props.children}
			</main>
			<footer className={classes.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{' '}
					<span className={classes.logo}>
						<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
					</span>
				</a>
			</footer>
		</>
	)
}

export default Layout
