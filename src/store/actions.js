import * as types from './mutation_type'

export const getBaseInfo = function ({commit, state}, orgId) {
	commit(types.GET_BASE_INFO, orgId)
}

export const getWxInfo = function ({commit, state}, wxdata) {
	commit(types.GET_WX_INFO, wxdata)
}