import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";

const Navigation = ({ menu }) => (
	<nav>
		{menu.items.map(item => (
			<Link
				key={item.wordpress_id}
				to={item.object_slug}
				className="btn btn-primary text-uppercase"
			>
				{item.title}
			</Link>
		))}
	</nav>
);

Navigation.propTypes = {
	menu: PropTypes.object,
};

export default Navigation;
