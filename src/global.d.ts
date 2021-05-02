/// <reference types="@emotion/react/types/css-prop" />
import { CSSObject } from '@emotion/react'

declare module '@emotion/react' {
	export interface Theme {
		remSize: number

		color: {
			text: string
			lightText: string
			heading: string
			primary: string
			secondary: string

			blogBackground: string

			bioBackground: string

			intro: string
			introPrimary: string
		}
		font: {
			family: string
			headingFamily: string
			h1: string
			h2: string
			h3: string
			h4: string
			h5: string
			h6: string
		}
		lineHeight: {
			small: number
			medium: number
			large: number
		}

		paragraphSpacing: string
		headingTopSpacing: string
		headingBottomSpacing: string

		blogContainer: CSSObject
		blogContainerSidePadding: string

		fullHeightEvenOnMobile: string
	}
}
