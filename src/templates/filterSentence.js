import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

class PageTemplate extends Component {
	render() {
		const careers = this.props.data.wpgraphql.careers.edges

		console.log(this.props.data)
		
		return (
			<Layout>
				<h1>Filtered Page</h1>
				<ul>
					{careers.map(c => (
						<li>{c.node.title}</li>
					))}
				</ul>
			</Layout>
		)
	}
}

export default PageTemplate

export const pageQuery = graphql`
	query($id: ID!, $careers: [String]!) {
		wpgraphql {
			sentence(id: $id) {
				slug
				title(format: RENDERED)
			}
			careers(where: {nameIn: $careers}) {
				edges {
					node {
						slug
						title
					}
				}
			}
		}
	}
`