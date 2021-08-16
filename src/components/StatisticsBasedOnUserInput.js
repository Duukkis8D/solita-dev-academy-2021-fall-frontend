import React from 'react'

const StatisticsBasedOnUserInput = ( {
	amountOfOrders,
	amountOfVaccines,
	amountOfVaccinationsDone,
	vaccinesLeftToUse } ) => {

	if( typeof amountOfOrders !== 'undefined' &&
		amountOfOrders !== '' &&
		typeof amountOfVaccinationsDone !== 'undefined' && 
		amountOfVaccinationsDone !== '' &&
		typeof amountOfVaccines !== 'undefined' &&
		amountOfVaccines !== '' ) {
		return (
			<div id='statisticsBasedOnUserInput'>
				<p>Amount of orders arrived: <span>{ amountOfOrders }</span></p>
				<p>Amount of vaccines: <span>{ amountOfVaccines }</span></p>
				<p>Amount of vaccinations done: <span>{ amountOfVaccinationsDone }</span></p>
				<p>Amount of vaccines left to use: <span>{ vaccinesLeftToUse }</span>
					<span id='expirationNote'> (Some of them might be expired! <span role='img' aria-label='wastebasket'>🗑️</span>)</span></p>
			</div>
		)
	} else return <div id='statisticsBasedOnUserInput'><p>Loading. Please wait.</p></div>
}

export default StatisticsBasedOnUserInput