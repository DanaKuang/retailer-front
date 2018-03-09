<template>
	<div class="activation">
    <!-- kk：原来 -->
		<div v-if="!isYanTai">
      <div class="item-wrap">
        <div class="item">
          <span class="name">经营人姓名</span>：
          <div class="content">{{user.ownerName}}</div>
        </div>
        <div class="item">
          <span class="name">手机号</span>：
          <div class="content">{{user.phoneNo}}</div>
        </div>
        <div class="item">
          <span class="name">店铺名称</span>：
          <div class="content">{{user.shopName}}</div>
        </div>
        <div class="item">
          <span class="name">门店地址</span>：
          <div class="content">{{user.addrDetail}}</div>
        </div>
        <div class="item certificate">
          <span class="name">烟草专卖零售许可证件号</span>：
          <div class="content">{{user.licenceNo}}</div>
        </div>
        <div class="item">
          <span class="name">区域</span>：
          <div class="content">{{user.districtName}}</div>
        </div>
        <div class="item">
          <span class="name">业态</span>：
          <div class="content">{{user.commercialName}}</div>
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
          <p class="tip3">验证码会发送到<span class="font-color">{{user.phoneNo}}</span>手机里</p>
          <button slot="button" class="theme-bg-color_lighter" :disabled="vcodeVerifyDisable" :class="{'disabled-btn': vcodeVerifyDisable}" @click="verify">确认</button>
        </pop-modal>
      </mt-popup>
    </div>

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

    <!-- 老韩：烟台接到河南 -->
    <div v-if="isYanTai" class="zhazhazha">
      <!-- 发送验证码弹窗 -->
      <mt-popup
        class="uni-pop pop"
        v-model="ytCodePop"
        :closeOnClickModal="false"
        position="center"
        >
        <pop-modal>
          <!-- 烟草证号 -->
          <input class="yt-licenceNo" type="text" v-model="ytLicenceNo" disabled="true" placeholder="烟草证号"/>

          <!-- 手机号、获取验证码 -->
          <label for="">
            <input class="yt-phone vcode" type="text" v-model="ytPhone" disabled="true" placeholder="手机号"/>
            <input class="theme-bg-color_lighter vcode-btn" type="button" v-model="vcodeBtnMsg" readonly="true" @click="send" :disabled="ytVcodeBtnDisable" :class="{'disabled-btn': ytVcodeBtnDisable}">
          </label>

          <!-- 验证码输入 -->
          <input class="yt-vcode" @input="ytVcodeChange" type="text" v-model="ytVcode" placeholder="请输入验证码"/>

          <button slot="button" class="theme-bg-color_lighter" :disabled="ytVcodeVerifyDisable" :class="{'disabled-btn': ytVcodeVerifyDisable}" @click="verify">确认</button>
        </pop-modal>
      </mt-popup>
    </div>
	</div>
</template>

<script>
import Http from 'assets/lib/http.js'
import popModal from 'components/pop-modal'

