import React, {Fragment} from 'react'
import JobTile from './jobTiles'

const FilterLayout = ({title, subject, jobs, children}) => {
	
	if(!title) {
		title = `${subject} Careers` || 'Search Results'
	}

	return (
		<div className="container">
			<h1 dangerouslySetInnerHTML={{__html: title}} />	
			{children}
			<section className="jobs">
				<div className="container">
					{jobs.map(job => {
						const details = {
							...job.node,
							subject: subject
						}

						return (
							<JobTile key={job.node.commonWheelProperties.code} {...details} />
						)
					})}
				</div>
			</section>
		</div>
	)
}

export default FilterLayout