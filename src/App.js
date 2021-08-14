import React, { useState, useEffect } from 'react'
import BasicStatistics from './components/BasicStatistics'
import StatisticsBasedOnUserInput from './components/StatisticsBasedOnUserInput'
import Filter from './components/Filter'
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

	const formatServerResponse = ( response ) => {
		// eslint-disable-next-line no-unused-vars
		const responseObjectKey = Object.keys( response[0] )[0]
		return response[0][responseObjectKey]
	}

	const [ dateOfFirstOrder, setDateOfFirstOrder ] = useState( '' )
	const [ dateOfLatestOrder, setDateOfLatestOrder ] = useState( '' )
	const [ dateOfFirstVaccination, setDateOfFirstVaccination ] = useState( '' )
	const [ dateOfLatestVaccination, setDateOfLatestVaccination ] = useState( '' )
	useEffect( () => {
		orderService
			.getDateOfFirstOrder()
			.then( response => {
				setDateOfFirstOrder( formatServerResponse( response ) )
			} )
		orderService
			.getDateOfLatestOrder()
			.then( response => {
				setDateOfLatestOrder( formatServerResponse( response ) )
			} )
		vaccinationService
			.getDateOfFirstVaccination()
			.then( response => {
				setDateOfFirstVaccination( formatServerResponse( response ) )
			} )
		vaccinationService
			.getDateOfLatestVaccination()
			.then( response => {
				setDateOfLatestVaccination( formatServerResponse( response ) )
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
			
			<BasicStatistics
				dateOfFirstOrder={ dateOfFirstOrder }
				dateOfLatestOrder={ dateOfLatestOrder }
				dateOfFirstVaccination={ dateOfFirstVaccination }
				dateOfLatestVaccination={ dateOfLatestVaccination }>
			</BasicStatistics>

			<h2>Up to this date</h2>
			<p><span>{ dateAndTime.toString() }</span></p>

			<StatisticsBasedOnUserInput
				amountOfOrders={ amountOfOrders }
				amountOfVaccines={ amountOfVaccines }
				amountOfVaccinationsDone={ amountOfVaccinationsDone }
				vaccinesLeftToUse={ vaccinesLeftToUse }>
			</StatisticsBasedOnUserInput>

			<h2>Filter results by using the following time machine</h2>
			<Filter
				timeMachineImg={ timeMachineImg }
				handleDateTimeSubmit={ handleDateTimeSubmit }
				date={ date }
				handleDateChange={ handleDateChange }
				time={ time }
				handleTimeChange={ handleTimeChange }>
			</Filter>
		</div>
	)
}

export default App