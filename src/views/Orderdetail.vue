<template>
	<div class="orderlist">
		<ul class="tabpanel flex" :class="changeclass">
			<li class="flex-item" v-for="(item, idx) in tabs" :class="[item.className, {'font-color': changeclass == item.className}]" @click="changeTab(idx)">{{item.name}}</li>
		</ul>
		<div class="result">
			<ul class="tabcontent"
			 	v-if="isListTrue"
				v-infinite-scroll="loadMore"
		  		infinite-scroll-disabled="loading"
		  		infinite-scroll-distance="0"
		  		infinite-scroll-immediate-check="false">
				<li class="item" v-for="item in list">
					<div class="order">
						<span class="orderid">订单号：<em>{{item.orderid}}</em></span>
						<span class="status">{{item.statusName}}</span>
					</div>
					<div class="product">
						<div class="name-price">
							<p class="name">{{item.awardName}}</p>
							<p class="price">￥{{item.totalFee | filtertoFixed}}</p>
						</div>
						<div class="time">下单时间: {{item.createTime | convertDate}}</div>
					</div>
					<div class="btns">
						<button class="logistics" v-if="item.waybill" @click="checkdelivery($event)" :data-orderid="item.orderid">查看物流</button>
						<button class="cancelorder" v-if="item.payStatus != 1 && (item.status == 0 || item.status == 1)" @click="cancelorder($event)" :data-orderid="item.orderid">取消订单</button>
						<button class="pay" v-if="item.payStatus != 1 && item.status == 1" @click="gotopay($event)" :data-awardname="item.awardName" :data-orderid="item.orderid" :data-money="item.totalFee">立即支付</button>
						<button class="confirm" v-if="item.status == 2" @click="confirmgoods($event)" :data-orderid="item.orderid">确认收货</button>
					</div>
				</li>
			</ul>	
			<!-- 加载数据loading -->
            <loading-ing v-if="loading"></loading-ing>
            <!-- 没有更多 -->
            <no-more v-if="nomore" class="font-color"></no-more>
            <!-- 暂无内容 -->
            <no-thing v-if="nothing" class="font-color"></no-thing>	
		</div>
		<!-- <bottom-nav></bottom-nav> -->
	</div>
</template>

<script>
import {getOrderList, confirmReceive, pay, cancel} from  'api/orderlist'
import { InfiniteScroll } from 'mint-ui';
import wx from 'weixin-js-sdk'
import {mapGetters} from 'vuex'

export default {
    name: 'Orderdetail',
    computed: mapGetters([
        'sellerId'
    ]),
    data () {
        return {
            tabs: [{
                name: '全部',
                className: 'all',
                status: ''
            }, {
                name: '待支付',
                className: 'yetpayed',
                status: 1
            }, {
                name: '待发货',
                className: 'yetsent',
                status: 7
            }, {
                name: '待收货',
                className: 'yetgotten',
                status: 2
            }, {
                name: '已完成',
                className: 'finished',
                status: 6
            }],
            changeclass: 'all',
            list: [],
            isListTrue: false,
            loading: true,
            isEnd: false,
            nomore: false,
            nothing: false,
            page: 1,
            status: '',
            changetabInterval: +new Date
        }
    },
    created () {
        this.showList();
    },
    mounted() {
        this.$parent.loadingPage = false; //去掉loading
    },
    methods: {
        init() {
            // 切换tab，或日期重新搜索，init变量
            this.page        = 1;
            this.isEnd       = false;
            this.loading     = true;
            this.nomore      = false;
            this.nothing     = false;
            this.isListTrue  = false;
            this.list.length = 0;
        },
        showList(bool) {
            let me = this;
            getOrderList({
                sellerId: me.sellerId,
                pageNo: me.page,
                pageSize: 10,
                status: me.status
            }).then(res => {
                if (res.ok) {
                    const Data = res.data;
                    me.isListTrue = true;
                    if (Data && Data.list && Data.list.length > 0) {
                        if (bool) {
                            Data.list.forEach(function(n) {
                                me.list.push(n)
                            })  
                        } else {
                            me.list = Data.list;
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
        changeTab(idx) {
            let now = +new Date;
            if (now - this.changetabInterval >= 500) {
                this.changetabInterval = +new Date; //更新现在的时间
                this.init();
                this.tab = idx;
                switch (idx) {
                    case 0:
                        this.status = '';
                        this.changeclass = 'all'
                    break;
                    case 1:
                        this.status = '1';
                        this.changeclass = 'yetpayed'
                    break;
                    case 2:
                        this.status = '7';
                        this.changeclass = 'yetsent'
                    break;
                    case 3:
                        this.status = '2';
                        this.changeclass = 'yetgotten'
                    break;
                    default:
                        this.status = '6'
                        this.changeclass = 'finished'
                    break; 
                }
                this.showList()
            }
        },
        loadMore () {
            if (this.list.length == 0) {
                return
            } else {
                if (!this.isEnd && !this.loading) {
                    this.loading = true;
                    this.page = this.page + 1;
                    this.showList(true)
                }
            }
        },
        checkdelivery(e) {
            loacation.href = 'https://m.kuaidi100.com/result.jsp?nu=' + e.target.dataset.orderid
        },
        confirmgoods(e) {
            let dataset = e.target.dataset,
                me = this;
            confirmReceive({
                orderId: dataset.orderid
            }).then(res => {
                if (res.ok) {
                    this.list.length = 0;
                    this.showList()
                }
            })
        },
        gotopay(e) {
            let dataset = e.target.dataset,
                     me = this;
            pay({
                body: '店码标牌',
                orderId: dataset.orderid,
                money: dataset.money
            }).then(res => {
                if (res.ok) {
                    const Data = res.data;
                    wx.ready(function () {
                        wx.chooseWXPay({
                            timestamp: Data.timeStamp,
                            nonceStr: Data.nonceStr,
                            package: Data.package,
                            signType: Data.signType,
                            paySign: Data.paySign,
                            success: function () {
                                alert('支付成功');
                                me.list.length = 0;
                                me.showList();    
                            }
                        })
                    })
                }
            })
        },
        cancelorder(e) {
            let dataset = e.target.dataset,
                     me = this;
            cancel({
                orderId: dataset.orderid
            }).then(res => {
                if (res.ok) {
                    alert('取消成功');
                    this.list.length = 0;
                    this.showList()
                }
            })
        }
    },
    filters: {
        convertDate(val) {
            return val ?  new Date(val).toLocaleString().replace(/\//g, '-') : ''
        },
        filtertoFixed(val) {
            return val ? val.toFixed(2) : '0.00'
        }
    }
}   	
</script>

<style lang="scss" scoped>
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
	-webkit-user-select: none;
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
.tabpanel.finished:after {
	left: 83%
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
				font-size: .34rem;
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
			.cancelorder {
				margin-left: .3rem;
				border: 1px solid #ccc;
    			color: #999;
			}
		}
	}
	li:not(:first-child) {
		border-top: 1px solid #ccc;
	}
}
</style>