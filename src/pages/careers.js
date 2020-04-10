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
				</FilterLayout>
			</Layout>
		)
	}
}

export default PageTemplate

export const pageQuery = graphql`
	query {
		wpgraphql {
			careers(last: 200) {
				edges {
					node {
						title
						slug
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
								sourceUrl(size: MEDIUM_LARGE)
							}
							videoUrl
						}
						content(format: RENDERED)
						relatedAlignments {
							alignments {
								... on WPGraphQL_Alignment {
									commonWheelProperties {
										code
									}
								}
							}
						}
					}
				}
			}
		}
	}
`