const _ = require("lodash");
const Promise = require("bluebird");
const path = require("path");
const slash = require("slash");
const FileExists = require("file-exists");
const extractTextWebpackPlugin = require("extract-text-webpack-plugin");

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
// Will create pages for Wordpress pages (route : /{slug})
// Will create pages for Wordpress posts (route : /post/{slug})
exports.createPages = ({ graphql, boundActionCreators }) => {
	const { createPage } = boundActionCreators;
	return new Promise((resolve, reject) => {
		// The “graphql” function allows us to run arbitrary
		// queries against the local Wordpress graphql schema. Think of
		// it like the site has a built-in database constructed
		// from the fetched data that you can run queries against.

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
					console.log(result.errors);
					reject(result.errors);
				}

				// We want to create a detailed page for each
				// page node. We follow the same selection process as Wordpress' own
				// template hierarchy. If a page-{slug}.js exists, use that. If not,
				// try page-{id}.js. otherwise fall back to page.js.
				_.each(result.data.allWordpressPage.edges, edge => {
					let pageTemplate;
					const baseLoc = "./src/templates/page-";
					const baseEnd = ".js";

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

					// next find out if a page-{id}.js exists
					if (
						!pageTemplate &&
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

					// fall back to default of page.js
					if (!pageTemplate) {
						console.log(
							edge.node.wordpress_id + ": ./src/templates/page.js selected"
						);
						pageTemplate = path.resolve("./src/templates/page.js");
					}

					// Gatsby uses Redux to manage its internal state.
					// Plugins and sites can use functions like "createPage"
					// to interact with Gatsby.
					createPage({
						// Each page is required to have a `path` as well
						// as a template component. The `context` is
						// optional but is often necessary so the template
						// can query data specific to each page.
						path: `/${edge.node.slug}/`,
						component: slash(pageTemplate),
						context: {
							id: edge.node.id,
						},
					});
				});
			})
			.then(() => {
				// ==== POSTS (WORDPRESS NATIVE AND ACF) ====
				graphql(
					`
						{
							allWordpressPost {
								edges {
									node {
										id
										slug
										title
										content
									}
								}
							}
						}
					`
				).then(result => {
					if (result.errors) {
						console.log(result.errors);
						reject(result.errors);
					}
					const postTemplate = path.resolve(`./src/templates/post.js`);
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
						});
					});
					resolve();
				});
			});
	});
};

// This is temporary until the following issue is closed
// https://github.com/gatsbyjs/gatsby/issues/1347
// I have subscribed to the issue on GitHub and will adjust accordingly
exports.modifyWebpackConfig = ({ config, stage }) => {
	config.merge({
		postcss(wp) {
			return [require("postcss-cssnext")()];
		},
	});

	if (stage === "build-css") {
		config.removeLoader("sass");
		config.loader("sass", {
			test: /\.(sass|scss)/,
			exclude: /\.module\.(sass|scss)$/,
			loader: extractTextWebpackPlugin.extract([
				"css?minimize",
				"postcss",
				"sass",
			]),
		});
	}

	if (stage === "develop") {
		config.removeLoader("sass");
		config.loader("sass", {
			test: /\.(sass|scss)/,
			exclude: /\.module\.(sass|scss)$/,
			loaders: ["style", "css?sourceMap", "postcss", "sass?sourceMap"],
		});
	}

	return config;
};
