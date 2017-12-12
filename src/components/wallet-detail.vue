<template>
	<ul class="list">
		<li>
			<div class="item">
				<p class="name">销售鼓励金</p>
				<p class="money plus">+5</p>
			</div>
			<div class="exchange-time">2017-07-18 12:09:09</div>
		</li>
		<li>
			<div class="item">
				<p class="name">提现</p>
				<p class="money minus">-15</p>
			</div>
			<div class="exchange-time">2017-07-20 12:00:30</div>
		</li>
		<li>
			<div class="item">
				<p class="name">提现</p>
				<p class="money minus">-15</p>
			</div>
			<div class="exchange-time">2017-07-20 12:00:30</div>
		</li>
		<li>
			<div class="item">
				<p class="name">提现</p>
				<p class="money minus">-15</p>
			</div>
			<div class="exchange-time">2017-07-20 12:00:30</div>
		</li>
	</ul>
</template>
<script>
export default {
	name: 'wallet-detail'
 }
</script>
<style lang="scss">
.plus {
	color: #ea5504;
}
.minus {
	color: #04bd08;
}
.list {
	background: #fff;
	li {
		margin: 0 .3rem;
		height: 1.8667rem;
		.item {
			overflow: hidden;
			height: 50%;
			line-height: 3;
			.name {
				float: left;
				font-size: .453rem;
			}
			.money {
				float: right;
				font-size: .48rem;
			}
		}
		.exchange-time {
			line-height: 2;
			height: 50%;
			font-size: .34667rem;
			color: #818184
		}
	}
	li:not(:last-child) {
		border-bottom: 1px solid #ccc;
	}
}
</style>