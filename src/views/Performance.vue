<template>
	<div id="performance">
		<div class="overview-wrap">
			<div class="overall-performance flex">
				<div class="performance flex-item">
					<div class="icon-performance"></div>
					<p class="desc">总销量：<em>2条5盒</em></p>
				</div>
				<div class="icon-rank flex-item"><router-link :to="{path: '/retailer/rank', query: {sellerId: '3000016'}}"></router-link></div>
			</div>
			<div class="overview flex">
				<div class="flex-item">本周扫码业绩<p class="week">50</p></div>
				<div class="flex-item">本月扫码业绩<p class="month">150</p></div>
				<div class="flex-item">总扫码业绩<p class="total">550</p></div>
			</div>
		</div>
		<form class="search-form" @submit.prevent="submit" name="searchform">
			<div class="date-input-wrap">
				<date-input></date-input>
			</div>
			<div class="result-wrap">
				<div class="title flex">
					<p class="flex-item product-name">商品名称</p>
					<p class="flex-item exchange-date">日期</p>
					<p class="flex-item exchange-number">数量</p>
					<p class="flex-item return-money">返现</p>
				</div>
				<ul class="result">
					<li class="flex">
						<p class="flex-item product-name">黄金叶（黄金）</p>
						<p class="flex-item exchange-date">2017.07.23 12：30</p>
						<p class="flex-item exchange-number">1条</p>
						<p class="flex-item return-money">+5</p>
					</li>
					<li class="flex">
						<p class="flex-item product-name">黄金叶（黄金）</p>
						<p class="flex-item exchange-date">2017.08.01 10：15</p>
						<p class="flex-item exchange-number">5盒</p>
						<p class="flex-item return-money">+15</p>
					</li>
				</ul>
			</div>
		</form>
		<bottom-nav :queryvariate="sellerId"></bottom-nav>
	</div>
</template>
<script>
import axios from 'axios'
import bottomNav from '../components/bottom-nav'
import dateTime from '../components/date-time'
import dateInput from '../components/date-input'

export default {
  	name: 'Performance',
  	data() {
  		return {
  			sellerId: this.$route.query.sellerId
  		}
  	},
  	created () {
  		this.showOverviewPerformance()
  	},
  	mounted () {

  	},
  	methods: {
  		showOverviewPerformance() {

  		}
  	},
  	computed: {

  	},
  	components: { 
  		bottomNav,
  		dateTime,
  		dateInput
  	}
}
</script>

<style lang="scss">
.date-input-wrap {
	border-bottom: 1px solid #ccc;
}
.overview-wrap {
	background: #fff;
	padding-left: .3rem;
	padding-right: .3rem;
	.overall-performance {
		justify-content: space-around;
		height: 1.733rem;
		border-bottom: 1px solid #ccc;
		.icon-rank {
			a {
				display: block;
				width: 100%;
				height: 100%;
			}
		}
		.flex-item {
			width: 50%;
		}
		.performance {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			.icon-performance {
				margin-left: .3rem;
			}
			.desc {
				margin-left: .8rem;
				color: #666;
				font-size: .37rem;
				em {
					font-size: .42rem;
					color: #000;
				}
			}
		}
	}
	.overview {
		justify-content: space-around;
		margin-bottom: .4rem;
		height: 1.733rem;
		font-size: .42667rem;
		text-align: center;
		line-height: 1.5;
		color: #666;
		p {
			color: #000;
		}
	}
}
.search-form {
	background: #fff;
}
.result-wrap {
	.flex {
		justify-content: space-between;
		margin-left: .3rem;
		margin-right: .3rem;
		height: 1.33rem;
	}
	.title {
		color: #666;
		font-size: .453rem;
		.product-name {
			text-align: left;
		}
		.exchange-date {
			text-align: center;
		}
		.exchange-number {
			text-align: right;
		}
		.return-money {
			text-align: right;
		}
	}
	.product-name {
		width: 30%;
	}
	.exchange-date {
		width: 35%;
	}
	.exchange-number {
		width: 15%;
	}
	.return-money {
		width: 20%;
	}
	.result {
		font-size: .373rem;
		li:not(:last-of-type) {
			border-bottom: 1px solid #ccc;
		}
		.product-name {
			text-align: left;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
		.exchange-date {
			color: #666;
			font-size: .32rem;
			text-align: center;
		}
		.exchange-number {
			text-align: right;
		}
		.return-money {
			color: #db0c07;
			text-align: right;
		}
	}
}
</style>