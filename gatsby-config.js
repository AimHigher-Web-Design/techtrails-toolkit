const env = process.env.DEPLOY_ENV || "dev";
require("dotenv").config({ path: `./.env.${env}` });

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
				baseUrl: `${process.env.WORDPRESS_URL}`,
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
