import React, {Fragment} from 'react'
import JobTile from './jobTiles'

const FilterLayout = ({title, jobs, children}) => {
	return (
		<Fragment>
			<h1 dangerouslySetInnerHTML={{__html: title}} />	
			{children}
			<section className="jobs">
				{jobs.map(job => {
					const details = {
						...job.node,
						subject: title,
					}

					return (
						<JobTile {...details} />
					)
				})}
			</section>
		</Fragment>
	)
}

export default FilterLayout