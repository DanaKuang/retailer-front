<template>
	<nav id="nav" class="nav-bg-color" v-if="path == 'storecenter' || path == 'performance' || path == 'warehousing' || path == 'wallet' ">
		<transition name="fade">
			<ul>
				<li class="menu" v-for="(item,idx) in menu" :class="[{'font-color': path == item.className}, item.className]">
					<router-link :to="{path: item.path}">
						<img :src="path == item.className ? item.imgactive : item.img" alt="">
						{{item.name}}
					</router-link>
				</li>
			</ul>
		</transition>
	</nav>
</template>

<script>
import Http from 'assets/lib/http.js'

export default {
	name: 'bottom-nav',
	data () {
		return {
			storecenter: true,
			menu: [],
			orgId: sessionStorage.getItem('orgId'),
			sellerId: sessionStorage.getItem('sellerId') || this.$route.query.sellerId || '',
			path: ''
		}
	},
	watch: {
		'$route' (to, from) {
            // 对路由变化作出响应...
            this.path = to.name.toLowerCase();
        }
	},
	created() {
		this.getNav();
		this.initPath();
	},
	methods: {
		getNav() {
			var me = this;
			if (me.orgId == 'shankunzhongyan') {
				Http.get('/retailer/static/shankun/nav.json')
					.then(res => {
						me.$data.menu = res.data.menu; //注意刘萌萌的$data写法
					})
			} else {
				Http.get('/retailer/static/henan/nav.json')
					.then(res => {
						me.$data.menu = res.data.menu; //注意刘萌萌的$data写法
					})
			}
		},
		initPath() {
			this.path = (this.$route.name).toLowerCase();
		}
	}
}
</script>
<style lang="scss" scoped>
nav {
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 2;
	width: 100%;
	height: 1.38rem;
	color: #ccc;
	ul {
		display: flex;
		justify-content: space-around;
		align-items: center;
		align-content: center;
		height: 100%;
		li {
			height: 1rem;
			align-self: center;
			line-height: 1.6;
			img {
				display: block;
				margin: 0 auto;
				width: .587rem;
			}
		}
	}
}
</style>

