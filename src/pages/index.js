import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/layout'
import Modal from '../components/modal'

import '../scss/components/modal.scss'

export default class IndexPage extends React.Component {
	render() {
		const pageContent = this.props.data.home.page.content

		return (
			<Layout classes="home">
				<div dangerouslySetInnerHTML={{__html: pageContent }} />
				{/* <Modal/> */}
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
