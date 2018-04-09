import Fetch from './fetch.js'

export function getGeo() {
	return Fetch.get('/seller-manager/region/queryAllRegion?level=3')
}