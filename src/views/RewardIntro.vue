<template>
	<div class="rewardintro">
		<img class="wholeimg" :src="image" alt="">
	</div>
</template>
<script>
export default {
	data() {
		return {
			image: sessionStorage.getItem('rewardintro')
		}
	},
	mounted () {
		this.$parent.loadingPage = false; //去掉loading
	}
}
</script>
<style lang="scss" scoped>
.rewardintro {
	.wholeimg {
		width: 100%;
		min-height: 100%;
	}
}
</style>