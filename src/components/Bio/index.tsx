import * as React from 'react'
import { withPrefix } from 'gatsby'
import SocialIcons from './SocialIcons'
import GoToBlog from './GoToBlog'
import breakpoints from './breakpoints'
import { css, useTheme } from '@emotion/react'

const notBold = css({ fontWeight: 'normal' })
const portraitWidth = css({
	width: '70%',
	maxWidth: '260px',
})

export default function Bio() {
	const theme = useTheme()
	const introText = css({
		margin: 0,
		paddingLeft: '2vw',
		paddingRight: '2vw',
		textAlign: 'center',
		color: theme.color.intro,
	})
	const bigIntroText = css({
		color: theme.color.introPrimary,
		// This looks VISUALLY centered due to all the lower case letters in my name and the upper case letters in the next line
		paddingTop: '.5vmin',
		paddingBottom: '1vmin',
	})
	return (
		<div
			css={(theme) => ({
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				'> * + *': {
					marginTop: theme.headingTopSpacing,
				},
				a: {
					color: theme.color.introPrimary,
				},
			})}
		>
			<div>
				<h4 css={[introText, notBold]}>Hi! My name is</h4>
				<h2 css={[introText, bigIntroText]}>James Costian</h2>
				<h4 css={[introText, notBold]}>
					I'm a Web Developer in
					<wbr /> Tampa, FL
					<wbr /> with a <a href="https://beanscostian.com">very cute cat</a>
				</h4>
			</div>
			<img
				src={withPrefix('/images/me.jpg')}
				alt="My portrait"
				css={[
					portraitWidth,
					{
						display: 'none',
						borderRadius: '5vmin',
						[breakpoints.showPortrait]: {
							display: 'inline-block',
						},
					},
				]}
			/>
			<div css={portraitWidth}>
				<nav
					css={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-evenly',
					}}
				>
					<SocialIcons />
					<GoToBlog />
				</nav>
			</div>
		</div>
	)
}
