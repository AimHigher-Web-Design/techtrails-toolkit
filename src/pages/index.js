import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/layout'

// import '../scss/style.scss'

export default class IndexPage extends React.Component {
	render() {
		const pageContent = this.props.data.home.page.content
		
		return (
			<Layout classes="home">
				<div dangerouslySetInnerHTML={{__html: pageContent}} />
			</Layout>
		)
	}
}


export const pageQuery = graphql`
	query {
		home: wpgraphql {
			page(id: "home", idType: URI) {
				content(format: RENDERED)
			}
		}
	}
`
