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

	const [ minDateAndTime, setMinDateAndTime ] = useState( '' )
	const [ maxDateAndTime, setMaxDateAndTime ] = useState( '' )
	useEffect( () => {
		if( typeof dateOfFirstOrder !== 'undefined' &&
			dateOfFirstOrder !== '' &&
			typeof dateOfLatestOrder !== 'undefined' &&
			dateOfLatestOrder !== '' &&
			typeof dateOfFirstVaccination !== 'undefined' &&
			dateOfFirstVaccination !== '' &&
			typeof dateOfLatestVaccination !== 'undefined' &&
			dateOfLatestVaccination !== '' ) {
			if( new Date( dateOfFirstOrder ) < new Date( dateOfFirstVaccination ) ) {
				setMinDateAndTime( new Date( dateOfFirstOrder ) )
			} else {
				setMinDateAndTime( new Date( dateOfFirstVaccination ) )
			}

			if( new Date( dateOfLatestOrder ) < new Date( dateOfLatestVaccination ) ) {
				setMaxDateAndTime( new Date( dateOfLatestVaccination ) )
			} else {
				setMaxDateAndTime( new Date( dateOfLatestOrder ) )
			}
		}
	}, [ 
		dateOfFirstOrder,
		dateOfLatestOrder,
		dateOfFirstVaccination,
		dateOfLatestVaccination 
	] )

	const [ amountOfOrders, setAmountOfOrders ] = useState( '' )
	const [ amountOfVaccinationsDone, setAmountOfVaccinationsDone ] = useState( '' )
	const [ amountOfVaccines, setAmountOfVaccines ] = useState( '' )
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

	const [ vaccinesLeftToUse, setVaccinesLeftToUse ] = useState( '' )
	useEffect( () => {
		setVaccinesLeftToUse( amountOfVaccines - amountOfVaccinationsDone )
	}, [ amountOfVaccinationsDone, amountOfVaccines ] )

	return (
		<div id='appContainer'>
			<h1>THL vaccine orders and vaccinations <span role='img' aria-label='vaccination'>💉</span></h1>
			<p id='allDatesUTC'><span role='img' aria-label='info'>ℹ️</span> All dates are UTC (Coordinated Universal Time)</p>

			<BasicStatistics
				dateOfFirstOrder={ dateOfFirstOrder }
				dateOfLatestOrder={ dateOfLatestOrder }
				dateOfFirstVaccination={ dateOfFirstVaccination }
				dateOfLatestVaccination={ dateOfLatestVaccination }>
			</BasicStatistics>

			<h2 id='timeMachineHeadline'>Go back in time section</h2>
			<p id='timeMachineDescription'><span role='img' aria-label='calendar'>📅</span> Give a date and time to this time machine to see the history</p>
			<img id='timeMachineImg' src={ timeMachineImg } alt='funny time machine' width='245px' />

			<Filter
				handleDateTimeSubmit={ handleDateTimeSubmit }
				date={ date }
				handleDateChange={ handleDateChange }
				time={ time }
				handleTimeChange={ handleTimeChange }
				minDateAndTime={ minDateAndTime }
				maxDateAndTime={ maxDateAndTime }>
			</Filter>

			<p id='givenDateDescription'>Data based on the following date:</p>
			<p id='givenDate'>{ formatDateAndTimeObject( dateAndTime ) }</p>

			<StatisticsBasedOnUserInput
				amountOfOrders={ amountOfOrders }
				amountOfVaccines={ amountOfVaccines }
				amountOfVaccinationsDone={ amountOfVaccinationsDone }
				vaccinesLeftToUse={ vaccinesLeftToUse }>
			</StatisticsBasedOnUserInput>

			<p id='photoInfo'>Photo <a href="https://www.dreamstime.com/royalty-free-stock-image-time-machine-humour-concept-image17334246">17334246</a> / <a href="https://www.dreamstime.com/photos-images/time-machine.html">Time Machine</a> © <a href="https://www.dreamstime.com/vilax_info">Aleksandr Volkov</a> | <a href="https://www.dreamstime.com/photos-images/time-machine.html">Dreamstime.com</a></p>
		</div>
	)
}

export default App