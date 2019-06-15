import React, { Component } from "react";
import {graphql} from 'gatsby'
import PropTypes from "prop-types";
import Helmet from "react-helmet";

class PostTemplate extends Component {
	render() {
		const { wordpressPost } = this.props.data;

		const { metadesc } = wordpressPost.yoast;

		return (
			<div>
				<Helmet>
					<html lang="en" />
					<meta name="description" content={metadesc} />
				</Helmet>
				<h1 dangerouslySetInnerHTML={{ __html: wordpressPost.title }} />
				<div dangerouslySetInnerHTML={{ __html: wordpressPost.content }} />
			</div>
		);
	}
}

PostTemplate.propTypes = {
	data: PropTypes.object.isRequired,
	edges: PropTypes.array,
};

export default PostTemplate;

export const pageQuery = graphql`
	query currentPostQuery($id: String!) {
		wordpressPost(id: { eq: $id }) {
			title
			content

			yoast {
				metadesc
			}
		}
		site {
			siteMetadata {
				title
			}
		}
	}
`;
