/* eslint-disable template-curly-spacing */
const _ = require(`lodash`),
	Promise = require(`bluebird`),
	path = require(`path`),
	slash = require(`slash`),
	FileExists = require("file-exists")


exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions
	return new Promise((resolve, reject) => {
		// ==== PAGES (WORDPRESS NATIVE) ====
		graphql(
			`
				{
					allWordpressPage {
						edges {
							node {
								id
								wordpress_id
								title
								content
								excerpt
								date
								modified
								slug
								status
							}
						}
					}
				}
			`
		)
			.then(result => {
				if (result.errors) {
					console.log(result.errors)
					reject(result.errors)
				}

				// Create Page pages.
				
				// We want to create a detailed page for each
				// page node. We'll just use the Wordpress Slug for the slug.
				// The Page ID is prefixed with 'PAGE_'
				_.each(result.data.allWordpressPage.edges, edge => {
					// Gatsby uses Redux to manage its internal state.
					// Plugins and sites can use functions like "createPage"
					// to interact with Gatsby.
					let pageTemplate = path.resolve(`./src/templates/page.js`)

					const baseLoc = "./src/templates/page-",
						baseEnd = ".js";

					// find out if a page-{slug}.js exists
					if (FileExists.sync(baseLoc + edge.node.slug + baseEnd)) {
						console.log(
							edge.node.wordpress_id +
								": " +
								baseLoc +
								edge.node.slug +
								baseEnd +
								" selected"
						);
						pageTemplate = path.resolve(baseLoc + edge.node.slug + baseEnd);
					}
					else if (
						FileExists.sync(baseLoc + edge.node.wordpress_id + baseEnd)
					) {
						console.log(
							edge.node.wordpress_id +
								": " +
								baseLoc +
								edge.node.wordpress_id +
								baseEnd +
								" selected"
						);
						pageTemplate = path.resolve(
							baseLoc + edge.node.wordpress_id + baseEnd
						);
					}

					createPage({
						// Each page is required to have a `path` as well
						// as a template component. The `context` is
						// optional but is often necessary so the template
						// can query data specific to each page.
						path: `/${edge.node.slug}/`,
						component: slash(pageTemplate),
						context: {
							id: edge.node.id
						},
					})
					resolve()
				})
			})
			// ==== END PAGES ====

			// ==== POSTS (WORDPRESS NATIVE AND ACF) ====
			.then(() => {
				graphql(
					`
						{
							allWordpressPost {
								edges {
									node {
										id
										slug
									}
								}
							}
						}
					`
				).then(result => {
					if (result.errors) {
						console.log(result.errors)
						reject(result.errors)
					}
					const postTemplate = path.resolve(`./src/templates/post.js`)
					// We want to create a detailed page for each
					// post node. We'll just use the Wordpress Slug for the slug.
					// The Post ID is prefixed with 'POST_'
					_.each(result.data.allWordpressPost.edges, edge => {
						createPage({
							path: edge.node.slug,
							component: slash(postTemplate),
							context: {
								id: edge.node.id,
							},
						})
					})
					resolve()
				})
			})
			// ==== END POSTS ====
	})
}
