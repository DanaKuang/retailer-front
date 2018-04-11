<template>
	<div id="performance">
		<form class="search-form" @submit.prevent="submit" name="searchform">
			<div class="date-input-wrap">
				<date-input ref="date" v-on:receiveStartDate="receiveStartDate" v-on:receiveEndDate="receiveEndDate"></date-input>
			</div>
			<div class="overview-wrap" :class="[{'first': countType == 2}, {'second': countType == 1}]">
				<div class="overview flex">
					<div class="flex-item border-color active" @click="chooseType(2)">拉新扫码业绩<br><span class="week">{{overview.newCount}}</span>盒</div>
					<div class="flex-item border-color" @click="chooseType(1)">累计扫码业绩<br><span class="month">{{overview.totalCount}}</span>盒</div>
				</div>
				<i class="bottom-border border-color"></i>
			</div>
			<div class="result-wrap">
				<div class="title flex border-light-color">
					<p class="flex-item product-name">商品名称</p>
					<p class="flex-item exchange-date">日期</p>
					<!-- <p class="flex-item exchange-number">数量</p> -->
					<!-- <p class="flex-item return-money">返现</p> -->
				</div>
				<ul 
				class="result"
				v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="0"
                infinite-scroll-immediate-check="false">
					<li class="flex border-light-color" v-for="item in performancelist">
						<p class="flex-item product-name">{{item.specification}}</p>
						<p class="flex-item exchange-date">{{item.scanTime | convertDate}}</p>
						<!-- <p class="flex-item exchange-number">{{item.scanTime | convertDate}}</p> -->
						<!-- <p class="flex-item return-money">+{{item.income}}</p> -->
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
import {showexchangeList, showOverall, getDetailType} from 'api/rank.js'
import dateInput from 'components/date-input'
import loadingIng from 'components/loading-ing'
import noMore from 'components/no-more'
import noThing from 'components/no-thing'
import { InfiniteScroll } from 'mint-ui';

export default {
  	name: 'Performance',
  	data() {
  		return {
  			overview: {
  				newCount: 0,
  				totalCount: 0
  			},
  			countType: '',
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
  		this.getTypeandShowlist();
  		this.showOverviewPerformance()
  	},
  	methods: {
  		init() {
			// 日期重新搜索，init变量
            this.page = 1;
            this.isEnd = false;
            this.loading = true;
            this.nomore = false;
            this.nothing = false;
            this.performancelist.length = 0;
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
  		getTypeandShowlist() {
  			getDetailType().then(res => {
  				if (res.ok) {
  					const Data = res.data;
  					this.countType = Data.achievementType;
  					this.startTimeMM = Data.stimeStr;
        			this.endTimeMM = Data.etimeStr;
        			this.$refs.date.startTime = Data.stimeStr.slice(0, Data.stimeStr.indexOf(' '));
        			this.$refs.date.endTime = Data.etimeStr.slice(0, Data.stimeStr.indexOf(' '));
  				}
  			}).then(() => {
  				this.showPerformanceList()
  			})
  		},
  		showPerformanceList(loading) {
  			showexchangeList({
  				startTime: this.startTimeMM,
				endTime: this.endTimeMM,
				pageNo: this.page,
				pageSize: 10,
				countType: this.countType
			}).then(res => {
  				if (res.ok) {
  					const Data = res.data;
  					if (this.countType == 2) {
  						this.overview.newCount = Data.page.count
  					} else {
  						this.overview.totalCount = Data.page.count
  					}
  					if (Data.list && Data.list.length > 0) {
  						if (loading) {
  							// push
  							var me = this;
  							Data.list.forEach(function (n, i){
  							 	me.performancelist.push(n)
  							})
  						} else {
  							this.performancelist = Data.list;
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
        showOverviewPerformance() {
  			showOverall().then(res => {
				if (res.ok) {
					this.$parent.loadingPage = false; //去掉loading
					const Data = res.data;
					var me = this;
					this.overview.newCount = Data.newCount;
					this.overview.totalCount = Data.totalCount;
				}
			})
  		},
  		chooseType(type) {
  			if (this.countType == type) return
  			this.init();
  			this.countType = type;
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

<style lang="scss" scoped>
#performance {
	-webkit-user-select: none;
}
.date-input-wrap {
	border-bottom: 1px solid #ccc;
}
.overview-wrap {
	position: relative;
	margin-bottom: .3rem;
	background: #fff;
	.bottom-border {
		position: absolute;
		bottom: -2px;
		width: 50%;
		height: 0;
		border: 2px solid;
		-webkit-transition: left .3s;
		-moz-transition: left .3s;
		-ms-transition: left .3s;
		transition: left .3s;
	}
	.overview {
		justify-content: space-around;
		height: 1.533rem;
		font-size: .42667rem;
		text-align: center;
		line-height: 1.8;
		color: #666;
		p {
			color: #000;
		}
		span {
			margin-right: .1rem;
			color: #EE0405;
		}
		&:after {
			content: '';
			position: absolute;
			left: 50.5%;
			top: 0;
			height: 100%;
			width: 0;
			border-left: 1px solid #ccc;
		}
	}
}
.overview-wrap.first {
	.bottom-border {
		left: 0;
	}
}
.overview-wrap.second {
	.bottom-border {
		left: 50.5%;
	}
}
.result-wrap {
	background: #fff;
	.flex {
		justify-content: space-around;
		height: 1.33rem;
	}
	.title {
		color: #666;
		font-size: .453rem;
		border-bottom: 1px solid;
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