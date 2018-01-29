<template>
	<div class="abnormal">
		<p class="font-color">{{message}}</p>
	</div>
</template>
<script>
export default {
	name: 'Abnormal',
	data() {
		return {
			message: this.$route.query.message
		}
	},
	created() {
		this.$parent.loadingPage = false
	}
}
</script>
<style lang="scss" scoped>
	.abnormal {
		text-align: center;
		p {
			margin-top: 3rem;
			font-size: .42rem;
		}
	}
</style>