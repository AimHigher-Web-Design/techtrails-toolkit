import React, { Fragment } from "react"
import Helmet from 'react-helmet'

// import Header from '../Header/Header'
// import Footer from '../Footer/Footer'

import Logo from '../../images/logo-new.png'

import './index.scss'

class Layout extends React.Component {
	constructor(props) {
		super(props);

		this.setHeaderContent = this.setHeaderContent.bind(this);

		this.state = {
			headerContent: {},
		};
	}


    render() {
        let children = this.props.children,
			meta = this.props.meta;
			
        return (
            <Fragment>
				<Meta {...meta} />
                {/* <Header
					{...this.state.headerContent}
					imgAlt={data.site.siteMetadata.title}
					menuItems={mainMenu.edges[0].node}
				/> */}
                <main className="py-4 dotty-bg d-flex flex-column">
					{children}
				</main>
                {/* <Footer
					footerMenu={footerMenu.edges[0].node}
					socialMenu={socialMenu.edges[0].node}
					footerContent={footerPage.content}
				/> */}
            </Fragment>
        )
    }
}

const Meta = ({name, description, slug, image}) => {
    let siteUrl = 'https://toolkit.techtrails.org.au';

    if (!image) {
        image = Logo;
    }
 
    return (
        <Helmet>
			<html lang="en" />
			<meta charSet="utf-8" />
			<meta httpEquiv="x-ua-compatible" content="IE=edge" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1, shrink-to-fit=no"
			/>
            <title>{name}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={siteUrl + slug} />
            <meta name="twitter:card" content="summary_large_image" />
            <link rel="shortcut icon" href={Logo} />
            <link rel="icon" sizes="192x192" href={Logo} />
            <link rel="apple-touch-icon" href={Logo} />
            <meta name="theme-color" content="#b21e6f" />
            <link rel="mask-icon" href={Logo} color="#b21e6f" />
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
        </Helmet>
    );
};

export default Layout