import React from 'react'
import { graphql, StaticQuery, Link } from 'gatsby'
import { Facebook, Twitter, Instagram, Linkedin } from 'react-feather'

import '../scss/components/footer.scss'

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
						featuredImage {
							sourceUrl(size: MEDIUM)
						}
					}
				}
			}
		`}
		render={data => {
			const footerBlurb = `${data.footerBlurb.page.content}<p>© ${new Date().getFullYear()}, Techtrails</p>`,
			social = data.social.menus.edges[0].node.menuItems.edges,
			footer = data.footer.menus.edges[0].node.menuItems.edges,
			footerLogo = data.footerBlurb.page.featuredImage.sourceUrl


			return (
				<footer>
					<nav className="footer">
						<ul>
							{footer.map(item => (
								<li key={item.node.url}>
									<a href={item.node.url} target={item.node.target}>{item.node.label}</a>
								</li>
							))}
						</ul>
					</nav>

					<nav className="social">
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
					<img className="witwa-logo" src={footerLogo} />
				</footer>
			)
		}}
	/>
)

export default Footer
