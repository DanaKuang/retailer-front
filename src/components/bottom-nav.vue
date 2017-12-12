<template>
	<nav id="nav" class="nav-bg-color">
		<ul>
			<li class="menu" v-for="item in menu" :class="[{'font-color': path === item.className}, item.className]">
				<router-link :to="{path: item.path, query: {sellerId: myqueryvariate}}">
					<img :src="path === item.className ? item.imgactive : item.img" alt="">
					{{item.name}}
				</router-link>
			</li>
		</ul>
	</nav>
</template>

<script>
import axios from 'axios'

export default {
	name: 'bottom-nav',
	props: ['queryvariate'],
	data () {
		return {
			storecenter: true,
			menu: [],
			path: '',
			myqueryvariate: this.queryvariate
		}
	},
	created() {
		this.getNav();
		this.getPath();
	},
	methods: {
		getNav() {
			let me = this;
			axios.get('/static/shankun/nav.json')
				.then(res => {
					me.$data.menu = res.data.menu; //注意刘萌萌的$data写法
				})
		},
		getPath () {
			this.path = (this.$route.name).toLowerCase();
		}		
	}
}
</script>

<style lang="scss">
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
			img {
				display: block;
				margin: 0 auto;
				width: .587rem;
			}
			a {
				line-height: 2;
			}
		}
	}
}
</style>