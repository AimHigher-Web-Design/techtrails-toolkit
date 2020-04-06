import React, { Fragment } from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'

// import NotFound from '../img/fourohfour.svg'

export default class FourOhFour extends React.Component {
	render() {
		return (
			<Layout>
				<h1>Page Not Found</h1>
				<div className="error-404">
					{/* <NotFound /> */}
					<p>
						Looks like that page doesn't exist anymore or has moved. Try going back to
						the <a href="/">home page</a> or selecting one of the options from our menu
						instead.
					</p>
				</div>
			</Layout>
		)
	}
}
