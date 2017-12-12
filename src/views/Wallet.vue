<template>
	<div id="wallet">
		<div class="bg-wallet top border-box">
			<div class="total-money">
				<span class="font-color">可体现余额(元)</span>
				<p class="font-color">0.00</p>
			</div>
			<div class="balance-wrap flex">
				<div class="flex-item income-m">
					<span class="font-color">总收益(元)</span>
					<p class="font-color">0.00</p>
				</div>
				<div class="flex-item withdraw-m">
					<span class="font-color">总提现(元)</span>
					<p class="font-color">0.00</p>
				</div>
			</div>
			<button id="withdraw" class="withdraw theme-bg-color">提现到微信</button>
		</div>
		<div class="latest">
			<span class="">最近三天明细</span>
			<div class="show-more"><router-link :to="{path: '/retailer/exchangedetail', query: {sellerId: sellerId}}">更多 <em>>></em></router-link></div>
		</div>
		<div class="wallet-detail">
			<wallet-detail></wallet-detail>
		</div>
		<bottom-nav :queryvariate="sellerId"></bottom-nav>
		<!-- 领取成功/领取失败弹窗 -->
		<mt-popup
		class="uni-pop pop border-box"
		v-if="popupVisible"
		v-model="popupVisible"
		position="center"
		pop-transition="popup-fade">
			<pop-modal :variate="popupVisible">
				<img slot="image" src="../assets/image/shankun/success.png" alt="">
				<p class="tip2">余额不足1元无法提现</p>
				<p class="tip4">请注意查收</p>
				<button slot="button" class="theme-bg-color_lighter">我知道了</button>
    		</pop-modal>
		</mt-popup>
	</div>
</template>
<script>
import axios from 'axios'
import bottomNav from '../components/bottom-nav'
import walletDetail from '../components/wallet-detail'
import { Popup } from 'mint-ui'
import popModal from '../components/pop-modal'

export default {
  	name: 'Wallet',
  	data () {
  		return {
  			popupVisible: false,
  			val: '',
  			sellerId: this.$route.query.sellerId
  		}
  	},
  	created () {
  		
  	},
  	mounted () {
		this.showWalletOverview()
  	},
  	methods: {
  		showpopup: function () {
  			this.popupVisible = true
  		},
  		showWalletOverview() {
  			axios.get('/seller-web/seller/select/mywallet')
  				.then(res => {
  					// 500 server error
  				}).catch(res => {

  				})
  		}
  	},
   	components: { 
  		bottomNav,
  		walletDetail,
  		popModal
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
.top {
	padding-top: .6rem;
	.total-money {
		text-align: center;
		color: #fff;
		span {
			font-size: .32rem;
		}
		p {
			font-size: 1.3rem;
			font-weight: bold;
			line-height: 1.4;
		}
	}
	.balance-wrap {
		justify-content: space-between;
		margin: .6rem .8rem 0;
		height: 1.2rem;
		color: #fff;
		text-align: center;
		span {
			font-size: .32rem;
		}
		p {
			font-size: .48rem;
			line-height: 2;
		}
	}
	.withdraw {
		display: block;
		margin: 0 auto;
		width: 3.52rem;
		height: 1.413rem;
		font-size: .48rem;
		color: #fff;
		@include border-radius(50px);
    -webkit-box-shadow: 0 0 0 6px #eee;
    -moz-box-shadow: 0 0 0 6px #eee;
    -ms-box-shadow: 0 0 0 6px #eee;
    box-shadow: 0 0 0 6px #eee;
	}
}	
.latest {
	margin-top: 1rem;
	border-bottom: 1px solid #ccc;
	padding: 0 .3rem;
	height: .93rem;
	line-height: .93rem;
	font-size: .32rem;
	color: #666;
	background: #fff;
	span {
		float: left;
	}
	.show-more {
		float: right;
	}
}

/* 弹窗 */
.pop  {
	img {
		width: 2.667rem;
		height: 1.92rem;
	}
	.tip2 {
		margin-top: .74667rem;
	}
	.tip4 {
		margin-top: -.8rem;
		font-size: .453rem;
		color: #DEBA91;
	}
	button {
		margin-top: 1.4rem;
	}
}

</style>