import * as React from 'react'
import { Link, withPrefix } from 'gatsby'

export type Post = {
	excerpt: string
	frontmatter: {
		title: string
		description: string
		date: string
	}
	fields: {
		slug: string
	}
}

export default function BlogPostSummary({ post }: { post: Post }) {
	const title = post.frontmatter.title || post.fields.slug
	return (
		<li key={post.fields.slug}>
			<article
				itemScope
				itemType="http://schema.org/Article"
				css={(theme) => ({
					marginBottom: theme.paragraphSpacing,
					marginTop: theme.paragraphSpacing,
				})}
			>
				<header css={(theme) => ({ marginBottom: theme.headingBottomSpacing })}>
					<h3
						css={(theme) => ({
							fontWeight: 'normal',
							marginBottom: `calc(${theme.paragraphSpacing} / 2)`,
							marginTop: '0',
						})}
					>
						<Link to={withPrefix(`/blog/${post.fields.slug}`)} itemProp="url">
							<span itemProp="headline">{title}</span>
						</Link>
					</h3>
					<small>{post.frontmatter.date}</small>
				</header>
				<section>
					<p
						dangerouslySetInnerHTML={{
							__html: post.frontmatter.description || post.excerpt || '',
						}}
						itemProp="description"
						css={{ marginBottom: 0 }}
					/>
				</section>
			</article>
		</li>
	)
}
