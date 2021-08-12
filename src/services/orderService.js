import axios from 'axios'
const baseUrl = '/api/orders'

const getAmountOfVaccines = ( dateAndTime ) => {
	const request = axios.get( `${baseUrl}/amountOfVaccines/${dateAndTime}` )
	return request.then( response => response.data )
}

export default {
	getAmountOfVaccines
}