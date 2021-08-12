import axios from 'axios'
const baseUrl = '/api/vaccinations'

const getAmountOfVaccinationsDone = ( dateAndTime ) => {
	const request = axios.get( `${baseUrl}/amountOfVaccinationsDone/${dateAndTime}` )
	return request.then( response => response.data )
}

export default {
	getAmountOfVaccinationsDone
}