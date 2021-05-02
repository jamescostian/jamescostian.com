import * as React from 'react'
import { Link } from 'gatsby'

export type BlogPostNavigatorProps = {
	postPath?: string | null
	postTitle?: string | null
	direction: 'next' | 'prev'
}

export default function BlogPostNavigator({
	postPath,
	postTitle,
	direction,
}: BlogPostNavigatorProps) {
	const postTitleWithArrow = direction === 'next' ? `${postTitle} →` : `← ${postTitle}`
	return (
		<Link
			to={postPath ?? '/'}
			rel={direction}
			css={(theme) => ({
				display: 'block',
				border: `1px solid ${theme.color.lightText}`,
				padding: `calc(${theme.paragraphSpacing} / 2)`,
				borderRadius: `calc(${theme.paragraphSpacing} / 2)`,
				textAlign: direction === 'next' ? 'left' : 'right',
			})}
		>
			<span
				css={(theme) => ({
					color: theme.color.lightText,
					textDecoration: 'none',
					display: 'inline-block', // Needed for textDecoration: 'none' to work
				})}
			>
				{direction === 'next' ? 'Next' : 'Previous'} post
			</span>
			<br />
			{postTitleWithArrow}
		</Link>
	)
}
