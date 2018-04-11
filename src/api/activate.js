import Fetch from './fetch.js'
import {processParams} from 'assets/lib/publicMethod'

export function getVcode(mobile) {
	return Fetch.get('/admin/login/getDynamicCode?oc=1&mobile=' + mobile)
}

export function verifyVcode(params) {
	return Fetch.get('/admin/login/checkDynamicCode' + processParams(params))
}

export function activate(params) {
	return Fetch.get('/seller-web/consumer/active' + processParams(params))
}

