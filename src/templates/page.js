import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

class PageTemplate extends Component {
	render() {
		const currentPage = this.props.data.wpgraphql.page,
			meta = {
				name: currentPage.title,
				slug: currentPage.slug,
			}

		return (
			<Layout meta={meta}>
				<h1 dangerouslySetInnerHTML={{ __html: currentPage.title }} />
				<div className="content" dangerouslySetInnerHTML={{ __html: currentPage.content }} />
			</Layout>
		)
	}
}

export default PageTemplate

export const pageQuery = graphql`
	query($id: ID!) {
		wpgraphql {
			page(id: $id) {
				title
				content(format: RENDERED)
				slug
				pageId
			}
		}
	}
`
