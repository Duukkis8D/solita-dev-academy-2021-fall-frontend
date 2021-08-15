import React, { useState, useEffect } from 'react'
import BasicStatistics from './components/BasicStatistics'
import StatisticsBasedOnUserInput from './components/StatisticsBasedOnUserInput'
import Filter from './components/Filter'
import orderService from './services/orderService'
import vaccinationService from './services/vaccinationService'
import timeMachineImg from './img/time_machine.jpg'
import './css/App.css'

const App = () => {
	const [ date, setDate ] = useState( '' )
	const [ time, setTime ] = useState( '' )
	const [ dateAndTime, setDateAndTime ] = useState( new Date() )

	const handleDateTimeSubmit = ( event ) => {
		event.preventDefault()

		console.log( 'date, event.target[0].value:', event.target[0].value )
		console.log( 'time, event.target[1].value:', event.target[1].value )
		const submittedDate = event.target[0].value
		const submittedTime = event.target[1].value
		setDateAndTime( new Date(
			submittedDate
				.concat( 'T' )
				.concat( submittedTime )
				.concat( 'Z' )
		) )
	}

	const handleDateChange = ( event ) => {
		setDate( event.target.value )
	}

	const handleTimeChange = ( event ) => {
		setTime( event.target.value )
	}

	const formatServerResponse = ( response ) => {
		// eslint-disable-next-line no-unused-vars
		const responseObjectKey = Object.keys( response[0] )[0]
		return response[0][responseObjectKey]
	}

	const formatDateAndTimeObject = ( dateAndTimeObject ) => {
		console.log( 'dateAndTimeObject:', dateAndTimeObject )
		return (
			dateAndTimeObject.getUTCFullYear() +
			'-' + ( '0' + ( dateAndTimeObject.getUTCMonth() + 1 ) ).slice( -2 ) + 
			'-' + ( '0' + dateAndTimeObject.getUTCDate() ).slice( -2 ) + 
			' ' + ( '0' + dateAndTimeObject.getUTCHours() ).slice( -2 ) +
			':' + ( '0' + dateAndTimeObject.getUTCMinutes() ).slice( -2 ) +
			':' + ( '0' + dateAndTimeObject.getUTCSeconds() ).slice( -2 )
		)
	}

	const formatDateAndTimeString = ( dateAndTimeString ) => {
		//'2021-11-25T21:28:06.655Z' --> '2021-11-25 21:28:06'
		return formatDateAndTimeObject( new Date( dateAndTimeString ) )
	}

	const [ dateOfFirstOrder, setDateOfFirstOrder ] = useState( '' )
	const [ dateOfLatestOrder, setDateOfLatestOrder ] = useState( '' )
	const [ dateOfFirstVaccination, setDateOfFirstVaccination ] = useState( '' )
	const [ dateOfLatestVaccination, setDateOfLatestVaccination ] = useState( '' )
	useEffect( () => {
		orderService
			.getDateOfFirstOrder()
			.then( response => {
				setDateOfFirstOrder( formatDateAndTimeString( formatServerResponse( response ) ) )
			} )
		orderService
			.getDateOfLatestOrder()
			.then( response => {
				setDateOfLatestOrder( formatDateAndTimeString( formatServerResponse( response ) ) )
			} )
		vaccinationService
			.getDateOfFirstVaccination()
			.then( response => {
				setDateOfFirstVaccination( formatDateAndTimeString( formatServerResponse( response ) ) )
			} )
		vaccinationService
			.getDateOfLatestVaccination()
			.then( response => {
				setDateOfLatestVaccination( formatDateAndTimeString( formatServerResponse( response ) ) )
			} )
	}, [] )

	const [ amountOfOrders, setAmountOfOrders ] = useState( 0 )
	const [ amountOfVaccinationsDone, setAmountOfVaccinationsDone ] = useState( 0 )
	const [ amountOfVaccines, setAmountOfVaccines ] = useState( 0 )
	useEffect( () => {
		if( dateAndTime !== '' ) {
			orderService
				.getAmountOfOrders( dateAndTime )
				.then( response => {
					setAmountOfOrders( formatServerResponse( response ) )
				} )
			vaccinationService
				.getAmountOfVaccinationsDone( dateAndTime )
				.then( response => {
					setAmountOfVaccinationsDone( formatServerResponse( response ) )
				} )
			orderService
				.getAmountOfVaccines( dateAndTime )
				.then( response => {
					setAmountOfVaccines( formatServerResponse( response ) )
				} )
		}
	}, [ dateAndTime ] )

	const [ vaccinesLeftToUse, setVaccinesLeftToUse ] = useState( 0 )
	useEffect( () => {
		setVaccinesLeftToUse( amountOfVaccines - amountOfVaccinationsDone )
	}, [ amountOfVaccinationsDone, amountOfVaccines ] )

	return (
		<div id='appContainer'>
			<h1>THL vaccine orders and vaccinations</h1>
			<p id='allDatesUTC'>All dates are UTC (Coordinated Universal Time) unless otherwise stated</p>

			<BasicStatistics
				dateOfFirstOrder={ dateOfFirstOrder }
				dateOfLatestOrder={ dateOfLatestOrder }
				dateOfFirstVaccination={ dateOfFirstVaccination }
				dateOfLatestVaccination={ dateOfLatestVaccination }>
			</BasicStatistics>

			<h2 id='givenDateHeadline'>
				Up to the following date (your local time zone) <span id='givenDate'>{ formatDateAndTimeObject( dateAndTime ) }</span>
			</h2>

			<StatisticsBasedOnUserInput
				amountOfOrders={ amountOfOrders }
				amountOfVaccines={ amountOfVaccines }
				amountOfVaccinationsDone={ amountOfVaccinationsDone }
				vaccinesLeftToUse={ vaccinesLeftToUse }>
			</StatisticsBasedOnUserInput>

			<h2 id='filterHeadline'>Filter results by using the following time machine</h2>

			<img id='timeMachineImg' src={ timeMachineImg } alt='funny time machine' width='300px' />

			<Filter
				handleDateTimeSubmit={ handleDateTimeSubmit }
				date={ date }
				handleDateChange={ handleDateChange }
				time={ time }
				handleTimeChange={ handleTimeChange }>
			</Filter>

			<p>Photo <a href="https://www.dreamstime.com/royalty-free-stock-image-time-machine-humour-concept-image17334246">17334246</a> / <a href="https://www.dreamstime.com/photos-images/time-machine.html">Time Machine</a> © <a href="https://www.dreamstime.com/vilax_info">Aleksandr Volkov</a> | <a href="https://www.dreamstime.com/photos-images/time-machine.html">Dreamstime.com</a></p>
		</div>
	)
}

export default App