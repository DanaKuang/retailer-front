// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.debug = true

import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'mint-ui/lib/index.js'
Vue.use(Mint)

import VueBus from 'vue-bus'
Vue.use(VueBus)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
