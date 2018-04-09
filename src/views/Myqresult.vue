<template>
	<div class="myqresult border-box">
		<div class="info border-box">
			<div class="left">
				<div class="avatar certified"><a href="javascript:;"><img :src="user.headImg" alt=""></a></div>
				<div class="certificate"><img :src="user.licenceImg" alt=""></div>
			</div>
			<div class="right">
				<div class="item">
					<span class="name">经营人姓名:</span>
					<div class="content">{{user.ownerName}}<span></span></div>
				</div>
				<div class="item">
					<span class="name">手机号:</span>
					<div class="content">{{user.phoneNo}}<span></span></div>
				</div>
				<div class="item">
					<span class="name">店铺名称:</span>
					<div class="content">{{user.shopName}}<span></span></div>
				</div>
				<div class="item">
					<span class="name">门店地址:</span>
					<div class="content">{{user.addrDetail}}<span></span></div>
				</div>
				<div class="certificate-number">
					<span class="name">烟草专卖零售许可证件号</span>:
					<div class="content">{{user.licenceNo}}</div>
				</div>
			</div>
		</div>
		<button class="scan theme-bg-color" @click="scan">扫一扫</button>
		<p class="tip font-color-lighter">绑定店码后，扫烟包二维码，中奖概率提升10%</p>
	</div>
</template>
<script>
import {showRetailerInfo} from 'api/myqresult'
import wx from 'weixin-js-sdk'
import {mapGetters} from 'vuex'

export default {
	name: 'Myresult',
	computed: mapGetters([
		'wxConfig'
	]),
	data() {
		return {
			user: {}
		}
	},
	created() {
		this.showUserInfo()
	},
	methods: {
		showUserInfo() {
			showRetailerInfo(this.$route.query.sellerId || '').then(res => {
				if (res.ok) {
					this.$parent.loadingPage = false; //去掉loading
					this.user = res.data.sellerInfo;
				}
			})
		},
		scan() {
			// 调起微信扫一扫
			wx.config({
                debug: false,
                appId: this.wxConfig.appid,
                timestamp: this.wxConfig.timestamp,
                nonceStr: this.wxConfig.noncestr,
                signature: this.wxConfig.signature,
                jsApiList: ['scanQRCode']
            });
            wx.ready(function () {
                wx.scanQRCode({
                    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode", "barCode"], 
                    // 可以指定扫二维码还是一维码，默认二者都有
                    success: function(res) {
                         // 当needResult 为 1 时，扫码返回的结果
                    }
                })
            })
		}
	}
}
</script>
<style lang="scss">
.myqresult {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	.info {
		display: -webkit-box;
		-webkit-box-orient: horizontal;
		display: flex;
		margin: 6rem auto 0;
		padding: 0 .3rem;
		width: 7.8667rem;
		height: 5.33rem;
		.left {
			margin-right: .3rem;
			width: 2rem;
			.avatar {
				position: relative;
				width: 100%;
				a {
					overflow: hidden;
					display: block;
					margin: 0 auto;
					width: 1.44rem;
					height: 1.44rem;
					line-height: 1.44rem;
					-webkit-border-radius: 50%;
					-moz-border-radius: 50%;
					-ms-border-radius: 50%;
					border-radius: 50%;
					border: 1px solid #ccc;
					img {
						width: 100%;
						vertical-align: middle;
					}
				}
			}
			.certificate {
				margin: .4rem auto;
				width: 1.76rem;
				height: 1.2rem;
				border: 1px solid #ccc;
				text-align: center;
				img {
					max-width: 100%;
					max-height: 100%;
				}
			}
		}
		.right {
			flex: 1;
			color: #E4341D;
			.name {
				font-weight: 500;
			}
			.item {
				overflow: hidden;
				margin-bottom: .18rem;
				font-size: .293rem;
				.name {
					float: left;
					width: 1.65rem;
					/*text-align-last: justify;*/
					text-align: justify;
				}
				.content {
					margin-top: .05rem;
					float: right;
					width: calc(100% - 1.7rem);
					text-align: left;
					line-height: 1.2;
					span {
						display: inline-block;
					}
				}
			}
			.certificate-number {
				.content {
					line-height: 1.8;
				}
			}
		}
	}
	.scan {
		display: block;
		margin: 1rem auto .4rem;
		width: 4.54667rem;
		height: 1.1733rem;
		font-size: .613rem;
		color: #fff;
		-webkit-border-radius: 4px;
		-moz-border-radius: 4px;
		-ms-border-radius: 4px;
		border-radius: 4px;
	}
	.tip {
		text-align: center;
		font-size: .32rem;
	}
}
</style>