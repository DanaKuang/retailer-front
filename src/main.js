import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
// import store from './store'

// import 'common/stylus/index.styl'

/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole'

import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'mint-ui/lib/index.js'
Vue.use(Mint)

import VueBus from 'vue-bus'
Vue.use(VueBus)

fastclick.attach(document.body)

Vue.use(VueLazyload, {
  // loading: require('common/image/default.png')
})


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
