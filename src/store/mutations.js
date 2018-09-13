export const setOrgId = (state, orgId) => {
	state.orgId = orgId
}

export const setNav = (state, navArr) => {
	state.navList = navArr
}

export const wxConfig = (state, data) => {
	state.wxConfig = data;
	wx.getNetworkType({
		success: function (res) {
			var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
			alert(networkType)
		}
	});
}

export const setRetailer = (state, retailerData) => {
	state.seller = retailerData
}

export const setSellerId = (state, sellerId) => {
	state.sellerId = sellerId
}

export const updateLoadingStatus = (state, payload) => {
	state.isLoading = payload.isLoading
}

