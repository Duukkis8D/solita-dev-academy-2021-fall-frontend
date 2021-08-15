import React from 'react'

const Filter = ( {
	handleDateTimeSubmit,
	date,
	handleDateChange,
	time,
	handleTimeChange } ) => {

	return (
		<form id='dateTimePickerForm' onSubmit={ handleDateTimeSubmit }>
			<div id='dateTimePickerContainer'>
				<label htmlFor='datePicker'>Choose date</label><br></br>
				<input type='date' id='datePicker' name='datePicker' value={ date } onChange={ handleDateChange } required></input><br></br>
				<label htmlFor='timePicker'>Choose time</label><br></br>
				<input type='time' step='1' id='timePicker' name='timePicker' value={ time } onChange={ handleTimeChange } required></input><br></br>
				<button type='submit'>Send</button>
			</div>
		</form>
	)
}

export default Filter