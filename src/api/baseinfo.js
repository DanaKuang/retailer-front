import Fetch from './fetch.js'

// 包括sellerInfo, orgId
export function getbaseInfo() {
	return Fetch.get('/seller-web/seller/queryBaseConfig') 
}

export function getWxConfig () {
	return Fetch.get('/seller-web/wechat/open/jstoken')
}

// export function getSellerInfo(sellerId) {
// 	return Fetch.get('/seller-web/seller/main/' + sellerId)
// }