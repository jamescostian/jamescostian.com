import { Theme } from '@emotion/react'

const blogContainerSidePadding = '10%'

const theme: Theme = {
	remSize: 19, // in px
	color: {
		text: '#ffffff',
		lightText: '#b7b7b7',
		heading: '#59c4f9',
		primary: '#00ff9f',
		secondary: '#f26b6b',

		blogBackground: '#264160',

		bioBackground: '#e0eaea',

		intro: '#8a7761',
		introPrimary: '#298cbd',
	},
	font: {
		family: 'Source Sans Pro',
		headingFamily: 'Source Sans Pro',
		h1: '2.5rem',
		h2: '2.1rem',
		h3: '1.75rem',
		h4: '1.45rem',
		h5: '1.2rem',
		h6: '1rem',
	},
	lineHeight: {
		small: 1.1,
		medium: 1.5,
		large: 1.625,
	},

	paragraphSpacing: '1rem',
	headingTopSpacing: '1.5rem',
	headingBottomSpacing: '0.75rem',

	blogContainer: {
		width: `calc(100% - 2 * ${blogContainerSidePadding})`,
		maxWidth: '1200px',
		margin: '0 auto',
	},
	blogContainerSidePadding,

	// Mobile browsers have a URL bar and other UI that the browser has which they hide as you scroll down.
	// Simply using 100vh doesn't work, because browsers don't want 100vh to represent the full height, otherwise as you scroll down they'd need to do a lot of animation.
	// The following forces browsers to really provide the full height
	fullHeightEvenOnMobile: 'calc(100vh - calc(100vh - 100%))',
}

export default theme

export const globalStyles = {
	// Allow pages to use 'height: 100%'
	'html, body, #___gatsby, #gatsby-focus-wrapper': {
		height: '100%',
	},

	// General HTML styles
	'*, :after, :before': {
		boxSizing: 'border-box',
	},
	html: {
		margin: '0',
		padding: '0',
		lineHeight: theme.lineHeight.medium,
		fontSize: `${theme.remSize}px`,
		WebkitFontSmoothing: 'antialiased',
		MozOsxFontSmoothing: 'grayscale',
	},
	body: {
		margin: '0',
		padding: '0',
		fontFamily: theme.font.family,
		fontSize: theme.font.h6,
		color: theme.color.text,
		background: theme.color.blogBackground,
	},

	footer: {
		padding: `${theme.headingBottomSpacing} 0`,
	},

	hr: {
		background: theme.color.secondary,
		height: '1px',
		border: '0',
	},

	// Headings
	'h1, h2, h3, h4, h5, h6': {
		color: theme.color.heading,
		fontFamily: theme.font.headingFamily,
		marginTop: theme.headingTopSpacing,
		marginBottom: theme.headingBottomSpacing,
		lineHeight: theme.lineHeight.small,
		letterSpacing: '-0.025em',
	},
	'h2, h3, h4, h5, h6': {
		fontWeight: 'bold',
	},
	h1: {
		fontWeight: 900,
		fontSize: theme.font.h1,
	},
	h2: {
		fontSize: theme.font.h2,
	},
	h3: {
		fontSize: theme.font.h3,
	},
	h4: {
		fontSize: theme.font.h4,
	},
	h5: {
		fontSize: theme.font.h5,
	},
	h6: {
		fontSize: theme.font.h6,
	},

	// Content
	p: {
		lineHeight: theme.lineHeight.large,
		margin: '0 0 0 0',
		padding: '0',
	},

	'ul, ol': {
		margin: '0',
		padding: '0',
		listStylePosition: 'inside',
		listStyleImage: 'none',
	},
	'p + *': {
		marginTop: theme.paragraphSpacing,
	},
	'ul + *, ol + *': {
		marginTop: theme.paragraphSpacing,
	},
	'ul li, ol li': {
		paddingLeft: '0',
		marginBottom: `calc(${theme.paragraphSpacing} / 2)`,
	},
	'li > p': {
		marginBottom: `calc(${theme.paragraphSpacing} / 2)`,
		// Needed for Firefox to work properly when listStylePosition is set to inside. See https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-position
		display: 'inline',
	},
	'li *:last-child': {
		marginBottom: '0',
	},
	'li > ul': {
		marginLeft: theme.paragraphSpacing,
		marginTop: `calc(${theme.paragraphSpacing} / 2)`,
	},

	blockquote: {
		color: theme.color.lightText,
		marginLeft: '0',
		marginRight: theme.paragraphSpacing,
		padding: `0 0 0 ${theme.headingBottomSpacing}`,
		borderLeft: `.25rem solid ${theme.color.primary}`,
		fontSize: theme.font.h5,
		fontStyle: 'italic',
	},
	'blockquote + *': {
		marginTop: theme.paragraphSpacing,
	},
	'blockquote > :last-child': {
		marginBottom: '0',
	},
	'@media (min-width: 42rem)': {
		blockquote: {
			padding: `0 0 0 ${theme.headingBottomSpacing}`,
			marginLeft: `calc(-1 * ${theme.headingBottomSpacing})`,
		},
		'ul, ol': {
			listStylePosition: 'outside',
		},
		'blockquote > ul, blockquote > ol': {
			listStylePosition: 'inside',
		},
	},

	table: {
		width: '100%',
		borderCollapse: 'collapse',
		borderSpacing: '0.25rem',
	},
	'table + *': {
		marginTop: theme.paragraphSpacing,
	},
	'table thead tr th': {
		borderBottom: `1px solid ${theme.color.secondary}`,
	},

	a: {
		color: theme.color.primary,
	},
	'a:hover, a:focus': {
		textDecoration: 'none',
	},

	// Syntax highlighting styles
	// See https://www.gatsbyjs.com/plugins/gatsby-remark-prismjs/
	'.gatsby-highlight': {
		marginBottom: theme.paragraphSpacing,
	},
} as const
