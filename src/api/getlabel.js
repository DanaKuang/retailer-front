import Fetch from './fetch.js'
import {processParams} from 'assets/lib/publicMethod'

export function querylatestorder () {
	return Fetch.get('/seller-web/order/queryNewestOrder')
}

export function createorder(params) {
	return Fetch.get('/seller-web/order/createOrder' + processParams(params))
}