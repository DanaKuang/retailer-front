<template>
	<div class="warehouse-wrap">
		<div class="warehouse">
			<p class="name">{{text}}</p>
			<p class="tip">{{tip}}</p>
			<div class="btns">
				<button class="theme-bg-color" @click="gotocredit">查看积分</button>
				<button class="theme-bg-color" @click="scanputinStorage">继续扫码</button>
			</div>
		</div>
	</div>
</template>

<script>
import {scanintowarehouse} from  'api/scanintostore.js'
import wx from 'weixin-js-sdk'
import {mapGetters} from 'vuex'

export default {
    computed: mapGetters([
        'sellerId',
        'wxConfig'
    ]),
	data () {
		return {
			text: '',
			tip: ''
		}
	},
	created() {
        this.$parent.loadingPage = false; //去掉loading
        this.scan()
	},
	//相关操作事件
	methods: {
		scanputinStorage() {
            this.scan()
		},
        scan() {
        	var me = this;
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
                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    desc: 'scanQRCode desc',
                    scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function(res) {
                        me.successScan(res)
                    },
                    fail: function (res) {
                        me.failScan();
                        if (res.errMsg.indexOf('function_not_exist') > 0) {
                           alert('版本过低请升级')
                           return
                        }
                    }
                })
            })
        },
        successScan(res) {
        	var me = this;
            scanintostore({
                content: res.resultStr,
                sellerId: this.sellerId || this.$route.query.sellerId || ''
            }).then(res => {
                if (res.ok) {
                    me.text = '恭喜！成功入库1条';
                    me.tip = '积分可在个人中心查看或使用';
                } else {
                    me.text = res.msg;
                    me.tip = '点击右下方按钮继续扫码';
                }
        	})
        },
        failScan() {
			this.text = '扫码失败，点击下方按钮继续扫码或查看积分'
        },
        gotocredit() {
            var hostname = location.hostname;
            if (hostname == 'sk.saotx.cn') {
                // 山昆
                location.href = '/a/p/scoremall002-score-integral.html?t=' + (+new Date)
            } else if (hostname == 'weiop.taozuike.com') {
                // 河南
                location.href = '/a/p/score-integral.html?sourceId=3001?t=' + (+new Date);
            } else if (hostname == 'hbz.saotx.cn') {
                // 河北
                location.href = '/app-hebei/views/menus/shop-integral.html?t=' + (+new Date)
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
.name {
	padding-top: 7rem;
	margin: 0 auto .5rem;
	width: 4.8rem;
	line-height: 1.3;
	text-align: center;
	color: #1F1E23;
	font-size: .48rem;
}
.tip {
	text-align: center;
	color: #666;
	font-size: .37rem;
}
.btns {
	margin: 1.2667rem auto 0;
	width: 8.4rem;
}
button {
	width: 3.5rem;
	height: 1.02rem;
	@include border-radius(5px);
	font-size: .48rem;
	color: #fff;
	&:last-child {
		margin-left: 1.3rem;
	}
}
</style>
