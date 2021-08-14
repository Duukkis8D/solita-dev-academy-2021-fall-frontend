import axios from 'axios'
const baseUrl = '/api/vaccinations'

const getDateOfFirstVaccination = () => {
	const request = axios.get( `${baseUrl}/firstVaccinationDate` )
	return request.then( response => response.data )
}

const getDateOfLatestVaccination = () => {
	const request = axios.get( `${baseUrl}/latestVaccinationDate` )
	return request.then( response => response.data )
}

const getAmountOfVaccinationsDone = ( dateAndTime ) => {
	const request = axios.get( `${baseUrl}/amountOfVaccinationsDone/${dateAndTime}` )
	return request.then( response => response.data )
}

export default {
	getDateOfFirstVaccination,
	getDateOfLatestVaccination,
	getAmountOfVaccinationsDone
}