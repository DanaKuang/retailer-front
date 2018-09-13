<template>
	<div class="loading-wrap" :class="{mask: mymask}">
		<div class="loading">
			<span class="theme-bg-color_lighter"></span>
			<span class="theme-bg-color_lighter"></span>
			<span class="theme-bg-color_lighter"></span>
			<span class="theme-bg-color_lighter"></span>
			<span class="theme-bg-color_lighter"></span>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'loading-vue',
		props: ['mask'],
		data () {
			return {
				mymask: this.mask || true
			}
		}
	}
</script>
<style scoped>
	.mask {
		background: rgba(255,255,255, 1);
	}
	.loading-wrap {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 1100;
	}
	.loading {
		position: absolute;
    	top: 50%;
		left: 50%;
		width: 1.8rem;
		height: .16rem;
		transform: translateX(-50%);
	}
	.loading span {
		display: inline-block;
		vertical-align: middle;
		width: .16rem;
		height: .16rem;
		margin-right: .1rem;
		animation: load 1.04s ease infinite;
		-webkit-animation: load 1.04s ease infinite;
	}
	.loading span:last-child{
		margin-right: 0px; 
	}
	@-webkit-keyframes load{
		0%{
			opacity: 1;
			-webkit-transform: scale(1.2);
		}
		100%{
			opacity: .2;
			-webkit-transform: scale(.2);
		}
	}
	.loading span:nth-child(1){
		-webkit-animation-delay:0.13s;
	}
	.loading span:nth-child(2){
		-webkit-animation-delay:0.26s;
	}
	.loading span:nth-child(3){
		-webkit-animation-delay:0.39s;
	}
	.loading span:nth-child(4){
		-webkit-animation-delay:0.52s;
	}
	.loading span:nth-child(5){
		-webkit-animation-delay:0.65s;
	}
</style>