<template>
	<div class="activityintro">
		<img class="wholeimg" :src="seller.SELLER_CURRENT_ACTIVITY_DESC" alt="">
	</div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
	computed: mapGetters([
		'seller'
	]),
	mounted() {
		this.$parent.loadingPage = false; //去掉loading
	}
}
</script>
<style lang="scss" scoped>
.activityintro {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	.wholeimg {
		width: 100%;
		min-height: 100%;
	}
}
</style>