import React, {Fragment, useState} from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'

import '../scss/components/header.scss'

const FilterForm = () => (
	<StaticQuery
		query={graphql`
			query {
				wpgraphql {
					subjects {
						edges {
							node {
								title(format: RENDERED)
								commonWheelProperties {
									code
								}
								subject {
									colour
									sentences {
										... on WPGraphQL_Sentence {
											title
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
		`}
		render={data => {
			const subjects = data.wpgraphql.subjects.edges,
			nextSect = () => {
				if(!document.querySelector('.modal .current .opts input[type="radio"]:checked')) {
					return
				}

				if(!document.querySelector('.modal section.current').nextElementSibling) {
					window.location = `/filter/sentence`
				}

				if(document.querySelector('.modal button.back').disabled) {
					document.querySelector('.modal button.back').disabled = false
				}

				document.querySelector('.modal section.current').nextElementSibling.classList.add('next')

				document.querySelector('.modal section.current').classList.remove('current')

				document.querySelector('.modal section.next').classList.add('current')

				document.querySelector('.modal section.next').classList.remove('next')
			},
			prevSect = () => {
				if(!document.querySelector('.modal section.current').previousElementSibling) {
					return
				}

				if(document.querySelector('.modal .next.hide')) {
					document.querySelector('.modal .end').classList.add('hide')
					document.querySelector('.modal .next').classList.remove('hide')
				}

				if(document.querySelector('.modal button.next').disabled) {
					document.querySelector('.modal button.next').disabled = false
				}

				document.querySelector('.modal section.current').previousElementSibling.classList.add('prev')

				document.querySelector('.modal section.current').classList.remove('current')

				document.querySelector('.modal section.prev').classList.add('current')

				document.querySelector('.modal section.prev').classList.remove('prev')

				if(!document.querySelector('.modal section.current').previousElementSibling) {
					document.querySelector('.modal button.back').disabled = true
				}
			},
			selectSubject = (subject) => {
				document.querySelectorAll('.modal fieldset.selected').forEach(s => {
					s.classList.remove('selected')
				})

				document.querySelector(`.modal fieldset[data-subject='${subject}']`).classList.add('selected')
			},
			selectSentence = (sent) => {
				document.querySelector('.modal .end').href = `/filter/sentence/${sent}`

				document.querySelector('.modal .end').classList.remove('hide')
				document.querySelector('.modal .next').classList.add('hide')
			}

			return (
				<div className="modal">
					<div className="steps">
						<section className="current">
							<fieldset>
								<div>
									<legend>What's your favourite subject area?</legend>
									<img src="http://techtrails.local/wp-content/uploads/2018/02/Technical-writer.png" />
									<ul className="opts subjects">
										{subjects.map(s => (
											<li key={s.node.commonWheelProperties.code}>
												<input 
													type="radio"
													name="subject"
													value={s.node.commonWheelProperties.code}
													id={s.node.commonWheelProperties.code}
													onChange={() => {selectSubject(s.node.commonWheelProperties.code)}}
												/>
												<label 
													htmlFor={s.node.commonWheelProperties.code} 
													dangerouslySetInnerHTML={{__html: s.node.title}}
													style={{
														'--subject': s.node.subject.colour
													}}
												/>
											</li>
										))}
									</ul>
								</div>
							</fieldset>
						</section>
						<section>
							{subjects.map(s => (
								<fieldset className="sentences" data-subject={s.node.commonWheelProperties.code}>
									<div>
										<legend>Which sentence describes you best?</legend>
										<img src="http://techtrails.local/wp-content/uploads/2018/02/Technical-writer.png" />
										<ul className="opts">
											{s.node.subject.sentences.map(sent => (
												<li key={sent.commonWheelProperties.code}>
													<input 
														type="radio"
														name="sentence"
														value={sent.commonWheelProperties.code}
														id={sent.commonWheelProperties.code}
														onChange={() => {selectSentence(sent.commonWheelProperties.code)}}
													/>
													<label 
														htmlFor={sent.commonWheelProperties.code} 
														dangerouslySetInnerHTML={{__html: sent.title}}
													/>
												</li>
											))}
										</ul>
									</div>
								</fieldset>
							))}
						</section>
					</div>
					<button 
						type="button" 
						className="back" 
						onClick={prevSect}
					>
						Back
					</button>
					<button 
						type="button" 
						className="next" 
						onClick={nextSect}
					>
						Next
					</button>
					<a 
						className="end btn hide" 
						href="#"
					>
						Next
					</a>
				</div>
			)
		}}
	/>
)

export default FilterForm