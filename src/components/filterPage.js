import React, {Fragment} from 'react'
import JobTile from './jobTiles'

const FilterLayout = ({title, subject, jobs, children}) => {
	
	if(!title) {
		title = subject || 'Search Results'
	}

	return (
		<Fragment>
			<h1 dangerouslySetInnerHTML={{__html: title}} />	
			{children}
			<section className="jobs">
				{jobs.map(job => {
					const details = {
						...job.node,
						subject: subject
					}

					return (
						<JobTile key={job.node.commonWheelProperties.code} {...details} />
					)
				})}
			</section>
		</Fragment>
	)
}

export default FilterLayout