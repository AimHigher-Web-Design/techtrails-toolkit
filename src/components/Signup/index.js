import React, { Component } from "react";
import { navigateTo } from "gatsby-link";
import Modal from "../Modal";
import Field from "./field";
import Link from "gatsby-link";

class Signup extends Component {
	state = { inputs: {}, errors: {} };

	componentDidMount() {
		const inputs = this.state.inputs;
		this.props.node["wordpress_fields"].forEach(field => {
			if (field.type == "address") {
				field.inputs.forEach(input => {
					inputs[field.wordpress_id] = {};
					if (!input.isHidden) {
						inputs[field.wordpress_id][input.wordpress_id] = "";

						if (input.label == "Country") {
							inputs[field.wordpress_id][input.wordpress_id] =
								field.defaultCountry;
						}
					}
				});
			}
		});
	}

	handleInput = evt => {
		const target = evt.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;

		if (evt.target.name.includes(".")) {
			this.setState({
				inputs: { ...this.state.inputs, [evt.target.id]: { [name]: value } },
			});
			return;
		}

		this.setState({
			inputs: { ...this.state.inputs, [name]: value },
		});
	};

	handleSubmit = evt => {
		evt.preventDefault();
		const { code, node } = this.props;
		const { inputs } = this.state;

		const body = { ["input_values"]: {} };

		Object.keys(inputs).forEach(key => {
			if (typeof inputs[key] == "object") {
				Object.keys(inputs[key]).forEach(innerKey => {
					body["input_values"][`input_${innerKey.replace(".", "_")}`] =
						inputs[key][innerKey];
				});
			} else {
				body["input_values"][`input_${key}`] = inputs[key];
			}
		});

		const url = `/gravityformsapi/forms/${node.wordpress_id}/submissions`;

		this.setState({ pending: true });

		fetch(url, {
			method: "POST",
			body: JSON.stringify(body),
			headers: new Headers({
				"Content-Type": "application/json",
			}),
		})
			.then(res => res.json())
			.then(res => {
				const response = res.response;
				if (response["is_valid"]) {
					navigateTo(`/app?subject=${code}`);
				} else {
					this.setState({
						pending: false,
						errors: { ...response["validation_messages"] },
					});
				}
			})
			.catch(err => {
				// if anything went wrong, don't worry about it just move on
				navigateTo(`/app?subject=${code}`);
				throw err;
			});
	};

	render() {
		const { code, handleClose, node } = this.props;
		const { errors, inputs, pending } = this.state;

		return (
			<Modal
				handleClose={handleClose}
				className="signup-modal"
				containerClassName="signup-modal-container"
			>
				<div className="modal-header p-4 pb-0 border-bottom-0">
					<h2 className="h1 signup-header">{node.title}</h2>
				</div>
				<form onSubmit={this.handleSubmit}>
					<div className="modal-body border-bottom-0 pt-0 px-4">
						<p className="mb-4">{node.description}</p>
						{node["wordpress_fields"].map((field, index) => (
							<Field
								key={index}
								{...field}
								onChange={this.handleInput}
								value={inputs[field.wordpress_id] || ""}
								error={errors[field.wordpress_id]}
							/>
						))}
					</div>
					<div className="modal-footer border-top-0 d-flex align-items-center justify-content-center">
						<button type="submit" className="btn btn-primary mb-1">
							{pending ? "Submitting..." : node.button.text}
						</button>
					</div>
				</form>
				<Link to={`/app?subject=${code}`} className="bypass-text px-4 mb-4">
					I already submitted my details ...
				</Link>
			</Modal>
		);
	}
}

export default Signup;
