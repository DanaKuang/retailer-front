<template>
	<div class="activation">
        <div class="item-wrap">
            <div class="item">
                <span class="name">经营人姓名</span>：
                <div class="content">{{seller.sellerInfo && seller.sellerInfo.ownerName}}</div>
            </div>
            <div class="item">
                <span class="name">手机号</span>：
                <div class="content">{{seller.sellerInfo && seller.sellerInfo.phoneNo}}</div>
            </div>
            <div class="item certificate">
                <span class="name">烟草专卖零售许可证件号</span>：
                <div class="content">{{seller.sellerInfo && seller.sellerInfo.licenceNo}}</div>
            </div>
            <div class="item">
                <span class="name">店铺名称</span>：
                <div class="content">{{seller.sellerInfo && seller.sellerInfo.shopName}}</div>
            </div>
            <div class="item">
                <span class="name">门店地址</span>：
                <div class="content">{{seller.sellerInfo && seller.sellerInfo.addrDetail}}</div>
            </div>
            <div class="item">
                <span class="name">区域</span>：
                <div class="content">{{seller.sellerInfo && seller.sellerInfo.districtName}}</div>
            </div>
            <div class="item">
                <span class="name">业态</span>：
                <div class="content">{{seller.sellerInfo && seller.sellerInfo.commercialName}}</div>
            </div>
        </div>

        <button class="confirm theme-bg-color_lighter" :disabled="confirmDisable" :class="{'disabled-btn': confirmDisable}" @click="confirm">确认信息并激活</button>

        <!-- 发送验证码弹窗 -->
        <mt-popup
        class="uni-pop pop border-box"
        v-if="codePop"
        v-model="codePop"
        :closeOnClickModal="false"
        position="center">
            <pop-modal>
                <div class="verify">
                    <label for="">
                        <input class="vcode border-box" type="text" v-model="vcode" :disabled="vcodeInputDisable">
                        <input class="theme-bg-color_lighter vcode-btn border-box" type="button" v-model="vcodeBtnMsg" readonly="true" @click="send" :disabled="vcodeBtnDisable" :class="{'disabled-btn': vcodeBtnDisable}">
                    </label>
                </div>
                <p class="font-color tip1">请获取验证码</p>
                <p class="tip3">验证码会发送到<span class="font-color">{{seller.sellerInfo && seller.sellerInfo.phoneNo}}</span>手机里</p>
                <button slot="button" class="theme-bg-color_lighter" :disabled="vcodeVerifyDisable" :class="{'disabled-btn': vcodeVerifyDisable}" @click="verify">确认</button>
            </pop-modal>
        </mt-popup>

        <!-- 成功/失败弹窗 -->
        <mt-popup
        class="uni-pop pop border-box"
        v-if="confirmPop"
        v-model="confirmPop"
        :class="{success: successActivate, fail: !successActivate}"
        :closeOnClickModal="false"
        position="center">
            <pop-modal>
                <p class="font-color tip1">{{activateState.text}}</p>
                <p class="tip3">{{activateState.tips}}</p>
                <button slot="button" class="theme-bg-color_lighter" @click="iget">确认</button>
            </pop-modal>
        </mt-popup>
	</div>
</template>

<script>
import Fetch from 'api/fetch.js'
import {getVcode, verifyVcode, activate} from 'api/activate.js'
import {mapGetters, mapActions, mapMutations} from 'vuex'
import popModal from 'components/pop-modal'

