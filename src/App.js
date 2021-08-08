import React, { useState, useEffect } from 'react'
import orderService from './services/orderService'

const App = () => {
	const [ date, setDate ] = useState( '' )
	const [ time, setTime ] = useState( '' )
	const [ dateAndTime, setDateAndTime ] = useState( '' )
	const [ amountOfVaccinationsDone, setAmountOfVaccinationsDone ] = useState( 0 )
	const [ amountOfVaccines, setAmountOfVaccines ] = useState( 0 )

	const handleDateTimeSubmit = ( event ) => {
		event.preventDefault()

		const submittedDate = event.target[0].value
		const submittedTime = event.target[1].value
		setDateAndTime( submittedDate
			.concat( 'T' )
			.concat( submittedTime )
			.concat( 'Z' ) 
		)
	}

	const handleDateChange = ( event ) => {
		setDate( event.target.value )
	}

	const handleTimeChange = ( event ) => {
		setTime( event.target.value )
	}

	useEffect( () => {
		if( dateAndTime !== '' ) {
			orderService
				.getAmountOfVaccinationsDone( dateAndTime )
				.then( response => {
					setAmountOfVaccinationsDone( response[0].numberOfVaccinationsDone )
				} )
			orderService
				.getAmountOfVaccines( dateAndTime )
				.then( response => {
					setAmountOfVaccines( response[0].totalNumberOfVaccines )
				} )
		}
	}, [ dateAndTime ] )

	const renderIfDataIsAvailable = () => {
		if( typeof amountOfVaccinationsDone !== 'undefined' && 
			amountOfVaccinationsDone !== 0 &&
			typeof amountOfVaccines !== 'undefined' &&
			amountOfVaccines !== 0 ) {
			return (
				<div id='vaccineInformation'>
					<h2>Vaccine information</h2>
					<div>
						<p>Amount of vaccinations done: <span>{ amountOfVaccinationsDone }</span></p>
						<p>Amount of vaccines: <span>{ amountOfVaccines }</span></p>
					</div>
				</div>
			)
		}
	}

	return (
		<div id='appContainer'>
			<h1>THL vaccine orders and vaccinations</h1>
			<form id='dateTimePickerForm' onSubmit={ handleDateTimeSubmit }>
				<div id='dateTimePickerContainer'>
					<label htmlFor='datePicker'>Choose date</label><br></br>
					<input type='date' id='datePicker' name='datePicker' value={ date } onChange={ handleDateChange } required></input><br></br>
					<label htmlFor='timePicker'>Choose time</label><br></br>
					<input type='time' step='1' id='timePicker' name='timePicker' value={ time } onChange={ handleTimeChange } required></input><br></br>
					<button type='submit'>Send</button>
				</div>
			</form>
			{ renderIfDataIsAvailable() }
		</div>
	)
}

export default App