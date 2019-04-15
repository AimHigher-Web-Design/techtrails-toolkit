import React from "react";

const SubjectTile = ({
	className = "",
	code,
	label,
	description,
	onClick,
	image,
}) => (
	<div
		className={`${className} p-lg-1 d-flex subject-tile-container position-relative mb-3 mb-md-0`}
	>
		<button
			className={`subject-tile btn btn-link p-0 p-md-4 p-lg-0 subject-${code}`}
			onClick={onClick.bind(null, code)}
		>
			<div className="subject-card d-flex position-relative flex-column align-items-stretch">
				<img
					className="content-image position-absolute"
					alt={code}
					src={image}
				/>
				<div className="content-card h-100 d-flex flex-column">
					<div className="content-description position-relative justify-content-center px-3 pt-2 pt-xl-3 text-center flex-column h-100">
						<small dangerouslySetInnerHTML={{ __html: description }} />
					</div>
					<div className="title-container w-100 mt-auto text-center d-flex flex-column justify-content-center text-uppercase position-relative p-0 px-md-2">
						{label}
					</div>
				</div>
			</div>
		</button>
	</div>
);

export default SubjectTile;
