import React, { useState, useEffect } from 'react'
import orderService from './services/orderService'

const App = () => {
	const [ date, setDate ] = useState( '' )
	const [ time, setTime ] = useState( '' )
	const [ dateAndTime, setDateAndTime ] = useState( '' )
	const [ amountOfVaccinationsDone, setAmountOfVaccinationsDone ] = useState( '' )
	const [ amountOfVaccines, setAmountOfVaccines ] = useState( '' )

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
		console.log( 'date:', event.target.value )
		setDate( event.target.value )
	}

	const handleTimeChange = ( event ) => {
		console.log( 'time:', event.target.value )
		setTime( event.target.value )
	}

	useEffect( () => {
		orderService
			.getAmountOfVaccinationsDone( dateAndTime )
			.then( response => {
				console.log( 'useEffect(), getAmountOfVaccinationsDone, response[0]:', response[0].numberOfVaccinationsDone )
				setAmountOfVaccinationsDone( response[0].numberOfVaccinationsDone )
			} )
		orderService
			.getAmountOfVaccines( dateAndTime )
			.then( response => {
				console.log( 'useEffect(), getAmountOfVaccines, response[0]:', response[0].totalNumberOfVaccines )
				setAmountOfVaccines( response[0].totalNumberOfVaccines )
			} )
	}, [ dateAndTime ] )

	const renderIfDataIsAvailable = () => {
		if( typeof amountOfVaccinationsDone !== 'undefined' && typeof amountOfVaccines !== 'undefined' ) {
			return (
				<div id='vaccineInformation'>
					<h2>Vaccine information</h2>
					<div>
						<p>Amount of vaccinations done:</p><span>{ amountOfVaccinationsDone }</span>
						<p>Amount of vaccines:</p><span>{ amountOfVaccines }</span>
					</div>
				</div>
			)
		} else return <p>Loading data. Please wait.</p>
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