import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

class PageTemplate extends Component {
	render() {
		const currentPage = this.props.data.wordpressPage,
			meta = {
				name: currentPage.title,
				slug: this.props.location.pathname,
			}

		return (
			<Layout meta={meta}>
				<h1 dangerouslySetInnerHTML={{ __html: currentPage.title }} />
				<div className="content" dangerouslySetInnerHTML={{ __html: content }} />
			</Layout>
		)
	}
}

export default PageTemplate

export const pageQuery = graphql`
	query($id: String!, $customMenu: String!) {
		wordpressPage(id: { eq: $id }) {
			title
			content
			slug
			wordpress_id
		}
	}
`
