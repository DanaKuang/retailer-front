<template>
	<div id="storecenter" class="storecenter">
		<div class="main-info flex border-box">
			<div class="avatar flex-item" v-bind:class="{yetcertified: bool.yetcertified, certified: !bool.yetcertified, waiting: bool.waitingpop}">
				<a href="javascript:;"><img :src="user.headImg" alt=""></a>
			</div>
			<div class="brief flex-item">
				<p class="store-name">{{user.shopName}}</p>
				<div class="account flex">
					<div class="money">
						<p class="num">{{user.wallet.balance}}元</p>
						<p class="unit">账户余额</p>
					</div>
					<div class="redpacket">
						<p class="num">{{user.wallet.redPack}}个</p>
						<p class="unit">红包</p>
					</div>
				</div>
			</div>
			<div class="edit flex-item">
				<router-link class="theme-bg-color" :to="{path: '/retailer/info', query: {sellerId: this.sellerId}}">{{certifyoredit}}</router-link>
			</div>
		</div>
		<div class="menulist">
			<div class="credits menu mar-bt border-box">
				<p class="item" @click="gotocredit">我的积分</p>
			</div>
			<div class="wallet menu bor-bt border-box">
				<p class="item"><router-link :to="{path: '/retailer/wallet', query: {sellerId: sellerId}}">我的钱包</router-link></p>
			</div>
			<div class="order menu mar-bt border-box">
				<p class="item"><router-link :to="{path: '/retailer/orderdetail', query: {sellerId: sellerId}}">订单管理</router-link></p>
			</div>
			<div class="qr menu bor-bt border-box">
				<p class="item"><router-link :to="{path: '/retailer/myqrpost', query: {sellerId: sellerId}}">我的二维码</router-link></p>
			</div>
			<div class="sign menu mar-bt border-box">
				<p class="item" @click="showLabelpopup">领取标牌</p>
			</div>
			<div class="promotion menu bor-bt border-box">
				<p class="item"><router-link :to="{path: '/retailer/activityintro', query: {sellerId: sellerId}}">活动说明</router-link></p>
			</div>
			<div class="performance menu border-box">
				<p class="item"><router-link :to="{path: '/retailer/rewardintro', query: {sellerId: sellerId}}">业绩说明</router-link></p>
			</div>
		</div>
		<!-- 底部导航组件 -->
		<!-- <bottom-nav :queryvariate="sellerId"></bottom-nav> -->

		<!-- 激活过来的，已认证但还需完善信息弹窗 -->
		<mt-popup
		class="uni-pop completeinfo border-box"
		v-if="bool.completeInfo"
		v-model="bool.completeInfo"
		:closeOnClickModal="false"
		position="center">
			<pop-modal :variate="bool.completeInfo">
				<p class="font-color tip1">恭喜您，已激活成功！</p>
  				<p class="tip2">完善资料信息后即可使用</p>
  				<button slot="button" class="theme-bg-color_lighter button"><router-link :to="{path: '/retailer/info', query: {sellerId: this.sellerId}}">去完善资料</router-link></button>
    		</pop-modal>
		</mt-popup>

		<!-- 去认证弹窗 -->
		<mt-popup
		class="uni-pop yetcertifiedpop border-box"
		v-if="bool.yetcertified"
		v-model="bool.yetcertified"
		:closeOnClickModal="false"
		position="center">
			<pop-modal :variate="bool.yetcertified">
				<p class="font-color tip1">您还没有完成认证</p>
  				<p class="tip2">请点击<span class="font-color">“去认证”</span>，完善本店信息</p>
  				<p class="tip3">两分钟即可完成认证</p>
  				<button slot="button" class="theme-bg-color_lighter button"><router-link to="/retailer/info">去认证</router-link></button>
    		</pop-modal>
		</mt-popup>

		<!-- 审核未通过，重新去审核 -->
		<mt-popup
		class="uni-pop fail border-box"
		v-if="bool.failpop"
		v-model="bool.failpop"
		:closeOnClickModal="false"
		position="center">
			<pop-modal>
				<p class="font-color tip1">{{waiting.text}}</p>
  				<p class="tip3">信息填写错误，请重新认证</p>
  				<button slot="button" class="theme-bg-color_lighter button"><router-link to="/retailer/info">重新认证</router-link></button>
    		</pop-modal>
		</mt-popup>		

		<!-- 审核中 -->
		<mt-popup
		class="uni-pop waitingpop border-box success"
		v-if="bool.waitingpop"
		v-model="bool.waitingpop"
		:closeOnClickModal="false"
		position="center">
			<pop-modal>
				<p class="font-color tip1">{{waiting.text}}</p>
  				<p class="tip3">{{waiting.tip}}</p>
  				<button slot="button"></button>
    		</pop-modal>
		</mt-popup>

		<!-- 去激活 -->
		<mt-popup
		class="uni-pop activatepop border-box"
		v-if="bool.activatepop"
		v-model="bool.activatepop"
		:closeOnClickModal="false"
		position="center">
			<pop-modal>
				<p class="font-color tip1">{{activate.text}}</p>
  				<p class="tip3">{{activate.tip}}</p>
  				<button slot="button" class="theme-bg-color_lighter"><router-link :to="{path: '/retailer/activation', query: {sellerId: sellerId}}">去激活</router-link></button>
    		</pop-modal>
		</mt-popup>

		<!-- 领取标牌弹窗 -->
		<mt-popup
		class="getlabelpop"
		v-if="bool.getlabelpop"
		v-model="bool.getlabelpop"
		position="bottom">
			<pop-up :variate="getlabelpopVariate" v-on:closeLabelpop="closeLabelpop"></pop-up>
		</mt-popup>
	</div>
