import * as React from 'react'
import linkedIn from '@iconify-icons/jam/linkedin'
import gitHub from '@iconify-icons/jam/github'
import snapchat from '@iconify-icons/jam/snapchat'
import instagram from '@iconify-icons/jam/instagram'
import Icon from '@iconify/react'

const height = 50

export default function SocialIcons() {
	return (
		<p
			css={{
				display: 'flex',
				justifyContent: 'space-between',
				// Prevent the icons from taking up extra vertical space
				lineHeight: 1,
				// The icons contain 8% padding on each side of them, causing this component to look off-center. The following fixes that
				marginLeft: `-${height * 0.08}px`,
				marginRight: `-${height * 0.08}px`,
				width: `calc(100% + ${height * 0.16}px)`,
			}}
		>
			<a href="https://github.com/jamescostian" title="GitHub">
				<Icon icon={gitHub} height={height} />
			</a>
			<a href="https://www.linkedin.com/in/jamescostian" title="LinkedIn">
				<Icon icon={linkedIn} height={height} />
			</a>
			<a href="https://www.snapchat.com/add/jamescostian" title="Snapchat">
				<Icon icon={snapchat} height={height} />
			</a>
			<a href="https://www.instagram.com/jamescostian/" title="Instagram">
				<Icon icon={instagram} height={height} />
			</a>
		</p>
	)
}
