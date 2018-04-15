<template>
    <!--烟台扫一扫-->
	<div class="ytscancode">
        <button class="theme-bg-color again-btn" @click="scanAgain">继续扫码</button>
        <div class="hidden">{{this.wxConfig}}</div>
	</div>
</template>

<script>
import wx from 'weixin-js-sdk'
import {mapGetters} from 'vuex'
import Fetch from 'api/fetch'

export default {
    name: 'YantaiScanCode',
    computed: mapGetters([
        'wxConfig'
    ]),
    created() {
        this.$parent.loadingPage = false //去掉loading
        this.scan()
    },
    methods: {
        scan() {
            if (this.wxConfig.appid) {
                console.log(this.wxConfig.appid)
                this.wxReady(this.wxConfig)
            } else {
                console.log('noappid')
                Fetch.get('/seller-web/wechat/open/jstoken').then(res => {
                    if (res.ok) {
                        const Data = res.data;
                        console.log(Data.appid);
                        this.wxReady(Data)
                    }
                })
            }
        },
        wxReady(Data) {
            wx.config({
                debug: false,
                appId: Data.appid,
                timestamp: Data.timestamp,
                nonceStr: Data.noncestr,
                signature: Data.signature,
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
            wx.error(function(res){
                console.log('错误：', JSON.stringify(res))
            })
        },
        scanAgain() {
            this.scan()
        }
	}
}
</script>
<style lang="scss" scoped>
.again-btn {
    width: 200px;
    height: 50px;
    display: block;
    font-size: 20px;
    line-height: 50px;
    margin: 200px auto;
    color: #fff;
}
</style>
