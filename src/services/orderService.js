import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/orders'

const getAmountOfVaccinationsDone = ( dateAndTime ) => {
	const request = axios.get( `${baseUrl}/amountOfVaccinationsDone/${dateAndTime}` )
	return request.then( response => response.data )
}

const getAmountOfVaccines = ( dateAndTime ) => {
	const request = axios.get( `${baseUrl}/amountOfVaccines/${dateAndTime}` )
	return request.then( response => response.data )
}

export default {
	getAmountOfVaccinationsDone,
	getAmountOfVaccines
}