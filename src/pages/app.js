import React, { Component } from "react";
import PropTypes from "prop-types";
import QueryString from "query-string";
import Helmet from "react-helmet";
import CareerTile from "../components/Tiles/Career";
import CareerModal from "../components/CareerModal";
import Filter from "../components/Filter/Filter";
import { FILTERS, ALL_SUBJECTS } from "../common/constants";

function potentialAlignments([subjectFilter, sentenceFilter], filters) {
	const subjectFilterStructure = filters.find(
		({ node: filter }) => filter.code === subjectFilter
	);

	if (subjectFilterStructure == undefined) {
		return null;
	}

	if (sentenceFilter) {
		const sentenceFilterStructure = subjectFilterStructure.node.sentences.find(
			sentence => sentence.code === sentenceFilter
		);
		return sentenceFilterStructure.alignments.map(alignment => alignment.code);
	}

	// 🐛 Returning duplicate alignments...
	// Could use Set but I need to check if Gatsby has
	// the polyfill
	return subjectFilterStructure.node.sentences.reduce(
		(acc, sentence) => [
			...acc,
			...sentence.alignments.map(alignment => alignment.code),
		],
		[]
	);
}

class AppPage extends Component {
	constructor(props) {
		super(props);

		// find out what the subject in the url is
		let subject = QueryString.parse(props.location.search).subject;

		this.handleClick = this.handleClick.bind(this);
		this.handleModalClose = this.handleModalClose.bind(this);
		this.clearFilterHandler = this.clearFilterHandler.bind(this);

		this.state = {
			careers: props.data !== undefined ? props.data.careers.edges : [],
			filterStructures:
				props.data !== undefined ? props.data.filterStructures.edges : [],
			modal: null,
			activeFilters: [subject],
			finishedOneTime: false,
		};

		this.filterChangeHandler = this.filterChangeHandler.bind(this);
	}

	filterChangeHandler(activeFilters) {
		this.setState({
			activeFilters,
		});
	}

	/**
	 * This is what happens when a user clicks on a career tile.
	 *
	 * @param {*} evt
	 */
	handleClick(evt) {
		evt.preventDefault();

		this.setState(
			{
				modal: {
					code: evt.currentTarget.dataset.code,
				},
				finishedOneTime: true,
			},
			() => document.body.classList.add("modal-open")
		);
	}

	handleModalClose(evt) {
		if (evt && evt.preventDefault) {
			evt.preventDefault();
		}

		this.setState(
			{
				modal: null,
			},
			() => document.body.classList.remove("modal-open")
		);
	}

	clearFilterHandler(evt) {
		if (evt && evt.preventDefault) {
			evt.preventDefault();
		}

		this.setState({ activeFilters: [] });
		window.scroll({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}

	render() {
		// Destructuring GraphQL's result
		// this.props.data.filterStructures.edges -> filterStructures
		const {
			careers,
			filterStructures,
			activeFilters,
			modal,
			finishedOneTime,
		} = this.state;

		let filteredCareers = careers;

		// if filters are selected, find out what careers should be shown.
		if (activeFilters.length > 0 && activeFilters[0] !== ALL_SUBJECTS) {
			let possibleAlignments;

			// if the active filters is 3 in length, then the user has selected an alignemnt.
			if (activeFilters.length === 3) {
				possibleAlignments = activeFilters[FILTERS.ALIGNMENT];
			} else {
				// otherwise they have selected a subject or sentence, so we need to find out what alignments are associated with them
				possibleAlignments = potentialAlignments(
					activeFilters,
					filterStructures
				);
			}

			// filter the careers to only include the possible alignments we have got
			if (possibleAlignments !== null) {
				filteredCareers = filteredCareers.filter(({ node: career }) =>
					career.alignments.find(alignment =>
						possibleAlignments.includes(alignment.code)
					)
				);
			}
		}

		let modalCareer = null;

		let modalFilters = {};
		// Get the labels for all the subjects / filters / alignments that have been selected
		if (modal) {
			modalCareer = filteredCareers.find(
				career => career.node.code === modal.code
			);
			const subject = filterStructures.find(
				({ node: filter }) => activeFilters[FILTERS.SUBJECT] === filter.code
			);

			if (subject) {
				modalFilters[FILTERS.SUBJECT] = subject.node;
			}

			if (modalFilters[FILTERS.SUBJECT] && activeFilters[FILTERS.SENTENCE]) {
				modalFilters[FILTERS.SENTENCE] = modalFilters[
					FILTERS.SUBJECT
				].sentences.find(e => e.code === activeFilters[FILTERS.SENTENCE]);
			}

			if (modalFilters[FILTERS.SENTENCE] && activeFilters[FILTERS.ALIGNMENT]) {
				modalFilters[FILTERS.ALIGNMENT] = modalFilters[
					FILTERS.SENTENCE
				].alignments.find(e => e.code === activeFilters[FILTERS.ALIGNMENT]);
			}
		}

		return (
			<div>
				<Helmet>
					<html lang="en" />
					<meta name="description" content={"Choose your career"} />
				</Helmet>
				<Filter
					activeFilters={activeFilters}
					filters={filterStructures}
					onChange={this.filterChangeHandler}
				/>
				<div className="container pr-0">
					<div className="card-deck flex-wrap mt-4 mb-4 w-100 mx-lg-0 d-block d-sm-flex">
						{filteredCareers.map(career => (
							<CareerTile
								key={career.node.wordpress_id}
								code={career.node.code}
								title={career.node.label}
								image={career.node.featured_image_thumbnail}
								onClick={this.handleClick}
							/>
						))}
						{modal && (
							<CareerModal
								modalCareer={modalCareer}
								handleModalClose={this.handleModalClose}
								activeFilters={modalFilters}
							/>
						)}
					</div>
					{finishedOneTime && (
						<div className="d-flex justify-content-center align-items-center mb-4">
							<button
								type="button"
								className="btn btn-primary"
								onClick={this.clearFilterHandler}
							>
								Start Over
							</button>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default AppPage;

export const pageQuery = graphql`
	query appQuery {
		filterStructures: allWordpressRestFilterStructure {
			edges {
				node {
					id
					label
					code
					order
					wordpress_id
					sentences {
						label
						code
						alignments {
							label
							code
						}
					}
				}
			}
		}
		careers: allWordpressRestCareer {
			edges {
				node {
					id
					wordpress_id
					label
					code
					featured_image_thumbnail
					featured_image_large
					content
					resources {
						label
						url
					}
					skills
					alignments {
						label
						code
					}
					videoUrl
					videoThumbnail
				}
			}
		}
	}
`;
