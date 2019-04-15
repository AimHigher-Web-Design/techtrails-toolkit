import React, { Component } from "react";
import PropTypes from "prop-types";

class Modal extends Component {
	render() {
		const { className, children, handleClose, containerClassName} = this.props;

		return <div className="modal">
			<div className="modal-backdrop" onClick={handleClose} />
			<div className={`modal-inner pos-relative ${containerClassName}`}>
				<button className="close" aria-label="Close" onClick={handleClose}>
					<div aria-hidden="true">×</div>
				</button>
				<div className={`${className} d-flex flex-column modal-content-container`}>
					{children}
				</div>
			</div>
		</div>;
	}
}



Modal.propTypes = {
	className: PropTypes.string,
	containerClassName: PropTypes.string,
	handleClose: PropTypes.func,
	children: PropTypes.node,
};

Modal.defaultProps = {
	handleClose(){ return null },
	className: "",
	containerClassName: "",
};

export default Modal;
