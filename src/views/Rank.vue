<template>
	<div class="rank">
		<div class="top border-box flex">
			<div class="flex-item trophy-item">
				<a class="trophy" href=""><img src="https://weiopn.oss-cn-beijing.aliyuncs.com/wx_retailer/common/trophy.png" alt=""></a>
			</div>
			<div class="flex-item title-item">
				<div class="title">冠军排行榜</div>
				<div class="ranking font-color">您当前排名：<span>{{myrank}}</span></div>
			</div>
			<div class="flex-item rules-item">
				<div class="rules"><router-link class="border-color font-color" :to="{path: '/retailer/rewardintro'}">活动规则</router-link></div>
			</div>
		</div>
		<div class="middle box-shadow-inner" @click="gotoperformance">
			<div class="flex">
				<div class="flex-item font-color">
					<p>本期扫码业绩</p>
					<span>{{overview.periodCount}}</span>盒
				</div>
				<div class="flex-item font-color">
					<p>总扫码业绩</p>
					<span>{{overview.allTotalCount}}</span>盒
				</div>
			</div>
			<i class="middle-border border-light-color"></i>	
		</div>
		<div class="page-infinite-wrapper list border-box">
			<ul 
				v-infinite-scroll="loadMore"
		        infinite-scroll-disabled="loading"
		        infinite-scroll-distance="50"
		        infinite-scroll-immediate-check="false">
				<li class="title flex border-light-color">
					<span class="flex-item font-color">名次</span>
					<span class="flex-item font-color">零售店</span>
					<span class="flex-item font-color">扫码业绩</span>
				</li>
				<li class="flex border-light-color" v-for="(item, idx) in list">
					<span class="flex-item num">{{ idx < 3 ? '' : idx + 1}}<img v-if="idx < 3" :src="topthreeImage[idx]" alt=""></span>
					<span class="flex-item">{{item.shopName}}</span>
					<span class="flex-item">{{item.achieveNum}}</span>
				</li>
			</ul>			
		</div>
	</div>
</template>

<script>
import {showRanking, showOverall, showMyRank} from 'api/rank.js'
import { InfiniteScroll } from 'mint-ui';
// import trophy from 'assets/image/common/trophy.png'
// import first from 'assets/image/common/first.png'
// import second from 'assets/image/common/second.png'
// import third from 'assets/image/common/third.png'

export default {
	name: 'Rank',
	data () {
		return {
			trophy: 'https://weiopn.oss-cn-beijing.aliyuncs.com/wx_retailer/common/trophy.png',
			myrank: '',
			list: [],
			overview: {
				periodCount: 0,
  				allTotalCount: 0
			},
			topthreeImage: [],
			page: 1,
			loading: true,
  			isEnd: false
		}
	},
	created() {
		this.showRank()
		this.showOverview()
		this.showranklist()
	},
	mounted() {
		this.$parent.loadingPage = false; //去掉loading
	},
	methods: {
		showRank() {
			showMyRank().then(res => {
				if (res.ok) {
					this.myrank = res.data;
				}
			}) 
		},
		showOverview() {
			showOverall().then(res => {
				if (res.ok) {
					var data = res.data;
					var me = this;
					this.overview.periodCount = data.periodCount;
					this.overview.allTotalCount = data.allTotalCount;
				}
			})
		},
		showranklist(loading) {
			showRanking({
				pageNo: this.page,
  					pageSize: 10
  				}).then(res => {
				if (res.ok) {
					const Data = res.data;
					if (Data.list && Data.list.length > 0) {
						if (loading) {
							var me = this;
							Data.list.forEach(function (n, i) {
								me.list.push(n)
							})
						} else {
							this.list = Data.list;
							for (var i = 0; i < 3; i++) {
								var item = this.list[i];
								if (item) {
									if (i == 0) {
										this.topthreeImage[i] = 'https://weiopn.oss-cn-beijing.aliyuncs.com/wx_retailer/common/first.png'
									} else if (i == 1) {
										this.topthreeImage[i] = 'https://weiopn.oss-cn-beijing.aliyuncs.com/wx_retailer/common/second.png'
									} else if (i == 2) {
										this.topthreeImage[i] = 'https://weiopn.oss-cn-beijing.aliyuncs.com/wx_retailer/common/third.png'
									}
								}
							}						
						}
					} else {
						if (loading) {
							// 没有更多
							this.isEnd = true;
						} else {
							// 暂无内容
						}
					}
					this.loading = false
				}
			})
		},
		loadMore() {
			if (this.list.length == 0) return
			if (!this.isEnd && !this.loading) {
				this.loading = true;
			  	this.page = this.page + 1;
			  	this.showranklist(true);
			}
		},
		gotoperformance() {
			this.$router.push({path: '/retailer/performance'})
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
	overflow: hidden;
	position: fixed;
	left: 0;
	bottom: 0;
	right: 0;
	top: 0;
	z-index: -2;
	-webkit-user-select: none;
	.top {
		margin-bottom: .15rem;
		justify-content: space-around;
		height: 3.14667rem;
		.trophy-item {
			width: 30%;
		}
		.title-item {
			width: 50%;
		}
		.rules-item {
			width: 20%;
		}
		.trophy {
			display: block;
			text-align: center;
			img {
				width: 1.4rem;
				height: 2rem;
			}
		}
		.title {
			line-height: 1.6;
			font-size: .8rem;
			font-weight: bold;
			color: #ed0606;
			-webkit-text-shadow: 3px 2px 4px rgba(0,0,0,.4);
			-moz-text-shadow: 3px 2px 4px rgba(0,0,0,.4);
			-ms-text-shadow: 3px 2px 4px rgba(0,0,0,.4);
			text-shadow: 3px 2px 4px rgba(0,0,0,.4);
		}
		.ranking {
			font-size: .45rem;
			line-height: 1.5;
			span {
				vertical-align: middle;
				color: #ed0606;
			}
		}
		.rules {
			a {
				display: block;
				margin-bottom: .6rem;
				border-width: 1px;
				border-style: solid;
				padding: 3px;
				width: 1.5rem;
				@include border-radius(3px);
				font-size: .37rem;
			}
		}
	}
	.middle {
		position: relative;
		margin-bottom: .15rem;
		width: 100%;
		height: 1.42667rem;
		font-size: .32rem;
		background: #fff;
		text-align: center;
		.middle-border {
			position: absolute;
			top: 0;
			left: 50%;
			border-left: 2px solid #000;
			width: 0;
			height: 94%;
		}
		.flex {
			justify-content: space-around;
			width: 100%;
			height: 100%;
		}
		p {
			line-height: 1.5;
		}
		span {
			margin-right: .1rem;
			font-size: .37rem;
			font-weight: bold;
		}
	}
	.list {
		overflow-y: scroll;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		-webkit-overflow-scrolling: touch;
		width: 100%;
		height: calc(100% - 6.2667rem);
		background: #fff;
		li {
			justify-content: space-around;
			height: 1.38rem;
			border-bottom: 1px solid;
			.flex-item {
				align-self: center;
				height: 100%;
				line-height: 1.39rem;
				font-size: .37rem;
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
	}
}
</style>