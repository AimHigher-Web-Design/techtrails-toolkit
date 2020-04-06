import React from 'react'
import { graphql, StaticQuery, Link } from 'gatsby'
import { Facebook, Twitter, Instagram, Linkedin } from 'react-feather'

const SocialIcons = {
	Facebook: <Facebook />,
	Twitter: <Twitter />,
	Instagram: <Instagram />,
	LinkedIn: <Linkedin />,
}

const Footer = () => (
	<StaticQuery
		query={graphql`
			query {
				social: wpgraphql {
					menus(where: {slug: "social-media-menu"}) {
						edges {
							node {
								menuItems {
									edges {
										node {
											url
											label
											menuIcons {
												icon {
													sourceUrl
												}
											}
										}
									}
								}
							}
						}
					}
				}
				footer: wpgraphql {
					menus(where: {slug: "footer-menu"}) {
						edges {
							node {
								menuItems {
									edges {
										node {
											url
											label
											target
										}
									}
								}
							}
						}
					}
				}
				footerBlurb: wpgraphql {
					page(id: "footer", idType: URI) {
						content(format: RENDERED)
					}
				}
			}
		`}
		render={data => {
			const footerBlurb = `${data.footerBlurb.page.content}<p>© ${new Date().getFullYear()}, Techtrails</p>`,
			social = data.social.menus.edges[0].node.menuItems.edges,
			footer = data.footer.menus.edges[0].node.menuItems.edges

			console.log(social)

			return (
					<footer>
							<nav>
								<ul>
									{footer.map(item => (
										<li key={item.node.url}>
											<a href={item.node.url} target={item.node.target}>{item.node.label}</a>
										</li>
									))}
								</ul>
							</nav>

						<nav>
							<ul>
								{social.map(item => (
									<li key={item.node.url}>
										<a href={item.node.url} target="_blank">
											<span>{item.node.label}</span>
											{SocialIcons[item.node.label]}
										</a>
									</li>
								))}
							</ul>
						</nav>
						<div className="copyright" dangerouslySetInnerHTML={{__html: footerBlurb}} />
					</footer>
			)
		}}
	/>
)

export default Footer
