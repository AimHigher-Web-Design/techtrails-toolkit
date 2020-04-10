import React, {Fragment} from 'react'

import {X, ExternalLink} from 'react-feather'

import '../scss/components/jobTile.scss';

const JobTile = ({commonWheelProperties, slug, careerFields, content, title, subject, subjectCode, relatedAlignments}) => {
	const code = commonWheelProperties.code || slug,
	{ featuredImage, links, skills, videoThumbnail, videoUrl } = careerFields,
	openJob = (job) => {
		document.querySelector(`.overlay#${job}`).style.display = 'block'
	},
	closeJob = (job) => {
		document.querySelector(`.overlay#${job}`).style.display = 'none'
	}

	let tags = [],
	path = `/careers`

	relatedAlignments.alignments.forEach(a => {
		tags.push(a.commonWheelProperties.code)
	})

	if(subject) {
		path = `/subject/${subjectCode}`
	}

	return (
		<Fragment>
			<div className="tile" data-tags={tags}>
				<button onClick={() => {openJob(code)}}>
					<img src={featuredImage.sourceUrl} />
					<div className="title">{title}</div>
				</button>
			</div>
			<div className="overlay"  id={code}>
				<section className="modal">
					<button className="close btn" onClick={() => {closeJob(code)}}>{<X/>}<span>Close</span></button>
					<header>
						<h2>{title}</h2>
						<p className="subject" dangerouslySetInnerHTML={{__html: subject}} />
						<img src={featuredImage.sourceUrl} />
					</header>
					<div className="content">
						<div className="desc" dangerouslySetInnerHTML={{__html: content}} />
						{links && 
							<Fragment>
								<h3>Resources</h3>
								<ul className="resources">
									{links.map(l => (
										<li key={l.url}>{<ExternalLink/>}<a href={l.url} target="_blank">{l.label}</a></li>
									))}
								</ul>
							</Fragment>
						}
						<h3>Skills</h3>
						<div dangerouslySetInnerHTML={{__html: skills}}/>
						{videoThumbnail && <a href={videoUrl} className="video" target="_blank">
							<img src={videoThumbnail.sourceUrl} />
						</a>}
					</div>
				</section>
			</div>
		</Fragment>
	)
}

export default JobTile