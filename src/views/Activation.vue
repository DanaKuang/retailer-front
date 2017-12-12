<template>
	<div class="activation">
		<div class="item-wrap">
			<div class="item">
				<span class="name">经营人姓名</span>：
				<div class="content">{{user.retailerName}}</div>
			</div>
			<div class="item">
				<span class="name">手机号</span>：
				<div class="content">{{user.tel}}</div>
			</div>
			<div class="item">
				<span class="name">店铺名称</span>：
				<div class="content">{{user.storeName}}</div>
			</div>
			<div class="item">
				<span class="name">门店地址</span>：
				<div class="content">{{user.address}}</div>
			</div>
			<div class="item certificate">
				<span class="name">烟草专卖零售<br>许可证件号</span>：
				<div class="content">{{user.certificateNumber}}</div>
			</div>
			<div class="item">
				<span class="name">区域</span>：
				<div class="content">{{user.area}}</div>
			</div>
			<div class="item">
				<span class="name">业态</span>：
				<div class="content">{{user.business}}</div>
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
						<input class="theme-bg-color_lighter vcode-btn" type="text" v-model="vcodeBtnMsg" readonly="true" @click="send" :disabled="vcodeBtnDisable" :class="{'disabled-btn': vcodeBtnDisable}">
					</label>
				</div>
				<p class="font-color tip1">请获取验证码</p>
  				<p class="tip3">验证码会发送到<span class="font-color">{{user.tel}}</span>手机里</p>
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
import axios from 'axios'
import popModal from '../components/pop-modal'

export default {
	name: 'Activation',
	data () {
		return {
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
			user: {
				retailerName: ''  // 必须赋值一个属性才不会报错
			},
			activateState: {
				text: ''
			}
		}
	},
	created () {
		this.getRetailerInfo()
	},
	mounted () {
		
	},
	beforeUpdate () {

	},
	updated () {

	},
	methods: {
		getRetailerInfo() {
			let me = this;
			axios.get('/seller-web/consumer/seller/detail?sellerId=' + this.sellerId)
	            .then(res => {
	                const Data = res.data;
	                if (Data.ok) {
	                	let data = Data.data;
						me.user.retailerName = data.ownerName,
		                me.user.tel = data.phoneNo,
		                me.user.storeName = data.shopName,
		                me.user.address = data.addrDetail,
		                me.user.certificateNumber = data.licenceNo;
	                }
	            })
		},
		// 发送验证码
		send() {
        	let me = this;
        	if (!me.vcodeBtnDisable) {
        		me.vcodeBtnDisable = true;
        		me.vcodeInputDisable = false;
        		me.vcodeVerifyDisable = false;
        		let interval = window.setInterval(function() {
	          		if ((me.count--) == 0) {
		           		me.count = 60;
		            	me.vcodeBtnDisable = false;
		            	me.vcodeBtnMsg = '获取验证码';
		            	window.clearInterval(interval);
	          		} else {
	          			me.vcodeBtnMsg = me.count + '秒';
	          		}
	        	}, 1000);
        		axios.get('/admin/login/getDynamicCode?oc=1&mobile=' + me.user.tel)
	        		.then(res => {
	        			const Data = res.data
	        			me.user.vcode = Data.data
	        		})
        	}
      	},
      	// 验证码输入后的校验
      	verify () {
      		if (!this.vcodeVerifyDisable) {
      			this.vcodeVerifyDisable = true;
      			let me = this;
      			axios.get('/admin/login/checkDynamicCode?mobile=' + me.user.tel + '&code=' + me.vcode)
	        		.then(res => {
	        			const Data = res.data
	        			if (Data.data) {
	        				me.codePop = false;
	        				me.confirmDisable = false;
	        			} else {
	        				alert(Data.message);
	        				this.vcodeVerifyDisable = false;
	        				return
	        			}
	        		})
      		}
      	},
      	// 确认激活
      	confirm () {
      		if (!this.confirmDisable) {
      			this.confirmDisable = true;
      			let me = this;
      			axios.get('/seller-web/consumer/active?sellerId=' + me.sellerId + '&valid=' + me.vcode + me.user.tel + '1' + me.vcode.length)
	        		.then(res => {
	        			const Data = res.data;
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
	        }
      	},
      	// 激活与否的弹窗，确认按钮
      	iget () {
      		if (this.successActivate) {
      			this.$router.push({path:'/retailer/index?sellerId=' + this.$route.query.sellerId})
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
			width: 2.6rem;
			color: #666;
			text-align-last: justify;
		}
		.content {
			float: right;
			width: 6.3rem;
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
		label {
			overflow: hidden;
			display: block;
			margin: .8rem auto 0;
			width: 7.24rem;
			height: 1.04rem;
			line-height: 1.04rem;
			.vcode {
				float: left;
				text-align: center;
				width: 4.62rem;
				height: 100%;
				font-size: .48rem;
				background: #CACACA;
			}
			.vcode-btn {
				float: right;
				width: 2.56rem;
				height: 100%;
				font-size: .48rem;
				text-align: center;
				color: #fff;
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