export default {
	name: 'Activation',
	data () {
		return {
            // 原来
			vcode: '',
			codePop: true, // 验证码弹窗
			confirmPop: false, // 激活成功or失败弹窗
			successActivate: false, // 激活成功的标识
			confirmDisable: true, // 确认激活按钮
			vcodeInputDisable: true, // 填写验证码输入框
			vcodeBtnDisable: false, // 获取验证码按钮
			vcodeVerifyDisable: true, // 验证码校验按钮
			vcodeBtnMsg: '获取验证码',
			count: 60,
			timer: null,
			sellerId: this.$route.query.sellerId,
			user: {},
			activateState: {
				text: ''
			},

      // 烟台接入河南
      isYanTai: this.$route.query.actFlag == 't1', // 区分是否烟台，是的话为 t1
      ytCodePop: true, // 弹窗
      ytLicenceNo: this.$route.query.licenceNo, // 烟草证号
      ytPhone: this.$route.query.phone, // 手机号
      ytVcode: '', // 验证码
      ytVcodeBtnDisable: false, // 验证码获取按钮
      ytVcodeVerifyDisable: true, // 验证码校验按钮
		}
	},
	created () {
    this.getRetailerInfo();
    if(this.isYanTai) {
      this.$parent.loadingPage = false; //去掉loading
    }
	},
	mounted () {

	},
	beforeUpdate () {

	},
	updated () {

	},
	methods: {
		getRetailerInfo() {
			Http.get('/seller-web/consumer/seller/detail?sellerId=' + this.sellerId)
            .then(res => {
                var Data = res.data;
                if (Data.ok) {
                    this.$parent.loadingPage = false; //去掉loading
                    this.user = Data.data;
                    if(this.isYanTai) {
                      let sellerInfo = Data.data;
                      sessionStorage.setItem('user', JSON.stringify(sellerInfo))
                    }
                }
            })
		},

		// 发送验证码
		send() {
            var me = this;
            function getVerify (phone) {
                var interval = window.setInterval(function() {
                    if ((me.count--) == 0) {
                        me.count = 60;
                        me.vcodeBtnDisable = false;
                        me.vcodeBtnMsg = '获取验证码';
                        window.clearInterval(interval);
                    } else {
                         me.vcodeBtnMsg = me.count + '秒';
                    }
                }, 1000);
                Http.get('/admin/login/getDynamicCode?oc=1&mobile=' + phone)
                    .then(res => {
                      var Data = res.data
                      if (Data.ret != 200000) {
                        alert(Data.message)
                      } else {
                        me.user.vcode = Data.data
                      }
                    })
            }

            //!me.vcodeBtnDisable
            if (!this.isYanTai) {
                me.vcodeBtnDisable = true;
                me.vcodeInputDisable = false;
                me.vcodeVerifyDisable = false;

                getVerify(me.user.phoneNo);
            }

            // 烟台
            if (this.isYanTai) {
                this.ytVcodeBtnDisable = true;
                getVerify(me.ytPhone);
            }
        },

        // 烟台，验证码input事件
        ytVcodeChange () {
            if (this.ytVcode != '') {
                this.ytVcodeVerifyDisable = false;
            } else {
                this.ytVcodeVerifyDisable = true;
            }
        },

        // 验证码输入后的校验
        verify () {
            var me = this;
    		function confirmSub (phone, code) {
                Http.get('/admin/login/checkDynamicCode?mobile=' + phone + '&code=' + code)
                .then(res => {
                  var Data = res.data
                  // 原来
                    if(!me.isYanTai) {
                        if (Data.data) {
                            me.codePop = false;
                            me.confirmDisable = false;
                        } else {
                            alert(Data.message);
                            this.vcodeVerifyDisable = false;
                            return
                        }
                    } else { // 烟台
                        if (Data.data) { // true
                        // 调用确认激活方法
                            me.confirm();
                        } else {
                            alert(Data.message);
                            return
                        }
                    }
                })
            }

            // 原来：!this.vcodeVerifyDisable
            if (!this.isYanTai) {
                this.vcodeVerifyDisable = true;
                confirmSub(me.user.phoneNo, me.vcode);
            }

            // 烟台
            if (this.isYanTai) {
                this.ytVcodeVerifyDisable = true;
                confirmSub(me.ytPhone, me.ytVcode);
            }
        },

        // 确认激活
        confirm () {
            this.confirmDisable = true;
            var me = this;
            // 原来
            if (!this.isYanTai) {
                var phone = me.user.phoneNo,
                code = me.vcode;
            } else { // 烟台
                var phone = me.ytPhone,
                code = me.ytVcode;
            }
            Http.get('/seller-web/consumer/active?sellerId=' + me.sellerId + '&valid=' + code + phone + '1' + code.length)
                .then(res => {
                    var Data = res.data;
                    me.confirmPop = true;
                    if (Data.ok) {
                        // 激活成功
                        me.successActivate = true;
                        me.activateState.text = '恭喜您，激活成功！';
                        me.activateState.tips = '赶紧去零售户中心管理店铺吧！'
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
                // 原来
                if (!this.isYanTai) {
                    this.$router.push({path:'/retailer/index?sellerId=' + this.$route.query.sellerId})
                } else {
                    // 烟台
                    // 跳到填写信息
//                    this.$router.push({path:'/retailer/info?sellerId=' + this.$route.query.sellerId})
                }
            } else {
                this.confirmPop = false;
                this.confirmDisable = false
            }
        }
	},
	computed: {

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
