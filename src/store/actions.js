import {getbaseInfo, getWxConfig, getSellerInfo} from 'api/baseInfo'

export const getBase = ({commit}) => {
	getbaseInfo()
	    .then(res => {
	    	var orgId = res.data && res.data.orgId;
	    	commit('setOrgId', orgId);
	    	return orgId
	    })
	    .then(orgId => {
	    	if (orgId === 'henanzhongyan') {
	    		require('assets/theme/henan.css');
	    		var navArr = require('assets/data/henan/nav.json').menu;
	    	} else if (orgId === 'shankunzhongyan') {
	    		require('assets/theme/shankun.css');
	    		var navArr = require('assets/data/shankun/nav.json').menu;
	    	}
	    	commit('setNav', navArr);
	    })
	    .catch(() => {console.log('getbaseInfo出错')})
}

// export const getSeller = ({commit}, sellerId) => {
// 	getSellerInfo(sellerId)
// 		.then(res => {
// 			if (res.ok) {
// 				const Data = res.data;
// 				commit('setRetailer', Data);
// 			} else {
// 				console.log('未认证')
// 			}
// 		})
// 		.catch(() => {console.log('getSeller出错')})
// }

export const getWX = ({commit}) => {
	getWxConfig()
		.then(res => {
			const data = res.data;
			commit('wxConfig', data)
		})
		.catch(() => {console.log('getWX出错')})
}
