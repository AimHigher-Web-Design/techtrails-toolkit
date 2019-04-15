module.exports = {
	siteMetadata: {
		title: "Tech Trails Toolkit",
	},
	plugins: [
		"gatsby-plugin-react-helmet",
		"gatsby-plugin-glamor",
		{
			resolve: "gatsby-source-wordpress",
			options: {
				baseUrl: `wp.toolkit.techtrails.org.au`,
				protocol: "http",
				hostingWPCOM: false,
				useACF: true,
				verboseOutput: true,
			},
		},
		{
			resolve: "gatsby-plugin-sass",
			options: {
				precision: 6,
			},
		},
	],
};
