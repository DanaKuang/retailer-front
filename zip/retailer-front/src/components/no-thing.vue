<template>
	<p class="nothing">
		<slot name="text">暂无内容~</slot>
	</p>
</template>

<script>
	export default {
		name: 'no-thing'
	}
</script>

<style lang="scss" scoped>
	.nothing {
		margin-top: 2rem;
		padding-bottom: 2rem;
		text-align: center;
		font-size: .37rem;
	}
</style>