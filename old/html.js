import React from "react";
import favicon from "./images/favicon.ico";

let stylesStr;
if (process.env.NODE_ENV === `production`) {
	try {
		stylesStr = require(`!raw-loader!../public/styles.css`);
	} catch (e) {
		console.log(e);
	}
}

module.exports = class HTML extends React.Component {
	render() {
		let css;
		if (process.env.NODE_ENV === `production`) {
			css = (
				<style
					id="gatsby-inlined-css"
					dangerouslySetInnerHTML={{ __html: stylesStr }}
				/>
			);
		}

		return (
			<html {...this.props.htmlAttributes}>
				<head>
					<title>Toolkit Techtrails</title>
					<meta charSet="utf-8" />
					<meta httpEquiv="x-ua-compatible" content="IE=edge" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1, shrink-to-fit=no"
					/>
					{this.props.headComponents}
					{css}
					<link rel="shortcut icon" type="image/x-icon" href={favicon} />
				</head>
				<body {...this.props.bodyAttributes}>
					<noscript
						dangerouslySetInnerHTML={{
							__html: `
                <iframe
                  src="https://www.googletagmanager.com/ns.html?id=GTM-P9LTX9X"
                  height="0"
                  width="0"
                  style="display: none; visibility: hidden"
                ></iframe>`,
						}}
					/>
					{this.props.preBodyComponents}
					<div
						key={`body`}
						id="___gatsby"
						dangerouslySetInnerHTML={{ __html: this.props.body }}
					/>
					{this.props.postBodyComponents}
				</body>
			</html>
		);
	}
};
