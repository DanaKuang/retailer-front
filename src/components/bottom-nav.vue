<template>
	<nav id="nav" class="nav-bg-color" v-if="path == 'storecenter' || path == 'rank' || path == 'warehousing' || path == 'wallet' ">
		<transition name="fade">
			<ul>
				<li class="menu" v-for="(item,idx) in navList" :class="[{'font-color': path == item.className}, item.className]">
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
import {mapGetters} from 'vuex'

export default {
	name: 'bottom-nav',
	data () {
		return {
			storecenter: true,
			path: ''
		}
	},
	computed: mapGetters([
        'navList'
    ]),
	watch: {
		'$route' (to, from) {
            // 对路由变化作出响应...
            this.path = to.name.toLowerCase();
        }
	},
	created() {
		this.initPath();
	},
	methods: {
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