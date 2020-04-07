import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/layout'

// import '../scss/style.scss'

export default class IndexPage extends React.Component {
	render() {
		const careers = this.props.data.careers.careers.edges,
		subjects = this.props.data.subjects.subjects.edges

		console.log(careers)
		
		return (
			<Layout>
				<ul>
					{subjects.map(subject => (
						<li key={subject.node.commonWheelProperties.code}>
							<a href={`#${subject.node.commonWheelProperties.code}`} style={{'--subject': subject.node.subject.colour }} dangerouslySetInnerHTML={{__html: subject.node.title}}></a>
						</li>
					))}
				</ul>

			</Layout>
		)
	}
}


export const pageQuery = graphql`
	query {
		careers: wpgraphql {
			careers(last: 200) {
				edges {
					node {
						title(format: RENDERED)
						commonWheelProperties {
							code
						}
						careerFields {
							skills
							links {
								label
								url
							}
							videoUrl
							videoThumbnail {
								sourceUrl(size: THUMBNAIL)
							}
							featuredImage {
								sourceUrl(size: MEDIUM)
							}
						}
						databaseId
					}
				}
			}
		}
		subjects: wpgraphql {
			subjects {
				edges {
					node {
						title(format: RENDERED)
						subject {
							colour
						}
						commonWheelProperties {
							code
						}
					}
				}
			}
		}
	}
`
