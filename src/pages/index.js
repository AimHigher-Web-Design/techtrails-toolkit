import React, { Fragment } from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import Img from 'gatsby-image'
import { Waypoint } from 'react-waypoint'
import { format, isSameDay } from 'date-fns'
import { formatToTimeZone, parseFromTimeZone } from 'date-fns-timezone'

import { confWshopDates } from '../components/conference/functions'
import transforms from '../data/conferences'

import '../scss/style.scss'

export default class IndexPage extends React.Component {
	backToTop(status) {
		if (status === 'scrolled') {
			document.getElementById('main').classList.add('scrolled')
		} else {
			document.getElementById('main').classList.remove('scrolled')
		}
	}

	cityFilter(e) {
		if (typeof document !== 'undefined') {
			if (e.target.value !== '') {
				let tag = e.target.value
				document.querySelectorAll('.tag-filter.filtered').forEach(section => {
					if (!section.classList.contains('blocks')) {
						section.classList.add('blocks')
						section.removeChild(section.querySelector('p.empty'))
					}
				})

				document.querySelectorAll('.tag-filter.filtered .block.visible').forEach(block => {
					block.classList.remove('visible')
				})
				document.querySelectorAll('.tag-filter').forEach(section => {
					section.classList.add('filtered')
				})

				document.querySelectorAll('.tag-filter.filtered .block').forEach(block => {
					if (block.dataset.tags.indexOf(tag) > -1) {
						block.classList.add('visible')
					}
				})

				document.querySelectorAll('.tag-filter.filtered').forEach(section => {
					if (section.querySelectorAll('.block.visible').length < 1) {
						let name = 'Nights',
							empty = document.createElement('p')

						if (section.classList.contains('workshops')) {
							name = 'Workshops'
						}

						empty.classList.add('empty')
						empty.innerHTML = `There are no YOW! ${name} scheduled in that city right now`

						section.prepend(empty)
						section.classList.remove('blocks')
					}
				})
			} else {
				let tag = e.target.value
				document.querySelectorAll('.tag-filter.filtered').forEach(section => {
					if (!section.classList.contains('blocks')) {
						section.classList.add('blocks')
						section.removeChild(section.querySelector('p.empty'))
					}
				})

				document.querySelectorAll('.tag-filter.filtered .block.visible').forEach(block => {
					block.classList.remove('visible')
				})
				document.querySelectorAll('.tag-filter.filtered').forEach(section => {
					section.classList.remove('filtered')
				})
			}
		}
	}

	render() {
		const { data } = this.props,
			{ edges: conferences } = data.allConferences,
			{ edges: workshops } = data.allWorkshops,
			{ edges: nights } = data.allNights,
			{ edges: confInfo } = data.tiles,
			banner = data.homeBanner.content

		return (
			<Layout classes="home">
				<div className="banner home" dangerouslySetInnerHTML={{__html: banner}}></div>
				<Waypoint
					onLeave={() => this.backToTop('scrolled')}
					onEnter={() => this.backToTop('unset')}
				/>
				<nav className="submenu">
					<ul className="menu">
						<li className="menu-item">
							<a href="#workshops">Workshops</a>
						</li>
						<li className="menu-item">
							<a href="#nights">Nights</a>
						</li>
						<li className="menu-item custom-menu-filter">
							<select id="city-filter" onChange={e => this.cityFilter(e)}>
								<option value="">All Cities</option>
								<option value="brisbane">Brisbane</option>
								<option value="hong-kong">Hong Kong</option>
								<option value="melbourne">Melbourne</option>
								<option value="perth">Perth</option>
								<option value="singapore">Singapore</option>
								<option value="sydney">Sydney</option>
							</select>
						</li>
					</ul>
				</nav>
				<Conferences data={conferences} confs={confInfo} />
				<Workshops data={workshops} />
				<Nights data={nights} />
				<a className="btn sticky" href="#main">
					Back to Top
				</a>
			</Layout>
		)
	}
}

