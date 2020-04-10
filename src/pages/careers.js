import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import FilterLayout from '../components/filterPage'


class PageTemplate extends Component {
	render() {
		const careers = this.props.data.wpgraphql.careers.edges,
		data = {
			jobs: careers,
			title: 'All Careers'
		}
		
		return (
			<Layout>
				<FilterLayout {...data}>
					<h2>Job filters appear here</h2>
				</FilterLayout>
			</Layout>
		)
	}
}

export default PageTemplate

export const pageQuery = graphql`
	query {
		wpgraphql {
			careers {
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