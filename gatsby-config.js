require('dotenv').config()

module.exports = {
	siteMetadata: {
		title: "Tech Trails Toolkit",
		siteUrl: process.env.SITE_URL,
	},
	plugins: [
		"gatsby-plugin-react-helmet",
		"gatsby-plugin-glamor",
		{
			resolve: `gatsby-source-wordpress`,
			options: {
				baseUrl: process.env.WP_URL,
				protocol: process.env.WP_PROTOCOL,
				hostingWPCOM: false,
				useACF: true,
				verboseOutput: true,
				concurrentRequests: 5,
				includedRoutes: [
					'**/*/*/menus',
					'**/*/*menu-locations',
					'**/*/*/posts',
					'**/*/*/pages',
					'**/*/*/media',
					'**/*/*/categories',
					'**/*/*/careers',
				],
				searchAndReplaceContentUrls: {
					sourceUrl: 'wptoolkit.techtrails.org.au',
					replacementUrl: 'toolkit.techtrails.org.au',
				},
			},
		},
		{
			resolve: "gatsby-plugin-sass",
			options: {
				precision: 6,
			},
		},
		{
			resolve: `gatsby-plugin-google-tagmanager`,
			options: {
				id: 'GTM-5FC94SL',
				includeInDevelopment: true,
			},
		},
	],
};