const Conferences = ({ data, confs }) => {
		let confList = data.sort((a, b) => (a.node.content.start_time - b.node.content.start_time)),
		past = confList.filter(conf => new Date(conf.node.content.start_time) < new Date()),
		future = confList.filter(conf => new Date(conf.node.content.start_time) > new Date())

		confList = future.concat(past)

		let conferences = confList.map(conference => {
			let confDates = [conference.node.content.start_time, conference.node.content.end_time],
				confDate = false,
				image,
				confId = conference.node.title.replace(/\d{4}/, '').replace(/--/, '-').replace(/(^-|-$)/, ''),
			slug = transforms.ids[confId].slug

			const dateResults = confWshopDates(conference.node.content.timezone, confDate, confDates, true)

			confDate = dateResults.confDate

			confs.forEach(conf => {
				if (conf.node.slug === slug) {
					image = conf.node.acf.images.tile
				}
			})


			let details = {
				name: conference.node.content.name,
				date: confDate,
				conf: slug,
				image: image,
				city: conference.node.content.city.toLowerCase().replace(/\s/g, '-'),
			}

			return <Conference {...details} key={details.name} />
		})
		return (
			<Fragment>
				<h2 id="conferences" className="page-title">
					Conferences
				</h2>
				<div className="conferences blocks tag-filter">{conferences}</div>
			</Fragment>
		)
	},
	Workshops = ({ data }) => {
		let classes = 'workshops blocks tag-filter',
			allWshops = [],
			workshops = data ? data.map(workshop => {
				let details = {
						title: workshop.node.title,
						date: workshop.node.timeslot,
						image: workshop.node.user_img_url,
						username: workshop.node.username,
						name: workshop.node.nominator,
						conf: workshop.node.conf_id,
						talkSlug: workshop.node.key,
						id: workshop.node.id.replace('talk-', ''),
					}

				if (!allWshops.includes(details.id)) {
					allWshops.push(details.id)


					if (new Date(details.date) > new Date()) {
						return <Workshop {...details} key={details.id} />
					}
				}
			}) : false
		if (!workshops) {
			workshops = 'There are no workshops scheduled right now'
			classes = 'workshops tag-filter'
		}

		return (
			<Fragment>
				<h2 id="workshops" className="page-title">
					Workshops
				</h2>
				<div className={classes}>{workshops}</div>
			</Fragment>
		)
	},
	Nights = ({ data }) => {
		let classes = 'nights blocks tag-filter',
			allNights = [],
			duplicateNights = []
		data.forEach(night => {
			if (
				Date.parse(night.node.timeslot.split(' ')[0]) > Date.now() ||
				isSameDay(Date.parse(night.node.timeslot), Date.now())
			) {
				let title = night.node.title.replace(
						/\s\((Perth|Sydney|Singapore|Melbourne|Brisbane|Hong\sKong)\)/,
						''
					),
					citySlug = night.node.key.match(
						/perth|sydney|singapore|melbourne|brisbane|hong-kong/
					),
					city = night.node.title.match(
						/Perth|Sydney|Singapore|Melbourne|Brisbane|Hong\sKong/
					),
					slug =
						'/talks/' +
						night.node.username +
						'/' +
						night.node.conf_id +
						'/' +
						night.node.key.substring(0, 99) +
						'-' +
						night.node.title,
					speakers = [night.node.nominator]
				if (duplicateNights.includes(title)) {
					allNights.forEach(event => {
						if (event.title === title) {
							if (night.node.co_presenters) {
								night.node.co_presenters.forEach(coSpeak => {
									if (!event.speakers.includes(coSpeak.name)) {
										event.speakers.push(coSpeak.name)
									}
								})
							}

							if (!event.speakers.includes(night.node.nominator)) {
								event.speakers.push(night.node.nominator)
							}

							event.variants.push({
								city: city,
								date: night.node.timeslot,
								slug: slug,
							})
							event.citySlugs.push(citySlug)
						}
					})
				} else {
					if (night.node.co_presenters) {
						night.node.co_presenters.forEach(coSpeak => {
							speakers.push(coSpeak.name)
						})
					}

					duplicateNights.push(title)
					allNights.push({
						title: title,
						speakers: speakers,
						variants: [
							{
								city: city,
								date: night.node.timeslot,
								slug: slug,
							},
						],
						citySlugs: [citySlug],
						username: night.node.username,
						image: night.node.user_img_url,
						conf: night.node.conf_id,
						key_id: night.node.key,
					})
				}
			}
		})
		let nights = allNights.map(night => {
			let details = {
				title: night.title,
				variants: night.variants,
				image: night.image,
				citySlugs: night.citySlugs,
				speakers: night.speakers,
			}

			return <Night {...details} key={night.key_id} />
		})

		if (
			nights.every(e => {
				return e == null
			})
		) {
			nights = 'There are no YOW! Nights scheduled right now'
			classes = 'nights tag-filter'
		}

		return (
			<Fragment>
				<h2 id="nights" className="page-title">
					Nights
				</h2>
				<div className={classes}>{nights}</div>
			</Fragment>
		)
	},
	Conference = ({ name, date, conf, image, city }) => {
		let confName = name.replace(/YOW!\s|\sAustralia/, '').replace(/\s\d\d\d\d|\d\d\d\d\s/, ''),
			tags = city

		if (
			!confName.includes('CTO') &&
			!confName.includes('Agility') &&
			!confName.includes('DevFest')
		) {
			confName = 'YOW! ' + confName
		}

		return (
			<Link to={conf} className={'block ' + conf} data-tags={tags}>
				<Img
					fixed={image.localFile.childImageSharp.fixed}
					// title={image.caption}
					// alt={image.alt_text}
					imgStyle={{ width: '100%', height: 'auto' }}
					style={{ height: '165px', display: 'block' }}
				/>
				<div className="labels">
					<h3>{confName}</h3>
					<p className="date">{date}</p>
				</div>
			</Link>
		)
	},
	Workshop = ({ title, date, image, username, name, conf, id, talkSlug }) => {
		let slug = `/talks/${username}/${conf}/${talkSlug}-${id}`,
			city = slug.match(/sydney|melbourne|brisbane|perth|hong-kong|singapore/),
			timezone = 'Australia/Sydney'

		if (!city) {
			if (slug.match(/lambda-jam/)) {
				city = 'melbourne'
			} else if (slug.match(/data/)) {
				city = 'sydney'
			} else {
				city = ''
			}
		}

		switch (city) {
			case 'melbourne':
				timezone = 'Australia/Melbourne'
				break
			case 'sydney':
				timezone = 'Australia/Sydney'
				break
			case 'brisbane':
				timezone = 'Australia/Brisbane'
				break
			case 'perth':
				timezone = 'Australia/Perth'
				break
			case 'singapore':
				timezone = 'Asia/Singapore'
				break
			case 'hong-kong':
				timezone = 'Asia/Hong_Kong'
				break
		}

		return (
			<Link to={slug} className="block" data-tags={city}>
				<img src={image} />
				<div className="labels">
					<h3>{title.replace(/^Workshop - /, '')}</h3>
					<p>{name}</p>
					<span>
						<time className="date" dateTime={date}>
							{formatToTimeZone(
								parseFromTimeZone(date, { timeZone: timezone }),
								'D MMM', {timeZone: timezone}
							)}
						</time>{' '}
						- {city[0].replace(/\b\w|-\w|^\w/g, l => l.toUpperCase()).replace('-', ' ')}
					</span>
				</div>
			</Link>
		)
	},
	Night = ({ image, title, variants, speakers, citySlugs }) => {
		citySlugs = citySlugs.toString().replace(/,/g, ' ')

		return (
			<div className={'block ' + citySlugs} data-tags={citySlugs}>
				<img src={image} />
				<div className="labels">
					<h3>{title}</h3>
					<p>{speakers.join(', ')}</p>
					<div className="variants">
						{variants.map(variant => {
							let timezone = 'Australia/Sydney'

							switch (variant.city) {
								case 'Melbourne':
									timezone = 'Australia/Melbourne'
									break
								case 'Sydney':
									timezone = 'Australia/Sydney'
									break
								case 'Brisbane':
									timezone = 'Australia/Brisbane'
									break
								case 'Perth':
									timezone = 'Australia/Perth'
									break
								case 'Singapore':
									timezone = 'Asia/Singapore'
									break
								case 'Hong Kong':
									timezone = 'Asia/Hong_Kong'
									break
							}

							return (
								<Link to={variant.slug} key={variant.slug}>
									<time dateTime={variant.date}>
										{formatToTimeZone(
											parseFromTimeZone(variant.date, { timeZone: timezone }),
											'D MMM',
											{
												timeZone: timezone,
											}
										)}
									</time>
									<span className="city"> - {variant.city}</span>
								</Link>
							)
						})}
					</div>
				</div>
			</div>
		)
	}

