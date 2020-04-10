import React, { Component, Fragment } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import FilterLayout from '../components/filterPage'

import '../scss/components/filters.scss'
import { XCircle } from 'react-feather'

class PageTemplate extends Component {	
	render() {
		const wpgraphql = this.props.data.wpgraphql,
			careers = wpgraphql.careers.edges,
			subject = wpgraphql.subject,
			popup = wpgraphql.popup,
			data = {
				jobs: careers,
				subject: subject.title,
				subjectCode: subject.commonWheelProperties.code
			},
			toggleFilter = (tags, e) => {
				// Remove active filter details
				document.querySelectorAll('.jobs.filter .tile.visible').forEach(tile => {
					tile.classList.remove('visible')
				})

				// Remove filter
				if(e.target.classList.contains('selected')) {
					document.querySelectorAll('.filters button.selected').forEach(button => {
						button.classList.remove('selected')
					})

					document.querySelector('.jobs').classList.remove('filter')

					return
				}

				document.querySelectorAll('.filters button.selected').forEach(button => {
					button.classList.remove('selected')
				})

				// Set filter details
				e.target.classList.add('selected')

				document.querySelector('.jobs').classList.add('filter')

				document.querySelectorAll('.jobs.filter .tile').forEach(tile => {
					const jobTags = tile.dataset.tags.split(',')

					tags.some(tag => {
						if(jobTags.includes(tag)) {
							tile.classList.add('visible')
							return true
						}
					})
				})
			},
			closeHelp = () => {
				document.querySelector('.filters .popup').classList.add('hidden')
				if (typeof window !== `undefined`) {
					window.localStorage.setItem('returningUser', true)
				}
			}

			let returningUser = typeof window !== `undefined` ? window.localStorage.getItem('returningUser') : false

			

			const avatars = [
				'https://wptoolkit.techtrails.org.au/wp-content/uploads/2020/04/Avatar-Emmaline_crop-265x300.png',
				'https://wptoolkit.techtrails.org.au/wp-content/uploads/2020/04/Avatar-Lucy_crop-236x300.png',
				'https://wptoolkit.techtrails.org.au/wp-content/uploads/2020/04/Avatar-Leisa_crop-168x300.png',
				'https://wptoolkit.techtrails.org.au/wp-content/uploads/2020/04/Avatar-Kay_crop-175x300.png'
			]

		return (
			<Layout>
				<FilterLayout {...data}>
					<div className="info">
						<p className="desc">You can narrow your search of jobs in <span dangerouslySetInnerHTML={{__html: subject.title}} /> by moving between the three sections as demonstrated by the avatar. If you want to go back and explore a different area, press the back button.</p>
						<a className="btn back" href="/#choose-subject">Back</a>
					</div>
					<div className="filters" style={{'--subject': subject.subject.colour}}>

						<ul>
							{subject.subject.sentences.map(s => {
								let tags = []

								s.relatedAlignments.alignments.forEach(a => {
									tags.push(a.commonWheelProperties.code)
								})

								return (
									<li key={s.id}><button dangerouslySetInnerHTML={{__html: s.title}} onClick={(e) => {toggleFilter(tags, e)}} /></li>
								)
							})}
						</ul>
						{!returningUser && 
							<div className="popup">
								<button className="close btn" onClick={()=>{closeHelp()}}><XCircle /><span>Close</span></button>
								<img src={avatars[Math.floor(Math.random()*avatars.length)]} />
								<blockquote dangerouslySetInnerHTML={{__html: popup.content}} />
							</div>
						}
					</div>
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
				commonWheelProperties {
					code
				}
				subject {
					colour
					sentences {
						... on WPGraphQL_Sentence {
							title(format: RENDERED)
							id
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
			careers(where: {nameIn: $careers}, last: 200) {
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
			popup: page(id: "avatar-popup", idType: URI) {
				content(format: RENDERED)
				featuredImage {
					sourceUrl(size: MEDIUM)
				}
			}
		}
	}
`