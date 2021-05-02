import * as React from 'react'
import { Link, PageProps } from 'gatsby'
import { ThemeProvider, Global } from '@emotion/react'
import theme, { globalStyles } from '../theme'
import Icon from '@iconify/react'
import chevronLeft from '@iconify/icons-ic/chevron-left'

export type LayoutProps = {
	location: PageProps['location']
	children: React.ReactNode
	// By default, a header and footer will be shown, and the content inside the layout will be wrapped in <main>
	// The following flags allow disabling those features
	noHeader?: boolean
	noFooter?: boolean
	notMain?: boolean
}

export default function Layout({
	noHeader = false,
	noFooter = false,
	notMain = false,
	children,
}: LayoutProps) {
	return (
		<ThemeProvider theme={theme}>
			<Global styles={globalStyles} />
			{!noHeader && <LayoutHeader />}
			{notMain ? (
				children
			) : (
				<main
					css={(theme) => ({
						...theme.blogContainer,
						'h1:first-child, h2:first-child': {
							marginTop: 0,
						},
					})}
				>
					{children}
				</main>
			)}
			{!noFooter && (
				<footer css={(theme) => theme.blogContainer}>
					&copy; {new Date().getFullYear()} James Costian
				</footer>
			)}
		</ThemeProvider>
	)
}

export function LayoutHeader() {
	return (
		<header
			css={(theme) => ({
				boxShadow: '#00000020 0px 5px 5px',
				padding: `calc(${theme.paragraphSpacing} / 2) 0`,
				marginBottom: theme.paragraphSpacing,
				background: theme.color.bioBackground,
				color: theme.color.introPrimary,
			})}
		>
			<div css={(theme) => theme.blogContainer}>
				<Link
					to="/"
					css={(theme) => ({
						fontWeight: 'bold',
						fontFamily: theme.font.headingFamily,
						textDecoration: 'none',
						fontSize: theme.font.h5,
						color: theme.color.intro,
						position: 'relative',
						verticalAlign: 'top',
					})}
				>
					<div
						css={{
							position: 'absolute',
							left: '-1.5em',
							display: 'flex',
							alignItems: 'flex-end',
							height: '100%',
						}}
					>
						<Icon icon={chevronLeft} />
					</div>
					James Costian's Blog
				</Link>
			</div>
		</header>
	)
}
