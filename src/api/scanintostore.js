import Fetch from './fetch.js'
import {processParams} from 'assets/lib/publicMethod'

export function scanintowarehouse(params) {
	return Fetch.get('/seller-web/consumer/canInstoreQr' + processParams(params))
}