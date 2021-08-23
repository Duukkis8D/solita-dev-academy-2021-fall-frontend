import axios from 'axios'
const baseUrl = '/api/orders'

const getDateOfFirstOrder = () => {
	const request = axios.get( `${baseUrl}/firstOrderDate` )
	return request.then( response => response.data )
}

const getDateOfLatestOrder = () => {
	const request = axios.get( `${baseUrl}/latestOrderDate` )
	return request.then( response => response.data )
}

const getAmountOfOrders = ( dateAndTime ) => {
	const request = axios.get( `${baseUrl}/amountOfOrders/${dateAndTime}` )
	return request.then( response => response.data )
}

const getAmountOfVaccines = ( dateAndTime ) => {
	const request = axios.get( `${baseUrl}/amountOfVaccines/${dateAndTime}` )
	return request.then( response => response.data )
}

const getVaccinesExpiredBeforeUse = ( dateAndTime ) => {
	const request = axios.get( `${baseUrl}/vaccinesExpiredBeforeUse/${dateAndTime}` )
	return request.then( response => response.data )
}

export default {
	getDateOfFirstOrder,
	getDateOfLatestOrder,
	getAmountOfOrders,
	getAmountOfVaccines,
	getVaccinesExpiredBeforeUse
}