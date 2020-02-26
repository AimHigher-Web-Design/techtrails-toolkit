import React from "react";
import Link from "gatsby-link";

const NotFoundPage = () => (
	<div className="container">
		<h1>Oops! That page can't be found.</h1>
		<p>
			We cannot find what you are looking for. You may have mis-typed the
			address, or the page may have been moved. Start at the{" "}
			<Link to="/">home</Link> page to view the WITWA Techtrails Toolkit.
		</p>
	</div>
);

export default NotFoundPage;
