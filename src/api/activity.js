import Fetch from './fetch.js'

export function getRewardIntro () {
	return Fetch.get('/seller-web/achieve/detail') 
}