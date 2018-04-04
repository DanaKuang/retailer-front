<template>
	<div class="myqrpost border-box">
		<img class="wholeimg" :src="image" alt="">
	</div>
</template>
<script>
import Http from 'assets/lib/http.js'

export default {
	name: 'MyQrpost',
	data () {
		return {
			sellerId: sessionStorage.getItem('sellerId') || this.$route.query.sellerId || '',
			image: sessionStorage.getItem('qrurl')
		}
	},
	mounte() {
		this.$parent.loadingPage = false;
	}
}
</script>
<style lang="scss">
/* 展示零售户二维码弹窗 */
.myqrpost {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	.wholeimg {
		width: 100%;
		height: 100%;
	}
}
</style>