exports.createPages = async function({ actions, graphql }) {
	await graphql(`
		{
			wpgraphql {
				pages(first: 200) {
					edges {
						node {
							id
							slug
							isFrontPage
						}
					}
				}
				subjects(first: 200) {
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
				careers(first: 200) {
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
			// If any of the WordPress pages aren't meant to be content pages, include them in the array
			if(edge.node.isFrontPage || ['footer', 'avatar-popup'].includes(edge.node.slug)) {
				console.log(`Not generating ${edge.node.slug} page`)
				return
			}

			actions.createPage({
				path: `${edge.node.slug}`,
				component: require.resolve(`./src/templates/page.js`),
				context: {
					id: edge.node.id
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
				path: `/subject/${edge.node.commonWheelProperties.code}`,
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