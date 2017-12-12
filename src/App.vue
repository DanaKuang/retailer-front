<template>
  <!-- 在这里判断是河南还是山昆 -->
  <div id="app" class="henan">
    <router-view v-wechat-title='$route.meta.title' v-cloak />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  	name: 'app',
  	data () {
  		return {
			orgId: '',
  		}
  	},
  	created () {
  		this.getCommonConfig();
  	},
  	mounted () {

  	},
  	methods: {
  		getCommonConfig() {
  			let me = this;
  			axios.get('/seller-web/consumer/queryBaseConfig')
  				.then(res => {
  					const Data = res.data;
  					if (Data.ok) {
  						let data = Data.data;
  						me.orgId = data.orgId;
	                    if (me.orgId === 'shankunzhongyan') {
	                    	require('assets/theme/shankun.css')
	                    } else {
	                    	require('assets/theme/henan.css')
	                    }
  					}
  				})
  		}
  	}
}
</script>

<style lang="scss">
[v-cloak] {
    display: none;
}
</style>