</template>
<script>
import Http from 'assets/lib/http.js'
import { Popup } from 'mint-ui'
import popUp from 'components/pop-up'
import popModal from 'components/pop-modal'
import {getCookie, deleteCookie, getQueryString} from 'assets/lib/publicMethod'

export default {
  	name: 'StoreCenter',
  	data () {
  		return {
  			bool: {
  				yetcertified: false, // 去认证弹窗
  				activatepop: false, // 去激活弹窗
  				waitingpop: false, // 正在审核
  				failpop: false,	// 审核未通过
  				completeInfo: false, // 去完善信息弹窗
				getlabelpop: false	// 领取标牌弹窗
  			},
  			getlabelpopVariate: {},
  			certifyoredit: '去认证', // 控制右上角按钮文字及认证icon显示
  			maindata: {},
  			user: {
  				wallet: {
  					balance: 0,
  					redPack: 0
  				}
  			}, //零售户信息
  			waiting: {}, //待审核or审核未通过文案内容
  			activate: {}, //激活弹窗文案内容
  			sellerId: sessionStorage.getItem('sellerId') || getQueryString('sellerId') || ''
  		}
  	},
  	created() {
  		this.checkCookie();
  	},
  	beforeDestroy () {
		// this.$bus.emit('infopage', this.user);
  	},
  	methods: {
  		getSellerId() {

  		},
  		checkCookie() {
  			let me = this;
            var REDIRECT = getCookie('REDIRECT');
            if (REDIRECT) {
                deleteCookie('REDIRECT', '.cs.weiop.taozuike.com');
                var routepath = (REDIRECT.match(/\/\w+$/))[0];
                if (routepath === '/myqresult') {
                	location.replace(location.origin + '/retailer/index.html#/retailer' + routepath + '?sellerId=' + me.sellerId)
                } else if (routepath === '/activation') {
                	location.replace(location.origin + '/retailer/index.html#/retailer' + routepath + '?sellerId=' + me.sellerId + '&actFlag=' + getQueryString('actFlag'))
                }
            } else {
				me.getRetailerInfo();
            }
        },
  		// 判断是否认证，展示店家信息
  		getRetailerInfo() {
            Http.get('/seller-web/seller/main/' + this.sellerId).then(res => {
                const Data = res.data;
                if (Data.ok) {
                	this.$parent.loadingPage = false; //去掉loading

                	const Data = this.maindata = res.data.data;
                	let sellerInfo = this.user = Data.sellerInfo;
                	sessionStorage.setItem('user', JSON.stringify(sellerInfo))
                	sessionStorage.setItem('sellerId', sellerInfo.sellerId);
                	sessionStorage.setItem('activityintro', Data.SELLER_CURRENT_ACTIVITY_DESC);
                	sessionStorage.setItem('rewardintro',Data.SELLER_ACHIEVEMENT_DESC);
                	sessionStorage.setItem('qrurl', sellerInfo.qrUrl);

                	let authStatus = sellerInfo.authStatus;
                	let me = this;
                    if (authStatus == 2) {
                    	// 审核通过
                    	me.certifyoredit = '重新编辑';
                    	if (!sellerInfo.headImg) {
                    		// 待完善
                    		me.bool.completeInfo = true
                    	}
                    } else if (authStatus == 1) {
                    	// 审核中
                    	me.certifyoredit = '审核中';
                		me.waiting.text = '您提交的申请正在审核中';
                		me.waiting.tip = '请耐心等待通知';
                		me.bool.waitingpop = true;
                    } else if (authStatus == 3) {
                    	// 没通过
                    	me.bool.failpop = true;
                    	me.waiting.text = Data.applyLog ? Data.applyLog.failReason : '审批未通过';
                    } else {
                    	// 待激活
                    	me.bool.activatepop = true;
                    	me.activate.text = '您是认证用户，尚未激活';
                    	me.activate.tip = '点击下方按钮去激活吧！'
                    }

                    if (Data.SELLER_QRPRINT_SHOW_ISSET == 0) {
                    	document.getElementsByClassName('sign')[0].classList.add('hidden')
                    }
                } else {
                	// 去认证
                	this.bool.yetcertified = true;
                	this.$parent.loadingPage = false; //去掉loading
                }
            })
        },
  		// 领取标牌
	    showLabelpopup() {
	      	this.bool.getlabelpop = true;
	      	this.getlabelpopVariate = {
	      		getlabelpop: this.bool.getlabelpop,
	      		user: this.user,
	      		price: this.maindata.SELLER_QRPRINT_CHARGE_STANDARD
	      	}
	    },
	    closeLabelpop(val) {
	    	this.bool.getlabelpop = val.getlabelpop;
	    },
	    gotocredit() {
	    	var hostname = location.hostname;
	    	if (hostname == 'sk.saotx.cn') {
	    		// 山昆
	    		location.href = '/a/p/scoremall002-score-integral.html?t=' + (+new Date)
	    	} else if (hostname == 'weiop.taozuike.com') {
		    	// 河南
		    	location.href = '/a/p/score-integral.html?sourceId=3001?t=' + (+new Date);
	    	} else if (hostname === 'hbz.saotx.cn') {
	    		// 河北
	    		location.href = '/app-hebei/views/menus/shop-integral.html?t=' + (+new Date)
	    	}
	    }
	},
	components:{
	    popUp,
	    popModal
	},
	computed: {

	}
}
</script>

