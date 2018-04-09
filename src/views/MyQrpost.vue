<template>
	<div class="myqrpost border-box">
		<img class="wholeimg" :src="seller.sellerInfo && seller.sellerInfo.qrUrl" alt="">
	</div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
	name: 'MyQrpost',
	computed: mapGetters([
		'seller'
	]),
	mounted() {
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