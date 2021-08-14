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
				<p>Date of first vaccine order: <span>{ dateOfFirstOrder }</span></p>
				<p>Date of latest vaccine order: <span>{ dateOfLatestOrder }</span></p>
				<p>Date of first vaccination: <span>{ dateOfFirstVaccination }</span></p>
				<p>Date of latest vaccination: <span>{ dateOfLatestVaccination }</span></p>
			</div>
		)
	} else return <div id='basicStatistics'><p>Loading. Please wait.</p></div>
}

export default BasicStatistics