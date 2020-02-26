import React from "react";
import cx from "classnames";

const Field = ({
	error,
	isRequired,
	type,
	label,
	choices,
	onChange,
	value,
	wordpress_id,
	countries,
	defaultCountry,
}) => {
	switch (type) {
		case "radio":
			return (
				<fieldset className={cx("", { ["has-danger"]: error })}>
					<div className="form-group d-md-flex align-items-center mb-3">
						<legend>{label}</legend>
						{choices.map((choice, index) => (
							<div key={index} className="form-check">
								<input
									type="radio"
									id={choice.wordpress_id}
									className="form-check-input"
									name={wordpress_id}
									value={choice.value}
									onChange={onChange}
									checked={value === choice.value}
									required={isRequired}
								/>
								<label
									className="form-check-label"
									htmlFor={choice.wordpress_id}
								>
									{choice.text}
								</label>
							</div>
						))}
						{error && <div className="form-control-feedback">{error}</div>}
					</div>
				</fieldset>
			);
		case "address":
			return (
				<fieldset className={cx("", { ["has-danger"]: error })}>
					<div
						className={cx("form-group d-sm-flex align-items-center mb-3", {
							["has-danger"]: error,
						})}
					>
						<label htmlFor={wordpress_id}>{label}</label>
						<select
							type={type}
							id={wordpress_id}
							className="form-control"
							name={`${wordpress_id}.6`}
							value={value[`${wordpress_id}.6`] || defaultCountry}
							onChange={onChange}
							required={isRequired}
						>
							{countries.map(country => (
								<option value={country.label} key={country.id}>
									{country.label}
								</option>
							))}
						</select>
						{error && (
							<div
								className="form-control-feedback"
								dangerouslySetInnerHTML={{ __html: error }}
							/>
						)}
					</div>
				</fieldset>
			);
		default:
			return (
				<div
					className={cx("form-group d-sm-flex align-items-center mb-3", {
						["has-danger"]: error,
					})}
				>
					<label htmlFor={wordpress_id}>{label}</label>
					<input
						type={type}
						id={wordpress_id}
						className="form-control"
						name={wordpress_id}
						value={value}
						onChange={onChange}
						required={isRequired}
					/>
					{error && (
						<div
							className="form-control-feedback"
							dangerouslySetInnerHTML={{ __html: error }}
						/>
					)}
				</div>
			);
	}
};

export default Field;
