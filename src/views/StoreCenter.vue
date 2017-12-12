<template>
	<div id="storecenter" class="storecenter">
		<div class="main-info flex border-box">
			<div class="avatar flex-item" v-bind:class="{yetcertified: bool.yetcertified, certified: !bool.yetcertified, waiting: bool.waiting}">
				<a href="javascript:;"><img :src="user.headImg" alt=""></a>
			</div>
			<div class="brief flex-item">
				<p class="store-name">{{user.shopName}}</p>
				<div class="account flex">
					<div class="money">
						<p class="num">0.00元</p>
						<p class="unit">账户余额</p>
					</div>
					<div class="redpacket">
						<p class="num">0个</p>
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
				<p class="item"><router-link :to="{path: '/retailer/credits', query: {sellerId: sellerId}}">我的积分</router-link></p>
			</div>
			<div class="wallet menu bor-bt border-box">
				<p class="item"><router-link :to="{path: '/retailer/wallet', query: {sellerId: sellerId}}">我的钱包</router-link></p>
			</div>
			<div class="order menu mar-bt border-box">
				<p class="item"><router-link :to="{path: '/retailer/orderdetail', query: {sellerId: sellerId}}">订单管理</router-link></p>
			</div>
			<div class="qr menu bor-bt border-box">
				<p class="item" @click="showqrpost">我的二维码</p>
			</div>
			<div class="sign menu mar-bt border-box">
				<p class="item" @click="showLabelpopup">领取标牌</p>
			</div>
			<div class="promotion menu bor-bt border-box">
				<p class="item">活动说明</p>
			</div>
			<div class="performance menu border-box">
				<p class="item">业绩说明</p>
			</div>
		</div>
		<!-- 底部导航组件 -->
		<bottom-nav :queryvariate="sellerId"></bottom-nav>

		<!-- 激活过来的，已认证但还需完善信息弹窗 -->
		<mt-popup
		class="uni-pop completeinfo border-box"
		v-if="bool.completeInfo"
		v-model="bool.completeInfo"
		:closeOnClickModal="false"
		position="center">
			<pop-modal :variate="bool.completeInfo">
				<img slot="image" src="../assets/image/shankun/verifyicon.png" alt="">
				<p class="font-color tip1">恭喜您，已激活成功！</p>
  				<p class="tip2">完善资料信息后即可使用</p>
  				<button slot="button" class="theme-bg-color_lighter button"><router-link :to="{path: '/retailer/info', query: {sellerId: this.sellerId}}">去完善资料</router-link></button>
    		</pop-modal>
		</mt-popup>

		<!-- 尚未认证弹窗 -->
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

		<!-- 审核中弹窗 -->
		<mt-popup
		class="uni-pop waitingpop border-box success"
		v-if="bool.waitingpop"
		v-model="bool.waitingpop"
		:closeOnClickModal="false"
		position="center">
			<pop-modal>
				<p class="font-color tip1">您提交的申请正在审核中</p>
  				<p class="tip3">请耐心等待通知</p>
  				<button slot="button"></button>
    		</pop-modal>
		</mt-popup>

		<!-- 展示用户二维码 -->
		<mt-popup
		class="showqrpostpop"
		v-if="bool.qrpostVisible"
		v-model="bool.qrpostVisible"
		:modal="false"
		position="bottom"
		popup-transition="popup-fade">
			<my-qrpost :variate="bool.qrpostVisible" v-on:closeqrpost="closeqrpost"></my-qrpost>
		</mt-popup>

		<!-- 领取标牌弹窗 -->
		<mt-popup
		class="getlabelpop"
		v-if="bool.getlabelpop"
		v-model="bool.getlabelpop"
		position="bottom">
			<pop-up :variate="bool.getlabelpop" v-on:closeLabelpop="closeLabelpop"></pop-up>
		</mt-popup>
	</div>
</template>
<script>
import bottomNav from '../components/bottom-nav'
import axios from 'axios'
import { Popup } from 'mint-ui'
import myQrpost from '../components/my-qrpost'
import popUp from '../components/pop-up'
import popModal from '../components/pop-modal'

export default {
  	name: 'StoreCenter',
  	data () {
  		return {
  			bool: {
				getlabelpop: false,	// 领取标牌弹窗
  				yetcertified: false, // 去认证弹窗
  				qrpostVisible: false, // 二维码展示弹窗
  				completeInfo: false, // 去完善信息弹窗
  				waitingpop: false
  			},
  			certifyoredit: '去认证',
  			user: {},
  			sellerId: this.$route.query.sellerId || ''
  		}
  	},
  	created() {
		this.getRetailerInfo();
  	}, 
  	mounted () {
		
  	},
  	beforeDestroy () {
		this.$bus.emit('infopage', this.user);
  	},
  	methods: {
  		// 判断是否认证，展示店家信息
  		getRetailerInfo() {
            axios.get('/seller-web/seller/main/' + this.sellerId)
                .then(res => {
                    const Data = res.data.data;
                    if (res.data.ok) {
                    	if (Data) {
							let sellerInfo = this.user = Data.sellerInfo;
		                    if (Data.sellerInfo.authStatus == 2) {
		                    	this.certifyoredit = '重新编辑';
		                    	if (!sellerInfo.headImg) {
		                    		this.bool.completeInfo = true
		                    	}
		                    } else if (Data.sellerInfo.authStatus == 1) {
		                    	if (Data.sellerInfo.shopName != '') {
		                    		// 审核中
		                    		this.certifyoredit = '审核中';
		                    		this.bool.waitingpop = true;
		                    	} 
		                    }
	                    }
                    } else {
                    	// 去认证
                    	require('assets/theme/shankun.css')
                    	this.bool.yetcertified = true
                    }
                })
        },
  		// 领取标牌
	    showLabelpopup() {
	      	this.bool.getlabelpop = true;
	    },
	    closeLabelpop(val) {
	    	this.bool.getlabelpop = val.myvariate;
	    },
	    // 展示店码
	    showqrpost() {
	    	this.bool.qrpostVisible = true;
	    },
	    closeqrpost() {
			this.bool.qrpostVisible = false;
	    },
	},
	components:{
	  	bottomNav,
	  	myQrpost,
	    popUp,
	    popModal
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
			margin-bottom: 0.533rem;
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
						vertical-align: middle
					}
				}
				b {
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

	/* 展示零售户二维码弹窗 */
	.showqrpostpop {
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		-webkit-transform: translate3d(0, 0, 0);
		-moz-transform: translate3d(0, 0, 0);
		-ms-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
		.myqrpost {
			.storename {
				margin-bottom: .8rem;
				font-size: .667rem;
				/*色值在各自的css里面设定*/
			}
			img {
				width: 5.30667rem;
				height: 5.30667rem;
			}
			.tip1 {
				margin-top: .3rem;
				font-size: .47rem;
			}
			.tip2 {
				margin-top: .3rem;
				font-size: .32rem;
				letter-spacing: 6px;
				color: #333;
			}
			.bottom {
				position: absolute;
				bottom: .6rem;
				left: 50%;
				-webkit-transform: translateX(-50%);
				-moz-transform: translateX(-50%);
				-ms-transform: translateX(-50%);
				transform: translateX(-50%);
				font-size: .32rem;
				font-weight: bold;
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
}

</style>