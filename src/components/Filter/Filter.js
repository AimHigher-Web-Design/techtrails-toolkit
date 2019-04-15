import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { FILTERS } from "../../common/constants";
import divider from "../../images/sentence-divider.png";
import cross from "../../images/cross.png";

const Filter = ({ activeFilters = [], filters, onChange }) => {
	const onClickHandler = (code, level) => {
		let newActiveFilters = activeFilters.slice(0, level);
		if (activeFilters[level] !== code) {
			newActiveFilters.push(code);
		}

		onChange(newActiveFilters);
	};

	let sentenceFilters = [];
	let alignmentFilters = [];
	let activeSubject = filters.find(
		({ node: filter }) => activeFilters[FILTERS.SUBJECT] === filter.code
	);

	if (activeSubject) {
		sentenceFilters = activeSubject.node.sentences;

		if (activeFilters[FILTERS.SENTENCE]) {
			let activeSentenceFilter = activeSubject.node.sentences.find(
				element => element.code === activeFilters[FILTERS.SENTENCE]
			);
			alignmentFilters = activeSentenceFilter.alignments;
		}
	}


	let offset = 0;
	const nFilters = sentenceFilters.length;
	if (activeFilters[FILTERS.SENTENCE]) {
		offset = sentenceFilters.indexOf(sentenceFilters.find(f => f.code === activeFilters[FILTERS.SENTENCE]));
		offset = nFilters > 1 ? offset * 100 / (nFilters - 1) : 50;
	}

	// This needs cleaning. Likely the tabs put into a component but the styling will dictate that.
	return (
		<div className="mb-3 filter-container">
			<div className={`bg-warning ${activeSubject ? `filter-border-${activeSubject.node.code}` : ""}`} >
				<div className="container">
					<div className="d-flex justify-content-between flex-column flex-md-row">
						{filters.sort((a, b) => a.node.order - b.node.order).map(({ node: filter }) => {
							return (
								<button
									key={filter.code}
									className={cx(`btn text-white filter filter-subject text-uppercase subject-${filter.code}`, {
										active: filter.code === activeFilters[FILTERS.SUBJECT],
									})}
									aria-pressed={filter.code === activeFilters[FILTERS.SUBJECT]}
									type="button"
									onClick={onClickHandler.bind(null, filter.code, FILTERS.SUBJECT)}

								>
									{filter.label}
									{filter.code === activeFilters[FILTERS.SUBJECT] && <img src={cross} className="filter-close" role="presentation" />}
								</button>
							)
						})}
					</div>
				</div>
			</div>
			{activeFilters[FILTERS.SUBJECT] && (
				<div className="bg-light py-2">
					<div className="container">
						<div className="d-flex justify-content-between filter-sentence-row flex-column flex-md-row m-3 align-items-center">
							{sentenceFilters.map((filter, i) => (
								[
									<button
										key={filter.code}
										className={cx("btn filter filter-sentence mx-md-auto", {
											active: filter.code === activeFilters[FILTERS.SENTENCE],
										})}
										aria-pressed={filter.code === activeFilters[FILTERS.SENTENCE]}
										type="button"
										onClick={onClickHandler.bind(null, filter.code, FILTERS.SENTENCE)}
									>
										{filter.label}
										{filter.code === activeFilters[FILTERS.SENTENCE] && <img src={cross} className="filter-close" role="presentation" />}
									</button>,
									sentenceFilters.length - 1 !== i && <img className="d-none d-md-block filter-divider" src={divider} role="presentation" />
								]
							))}
						</div>
					</div>
				</div>
			)}
			{activeFilters[FILTERS.SENTENCE] && (
				<div className="bg-medium py-2">
					<div className="container">
						<div className="filter-alignment-row mx-auto my-0 text-center text-md-left">
							<div className="d-inline-block alignment-container" style={{left: `${offset}%`}}>
								{alignmentFilters.map(filter => (
									<button
										key={filter.code}
										className={cx("btn filter filter-alignment", {
											active: filter.code === activeFilters[FILTERS.ALIGNMENT],
										})}
										aria-pressed={filter.code === activeFilters[FILTERS.ALIGNMENT]}
										type="button"
										onClick={onClickHandler.bind(
											null,
											filter.code,
											FILTERS.ALIGNMENT
										)}
									>
										{filter.label}
										{filter.code === activeFilters[FILTERS.ALIGNMENT] && <img src={cross} className="filter-close" role="presentation" />}
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

Filter.propTypes = {
	filters: PropTypes.array.isRequired,
	onChange: PropTypes.func,
	activeFilters: PropTypes.array,
};

Filter.defaultProps = {
	activeFilters: [],
	onChange() { }, // noop
};

export default Filter;
