import React from 'react'

const BasicStatistics = ( {
	dateOfFirstOrder,
	dateOfLatestOrder,
	dateOfFirstVaccination,
	dateOfLatestVaccination } ) => {

	if( typeof dateOfFirstOrder !== 'undefined' &&
		dateOfFirstOrder !== '' &&
		typeof dateOfLatestOrder !== 'undefined' && 
		dateOfLatestOrder !== '' &&
		typeof dateOfFirstVaccination !== 'undefined' &&
		dateOfFirstVaccination !== '' &&
		typeof dateOfLatestVaccination !== 'undefined' &&
		dateOfLatestVaccination !== '' ) {
		return (
			<div id='basicStatistics'>
				<p className='quantifierText statisticsInnerMarginTop'>Date of</p>
				<ul className='statisticsInnerMarginBottom'>
					<li>first vaccine order: <span>{ dateOfFirstOrder }</span></li>
					<li>latest vaccine order: <span>{ dateOfLatestOrder }</span></li>
					<li>first vaccination: <span>{ dateOfFirstVaccination }</span></li>
					<li>latest vaccination: <span>{ dateOfLatestVaccination }</span></li>
				</ul>
			</div>
		)
	} else return <div id='basicStatistics'><p>Loading. Please wait.</p></div>
}

export default BasicStatistics