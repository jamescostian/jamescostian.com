import * as React from 'react'
import { PageProps } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/Seo'

export default function NotFoundPage({ location }: PageProps) {
	return (
		<Layout location={location}>
			<Seo title="404: Not Found" />
			<h1>404: Not Found</h1>
			<p>You just hit a route that doesn&#39;t exist... the sadness.</p>
		</Layout>
	)
}
