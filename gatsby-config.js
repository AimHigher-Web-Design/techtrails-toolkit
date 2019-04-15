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
				baseUrl: `wptoolkit.techtrails.org.au`,
				protocol: "https",
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
