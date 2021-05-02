import * as React from 'react'
import { Link, graphql, PageProps } from 'gatsby'
import { BlogPostsQuery } from '../../types/graphql-types'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import Bio from '../components/Bio'
import bioBreakpoints from '../components/Bio/breakpoints'
import { blogSectionId } from '../components/Bio/GoToBlog'
import BlogPostSummary, { Post } from '../components/BlogPostSummary'

export default function BlogIndex({ data, location }: PageProps<BlogPostsQuery>) {
	const siteTitle = data.site?.siteMetadata?.title ?? 'Loading...'
	const posts = data.allMarkdownRemark.nodes

	return (
		<Layout location={location} noHeader noFooter notMain>
			<Seo noTitleTemplate title={siteTitle} />
			<div
				css={(theme) => ({
					height: theme.fullHeightEvenOnMobile,
					[bioBreakpoints.sideBySide]: {
						display: 'flex',
					},
				})}
			>
				<header
					css={(theme) => ({
						height: theme.fullHeightEvenOnMobile,
						background: theme.color.bioBackground,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						// If the screen can handle these being side-by-side, then allow it to happen, but without letting this side get too big
						[bioBreakpoints.sideBySide]: {
							width: '35%',
							maxWidth: '400px',
						},
					})}
				>
					<Bio />
				</header>
				<div
					css={(theme) => ({
						// On mobile, if you use GoToBlog, it should feel like a whole other page, which requires the page to be big enough
						minHeight: theme.fullHeightEvenOnMobile,
						// If it's side by side, then let this side scroll while allowing the left side to remain visible at all times
						[bioBreakpoints.sideBySide]: {
							height: theme.fullHeightEvenOnMobile,
							flex: 1,
							overflowY: 'auto',
						},
					})}
				>
					<main
						css={(theme) => ({
							...theme.blogContainer,
							// Have the same amount of vertical spacing as the horizontal spacing being applied by blogContainer
							padding: `${theme.blogContainerSidePadding} 0`,
						})}
					>
						<h1
							id={blogSectionId}
							css={(theme) => ({
								color: theme.color.secondary,
								// In order to achieve the exact same amount of vertical spacing as horizontal spacing applied by blogContainer, you need to minimize extraneous spacing here
								marginTop: 0,
								lineHeight: 1,
							})}
						>
							Blog Posts
						</h1>
						<ol css={{ listStyle: 'none' }}>
							{posts.map((post) => (
								<BlogPostSummary post={post as Post} />
							))}
						</ol>
					</main>
				</div>
			</div>
		</Layout>
	)
}

export const homePageQuery = graphql`
	query BlogPosts {
		site {
			siteMetadata {
				title
			}
		}
		allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
			nodes {
				excerpt
				fields {
					slug
				}
				frontmatter {
					date(formatString: "MMMM DD, YYYY")
					title
					description
				}
			}
		}
	}
`
