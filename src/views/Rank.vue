<template>
	<div class="rank">
		<div class="top border-box">
			<div class="rough flex box-shadow-inner">
				<div class="flex-item trophy">
					<a href=""><img :src="trophy" alt=""></a>
					<p class="trophy-name">我的排名</p>
					<p class="my-rank">{{myrank}}</p>
				</div>
				<div class="flex-item">
					<p>本周扫码业绩</p>
					<span>{{overview.weekTotalNum}}</span>
				</div>
				<div class="flex-item">
					<p>本月扫码业绩</p>
					<span>{{overview.monthTotalNum}}</span>
				</div>
				<div class="flex-item">
					<p>总扫码业绩</p>
					<span>{{overview.totalNum}}</span>
				</div>
			</div>
			<div class="rules"><router-link :to="{path: '/retailer/rewardintro'}">活动规则</router-link></div>
			<div class="title">冠军排行榜</div>
		</div>
		<div class="page-infinite-wrapper list border-color border-box">
			<ul 
				v-infinite-scroll="loadMore"
		        infinite-scroll-disabled="loading"
		        infinite-scroll-distance="50"
		        infinite-scroll-immediate-check="false">
				<li class="title flex">
					<span class="flex-item">名次</span>
					<span class="flex-item">零售店</span>
					<span class="flex-item">扫码业绩</span>
				</li>
				<li class="flex" v-for="(item, idx) in list">
					<span class="flex-item num">{{ idx < 3 ? '' : idx + 1}}<img v-if="idx < 3" :src="topthreeImage[idx]" alt=""></span>
					<span class="flex-item">{{item.shopName}}</span>
					<span class="flex-item">{{item.achieveNum}}</span>
				</li>
			</ul>			
		</div>
	</div>
</template>

<script>
import Http from 'assets/lib/http.js'
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
				weekTotalNum: 0,
  				monthTotalNum: 0,
  				totalNum: 0
			},
			topthreeImage: [],
			page: 1,
			loading: true,
  			isEnd: false,
  			sellerId: sessionStorage.getItem('sellerId') || this.$route.query.sellerId || ''
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
			Http.get('/seller-web/seller/rankPos')
				.then(res => {
					var Data = res.data;
					if (Data.ok) {
						this.myrank = Data.data;
					}
				}) 
		},
		showOverview() {
			Http.get('/seller-web/seller/select/income/count')
  				.then(res => {
  					var Data = res.data;
  					if (Data.ok) {
  						var data = Data.data;
  						var me = this;
  						this.overview.weekTotalNum = data.weekTotalNum;
  						this.overview.monthTotalNum = data.monthTotalNum;
  						this.overview.totalNum = data.totalNum;
  					}
  				})
		},
		showranklist(loading) {
			Http.get('/seller-web/achieve/periodResultList', {
				params: {
					pageNo: this.page,
  					pageSize: 10
	 			}
			}).then(res => {
				var Data = res.data;
				if (Data.ok) {
					if (Data.data.list && Data.data.list.length > 0) {
						if (loading) {
							var me = this;
							Data.data.list.forEach(function (n, i) {
								me.list.push(n)
							})
						} else {
							this.list = Data.data.list;
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
		position: relative;
		padding-top: 3.4667rem;
		height: 5rem;
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
					left: 50%;
					top: -2.7rem;
					-webkit-transform: translateX(-39%);
					-moz-transform: translateX(-39%);
					-ms-transform: translateX(-39%);
					transform: translateX(-39%);
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
				height: 0.52rem;
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
		position: absolute;
		top: 5rem;
		left: 50%;
		-webkit-transform: translateX(-50%);
		-moz-transform: translateX(-50%);
		-ms-transform: translateX(-50%);
		transform: translateX(-50%);
		overflow-y: scroll;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		-webkit-overflow-scrolling: touch;
		padding: 0 .2rem;
		width: 9.2rem;
		height: calc(100% - 5.2667rem);
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