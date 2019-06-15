import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import Header from "../components/Header";
import Footer from "../components/Footer/Footer";
import "./index.scss";
import "whatwg-fetch";
import "babel-polyfill";

class TemplateWrapper extends Component {
	constructor(props) {
		super(props);

		this.setHeaderContent = this.setHeaderContent.bind(this);

		this.state = {
			headerContent: {},
		};
	}

	componentWillUpdate(nextProps) {
		// When we change pages, reset the header content
		if (this.props.location.pathname !== nextProps.location.pathname) {
			this.setHeaderContent({});
		}
	}

	setHeaderContent(content) {
		this.setState({
			headerContent: content,
		});
	}

	render() {
		const { data, children, history, location, maps } = this.props;
		const { mainMenu, footerMenu, socialMenu, footerPage } = data;

		const childProps = children.layoutProps
			? children.layoutProps
			: { history, location, maps };

		return (
			<div className="struct-container d-flex flex-column">
				<Helmet>
					<html lang="en" />
					<script>
						{`
					(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
					new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
					j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
					'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
					})(window,document,'script','dataLayer','GTM-P9LTX9X');
					`}
					</script>

					<script
						async
						src="https://www.googletagmanager.com/gtag/js?id=UA-114747149-1"
					/>
					<script>
						{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());

					gtag('config', 'UA-114747149-1');
					`}
					</script>
				</Helmet>
				<Header
					{...this.state.headerContent}
					imgAlt={data.site.siteMetadata.title}
					menuItems={mainMenu.edges[0].node}
				/>
				<main className="py-4 dotty-bg d-flex flex-column">
					{children({ ...childProps, setHeaderContent: this.setHeaderContent })}
				</main>
				<Footer
					footerMenu={footerMenu.edges[0].node}
					socialMenu={socialMenu.edges[0].node}
					footerContent={footerPage.content}
				/>
			</div>
		);
	}
}

TemplateWrapper.propTypes = {
	children: PropTypes.func,
	data: PropTypes.object,
	history: PropTypes.object,
	location: PropTypes.object,
	maps: PropTypes.object,
};

export default TemplateWrapper;

export const pageQuery = graphql`
	fragment menuFields on wordpress__wp_api_menus_menus_itemsConnection {
		edges {
			node {
				wordpress_id
				name
				count
				items {
					wordpress_id
					order
					title
					url
					object_slug
				}
			}
		}
	}

	query layoutQuery {
		site {
			id
			siteMetadata {
				title
			}
		}
		mainMenu: allWordpressWpApiMenusMenusItems(
			filter: { wordpress_id: { eq: 3 } }
		) {
			...menuFields
		}

		footerMenu: allWordpressWpApiMenusMenusItems(
			filter: { wordpress_id: { eq: 4 } }
		) {
			...menuFields
		}

		socialMenu: allWordpressWpApiMenusMenusItems(
			filter: { wordpress_id: { eq: 5 } }
		) {
			...menuFields
		}

		footerPage: wordpressPage(wordpress_id: { eq: 756 }) {
			content
		}
	}
`;
