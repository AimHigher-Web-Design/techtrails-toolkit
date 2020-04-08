import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import FilterLayout from '../components/filterPage'

class PageTemplate extends Component {
	render() {
		const careers = this.props.data.wpgraphql.careers.edges,
		data = {
			jobs: careers,
			title: this.props.data.wpgraphql.subject.title
		}

		console.log(data)
		
		return (
			<Layout>
				<FilterLayout {...data}>
					<div>Filtering stuff here</div>
				</FilterLayout>
			</Layout>
		)
	}
}

export default PageTemplate

export const pageQuery = graphql`
	query($id: ID!, $careers: [String]!) {
		wpgraphql {
			subject(id: $id) {
				slug
				title(format: RENDERED)
			}
			careers(where: {nameIn: $careers}) {
				edges {
					node {
						title
						commonWheelProperties {
							code
						}
						careerFields {
							featuredImage {
								sourceUrl(size: MEDIUM_LARGE)
							}
							links {
								label
								url
							}
							skills
							videoThumbnail {
								sourceUrl(size: MEDIUM)
							}
							videoUrl
						}
						content(format: RENDERED)
					}
				}
			}
		}
	}
`