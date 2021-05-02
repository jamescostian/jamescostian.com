import * as React from 'react'
import { Icon } from '@iconify/react'
import expandMore from '@iconify/icons-ic/expand-more'
import breakpoints from './breakpoints'
import { css, useTheme } from '@emotion/react'

export const blogSectionId = 'posts'
export const scrollToBlog = (event?: { preventDefault(): void }) => {
	scrollTo({
		left: 0,
		top: document.getElementById(blogSectionId)?.offsetTop,
		behavior: 'smooth',
	})
	if (event) event.preventDefault()
}

export default function GoToBlog() {
	const theme = useTheme()
	const linkStyles = css({
		fontSize: theme.font.h6,
		display: 'block',
		// Provide some visual separation between this link and the icon below it
		marginBottom: `calc(${theme.paragraphSpacing} / 4)`,
		// Undo the typical <a> styling
		textDecoration: 'none',
	})
	return (
		<div
			css={{
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				// You don't need to see any of this GoToBlog component if it's already visible to you on the other side of your screen
				[breakpoints.sideBySide]: {
					display: 'none',
				},
			}}
		>
			<a href={`#${blogSectionId}`} onClick={scrollToBlog} css={[linkStyles]}>
				Blog
			</a>
			<a
				href={`#${blogSectionId}`}
				onClick={scrollToBlog}
				css={[
					linkStyles,
					// The icon has some unwanted vertical spacing; pretend it's not there
					{ margin: '-1.5rem 0' },
				]}
			>
				<Icon icon={expandMore} width="3.5rem" />
			</a>
		</div>
	)
}
