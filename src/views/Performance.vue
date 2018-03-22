<template>
	<div id="performance">
		<div class="overview-wrap">
			<div class="overall-performance flex">
				<div class="performance flex-item">
					<div class="icon-performance"></div>
					<p class="desc">总销量：<em>{{overview.overview}}</em></p>
				</div>
				<div class="icon-rank flex-item"><router-link :to="{path: '/retailer/rank'}"></router-link></div>
			</div>
			<div class="overview flex">
				<div class="flex-item">本周扫码业绩<p class="week">{{overview.weekTotalNum}}</p></div>
				<div class="flex-item">本月扫码业绩<p class="month">{{overview.monthTotalNum}}</p></div>
				<div class="flex-item">总扫码业绩<p class="total">{{overview.totalNum}}</p></div>
			</div>
		</div>
		<form class="search-form" @submit.prevent="submit" name="searchform">
			<div class="date-input-wrap">
				<date-input ref="date" v-on:receiveStartDate="receiveStartDate" v-on:receiveEndDate="receiveEndDate" v-on:receiveDefaultDate="receiveDefaultDate"></date-input>
			</div>
			<div class="result-wrap">
				<div class="title flex">
					<p class="flex-item product-name">商品名称</p>
					<p class="flex-item exchange-date">时间</p>
					<!-- <p class="flex-item exchange-number">数量</p> -->
					<p class="flex-item return-money">返现</p>
				</div>
				<ul 
				class="result"
				v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="0"
                infinite-scroll-immediate-check="false">
					<li class="flex" v-for="item in performancelist">
						<p class="flex-item product-name">{{item.specification}}</p>
						<p class="flex-item exchange-date">{{item.scanTime | convertDate}}</p>
						<!-- <p class="flex-item exchange-number">{{item.scanTime | convertDate}}</p> -->
						<p class="flex-item return-money">+{{item.income}}</p>
					</li>
				</ul>

				<!-- 加载数据loading -->
		        <loading-ing v-if="loading"></loading-ing>
		        <!-- 没有更多 -->
		        <no-more v-if="nomore" class="font-color"></no-more>
		        <!-- 暂无内容 -->
		        <no-thing v-if="nothing" class="font-color"></no-thing>
			</div>
		</form>
	</div>
</template>
<script>
import Http from 'assets/lib/http.js'
import dateInput from 'components/date-input'
import loadingIng from 'components/loading-ing'
import noMore from 'components/no-more'
import noThing from 'components/no-thing'
import { InfiniteScroll } from 'mint-ui';

export default {
  	name: 'Performance',
  	data() {
  		return {
  			sellerId: sessionStorage.getItem('sellerId') || this.$route.query.sellerId || '',
  			overview: {
  				overview: '0',
  				weekTotalNum: 0,
  				monthTotalNum: 0,
  				totalNum: 0
  			},
  			performancelist: [],
  			startTimeMM: '',
 			endTimeMM: '',
  			page: 1,
  			loading: true,
  			nomore: false,
  			nothing: false,
  			isEnd: false
  		}
  	},
  	created () {
  		this.showOverviewPerformance()
  	},
  	mounted () {
  		this.startTimeMM = this.$refs.date.emitStartTimeMM;
        this.endTimeMM = this.$refs.date.emitEndTimeMM;
        this.showPerformanceList();
  	},
  	methods: {
  		showOverviewPerformance() {
  			// /seller-web/achieve/scanSmokeCount?unit=1
  			Http.get('/seller-web/seller/select/income/count')
  				.then(res => {
  					var Data = res.data;
  					if (Data.ok) {
  						this.$parent.loadingPage = false; //去掉loading
  						var data = Data.data;
  						var me = this;
  						// me.overview.overview = data.unit1Num + '盒';
  						if (data.unitNumList.length > 0) {
  							me.overview.overview = '';
  							data.unitNumList.forEach(function(n,i){
  								me.overview.overview += n.num + n.unit 
  							})
  						}

  						this.overview.weekTotalNum = data.weekTotalNum;
  						this.overview.monthTotalNum = data.monthTotalNum;
  						this.overview.totalNum = data.totalNum;
  					}
  				})
  		},
  		showPerformanceList(loading) {
  			Http.get('/seller-web/achieve/scanSmokeList', {
  				params: {
  					unit: 1,
  					startTime: this.startTimeMM,
  					endTime: this.endTimeMM,
  					pageNo: this.page,
  					pageSize: 10
  				}
  			}).then(res => {
  				var Data = res.data;
  				if (Data.ok) {
  					if (Data.data.list && Data.data.list.length > 0) {
  						if (loading) {
  							// push
  							var me = this;
  							Data.data.list.forEach(function (n, i){
  							 	me.performancelist.push(n)
  							})
  						} else {
  							this.performancelist = Data.data.list;
  						}
  					} else {
  						if (loading) {
  							// 没有更多
  							this.isEnd = true;
  							this.nomore = true;
  						} else {
							// 暂无内容
							this.nothing = true;
  						}
  					}
  					this.loading = false
  				}
  			})
  		},
  		init() {
			// 日期重新搜索，init变量
            this.page = 1;
            this.isEnd = false;
            this.loading = true;
            this.nomore = false;
            this.nothing = false;
            this.performancelist.length = 0;
  		},
  		loadMore() {
  			if (this.performancelist.length == 0) {
	  			return 
  			} else {
  				if (!this.isEnd && !this.loading) {
	  				this.loading = true;
				  	this.page = this.page + 1;
				  	this.showPerformanceList(true);
	  			}
  			}
		},
  		receiveStartDate (val) {
  			this.init();
            this.startTimeMM = val.receiveSTMM;
            this.showPerformanceList()
        },
        receiveEndDate (val) {
        	this.init();
            this.endTimeMM = val.receiveETMM;
            this.showPerformanceList()
        },
        receiveDefaultDate (val) {
        	this.init();
            this.startTimeMM = val.receiveSTMM;
            this.endTimeMM = val.receiveETMM;
            this.showPerformanceList();
        }
  	},
  	filters: {
  		convertDate(val) {
			return val ? new Date(val).toLocaleString().replace(/\//g, '-') : ''
		}
  	},
  	components: { 
  		dateInput,
  		loadingIng,
        noMore,
        noThing
  	}
}
</script>

<style lang="scss">
#performance {
	-webkit-user-select: none;
}
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
	margin-bottom: 1.4rem;
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
		margin-bottom: 1rem;
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