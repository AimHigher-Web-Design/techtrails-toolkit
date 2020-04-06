/* eslint-disable template-curly-spacing */
const _ = require(`lodash`),
	Promise = require(`bluebird`),
	path = require(`path`),
	slash = require(`slash`)


exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions
	return new Promise((resolve, reject) => {
		// ==== PAGES (WORDPRESS NATIVE) ====
		graphql(
			`
				{
					wpgraphql {
						pages(first: 100) {
						  edges {
							node {
							  id
							  slug
							  status
							  pageId
							}
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
			let pageTemplate = path.resolve(`./src/templates/page.js`)
			_.each(result.data.wpgraphql.pages.edges, edge => {
				let slug = edge.node.slug

				createPage({
					path: `/${slug}/`,
					component: slash(pageTemplate),
					context: {
						id: edge.node.id,
					},
				})
				resolve()
			})
		})
		.catch(err => {
			console.log(err)
		})
		// ==== END PAGES ====
	})
}
