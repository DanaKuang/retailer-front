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