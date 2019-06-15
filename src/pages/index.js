import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'


export default class IndexPage extends React.Component {
	render() {
		const { data } = this.props
		return (
			<Layout>
				<h1>Hello WOrld</h1>
			</Layout>
		)
	}
}

export const pageQuery = graphql`
	query IndexQuery {
		site {
			siteMetadata {
				title
			}
		}
	}
`
