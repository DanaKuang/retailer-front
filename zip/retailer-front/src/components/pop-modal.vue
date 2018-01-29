<template>
	<div class="modal-wrap">
		<slot name="image"></slot>
		<div class="main">
			<slot>
				<p class="tip1"></p>
				<p class="tip2"></p>
				<p class="tip3"></p>
				<p class="tip4"></p>
			</slot>
		</div>
		<slot name="button"><button></button></slot>
		<slot name="close"></slot>
	</div>
</template>

<script>
	
</script>

<style lang="scss" scoped>
@mixin border-radius($num) {
	-webkit-border-radius: $num;
	-moz-border-radius: $num;
	-ms-border-radius: $num;
	border-radius: $num;
}
.modal-wrap {
	.tip1 {
		margin-top: .62rem;
		font-size: .48rem;
	}
	.tip2 {
		margin-top: .4rem;
		margin-bottom: .9rem;
		font-size: .4rem;
		color: #636260;
	}
	.tip3 {
		margin-top: .2rem;
		font-size: .373rem;
		color: #999;
	}
	button {
		display: block;
		margin: .3rem auto;
		width: 6.4rem;
		height: .90667rem;
		line-height: .907rem;
		color: #fff;
		text-align: center;
		font-size: .48rem;
		@include border-radius(4px);
	}
}
</style>