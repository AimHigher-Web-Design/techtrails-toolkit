import React, {Fragment} from 'react'

import {X, ExternalLink} from 'react-feather'

import '../scss/components/jobTile.scss';

const JobTile = ({commonWheelProperties, careerFields, content, title, subject}) => {
	const slug = commonWheelProperties.code,
	{ featuredImage, links, skills, videoThumbnail, videoUrl } = careerFields
	return (
		<Fragment>
			<div className="tile">
				<a href={`#${slug}`}>
					<img src={featuredImage.sourceUrl} />
					<div className="title">{title}</div>
				</a>
			</div>
			<div className="overlay"  id={slug}>
				<section className="modal">
					<a className="close btn" href="#">{<X/>}<span>Close</span></a>
					<header>
						<h2>{title}</h2>
						<p className="subject" dangerouslySetInnerHTML={{__html: subject}} />
						<img src={featuredImage.sourceUrl} />
					</header>
					<div class="content">
						<div className="desc" dangerouslySetInnerHTML={{__html: content}} />
						<h3>Resources</h3>
						<ul className="resources">
							{links.map(l => (
								<li>{<ExternalLink/>}<a href={l.url} target="_blank">{l.label}</a></li>
							))}
						</ul>
						<h3>Skills</h3>
						<div dangerouslySetInnerHTML={{__html: skills}}/>
						{videoThumbnail && <a href={videoUrl}>
							<img src={videoThumbnail.sourceUrl} />
						</a>}
					</div>
				</section>
			</div>
		</Fragment>
	)
}

export default JobTile