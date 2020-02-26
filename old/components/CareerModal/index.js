import React from "react";
import PropTypes from "prop-types";
import Modal from "../Modal";
import ExternalLink from "../svg/ExternalLink";

const CareerModal = ({ modalCareer, handleModalClose, activeFilters }) => {
	if (!modalCareer) {
		return null;
	}

	const career = modalCareer.node;

	// New lines wont render in react, so we replace them with a br
	career.content = career.content.replace(/\n/g, "<br />");

	return (
		<Modal handleClose={handleModalClose} className="career-modal">
			<div className="modal-header p-0 bg-primary">
				<div className="row w-100 p-3 h-100">
					<div className="col-12 col-md-8 d-flex flex-column">
						<h2 className="text-white h4 mb-auto">
							{career ? career.label : "Career"}
						</h2>
						<div className="d-none d-md-flex flex-column flex-md-row">
							{Object.keys(activeFilters).map((filter, index) => (
								<div
									key={index}
									className="mx-3 text-white d-flex justify-content-md-center"
								>
									{activeFilters[filter].label}
								</div>
							))}
						</div>
					</div>
					<div className="col-12 col-md-4 career-image-column">
						<img
							src={career.featured_image_large}
							className="career-modal-image position-absolute"
						/>
					</div>
				</div>
			</div>
			<div className="p-0 modal-body">
				<div className="overflow-container">
					<div className="row no-gutters p-3">
						<div
							className="col-12 col-md-6 px-md-3 mb-3 mb-md-0"
							dangerouslySetInnerHTML={{ __html: career.content }}
						/>
						<div className="col-12 col-md-6 px-md-3">
							{career.resources ? (
								<div className="mb-4">
									<h3 className="h5 text-primary">Resources</h3>
									{career.resources.map((link, i) => (
										<div key={i} className="bg-medium row no-gutters mb-1 p-2">
											<div className="col-2 col-md-1">
												<div className="icn icn-lg">
													<ExternalLink />
												</div>
											</div>
											<div className="col-10 col-md-11">
												<a
													href={link.url}
													target="_blank"
													rel="noopener noreferrer"
												>
													{link.label}
												</a>
											</div>
										</div>
									))}
								</div>
							) : null}
							{career.skills ? (
								<div>
									<h3 className="h5 text-primary">Skills</h3>
									<div dangerouslySetInnerHTML={{ __html: career.skills }} />
								</div>
							) : null}
							{career.videoUrl && (
								<div className="border">
									<a
										href={career.videoUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="career-video"
									>
										<img
											className="img-fluid"
											src={career.videoThumbnail}
											alt={`${career.label} video`}
										/>
									</a>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
};

CareerModal.propTypes = {
	modalCareer: PropTypes.object,
	handleModalClose: PropTypes.func,
};

CareerModal.defaultProps = {
	modalCareer: false,
	handleModalClose() {
		return null;
	},
};

export default CareerModal;
