import React from 'react'

const StatisticsBasedOnUserInput = ( {
	amountOfOrders,
	amountOfVaccines,
	amountOfVaccinationsDone,
	vaccinesLeftToUse,
	vaccinesExpiredBeforeUse } ) => {

	const vaccinesExpiredHappyOrNot = () => {
		const vaccinesExpiredBeforeUseRatio = ( vaccinesExpiredBeforeUse / vaccinesLeftToUse ) * 100
		
		if( vaccinesExpiredBeforeUseRatio < 20 ) {
			return <span role='img' aria-label='superhero'>🦸</span>
		} else if( vaccinesExpiredBeforeUseRatio >= 20 && vaccinesExpiredBeforeUseRatio < 40 ) {
			return <span role='img' aria-label='slightly happy'>🙂</span>
		} else if( vaccinesExpiredBeforeUseRatio >= 40 && vaccinesExpiredBeforeUseRatio < 60 ) {
			return <span role='img' aria-label='worried'>😟</span>
		} else return <span role='img' aria-label='crying'>😭</span>
	}

	if( typeof amountOfOrders !== 'undefined' &&
		amountOfOrders !== '' &&
		typeof amountOfVaccinationsDone !== 'undefined' && 
		amountOfVaccinationsDone !== '' &&
		typeof amountOfVaccines !== 'undefined' &&
		amountOfVaccines !== '' &&
		typeof vaccinesExpiredBeforeUse !== 'undefined' &&
		vaccinesExpiredBeforeUse !== '' ) {
		return (
			<div id='statisticsBasedOnUserInput'>
				<p className='quantifierText statisticsInnerMarginTop'>Number of</p>
				<ul className='statisticsInnerMarginBottom'>
					<li>orders arrived: <span>{ amountOfOrders }</span></li>
					<li>vaccines: <span>{ amountOfVaccines }</span></li>
					<li>vaccinations done: <span>{ amountOfVaccinationsDone }</span></li>
					<li>vaccines left to use: <span>{ vaccinesLeftToUse }</span>
						<span id='expirationNote'> (Some of them might be expired! <span role='img' aria-label='wastebasket'>🗑️</span>)</span></li>
					<li>vaccines expired before the usage: <span>{ vaccinesExpiredBeforeUse }</span> { vaccinesExpiredHappyOrNot() }</li>
				</ul>
			</div>
		)
	} else return <div id='statisticsBasedOnUserInput'><p>Loading. Please wait.</p></div>
}

export default StatisticsBasedOnUserInput