import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { graphql, StaticQuery } from 'gatsby'

import Header from './header'
import Footer from './footer'

import '../scss/global.scss';
import '../scss/content.scss';

import Logo from '../img/logo.jpg'
// import Favicon from '../img/favicon.png'

const Layout = ({ children, meta, itemtype, itemscope, classes }) => (
	<StaticQuery
		query={graphql`
			query {
				site {
					siteMetadata {
						title
						description
						siteUrl
					}
				}
				wpgraphql {
					generalSettings {
						description
						title
						url
					}
				}
			}
		`}
		render={data => {
			let defaultMeta = data.wpgraphql.generalSettings
			meta = meta == undefined ? {} : meta

			let metaInfo = {
				name: meta.name ? `${meta.name} | ${defaultMeta.title}` : defaultMeta.title,
				description: meta.description || defaultMeta.description,
				image: meta.image || Logo,
				slug: meta.slug || '/',
				siteUrl: defaultMeta.url,
				extras: meta.extras || [],
			}

			return (
				<Fragment>
					{/* <Meta {...metaInfo} /> */}
					<Header />
					<main id="main" className={classes} itemType={itemtype}>
						{children}
					</main>
					<Footer />
				</Fragment>
			)
		}}
	/>
)

const Meta = ({ name, description, slug, image, siteUrl, extras }) => (
	<Helmet>
		<title>{name}</title>
		<meta name="description" content={description} />
		<link rel="canonical" href={siteUrl + slug} />

		<meta name="twitter:card" content="summary_large_image" />
		{/* <link rel="shortcut icon" href={Favicon} />
		<link rel="icon" sizes="192x192" href={Favicon} />
		<link rel="apple-touch-icon" href={Favicon} />
		<meta name="theme-color" content="#003462" />
		<link rel="mask-icon" href={Favicon} color="#003462" /> */}
		<base href="/" />

		{/* Facebook */}
		<meta property="og:url" content={siteUrl + slug} />

		<meta property="og:title" content={name} />
		<meta property="og:image" content={image} />
		<meta property="og:description" content={description} />

		{/* Twitter */}
		<meta name="twitter:url" content={siteUrl + slug} />
		<meta name="twitter:title" content={name} />
		<meta name="twitter:description" content={description} />
		<meta name="twitter:image" content={image} />
		<script src="https://paperform.co/__embed" />

		{/* Extras */}
		{extras.includes('noindex') && <meta name="robots" content="noindex" />}
	</Helmet>
)

export default Layout
