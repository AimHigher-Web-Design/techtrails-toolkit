import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Navigation from "../Navigation";
import logo from "../../images/logo-new.png";


const Header = ({ content, menuItems, imgAlt }) => (
	<div className="bg-warning header-container">
		<div className="container header-bubble position-relative">
			<div className="row align-items-center no-gutters">
				<div className="col-12 col-md-4">
					<Link className="mr-auto" to="/">
						<img src={logo} className="img-fluid logo-img" alt={imgAlt} />
					</Link>
				</div>
				<div dangerouslySetInnerHTML={{ __html: content }} className="mr-auto d-md-none col-12"/>
				<div className="col-12 col-md-4 offset-md-4 text-center text-md-right my-4 my-md-0">
					<Navigation menu={menuItems} />
				</div>
			</div>
		</div>
		<div
			className="d-none d-md-block container pb-4"
			dangerouslySetInnerHTML={{ __html: content }}
		/>
	</div>
);

Header.propTypes = {
	content: PropTypes.string,
	menuItems: PropTypes.object,
	imgAlt: PropTypes.string,
};

export default Header;
