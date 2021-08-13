import React, { useState, useEffect } from 'react'
import orderService from './services/orderService'
import vaccinationService from './services/vaccinationService'
import timeMachineImg from './img/time_machine.jpg'

const App = () => {
	const [ date, setDate ] = useState( '' )
	const [ time, setTime ] = useState( '' )
	const [ dateAndTime, setDateAndTime ] = useState( new Date() )

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

	const [ dateOfFirstOrder, setDateOfFirstOrder ] = useState( '' )
	const [ dateOfLatestOrder, setDateOfLatestOrder ] = useState( '' )
	useEffect( () => {
		orderService
			.getDateOfFirstOrder()
			.then( response => {
				setDateOfFirstOrder( response[0].firstOrder )
			} )
		orderService
			.getDateOfLatestOrder()
			.then( response => {
				setDateOfLatestOrder( response[0].latestOrder )
			} )
	}, [] )

	const [ amountOfVaccinationsDone, setAmountOfVaccinationsDone ] = useState( 0 )
	const [ amountOfVaccines, setAmountOfVaccines ] = useState( 0 )
	useEffect( () => {
		if( dateAndTime !== '' ) {
			vaccinationService
				.getAmountOfVaccinationsDone( dateAndTime )
				.then( response => {
					setAmountOfVaccinationsDone( response[0].count )
				} )
			orderService
				.getAmountOfVaccines( dateAndTime )
				.then( response => {
					setAmountOfVaccines( response[0].totalNumberOfVaccines )
				} )
		}
	}, [ dateAndTime ] )

	const [ vaccinesLeftToUse, setVaccinesLeftToUse ] = useState( 0 )
	useEffect( () => {
		setVaccinesLeftToUse( amountOfVaccines - amountOfVaccinationsDone )
	}, [ amountOfVaccinationsDone, amountOfVaccines ] )

	const renderBasicStatistics = () => {
		if( typeof dateOfFirstOrder !== 'undefined' &&
			dateOfFirstOrder !== '' &&
			typeof dateOfLatestOrder !== 'undefined' && 
			dateOfLatestOrder !== '' ) {
			return (
				<div id='basicStatistics'>
					<p>Date of first vaccination order: <span>{ dateOfFirstOrder }</span></p>
					<p>Date of latest vaccination order: <span>{ dateOfLatestOrder }</span></p>
				</div>
			)
		} else return <div id='basicStatistics'><p>Loading. Please wait.</p></div>
	}

	const renderStatisticsBasedOnUserInput = () => {
		if( typeof amountOfVaccinationsDone !== 'undefined' && 
			amountOfVaccinationsDone !== 0 &&
			typeof amountOfVaccines !== 'undefined' &&
			amountOfVaccines !== 0 ) {
			return (
				<div id='vaccineInformation'>
					<p>Amount of vaccinations done: <span>{ amountOfVaccinationsDone }</span></p>
					<p>Amount of vaccines: <span>{ amountOfVaccines }</span></p>
					<p>Amount of vaccines left to use: <span>{ vaccinesLeftToUse }</span> (Some of them might be expired!)</p>
				</div>
			)
		} else return <div id='vaccineInformation'><p>Loading. Please wait.</p></div>
	}

	return (
		<div id='appContainer'>
			<h1>THL vaccine orders and vaccinations</h1>
			{ renderBasicStatistics() }
			<h2>Up to this date</h2>
			<p><span>{ dateAndTime.toString() }</span></p>
			{ renderStatisticsBasedOnUserInput() }
			<h2>Filter results by using the following time machine</h2>
			<img src={ timeMachineImg } alt='funny time machine' width='300px' />
			<form id='dateTimePickerForm' onSubmit={ handleDateTimeSubmit }>
				<div id='dateTimePickerContainer'>
					<label htmlFor='datePicker'>Choose date</label><br></br>
					<input type='date' id='datePicker' name='datePicker' value={ date } onChange={ handleDateChange } required></input><br></br>
					<label htmlFor='timePicker'>Choose time</label><br></br>
					<input type='time' step='1' id='timePicker' name='timePicker' value={ time } onChange={ handleTimeChange } required></input><br></br>
					<button type='submit'>Send</button>
				</div>
			</form>
			<p>Photo <a href="https://www.dreamstime.com/royalty-free-stock-image-time-machine-humour-concept-image17334246">17334246</a> / <a href="https://www.dreamstime.com/photos-images/time-machine.html">Time Machine</a> © <a href="https://www.dreamstime.com/vilax_info">Aleksandr Volkov</a> | <a href="https://www.dreamstime.com/photos-images/time-machine.html">Dreamstime.com</a></p>
		</div>
	)
}

export default App