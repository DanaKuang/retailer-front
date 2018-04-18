<template>
	<div id="wallet">
		<div class="bg-wallet top border-box">
			<div class="total-money">
				<span class="font-color">可提现余额(元)</span>
				<p class="font-color">{{wallet.balance | filtertoFixed}}</p>
			</div>
			<div class="balance-wrap flex">
				<div class="flex-item income-m">
					<span class="font-color">总收益(元)</span>
					<p class="font-color">{{wallet.totalIncome | filtertoFixed}}</p>
				</div>
				<div class="flex-item withdraw-m">
					<span class="font-color">总提现(元)</span>
					<p class="font-color">{{wallet.totalPay | filtertoFixed}}</p>
				</div>
			</div>
			<button id="withdraw" class="withdraw theme-bg-color" @click="withdrawmoney">提现到微信</button>
		</div>
		<div class="latest">
			<span class="">最近三天明细</span>
			<div class="show-more"><router-link :to="{path: '/retailer/exchangedetail'}">更多 <em>>></em></router-link></div>
		</div>
		<div class="wallet-detail" v-if="isListTrue">
			<wallet-detail
				v-infinite-scroll="loadMore"
		  		infinite-scroll-disabled="loading"
		  		infinite-scroll-distance="0"
		  		infinite-scroll-immediate-check="false"
			 	:balance="latest">
			</wallet-detail>

			<!-- 加载数据loading -->
            <loading-ing v-if="loading"></loading-ing>
            <!-- 没有更多 -->
            <no-more v-if="nomore" class="font-color"></no-more>
            <!-- 暂无内容 -->
            <no-thing v-if="nothing" class="font-color"></no-thing>
		</div>

		<!-- 领取成功/领取失败弹窗 -->
		<mt-popup
		class="uni-pop pop border-box"
		:class="{success: successWithdraw, fail: !successWithdraw}"
		v-if="popupVisible"
		v-model="popupVisible"
		position="center"
		pop-transition="popup-fade">
			<pop-modal :variate="popupVisible">
				<p class="tip2">{{tip1}}</p>
				<p class="tip4" v-show="tip2 != ''">{{tip2}}</p>
				<button slot="button" class="theme-bg-color_lighter" @click="iget">我知道了</button>
    		</pop-modal>
		</mt-popup>
	</div>
</template>
<script>
import {getMyWallet, getLatestBalance, withdrawMoney} from 'api/wallet.js'
import { Popup } from 'mint-ui'
import { InfiniteScroll } from 'mint-ui'

export default {
  	name: 'Wallet',
  	data () {
  		return {
  			popupVisible: false,
  			successWithdraw: false,
  			wallet: {},
  			latest: [],
  			isListTrue: false,
  			loading: true,
  			nomore: false,
  			nothing: false,
  			page: 1,
  			isEnd: false,
  			tip1: '余额不足1元无法提现',
			tip2: '请注意查收',
			withdrawFlag: true
  		}
  	},
  	created () {
  		this.showWalletOverview();
  	},
  	mounted () {
		this.latestThreeDays();
  	},
  	methods: {
  		showpopup: function () {
  			this.popupVisible = true;
  		},
  		showWalletOverview() {
  			getMyWallet().then(res => {
				if (res.ok) {
					this.$parent.loadingPage = false; //去掉loading
					this.wallet = res.data;
				} 
			})
  		},
  		latestThreeDays(bool) {
  			var me = this;
  			getLatestBalance({
				startTime: (+new Date() - 3*24*3600*1000),
				endTime: +new Date(),
				pageNo: this.page,
				pageSize: 10
			}).then(res => {
  				if (res.ok) {
  					const Data = res.data;
	  				me.isListTrue = true;
	  				if (Data.list && Data.list.length > 0) {
	  					if (bool) {
							Data.list.forEach(function(n) {
	                            me.latest.push(n)
	                        })  
	  					} else {
							me.latest = Data.list
	  					}
	  				} else { 
	  					if (bool) {
	  						// 没有更多
	  						me.isEnd = true;
	                        me.nomore = true
	  					} else {
	  						// 暂无内容
	  						me.nothing = true
	  					}
	  				}
	  				me.loading = false;
  				}
  			})
  		},
  		loadMore() {
  			if (this.latest.length == 0) {
  				return
  			} else {
	  			if (!this.isEnd && !this.loading) {
	  				this.loading = true;
				  	this.page = this.page + 1;
				  	this.latestThreeDays(true);
	  			}
  			}
		},
		withdrawmoney() {
			var txAmount = this.wallet.balance;
			if (txAmount < 1) {
				this.popupVisible = true;
				this.tip1 = '余额不足1元无法提现';
				this.tip2 = '';
			} else {
				if (this.withdrawFlag) {
					this.withdrawFlag = false;
					withdrawMoney({
						txAmount: txAmount
					}).then(res => {
						this.withdrawFlag = true;
						if (res.ok) {
							const detailData = res.data;
							if (detailData.status == 1) {
								this.successWithdraw = true;
								this.popupVisible = true;
								this.tip1 = '工作人员会在24小时内将佣金打入到您的微信账户内。';
							} else if (detailData.status == 2 && detailData.isFinish == 1) {
								this.successWithdraw = true;
								this.popupVisible = true;
								this.tip1 = '已成功提现至零钱包';
							} else if (detailData.status == 3) {
								this.successWithdraw = true;
								this.popupVisible = true;
								this.tip1 = '抱歉，您的提现已被拒绝';
								this.tip2 = '';
							}
							
							// 再调用一次最近三天明细接口
							this.latest.length = 0;
							this.isListTrue = false;
							this.showWalletOverview();
							this.latestThreeDays();
						} else {
							this.tip1 = res.msg
							this.tip2 = '';
							this.popupVisible = true;
						}
					})
				}
			}
		},
		iget() {
			this.popupVisible = false;
		}
  	},
  	filters: {
  		filtertoFixed(val) {
  			return val ? val.toFixed(2) : '0.00'
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
#wallet {
	-webkit-user-select: none;
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
		margin-top: .74667rem!important;
		padding: 0 1rem;
	}
	.tip4 {
		margin-top: -.6rem!important;
		font-size: .453rem;
		color: #DEBA91;
	}
	button {
		margin-top: .7rem!important;
	}
}

</style>