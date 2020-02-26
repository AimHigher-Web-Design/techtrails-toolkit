import React from 'react'
import { graphql, StaticQuery, Link } from 'gatsby'
import { Facebook, Twitter, Youtube, Linkedin } from 'react-feather'

const SocialIcons = {
	facebook: <Facebook />,
	twitter: <Twitter />,
	youtube: <Youtube />,
	linkedin: <Linkedin />,
}

const Footer = () => (
	<StaticQuery
		query={graphql`
			query {
				social: wordpressWpApiMenusMenusItems(name: { eq: "Social Menu" }) {
					items {
						title
						classes
						url
					}
				}
				footer: wordpressWpApiMenusMenusItems(name: { eq: "Footer Menu" }) {
					items {
						title
						url
					}
				}
			}
		`}
		render={data => {
			const social = data.social.items,
				footer = data.footer.items
			return (
					<footer>
							<nav>
								<ul>
									{footer.map(item => (
										<li key={item.url}>
											<Link to={item.url}>{item.title}</Link>
										</li>
									))}
								</ul>
							</nav>

						<nav>
							<ul>
								{social.map(item => (
									<li key={item.classes} className={item.classes}>
										<a href={item.url} target="_blank">
											<span>{item.title}</span>
											{SocialIcons[item.classes]}
										</a>
									</li>
								))}
							</ul>
						</nav>
					</footer>
			)
		}}
	/>
)

export default Footer
