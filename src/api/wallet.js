import Fetch from './fetch.js'
import {processParams} from 'assets/lib/publicMethod'

export function getMyWallet() {
	return Fetch.get('/seller-web/seller/select/mywallet')
}

export function getLatestBalance(params) {
	return Fetch.get('/seller-web/seller/select/income-and-expenses' + processParams(params))
}

export function withdrawMoney(params) {
	return Fetch.get('/seller-web/seller/select/income-and-expenses' + processParams(params))
}

export function showIncome(params) {
	return Fetch.get('/seller-web/seller/select/income/list' + processParams(params))
}

export function showWithdraw(params) {
	return Fetch.get('/seller-web/seller/select/withdraw/list' + processParams(params))
}