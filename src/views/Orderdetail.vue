<template>
	<div class="orderlist">
		<ul class="tabpanel flex all">
			<li class="flex-item all font-color">全部</li>
			<li class="flex-item yetpayed">待支付</li>
			<li class="flex-item yetsent">待发货</li>
			<li class="flex-item yetgotten">待收货</li>
			<li class="flex-item finished">已完成</li>
		</ul>
		<ul class="tabcontent">
			<li class="item">
				<div class="order">
					<span class="orderid">订单号：<em>12345670979867</em></span>
					<span class="status">待支付</span>
				</div>
				<div class="product">
					<div class="name-price">
						<p class="name">店码标牌</p>
						<p class="price">￥254.00</p>
					</div>
					<div class="time">下单时间: 2017-12-12 12:12:55</div>
				</div>
				<div class="btns">
					<button class="logistics">查看物流</button>
					<button class="pay">去支付</button>
					<button class="confirm">确认收货</button>
				</div>
			</li>
			<li class="item">
				<div class="order">
					<span class="orderid">订单号：<em>12345670979867</em></span>
					<span class="status">待支付</span>
				</div>
				<div class="product">
					<div class="name-price">
						<p class="name">店码标牌</p>
						<p class="price">￥254.00</p>
					</div>
					<div class="time">下单时间: 2017-12-12 12:12:55</div>
				</div>
				<div class="btns">
					<button class="logistics">查看物流</button>
					<button class="pay">去支付</button>
					<button class="confirm">确认收货</button>
				</div>
			</li>
		</ul>
		<!-- <bottom-nav></bottom-nav> -->
	</div>
</template>

<script>
// import bottomNav from '../components/bottom-nav'
export default {
  	name: 'Orderdetail',
  	components: { 
  		// bottomNav
  	}
}	
</script>

<style lang="scss">
@mixin left {
	float: left;
}
@mixin right {
	float: right;
}
.tabpanel {
	position: relative;
	justify-content: space-around;
	border-bottom: 1px solid #ccc;
	height: 1.33rem;
	background: #fff;
	.flex-item {
		line-height: 1.33rem;
		text-align: center;
		font-size: .42rem;
		color: #444;
	}
	/*.flex-item.active {
		border-bottom: 2px solid;
	}*/
	&:after {
		content: '';
		position: absolute;
		bottom: 0;
		width: 13%;
		height: 2px;
		-webkit-transition: left .3s;
		-moz-transition: left .3s;
		-ms-transition: left .3s;
		transition: left .3s;
	}
}
.tabpanel.all:after {
	left: 2%;
}
.tabpanel.yetpayed:after {
	left: 20.5%;
}
.tabpanel.yetsent:after {
	left: 41%;
}
.tabpanel.yetgotten:after {
	left: 62.5%
}
.tabpanel.yetgotten:after {
	left: 83%；
}
.tabcontent {
	margin-bottom: 1.6rem;
	li {
		margin-bottom: .3rem;
		border-bottom: 1px solid #ccc;
		height: 5.173rem;
		color: #444;
		background: #fff;
		.order {
			padding: 0 .3rem;
			overflow: hidden;
			line-height: 1.093rem;
			font-size: .373rem;
			.orderid {
				@include left;
				em {
					vertical-align: middle;
				}
			}
			.status {
				@include right;
				color: #ec0606;
			}
		}
		.product {
			padding: 0 .3rem;
			height: 2.3rem;
			background: #fafafa;
			.name-price {
				overflow: hidden;
				line-height: 3;
				.name {
					@include left;
					font-size: .42667rem;
				}
				.price {
					@include right;
					font-size: .4rem;
				}
			}
			.time {
				line-height: 2;
				font-size: .34667rem;
				color: #888;
			}
		}
		.btns {
			padding: .5rem .3rem 0;
			text-align: right;
			button {
				width: 2.213rem;
				height: .8rem;
				-webkit-border-radius: 50px;
				-moz-border-radius: 50px;
				-ms-border-radius: 50px;
				border-radius: 50px;
				font-size: .373rem;
				background: transparent;
			}
			.logistics {
				margin-left: .3rem;
				border: 1px solid #ccc;
				color: #444;
			}
			.pay, .confirm {
				margin-left: .3rem;
				border: 1px solid #ec0606;
				color: #ec0606;
			}
		}
	}
	li:not(:first-child) {
		border-top: 1px solid #ccc;
	}
}
</style>