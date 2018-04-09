import Fetch from './fetch.js'
import {processParams} from 'assets/lib/publicMethod'

export function showRetailerInfo(sellerId) {
	return Fetch.get('/seller-web/seller/main/' + sellerId)
}