import * as React from 'react'
import { Helmet, HelmetProps } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

type SeoProps = {
	title: string
	noTitleTemplate?: boolean
	description?: string
	meta?: HelmetProps['meta']
}

export default function Seo({ title, noTitleTemplate = false, description, meta = [] }: SeoProps) {
	const { site } = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						title
						description
					}
				}
			}
		`
	)

	const metaDescription = description || site.siteMetadata.description
	const defaultTitle = site.siteMetadata?.title

	return (
		<Helmet
			htmlAttributes={{
				lang: 'en-US',
			}}
			title={title}
			titleTemplate={defaultTitle && !noTitleTemplate ? `%s | ${defaultTitle}` : undefined}
			meta={[
				{
					name: `description`,
					content: metaDescription,
				},
				{
					property: `og:title`,
					content: title,
				},
				{
					property: `og:description`,
					content: metaDescription,
				},
				{
					property: `og:type`,
					content: `website`,
				},
				{
					name: `twitter:card`,
					content: `summary`,
				},
				{
					name: `twitter:creator`,
					content: 'jamescostian',
				},
				{
					name: `twitter:title`,
					content: title,
				},
				{
					name: `twitter:description`,
					content: metaDescription,
				},
				...meta,
			]}
		/>
	)
}
