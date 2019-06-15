import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import SubjectTile from "../components/Tiles/Subject";
import Signup from "../components/Signup";
import logo from "../images/dotty_bg.png";
import { ALL_SUBJECTS } from "../common/constants";

class IndexPage extends Component {
	constructor() {
		super();
		this.state = {};
	}

	componentWillMount() {
		this.props.setHeaderContent({
			content: this.props.data.wordpressPage.content,
		});
	}

	handleClick = code => {
		this.setState({ modal: { code } });
	};

	handleUncertainClick = () => {
		this.setState({ modal: { code: ALL_SUBJECTS } });
	};

	handleModalClose = () => {
		this.setState({ modal: null });
	};

	render() {
		const { signupForm } = this.props.data;
		const { edges: subjects } = this.props.data.allWordpressRestFilterStructure;
		const { modal } = this.state;

		const { metadesc } = this.props.data.wordpressPage.yoast;

		return (
			<div>
				<Helmet>
					<html lang="en" />
					<meta name="description" content={metadesc} />
				</Helmet>
				<div className="career-menu bg-warning d-none d-md-block position-relative">
					<div className="container">
						<Link
							exact
							to={"/"}
							className="menu-item p-3"
							activeStyle={{
								backgroundColor: "white",
							}}
						>
							Choose my favourite area
						</Link>
						<button
							onClick={this.handleUncertainClick}
							className="menu-item p-3 border-0"
						>
							Help me decide &rarr;
						</button>
					</div>
				</div>
				<div className="subjects-container">
					<div className="container">
						<div className="row">
							{subjects
								.sort(function(a, b) {
									return a.node.order - b.node.order;
								})
								.map(({ node }) => (
									<SubjectTile
										key={node.id}
										className="col-12 col-sm-6 col-lg-3"
										code={node.code}
										label={node.label}
										description={node.description}
										image={node.featured_image_large}
										onClick={this.handleClick}
									/>
								))}
						</div>
					</div>
					{modal && (
						<Signup
							code={modal.code}
							handleClose={this.handleModalClose}
							node={signupForm.edges[0].node}
						/>
					)}
				</div>
				<div className="decision-button d-md-none text-center h4">
					<Link to={"/app"} className="btn btn-primary">
						Help me decide
					</Link>
				</div>
			</div>
		);
	}
}

IndexPage.propTypes = {
	setHeaderContent: PropTypes.func,
	data: PropTypes.object,
};

IndexPage.defaultProps = {
	setHeaderContent: () => {},
};

export default IndexPage;

export const pageQuery = graphql`
	query homePageQuery {
		allWordpressRestFilterStructure {
			edges {
				node {
					id
					label
					description
					code
					featured_image_thumbnail
					featured_image_large
					order
					wordpress_id
				}
			}
		}
		wordpressPage(wordpress_id: { eq: 37 }) {
			title
			content
			yoast {
				metadesc
			}
		}
		site {
			id
			siteMetadata {
				title
			}
		}
		signupForm: allWordpressRestForm(filter: { wordpress_id: { eq: 4 } }) {
			edges {
				node {
					wordpress_id
					title
					description
					button {
						text
					}
					wordpress_fields {
						type
						wordpress_id
						label
						isRequired
						defaultValue
						rangeMin
						rangeMax
						defaultCountry
						inputs {
							wordpress_id
							label
							isHidden
						}
						countries {
							wordpress_id
							label
						}
						choices {
							text
							value
							wordpress_id
						}
					}
				}
			}
		}
	}
`;
