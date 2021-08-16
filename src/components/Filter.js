import React from 'react'

const Filter = ( {
	handleDateTimeSubmit,
	date,
	handleDateChange,
	time,
	handleTimeChange,
	minDateAndTime,
	maxDateAndTime } ) => {

	const formatDateAndTimeObject = ( dateAndTimeObject ) => {
		return (
			dateAndTimeObject.getUTCFullYear() +
				'-' + ( '0' + ( dateAndTimeObject.getUTCMonth() + 1 ) ).slice( -2 ) + 
				'-' + ( '0' + dateAndTimeObject.getUTCDate() ).slice( -2 )
		)
	}

	if( typeof minDateAndTime !== 'undefined' &&
		minDateAndTime !== '' && 
		typeof maxDateAndTime !== 'undefined' &&
		maxDateAndTime !== '' ) {
		return (
			<div id='dateTimePickerContainer'>
				<form id='dateTimePickerForm' onSubmit={ handleDateTimeSubmit }>
					<label htmlFor='datePicker'>Choose date</label><br></br>
					<input type='date' id='datePicker' name='datePicker' value={ date } onChange={ handleDateChange } required
						min={ formatDateAndTimeObject( minDateAndTime ) }
						max={ formatDateAndTimeObject( maxDateAndTime ) }>
					</input><br></br>
					<label htmlFor='timePicker'>Choose time</label><br></br>
					<input type='time' step='1' id='timePicker' name='timePicker' value={ time } onChange={ handleTimeChange } required></input><br></br>
					<button type='submit'>Send <span role='img' aria-label='letter'>✉️</span></button>
				</form>
			</div>
		)
	} else return <div id='dateTimePickerContainer'><p>Loading. Please wait.</p></div>
}

export default Filter