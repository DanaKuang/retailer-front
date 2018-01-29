<template>
	<p class="nomore">
		<slot name="text">没有更多内容了~</slot>
	</p>
</template>

<script>
	export default {
		name: 'no-more'
	}
</script>

<style lang="scss" scoped>
	.nomore {
		padding-bottom: 2rem;
		text-align: center;
		font-size: .37rem;
	}
</style>