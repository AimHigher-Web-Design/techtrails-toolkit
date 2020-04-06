require('dotenv').config()

module.exports = {
	siteMetadata: {
		title: "Tech Trails Toolkit",
		siteUrl: process.env.SITE_URL,
		description: '',
	},
	plugins: [
		'gatsby-plugin-sass',
		{
			resolve: 'gatsby-plugin-react-svg',
			options: {
				include: `./src/img`,
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/img`,
				name: 'images',
			},
		},
		{
			resolve: `gatsby-plugin-google-tagmanager`,
			options: {
				id: 'GTM-5FC94SL',
				includeInDevelopment: true,
			},
		},
		`gatsby-plugin-sharp`,
		`gatsby-transformer-sharp`,
		// {
		// 	resolve: `gatsby-source-wordpress`,
		// 	options: {
		// 		baseUrl: process.env.WP_URL,
		// 		protocol: process.env.WP_PROTOCOL,
		// 		hostingWPCOM: false,
		// 		useACF: true,
		// 		verboseOutput: true,
		// 		concurrentRequests: 5,
		// 		includedRoutes: [
		// 			'**/*/*/menus',
		// 			'**/*/*menu-locations',
		// 			'**/*/*/posts',
		// 			'**/*/*/pages',
		// 			'**/*/*/media',
		// 			'**/*/*/categories',
		// 			'**/*/*/careers',
		// 		],
		// 		searchAndReplaceContentUrls: {
		// 			sourceUrl: 'wptoolkit.techtrails.org.au',
		// 			replacementUrl: 'toolkit.techtrails.org.au',
		// 		},
		// 	},
		// },
		{
			resolve: `gatsby-source-graphql`,
			options: {
			  typeName: `WPGraphQL`,
			  fieldName: `wpgraphql`,
			  url: `http://techtrails.local/graphql`,
			  refetchInterval: 300,
			},
		},
		`gatsby-plugin-react-helmet`,
		{
			resolve: 'gatsby-plugin-html-attributes',
			options: {
				lang: 'en',
			},
		},		
	],
};
