import Fetch from './fetch.js'
import {processParams} from 'assets/lib/publicMethod'

export function getOrderList(params) {
	return Fetch.get('/seller-web/order/list' + processParams(params))
}

export function confirmReceive(params) {
	return Fetch.get('/seller-web/order/confirmRecieve' + processParams(params))
}

export function pay(params) {
	return Fetch.get('/seller-web/wechat/open/prepay' + processParams(params))
}

export function cancel(params) {
	return Fetch.get('/seller-web/order/cancelOrder' + processParams(params))
}