export const homeQuery = graphql`
	query($conferences: [String!]) {
		allConferences(
			filter: { title: { in: $conferences } }
			sort: {fields: content___start_time, order: ASC}
		) {
			edges {
				node {
					title
					content {
						name
						start_time
						end_time
						timezone
						city
					}
				}
			}
		}
		homeBanner: wordpressPage(slug: {eq: "home"}) {
			content
		}
		tiles: allWordpressWpWpconf {
			edges {
				node {
					slug
					acf {
						images {
							tile {
								localFile {
									childImageSharp {
										fixed(width: 300) {
											...GatsbyImageSharpFixed_withWebp
										}
									}
								}
							}
						}
					}
				}
			}
		}
		allWorkshops: allTalk(
			filter: {conf_id: {ne: "yow-nights"}, session_type: {regex: "/workshop/i"}}
			sort: {fields: timeslot, order: ASC}
		) {
			edges {
			node {
				title
				timeslot
				conf_id
				registration_url
				id
				user_img_url
				username
				nominator
				key
			}
			}
		}
		allNights: allTalk(sort: {order: ASC, fields: timeslot}, filter: {conf_id: {eq: "yow-nights"}}) {
			edges {
				node {
					title
					timeslot
					user_img_url
					username
					nominator
					conf_id
					co_presenters {
					name
					}
					key
					id
				}
			}
		}
	}
`
