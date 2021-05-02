import * as React from 'react'
import { graphql, PageProps, withPrefix } from 'gatsby'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import { BlogPostBySlugQuery } from '../../types/graphql-types'
import BlogPostNavigator from '../components/BlogPostNavigator'

export default function BlogPostTemplate({ data, location }: PageProps<BlogPostBySlugQuery>) {
	const post = data.markdownRemark
	const { previous, next } = data

	return (
		<Layout location={location}>
			<Seo
				title={post?.frontmatter?.title ?? ''}
				description={post?.frontmatter?.description || post?.excerpt || ''}
			/>
			<article itemScope itemType="http://schema.org/Article">
				<header>
					<h1
						itemProp="headline"
						css={(theme) => ({ margin: `0 0 ${theme.headingBottomSpacing} 0` })}
					>
						{post?.frontmatter?.title}
					</h1>
					<p css={(theme) => ({ fontSize: theme.font.h5, fontFamily: theme.font.headingFamily })}>
						{post?.frontmatter?.date}
					</p>
				</header>
				<section dangerouslySetInnerHTML={{ __html: post?.html ?? '' }} itemProp="articleBody" />
			</article>
			<nav css={{ margin: 0 }}>
				<ul
					css={(theme) => ({
						display: 'flex',
						flexWrap: 'wrap',
						justifyContent: 'space-between',
						listStyle: 'none',
						padding: 0,
						marginTop: theme.paragraphSpacing,
					})}
				>
					<li css={{ margin: 0 }}>
						{previous && (
							<BlogPostNavigator
								postPath={previous?.fields?.slug}
								postTitle={previous?.frontmatter?.title}
								direction="prev"
							/>
						)}
					</li>
					<li css={{ margin: 0 }}>
						{next && (
							<BlogPostNavigator
								postPath={withPrefix(`/blog/${next?.fields?.slug}`)}
								postTitle={next?.frontmatter?.title}
								direction="next"
							/>
						)}
					</li>
				</ul>
			</nav>
		</Layout>
	)
}

export const pageQuery = graphql`
	query BlogPostBySlug($id: String!, $previousPostId: String, $nextPostId: String) {
		markdownRemark(id: { eq: $id }) {
			id
			excerpt(pruneLength: 160)
			html
			frontmatter {
				title
				date(formatString: "MMMM DD, YYYY")
				description
			}
		}
		previous: markdownRemark(id: { eq: $previousPostId }) {
			fields {
				slug
			}
			frontmatter {
				title
			}
		}
		next: markdownRemark(id: { eq: $nextPostId }) {
			fields {
				slug
			}
			frontmatter {
				title
			}
		}
	}
`
