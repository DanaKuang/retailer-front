<template>
	<div id="credits" class="credits">
		<div class="top border-box">
			<a href="javascript:;" class="image"><img src="" alt=""></a>
			<span class="user font-color">美国往事</span>
			<p class="user-credits theme-bg-color">100积分</p>
		</div>
		<p class="title">积分明细</p>
		<ul class="list">
			<li>
				<div class="left">
					<p class="type">用户登录</p>
					<p class="time">2017-09-29</p>
				</div>
				<div class="right">+5</div>
			</li>
			<li>
				<div class="left">
					<p class="type">用户登录</p>
					<p class="time">2017-09-29</p>
				</div>
				<div class="right">+5</div>
			</li>
			<li>
				<div class="left">
					<p class="type">用户登录</p>
					<p class="time">2017-09-29</p>
				</div>
				<div class="right">+5</div>
			</li>
			<li>
				<div class="left">
					<p class="type">用户登录</p>
					<p class="time">2017-09-29</p>
				</div>
				<div class="right">+5</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
  	name: 'Credits'
}	
</script>

<style lang="scss" scoped>
@mixin border-radius($num) {
	-webkit-border-radius: $num;
	-moz-border-radius: $num;
	-ms-border-radius: $num;
	border-radius: $num;
}
.top {
	height: 4.8rem;
	padding-top: .7rem;
	text-align: center;
	font-size: .373rem;
	.image {
		overflow: hidden;
		display: block;
		margin: 0 auto .3rem;
		border: 2px solid #fff;
		width: 1.973rem;
		height: 1.973rem;
		@include border-radius(50%);
	}
	.user-credits {
		margin: .3rem auto;
		width: 2.133rem;
		height: .64rem;
		line-height: .7rem;
		color: #fff;
		@include border-radius(50px);
	}
}
.title {
	padding-left: .3rem;
	height: .933rem;
	line-height: .94rem;
	font-size: .34667rem;
	color: #444;
}
.list {
	background: #fff;
	padding: 0 .3rem;
	li {
		overflow: hidden;
		height: 1.4667rem;
		.left {
			float: left;
			.type {
				font-size: .373rem;
				color: #444;
				line-height: 2.5;
			}
			.time {
				font-size: .32rem;
				color: #888;
			}
		}
		.right {
			float: right;
			color: #444;
			font-size: .42667rem;
			line-height: 3.5;
		}
	}
	li:not(:last-child) {
		border-bottom: 1px solid #ccc;
	}
}
</style>