import {getbaseInfo, getWxConfig} from 'api/baseInfo'

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
	    	} else if (orgId === 'zhankunzhongyan') {
	    		require('assets/theme/shankun.css');
	    		var navArr = require('assets/data/shankun/nav.json').menu;
	    	}
	    	commit('setNav', navArr);
	    })
	    .catch(() => {console.log('getbaseInfo出错')})
}

export const getWX = ({commit}) => {
	getWxConfig()
		.then(res => {
			var data = res.data;
			commit('wxConfig', data)
		})
		.catch(() => {console.log('getWX出错')})
}
