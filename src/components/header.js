import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'

import Logo from '../img/techtrails-logo.svg'

import '../scss/components/header.scss'

const Header = () => (
	<StaticQuery
		query={graphql`
			query {
				menu: wpgraphql {
					menus(where: {slug: "main-menu"}) {
						edges {
							node {
								menuItems {
									edges {
										node {
											url
											label
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
			const menu = data.menu.menus.edges[0].node.menuItems.edges

			return (
				<header>
					<Link to="/" className="site-logo">
						<Logo />
					</Link>

					<nav>
						<ul>
							{menu.map(item => (
								<li key={item.node.url}>
									<a href={item.node.url}>{item.node.label}</a>
								</li>
							))}
						</ul>
					</nav>
				</header>
			)
		}}
	/>
)

export default Header