export default {
	name: 'Activation',
    computed: mapGetters([
        'sellerId',
        'seller'
    ]),
	data () {
		return {
			vcode: '',
			codePop: true, // 验证码弹窗
			vcodeBtnMsg: '获取验证码',
			vcodeInputDisable: true, // 填写验证码输入框
			vcodeBtnDisable: false, // 获取验证码按钮
			vcodeVerifyDisable: true, // 验证码校验按钮
			confirmDisable: true, // 确认激活按钮
            confirmPop: false, // 激活成功or失败弹窗
            successActivate: false, // 激活成功的标识
			activateState: {
				text: ''
			},
            // 烟台接入河南
            isYanTai: this.$route.query.actFlag == 't1'
		}
	},
	created () {
        this.getRetailerInfo();
	},
	methods: {
		getRetailerInfo() {
			Fetch.get('/seller-web/consumer/seller/detail?sellerId=' + this.sellerId || '')
                .then(res => {
                    this.$parent.loadingPage = false; //去掉loading
                    if (res.ok) {
                        var Data = res.data;
                        if (!this.seller.sellerInfo) {
                            // detail接口和main字段相同，但结构又不一样！
                            var seller = {
                                sellerInfo: Data
                            }
                            this.setRetailer(seller);
                        }
                    }
                })
		},

		// 发送验证码
		send() {
            this.vcodeBtnDisable = true;
            this.vcodeInputDisable = false;
            this.vcodeVerifyDisable = false;
            this.getVerify(this.seller.sellerInfo.phoneNo);
        },

        getVerify(phone) {
            let me = this;
            let count = 60;
            var interval = window.setInterval(function() {
                if ((count--) == 0) {
                    count = 60;
                    me.vcodeBtnDisable = false;
                    me.vcodeBtnMsg = '获取验证码';
                    window.clearInterval(interval);
                } else {
                    me.vcodeBtnMsg = count + '秒';
                }
            }, 1000);
            getVcode(phone).then(res => {
                if (res.ret != 200000) {
                    alert(res.message)
                }
            })
        },

        // 校验验证码
        verify () {
            verifyVcode({
                mobile: this.seller.sellerInfo.phoneNo,
                code: this.vcode
            }).then(res => {
                if (res.data) {
                    this.codePop = false;
                    this.confirmDisable = false;
                    if (this.isYanTai) {
                        this.confirm()
                    }
                } else {
                    alert(res.message);
                    this.vcodeVerifyDisable = false;
                    return
                }
            })
        },

        // 确认激活
        confirm () {
            this.confirmDisable = true;
            var me = this;
            activate({
                sellerId: this.sellerId,
                valid: this.vcode + this.seller.sellerInfo.phoneNo + '1' + this.vcode.length
            }).then(res => {
                me.confirmPop = true;
                if (res.ok) {
                    // 激活成功
                    me.successActivate = true;
                    me.activateState.text = '恭喜您，激活成功！';
                    me.activateState.tips = '赶紧去完善基本信息吧！'
                } else {
                    // 激活失败
                    me.activateState.text = '很抱歉激活失败！';
                    me.activateState.tips = '请重新激活'
                }
            })
        },

        // 激活与否的弹窗，确认按钮
        iget () {
            if (this.successActivate) {
                this.$router.push({path:'/retailer/info'})
            } else {
                this.confirmPop = false;
                this.confirmDisable = false
            }
        },
        ...mapMutations({
            setRetailer: 'setRetailer'
        })
	},
	components: {
		popModal
	}
}
</script>

<style lang="scss" scoped>
  * {
    box-sizing: border-box;
  }
  .theme-bg-color_lighter {
    transition: all 0.3s ease-in-out;
    &:active {
      transform: scale(0.98);
    }
  }

.activation {
	.item-wrap {
		background: #fff;
	}
	.item {
		overflow: hidden;
		padding-left: .3rem;
		padding-right: .3rem;
		line-height: 1.3rem;
		font-size: .42667rem;
		span {
			float: left;
			width: 3rem;
			color: #666;
			text-align-last: justify;
		}
		.content {
			float: right;
			width: 5.8rem;
		}
		&:not(:last-child) {
			border-bottom: 1px solid rgba(204,204,204,.4);
		}
	}
	.certificate {
		line-height: 2;
	}
	.confirm {
		position: absolute;
		left: 50%;
		bottom: 1rem;
		-webkit-transform: translateX(-50%);
		-moz-transform: translateX(-50%);
		-ms-transform: translateX(-50%);
		transform: translateX(-50%);
		width: 9.33rem;
		height: 1.1733rem;
		line-height: 1.174rem;
		color: #fff;
		font-size: .48rem;
		text-align: center;
		-webkit-border-radius: 4px;
		-moz-border-radius: 4px;
		-ms-border-radius: 4px;
		border-radius: 4px;
	}
	.mint-popup {
    /* 烟台：烟草证号、验证码 S*/
    .yt-licenceNo, .yt-vcode {
      width: 7.24rem;
      height: 1.04rem;
      font-size: .48rem;
      background: #CACACA;
      padding: 0 0.2rem;
    }
    .yt-vcode {
      background: #fff;
      border: 1px solid #CACACA;
      margin: 0.7rem 0 0.3rem;
    }
    .yt-phone {
      padding: 0 0.2rem;
      text-align: left !important;
    }
    /* 烟台：烟草证号、验证码 E*/

		label {
			overflow: hidden;
			display: block;
			margin: .8rem auto 0;
			width: 7.24rem;
			height: 1.04rem;
			font-size: 0;
			.vcode {
				float: left;
				margin: 0;
				text-align: center;
				width: 4.6rem;
				height: 100%;
				font-size: .48rem;
				background: #CACACA;
				-webkit-border-radius: 0;
				-moz-border-radius: 0;
				-ms-border-radius: 0;
				border-radius: 0;
			}
			.vcode-btn {
				float: left;
				margin: 0;
				width: calc(100% - 4.7rem);
				height: 1.04rem;
				padding: 0.03rem .05rem;
				font-size: .42rem;
				text-align: center;
				color: #fff;
				-webkit-border-radius: 0;
				-moz-border-radius: 0;
				-ms-border-radius: 0;
				border-radius: 0;
				-webkit-user-select: none;
				user-select: none;
			}
		}
		img {
			width: 2.667rem;
			height: 1.92rem;
		}
		.tip1 {
			margin-top: .6rem;
			margin-bottom: .3rem;
		}
		.tip3 {
			margin-bottom: 1.2rem;
		}
	}
}
</style>
