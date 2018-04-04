import * as types from './mutation_type'

const mutations = {
	[types.GET_BASE_INFO](state, orgId) {
		state.baseConfig.orgId = orgId
	},
	[types.GET_WX_INFO](state, wxInfo) {
		state.wxConfig = wxInfo
	}
}


export default mutations