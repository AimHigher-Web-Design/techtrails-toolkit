import React, { Component } from "react";
import Helmet from "react-helmet";
import HelpfulLinks from "../components/HelpfulLinks";

class PageTemplate extends Component {
	render() {
		const siteMetadata = this.props.data.site.siteMetadata;
		const currentPage = this.props.data.wordpressPage;

		let pageSpecificComponent = null;

		if (this.props.data.wordpressPage.acf) {
			pageSpecificComponent = (
				<HelpfulLinks data={this.props.data.wordpressPage.acf} />
			);
		}

		const { metadesc } = currentPage.yoast;

		return (
			<div className="container">
				<Helmet>
					<html lang="en" />
					<meta name="description" content={metadesc} />
				</Helmet>
				<h1 dangerouslySetInnerHTML={{ __html: currentPage.title }} />
				<div dangerouslySetInnerHTML={{ __html: currentPage.content }} />
				<div className="offset-margins">{pageSpecificComponent}</div>
			</div>
		);
	}
}

export default PageTemplate;

export const pageQuery = graphql`
	query helpfulLinkQuery($id: String!) {
		wordpressPage(id: { eq: $id }) {
			title
			content
			date(formatString: "MMMM DD, YYYY")
			wordpress_id
			acf {
				resources {
					resource_name
					image
					resource_link
					resource_type
				}
			}
			yoast {
				metadesc
			}
		}
		site {
			id
			siteMetadata {
				title
			}
		}
	}
`;
