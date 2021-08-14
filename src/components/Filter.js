import React from 'react'

const Filter = ( {
	timeMachineImg,
	handleDateTimeSubmit,
	date,
	handleDateChange,
	time,
	handleTimeChange } ) => {

	return (
		<div id='filterContainer'>
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

export default Filter