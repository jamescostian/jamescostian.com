module.exports = {
	siteMetadata: {
		title: 'James Costian',
		description: 'James Costian',
		siteUrl: 'https://jamescostian.com',
	},
	flags: {
		DEV_SSR: false,
	},
	plugins: [
		'gatsby-plugin-image',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/content/blog`,
				name: 'blog',
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'images',
				path: `${__dirname}/src/images`,
			},
		},
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 630,
						},
					},
					{
						resolve: 'gatsby-remark-responsive-iframe',
						options: {
							wrapperStyle: 'margin-bottom: 1.0725rem',
						},
					},
					{
						resolve: 'gatsby-remark-prismjs',
						options: {
							noInlineHighlight: false,
						},
					},
					'gatsby-remark-copy-linked-files',
					'gatsby-remark-smartypants',
				],
			},
		},
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		{
			resolve: 'gatsby-plugin-feed',
			options: {
				query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
				feeds: [
					{
						serialize: ({ query: { site, allMarkdownRemark } }) => {
							return allMarkdownRemark.nodes.map((node) => {
								const url = `${site.siteMetadata.siteUrl}/blog/${node.fields.slug}`
								return Object.assign({}, node.frontmatter, {
									description: node.excerpt,
									date: node.frontmatter.date,
									url,
									guid: url,
									custom_elements: [{ 'content:encoded': node.html }],
								})
							})
						},
						query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
						output: '/rss.xml',
					},
				],
			},
		},
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: 'JamesCostian.com',
				short_name: 'JamesCostian',
				start_url: '/',
				background_color: '#e0eaea',
				theme_color: '#3090C0',
				display: 'minimal-ui',
				icon: 'src/images/me.jpg', // This path is relative to the root of the site.
			},
		},
		'gatsby-plugin-react-helmet',
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// 'gatsby-plugin-offline',
		{
			resolve: 'gatsby-plugin-google-fonts',
			options: {
				fonts: ['source sans pro:300,400,400i,600'],
				display: 'swap',
			},
		},
		'gatsby-plugin-emotion',
		{
			resolve: 'gatsby-plugin-ts',
			options: {
				tsLoader: {
					logLevel: 'warn',
				},
				forkTsCheckerPlugin: {
					eslint: true,
				},
				fileName: 'types/graphql-types.ts',
			},
		},
		// Nicer plugin, but broken with Gatsby 3.
		// Issue: https://github.com/cometkim/gatsby-plugin-typegen/issues/113
		// PR: https://github.com/cometkim/gatsby-plugin-typegen/pull/138
		// {
		// 	resolve: 'gatsby-plugin-typegen',
		// 	options: {
		// 		emitSchema: {
		// 			'src/__generated__/gatsby-schema.graphql': true,
		// 			'src/__generated__/gatsby-introspection.json': true,
		// 		},
		// 		emitPluginDocuments: {
		// 			'src/__generated__/gatsby-plugin-documents.graphql': true,
		// 		},
		// 	},
		// },
		//
		// Also allows you to use the GraphQL VS Code extension if you create a graphql.config.js file like this:
		// 	module.exports = {
		// 		schema: ['gatsby-schema.graphql'],
		// 		documents: ['src/__generated__/gatsby-plugin-documents.graphql'],
		// 		extensions: {
		// 			endpoints: {
		// 				default: {
		// 					url: 'http://localhost:8000/___graphql',
		// 					headers: { 'user-agent': 'JS GraphQL' },
		// 					introspect: false,
		// 				},
		// 			},
		// 		},
		// 	}
		//
		// Also works with ts-graphql-plugin, so you can add this to tsconfig.json:
		// 	"plugins": [
		// 		{
		// 			"name": "ts-graphql-plugin",
		// 			"schema": "src/__generated__/gatsby-schema.graphql",
		// 			"tag": "graphql"
		// 		}
		// 	]
	],
}
