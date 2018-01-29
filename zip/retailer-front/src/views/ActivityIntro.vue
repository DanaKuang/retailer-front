<template>
	<div class="activityintro">
		<img class="wholeimg" :src="image" alt="">
	</div>
</template>
<script>
export default {
	data() {
		return {
			image: sessionStorage.getItem('activityintro')
		}
	},
	mounted() {
		this.$parent.loadingPage = false; //去掉loading
	}
}
</script>
<style lang="scss" scoped>
.activityintro {
	.wholeimg {
		width: 100%;
		min-height: 100%;
	}
}
</style>