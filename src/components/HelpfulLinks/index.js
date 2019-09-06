import React from "react";
import FontAwesome from "react-fontawesome";

const resolveResource = (resource, index) => {
	let iconName = "download",
	resourceLink = resource.resource_link;
	switch (resource.resource_type) {
		case "video":
			iconName = "play-circle";
			break;
		case "link":
			iconName = "external-link-alt";
			break;
	}

	if(resource.resource_type == 'file') {
		resourceLink = resource.resource_link.replace('/wp-content/uploads/', 'https://wptoolkit.techtrails.org.au/wp-content/uploads/');
	}
	resource.image = resource.image.replace('http://wptoolkit.techtrails.org.au', 'https://wptoolkit.techtrails.org.au')

	return (
		<div key={index} className="helpful-link-card-container text-center my-3">
			<a
				className="btn btn-link p-0 career-hover"
				href={resourceLink}
				target="_blank"
				rel="noopener noreferrer"
				data-label={resource.resource_name}
			>
				<div className="card career-tile">
					<div
						className="career-block"
						style={{
							"background-image": `url(${resource.image})`,
						}}
					/>
					<div className="position-relative career-tile-body">
						<div className="position-relative career-text h-100 w-100 px-3 text-uppercase d-flex align-items-center">
							<FontAwesome
								className="resource-icon icn-primary"
								name={iconName}
								size="2x"
								style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
							/>
							<div className="ml-2">{resource.resource_name}</div>
						</div>
					</div>
				</div>
			</a>
		</div>
	);
};

const HelpfulLinks = props => {
	const acf = props.data.resources;
	return (
		<div className="container">
			<div className="card-deck flex-wrap mt-4">
				{acf.map((resource, index) => resolveResource(resource, index))}
			</div>
		</div>
	);
};

export default HelpfulLinks;
