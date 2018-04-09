import Fetch from './fetch.js'
import {processParams} from 'assets/lib/publicMethod'

export function showMyRank() {
	return Fetch.get('/seller-web/seller/rankPos')
}

export function showRanking(params) {
	return Fetch.get('/seller-web/achieve/periodResultList' + processParams(params))
}

export function showOverall() {
	return Fetch.get('/seller-web/achieve/scanSmoke/count')
}

export function showexchangeList(params) {
	return Fetch.get('/seller-web/achieve/scanSmokeList' + processParams(params))
}
