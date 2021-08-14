import React from 'react'

const StatisticsBasedOnUserInput = ( {
	amountOfOrders,
	amountOfVaccines,
	amountOfVaccinationsDone,
	vaccinesLeftToUse } ) => {

	if( typeof amountOfOrders !== 'undefined' &&
		amountOfOrders !== 0 &&
		typeof amountOfVaccinationsDone !== 'undefined' && 
		amountOfVaccinationsDone !== 0 &&
		typeof amountOfVaccines !== 'undefined' &&
		amountOfVaccines !== 0 ) {
		return (
			<div id='statisticsBasedOnUserInput'>
				<p>Amount of orders arrived: <span>{ amountOfOrders }</span></p>
				<p>Amount of vaccines: <span>{ amountOfVaccines }</span></p>
				<p>Amount of vaccinations done: <span>{ amountOfVaccinationsDone }</span></p>
				<p>Amount of vaccines left to use: <span>{ vaccinesLeftToUse }</span> (Some of them might be expired!)</p>
			</div>
		)
	} else return <div id='statisticsBasedOnUserInput'><p>Loading. Please wait.</p></div>
}

export default StatisticsBasedOnUserInput