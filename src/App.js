import React from 'react'

const App = () => {

	return (
		<div id='appContainer'>
			<h1>THL vaccine orders and vaccinations</h1>
			<div id='dateTimePickerContainer'>
				<label htmlFor='dateTimePicker'>Choose date and time</label>
				<input type='datetime-local' id='dateTimePicker' name='dateTimePicker'></input>
			</div>
			<div id='vaccineInformation'>
				<h2>Vaccine information</h2>
			</div>
		</div>
	)
}

export default App