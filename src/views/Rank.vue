<template>
	<div class="rank">
		<div class="top border-box">
			<div class="rough flex box-shadow-inner">
				<div class="flex-item trophy">
					<a href=""><img :src="trophy" alt=""></a>
					<p class="trophy-name">我的排名</p>
					<p class="my-rank">5</p>
				</div>
				<div class="flex-item">
					<p>本周扫码业绩</p>
					<span>100</span>
				</div>
				<div class="flex-item">
					<p>本月扫码业绩</p>
					<span>500</span>
				</div>
				<div class="flex-item">
					<p>总扫码业绩</p>
					<span>4200</span>
				</div>
			</div>
			<div class="rules">活动规则</div>
			<div class="title">冠军排行榜</div>
		</div>
		<ul class="list border-color border-box box-shadow-outer">
			<li class="title flex">
				<span class="flex-item">名次</span>
				<span class="flex-item">零售店</span>
				<span class="flex-item">扫码业绩</span>
			</li>
			<li class="flex">
				<span class="flex-item num"><img src="./../assets/image/common/first.png" alt=""></span>
				<span class="flex-item">永辉烟草专卖</span>
				<span class="flex-item">10000</span>
			</li>
			<li class="flex">
				<span class="flex-item num"><img src="./../assets/image/common/second.png" alt=""></span>
				<span class="flex-item">永辉烟草专卖</span>
				<span class="flex-item">10000</span>
			</li>
			<li class="flex">
				<span class="flex-item num"><img src="./../assets/image/common/third.png" alt=""></span>
				<span class="flex-item">永辉烟草专卖</span>
				<span class="flex-item">10000</span>
			</li>
			<li class="flex">
				<span class="flex-item num">1</span>
				<span class="flex-item">永辉烟草专卖</span>
				<span class="flex-item">10000</span>
			</li>
			<li class="flex">
				<span class="flex-item num">1</span>
				<span class="flex-item">永辉烟草专卖</span>
				<span class="flex-item">10000</span>
			</li>
			<li class="flex">
				<span class="flex-item num">1</span>
				<span class="flex-item">永辉烟草专卖</span>
				<span class="flex-item">10000</span>
			</li>
			<li class="flex">
				<span class="flex-item num">1</span>
				<span class="flex-item">永辉烟草专卖</span>
				<span class="flex-item">10000</span>
			</li>
			<li class="flex">
				<span class="flex-item num">1</span>
				<span class="flex-item">永辉烟草专卖</span>
				<span class="flex-item">10000</span>
			</li>
			<li class="flex">
				<span class="flex-item num">1</span>
				<span class="flex-item">永辉烟草专卖</span>
				<span class="flex-item">10000</span>
			</li>
			<li class="flex">
				<span class="flex-item num">1</span>
				<span class="flex-item">永辉烟草专卖</span>
				<span class="flex-item">10000</span>
			</li>
			<li class="flex">
				<span class="flex-item num">1</span>
				<span class="flex-item">永辉烟草专卖</span>
				<span class="flex-item">10000</span>
			</li>
		</ul>
	</div>
</template>

<script>
import trophy from './../assets/image/common/trophy.png'
export default {
	name: 'Rank',
	data () {
		return {
			trophy: trophy
		}
	}
}
</script>

<style lang="scss" scoped>
@mixin border-radius($num) {
	-webkit-border-radius: $num;
	-moz-border-radius: $num;
	-ms-border-radius: $num;
	border-radius: $num;
}
.rank {
	padding-bottom: .3rem;
	.top {
		padding-top: 3.4667rem;
		position: relative;
		.rough {
			position: relative;
			margin: 0 auto;
			width: 9.7rem;
			height: 1.493rem;
			background: #fff;
			@include border-radius(50px);
			.flex-item {
				width: 25%;
				/*height: 100%;*/
				text-align: center;
				color: #eee;
				span {
					font-size: .453rem;
					color: #333;
					line-height: 1.2;
				}
				p {
					color: #666;
					font-size: .32rem;
					line-height: .6rem;
				}
			}
			.flex-item:nth-of-type(2), .flex-item:nth-of-type(3) {
				border-right: 1px solid #eee;
			}
			.trophy {
				position: relative;
				a {
					position: absolute;
					bottom: -.6rem;
					left: 0;
				}
				img {
					bottom: .2rem;
					width: 2.64rem;
				}
				.trophy-name {
					position: absolute;
					left: 50%;
					bottom: -.25rem;
					font-size: .18rem;
					line-height: 1;
					width: 100%;
					-webkit-transform: scale(.75) translateX(-60%);
					-moz-transform: scale(.75) translateX(-60%);
					-ms-transform: scale(.75) translateX(-60%);
					transform: scale(.75) translateX(-60%);
				}
				.my-rank {
					position: absolute;
					left: 1.04rem;
					top: -2.8rem;
					font-size: .813rem;
					color: #eb0507;
				}
			}
			&:before, &:after {
				content: '';
				position: absolute;
				top: 50%;
				z-index: -1;
				width: 0.2667rem;
				height: 0.72rem;
				background-color: #32241A;
				@include border-radius(50%);
				-webkit-transform: translateY(-50%);
				-moz-transform: translateY(-50%);
				-ms-transform: translateY(-50%);
				transform: translateY(-50%);
			}
			&:before {
				left: -.11rem;
			}
			&:after {
				right: -.11rem;
			}
		}
		.rules {
			position: absolute;
			right: .9rem;
			top: 1.12rem;
			border: 1px solid #ed0606;
			width: 1.906rem;
			height: .4667rem;
			line-height: .48rem;
			text-align: center;
			color: #ed0606;
			font-size: .373rem;
			@include border-radius(4px);
		}
		.title {
			position: absolute;
			top: 1.8rem;
			right: .9rem;
			font-size: 1.2rem;
			color: #ed0606;
			-webkit-text-shadow: 3px 2px 4px rgba(0,0,0,.4);
			-moz-text-shadow: 3px 2px 4px rgba(0,0,0,.4);
			-ms-text-shadow: 3px 2px 4px rgba(0,0,0,.4);
			text-shadow: 3px 2px 4px rgba(0,0,0,.4);
		}
	}
	.list {
		overflow-y: scroll;
		margin: 0 auto;
		padding: 0 .2rem;
		width: 9.2rem;
		height: 12.4rem;
		max-height: 12.4rem;
		border-width: .2667rem;
		border-style: solid;
		background: #fff;
		border-bottom: 0 none;
		li {
			justify-content: space-around;
			height: 1.38rem;
			.flex-item {
				align-self: center;
				height: 100%;
				line-height: 1.39rem;
				font-size: .42rem;
				text-align: center;
				img {
					width: .8rem;
					vertical-align: middle;
				}
			}
			.num {
				font-weight: bold;
				vertical-align: middle;
			}
			.flex-item:first-child {
				width: 25%;
			}
			.flex-item:nth-of-type(2) {
				width: 35%;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
			.flex-item:last-of-type {
				width: 35%;
			}
			&:not(:last-child) {
				border-bottom: 1px solid #eee;
			}
		}
		.title {
			.flex-item {
				font-size: .47rem;
			}
		}
	}
}
</style>