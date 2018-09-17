import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
// import VueLazyload from 'vue-lazyload'
import store from './store'

import 'components/global.js'

import 'assets/lib/flexible.js'
import 'assets/public/reset.css'
import 'assets/public/common.css'

import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'mint-ui/lib/index.js'
Vue.use(Mint)

import VueBus from 'vue-bus'
Vue.use(VueBus)

fastclick.attach(document.body)


router.beforeEach((to, from, next) => {
	store.commit('updateLoadingStatus', {isLoading: true});
	console.log('store.state.sellerId', store.state.sellerId);
	if (store.state.sellerId === '' && to.name !== 'StoreCenter' && to.name !== 'Info' && to.name !== 'Myqresult') {
		next({path: '/retailer/index'}); 
	} else {
		next();
	}
})

router.afterEach(function (to, from) {
	setTimeout(_=>{
		store.commit('updateLoadingStatus', {isLoading: false})
	}, 500)
})

new Vue({
  	el: '#app',
  	router,
  	store,
  	render: h => h(App)
})