<style lang="scss">
@mixin border-radius($num) {
	-webkit-border-radius: $num;
	-moz-border-radius: $num;
	-ms-border-radius: $num;
	border-radius: $num;
}
.storecenter {
	.main-info {
		justify-content: center;
		padding: .3rem .2rem .1rem;
		height: 3.12rem;
		border-bottom: 1px solid #eee;
		.flex-item {
			height: 2rem;
		}
		.avatar {
			position: relative;
			width: 30%;
			a {
				overflow: hidden;
				display: block;
				margin: 0 auto;
				width: 1.88rem;
				height: 1.88rem;
				line-height: 1.88rem;
				border: 2px solid #fff;
				@include border-radius(50%);
				img {
					width: 100%;
					vertical-align: middle;
				}
			}
		}
		.brief {
			width: 40%;
			text-align: center;
			.store-name {
				height: 40%;
			    padding-bottom: 0.15rem;
			    font-size: 0.453rem;
			    border-bottom: 1px solid #A5A5A8;
			    line-height: 2;
			    width: 100%;
			    text-overflow: ellipsis;
			    overflow: hidden;
			    white-space: nowrap;
			}
			.account {
				justify-content: space-around;
				height: 58%;
				.num {
					font-size: 0.459rem;
					line-height: 1.2;
					text-align: center;
				}
				.unit {
					color: #8A8A8C;
					font-size: 0.32rem;
				}
			}
		}
		.edit {
			padding-top: 1.2rem;
			text-align: center;
			width: 30%;
			a {
				display: block;
				margin: 0 auto;
				@include border-radius(4px)
				width: 1.92rem;
				height: 0.813rem;
				line-height: 0.813rem;
				text-align: center;
				font-size: 0.37rem;
				color: #fff;
			}
		}
	}
	.menulist {
		.menu {
			position: relative;
			padding-left: .2rem;
			padding-right: .2rem;
			height: 1.2733rem;
			background: #fff;
			.item {
				height: 99%;
				line-height: 1.3rem;
				text-indent: .8rem;
				font-size: 0.426rem;
				a {
					display: block;
					width: 100%;
					height: 100%;
				}
			}
			&:not(.sign):after {
				content: '>';
				position: absolute;
				right: .4rem;
				top: 50%;
				transform: translateY(-50%);
				color: #8A8A8C;
				font-size: 0.46rem;
			}
		}
		.mar-bt {
			margin-bottom: 0.3rem;
		}
		.bor-bt {
			.item {
				border-bottom: 1px solid rgba(204,204,204,.4);
			}
		}
	}

	.mint-popup {
		.close {
			position: absolute;
			right: .3rem;
			top: .2rem;
			width: .6933rem;
			height: .6933rem;
			line-height: .7rem;
			text-align: center;
			font-size: .48rem;
			@include border-radius(50%);
			border: 1px solid #eee;
		}
	}

	/* 领取标牌弹窗 */
	.getlabelpop {
		width: 100%;
		.pop-wrap {
			position: relative;
			padding: 0 .2rem;
			.pop-item {
				overflow: hidden;
				line-height: 1.3rem;
				.left {
					color: #707070;
					font-size: .453rem;
				}
				.right {
					float: right;
				}
				p {
					font-size: .48rem;
					text-align: right;
				}
				.labelpic {
					overflow: hidden;
					display: block;
					margin: -.3rem auto .02rem;
					width: 1.96rem;
					max-width: 1.96rem;
					height: 2.64rem;
					-webkit-box-shadow: 0 0 0 4px #fff, 0 0 6px 5px rgba(0,0,0,.2), inset 0 0 5px rgba(0,0,0,.4);
					-moz-box-shadow: 0 0 0 4px #fff, 0 0 6px 5px rgba(0,0,0,.2), inset 0 0 5px rgba(0,0,0,.4);
					-ms-box-shadow: 0 0 0 4px #fff, 0 0 6px 5px rgba(0,0,0,.2), inset 0 0 5px rgba(0,0,0,.4);
					box-shadow: 0 0 0 4px #fff, 0 0 6px 5px rgba(0,0,0,.2), inset 0 0 5px rgba(0,0,0,.4);
					img {
						width: 100%;
						height: 100%;
					}
				}
				b {
					display: block;
					text-align: center;
					color: #AAAAAD;
					font-size: .34667rem;
				}
			}
			.pop-item:not(:last-of-type) {
				border-bottom: 1px solid #eee;
				border-bottom: 0.5px solid #eee;
			}
			button {
				display: block;
				margin: .5rem auto .4rem;
				width: 9.33rem;
				height: 1.173rem;
				line-height: 1.17rem;
				color: #fff;
				font-size: .613rem;
				@include border-radius(4px);
			}
		}
	}	

	/* 去认证弹窗 */
	.yetcertifiedpop, .completeinfo {
		img {
			width: 1.76rem;
			height: 1.76rem;
		}
		button {
			a {
				display: block;
			}
		}
	}
	.success {
		.modal-wrap {
			padding-top: 3rem!important;
		}
		.tip1 {
			margin-top: .6rem;
			margin-bottom: .3rem;
		}
		.tip3 {
			margin-bottom: 1.2rem;
		}
		button {
			display: none!important;
		}
	}
	.fail {
		button {
			margin-top: .6rem!important;
		}
	}
}
</style>