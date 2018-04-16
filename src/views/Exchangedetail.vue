<template>
	<div class="exchange-detail">
		<div class="date-input-wrap">
			<date-input ref="date" v-on:receiveStartDate="receiveStartDate" v-on:receiveEndDate="receiveEndDate"></date-input>
		</div>
		<ul class="tabpanel">
			<li class="tab font-color" v-for="(item, idx) in tabs" :class="[{'theme-bg-color': tab == idx}, {'active': tab == idx}]" @click="changeTab(idx)"><span>{{item.name}}</span>（￥<em>{{item.num}}</em>）</li>
        </ul>
        <div class="tabcontent wallet-detail" id="tabcontent">
			<wallet-detail
                v-if="isListTrue"
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
	</div>
</template>

<script>
import {getMyWallet, showIncome, showWithdraw} from 'api/wallet.js'
import { InfiniteScroll } from 'mint-ui';

export default {
  	name: 'Exchangedetail',
  	data () {
 		return {
 			income: [],
 			widthdraw: [],
            latest: [],
 			isListTrue: false,
            page: 1,
            loading: true,
            nomore: false,
            nothing: false,
            isEnd: false,
 			wallet: {},
 			tab: 0,
 			tabs: [{
 				name: '收益',
 				num: ''
 			}, {
				name: '提现',
				num: ''
 			}],
 			startTimeMM: '',
 			endTimeMM: '',
            changetabInterval: +new Date
 		}
  	},
  	created () {
        this.showWalletOverview()
  	},
  	mounted () {
        this.startTimeMM = this.$refs.date.emitStartTimeMM;
        this.endTimeMM = this.$refs.date.emitEndTimeMM;
        this.showIncomeList();
  	},
  	methods: {
        showWalletOverview() {
            getMyWallet().then(res => {
                if (res.ok) {
                    this.$parent.loadingPage = false; //去掉loading
                    this.wallet = res.data;
                    var me = this;
                    this.tabs.forEach(function (n, i) {
                        n.num = i == 0 ? me.wallet.totalIncome : me.wallet.totalPay
                    })                  
                }
            })
        },
  		showIncomeList (bool) {
            showIncome({
                startTime: this.startTimeMM,
                endTime: this.endTimeMM,
                pageNo: this.page,
                pageSize: 10
            }).then(res => {
                if (res.ok) {
                    var data = res.data;
                    var me = this;
                    me.isListTrue = true;
                    if (data && data.length > 0) {
                        if (bool) {
                            // 说明不是第一次渲染数据，有过历史数据，则push
                            data.forEach(function(n) {
                                me.latest.push(n)
                            })  
                        } else {
                            // 重新渲染数据走这里
                            me.latest = data;
                        }
                    } else {
                        if (bool) {
                            // 没有更多了
                            me.isEnd = true;
                            me.nomore = true
                        } else {
                            // 暂无内容
                            me.nothing = true;
                        }
                    }
                    me.loading = false;
                }
	 		})
  		},
  		showWithdrawList (bool) {
			showWithdraw({
                startTime: this.startTimeMM,
                endTime: this.endTimeMM,
                pageNo: this.page,
                pageSize: 10
            }).then(res => {
                if (res.ok) {
                    var data = res.data;
                    var me = this;
                    me.isListTrue = true;
                    if (data && data.length > 0) {
                        if (bool) {
                            data.forEach(function(n) {
                                me.latest.push(n)
                            })  
                        } else {
                            this.latest = data
                        }
                    } else {
                        if (bool) {
                            // 没有更多了
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
        cancel() {
          
        },
        init() {
            // 切换tab，或日期重新搜索，init变量
            this.page = 1;
            this.isEnd = false;
            this.isListTrue = false;
            this.loading = true;
            this.nomore = false;
            this.nothing = false;
            this.latest.length = 0;
            // this.cancel();
        },
  		changeTab (idx) {
            var now = +new Date;
            if (now - this.changetabInterval >= 500) {
                this.changetabInterval = +new Date; //更新现在的时间
                this.init();
      			this.tab = idx;
      			if (idx == 0) {
      				this.showIncomeList()
      			} else {
      				this.showWithdrawList()
      			}
            }
  		},
        loadMore() {
            if (this.latest.length == 0) {
                return
            } else {
                if (!this.isEnd && !this.loading) {
                    this.loading = true;
                    this.page = this.page + 1;
                    if (this.tab == 0) {
                        // 下拉加载收益
                        this.showIncomeList(true)
                    } else {
                        // 下拉加载提现
                        this.showWithdrawList(true)
                    }
                }
            }
        },
        receiveStartDate (val) {
            this.startTimeMM = val.receiveSTMM;
            this.init();
            if (this.tab == 0) {
                // 请求收益
                this.showIncomeList()
            } else {
                // 请求提现
                this.showWithdrawList()
            }
        },
        receiveEndDate (val) {
            this.endTimeMM = val.receiveETMM;
            this.init();
            if (this.tab == 0) {
                // 请求收益
                this.showIncomeList()
            } else {
                // 请求提现
                this.showWithdrawList()
            }
        },
        receiveDefaultDate (val) {
            this.startTimeMM = val.receiveSTMM;
            this.endTimeMM = val.receiveETMM;
            this.init();
            if (this.tab == 0) {
                // 请求收益
                this.showIncomeList()
            } else {
                // 请求提现
                this.showWithdrawList()
            }
        }
  	}
}
</script>

<style lang="scss" scoped>
.exchange-detail {
    -webkit-user-select: none;
	.date-input-wrap {
		margin-bottom: .4rem;
	}
	.tabpanel {
		margin-bottom: .4rem;
		height: 1.33rem;
		background: #fff;
		li {
			float: left;
			width: 50%;
			height: 100%;
			line-height: 1.33rem;
			text-align: center;
			span {
				margin-right: .3rem;
				font-size: .45rem;
				letter-spacing: 5px;
				font-weight: 400;
			}
			em {
				font-size: .32rem;
			}
		}
		li.active {
			color: #fff!important;
		}
	}
}

</style>