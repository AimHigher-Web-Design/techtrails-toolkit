exports.createPages = async function({ actions, graphql }) {
	await graphql(`
		{
			wpgraphql {
				pages(first: 100) {
					edges {
						node {
							id
							slug
						}
					}
				}
				subjects {
					edges {
						node {
							id
							commonWheelProperties {
								code
							}
							subject {
								sentences {
									... on WPGraphQL_Sentence {
										relatedAlignments {
											alignments {
												... on WPGraphQL_Alignment {
													id
												}
											}
										}
									}
								}
							}
						}
					}
				}
				sentences(first: 100) {
					edges {
						node {
							id
							commonWheelProperties {
								code
							}
							relatedAlignments {
								alignments {
									... on WPGraphQL_Alignment {
										id
									}
								}
							}
						}
					}
				}
				careers(first: 100) {
					edges {
						node {
							slug
							relatedAlignments {
								alignments {
									... on WPGraphQL_Alignment {
										id
									}
								}
							}
						}
					}
				}
			}
		}
	`).then(res => {
		res.data.wpgraphql.pages.edges.forEach(edge => {
			actions.createPage({
				path: `${edge.node.slug}`,
				component: require.resolve(`./src/templates/page.js`),
				context: {
					id: edge.node.id
				},
			})
		})

		res.data.wpgraphql.sentences.edges.forEach(edge => {
				let careers = [],
				alignments = []

				edge.node.relatedAlignments.alignments.forEach(a => {
					alignments.push(a.id)
				})

				res.data.wpgraphql.careers.edges.forEach(c => {
					c.node.relatedAlignments.alignments.forEach(a => {
						if(alignments.includes(a.id)) {
							careers.push(c.node.slug)
						}
					})
				})

				actions.createPage({
					path: `/filter/sentence/${edge.node.commonWheelProperties.code}`,
					component: require.resolve(`./src/templates/filterSentence.js`),
					context: {
						id: edge.node.id,
						careers,
						alignments
					},
				})
		})

		res.data.wpgraphql.subjects.edges.forEach(edge => {
			let careers = [],
				alignments = []

			edge.node.subject.sentences.forEach(s => {
				s.relatedAlignments.alignments.forEach(a => {
					alignments.push(a.id)
				})
			})

			res.data.wpgraphql.careers.edges.forEach(c => {
				c.node.relatedAlignments.alignments.forEach(a => {
					if(alignments.includes(a.id)) {
						careers.push(c.node.slug)
					}
				})
			})

			actions.createPage({
				path: `/filter/subject/${edge.node.commonWheelProperties.code}`,
				component: require.resolve(`./src/templates/filterSubject.js`),
				context: {
					id: edge.node.id,
					careers,
					alignments
				},
			})
		})
	})
	.catch(err => {
		console.log(err)
	})
  }