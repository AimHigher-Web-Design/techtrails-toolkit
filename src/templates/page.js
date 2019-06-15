import React, { Component } from "react";
import {graphql} from 'gatsby'
import Helmet from "react-helmet";

class PageTemplate extends Component {
	render() {
		const siteMetadata = this.props.data.site.siteMetadata;
		const currentPage = this.props.data.wordpressPage;

		const { metadesc } = this.props.data.wordpressPage.yoast;

		return (
			<div className="container">
				<Helmet>
					<html lang="en" />
					<meta name="description" content={metadesc} />
				</Helmet>
				<h1 dangerouslySetInnerHTML={{ __html: currentPage.title }} />
				<div dangerouslySetInnerHTML={{ __html: currentPage.content }} />
			</div>
		);
	}
}

export default PageTemplate;

export const pageQuery = graphql`
	query currentPageQuery($id: String!) {
		wordpressPage(id: { eq: $id }) {
			title
			content
			date(formatString: "MMMM DD, YYYY")
			wordpress_id

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
