import XHR from './http.js'

// 包括sellerInfo, orgId

export function getbaseInfo() {
	const _url = '/seller-web/seller/queryBaseConfig'
	return XHR({url: _url})
}

export function getRetailerInfo() {
	const url = '/seller-web/seller/main/'
}

