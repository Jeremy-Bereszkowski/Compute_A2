import React, { useState } from 'react'
import Loading from './res/Loading'
import Posts from './res/Posts'
import Pagination from './res/Pagination'
import './res/index.scss'

function ForecastView(props) {
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(3);

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = props.forecast.slice(indexOfFirstPost, indexOfLastPost);

	// Change page
	const paginate = pageNumber => setCurrentPage(pageNumber);

	return (
		<div className="ForecastView">
			<div className="city-name">
				<span>{props.cityName}</span>
			</div>
			{props.loading ? ( <Loading /> ) : (
				<div className="forecast-day">
					<Posts posts={currentPosts}/>
					<Pagination
						postsPerPage={postsPerPage}
						totalPosts={props.forecast.length}
						paginate={paginate}
					/>
				</div>
			)}
		</div>
	)
}

export default ForecastView;