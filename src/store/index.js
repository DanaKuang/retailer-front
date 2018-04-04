import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})

// 需要统一管理的状态：1.是什么中烟公司（querybaseconfig）2.微信授权，调用sdk 3.sellerInfo