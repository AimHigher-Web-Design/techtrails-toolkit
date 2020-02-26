import React from "react";
import PropTypes from "prop-types";
import { CAREER_LINK } from "../../common/constants";

// During styling rename class to className. When I did it all the styles died, but you do need the className prop to come in

const CareerTile = ({ className, title, code, image, onClick }) => (
	<div className="career-card-container text-center my-3">
		<button
			data-code={code}
			data-label={title}
			type="button"
			onClick={onClick}
			className="btn btn-link p-0 career-hover"
		>
			<div className="card career-tile pt-3">
				<div className="career-block">
					<div
						className="card-img-top career-tile-img position-absolute"
						style={{ backgroundImage: `url(${image})` }}
						role="presentation"
					/>
				</div>
				<div className="position-absolute career-tile-body">
					<div className="position-relative career-text h-100 w-100 px-1 text-uppercase">
						{title}
					</div>
				</div>
			</div>
		</button>
	</div>
);

CareerTile.propTypes = {
	title: PropTypes.string.isRequired,
	code: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	className: PropTypes.string,
};

CareerTile.defaultProps = {
	onClick: () => null,
};

export default CareerTile;
