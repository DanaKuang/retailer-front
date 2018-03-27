<template>
  <div id="app">
    <router-view v-wechat-title='$route.meta.title' v-cloak />

    <!-- 底部导航x组件 -->
    <bottom-nav></bottom-nav>

    <!-- loading -->
    <div class="spinner-wrap" v-if="loadingPage">
        <mt-spinner type="triple-bounce"></mt-spinner>        
    </div>
  </div>
</template>

<script>
require('assets/lib/flexible.js')
require('assets/public/reset.css')
require('assets/public/common.css')
import bottomNav from 'components/bottom-nav'
import Http from 'assets/lib/http.js'
import wx from 'weixin-js-sdk'

export default {
    name: 'app',
    data () {
        return {
            orgId      : '',
            loadingPage: true,
            appid      : '',
            signature  : '',
            noncestr   : '',
            timestamp  : ''
        }
    },
    created() {
        this.getCommonConfig();
        this.getweixintoken();
    },
    methods: {
        getCommonConfig() {
            var me = this;
            Http.get('/seller-web/seller/queryBaseConfig')
                .then(res => {
                    var Data = res.data;
                    if (Data.ok) {
                        var data = Data.data;
                        me.orgId = data.orgId;
                        sessionStorage.setItem('orgId', me.orgId);
                        if (me.orgId === 'shankunzhongyan') {
                            require('assets/theme/shankun.css');
                            this.companyIdClass.classList.add('shankun')
                        } else {
                            require('assets/theme/henan.css');
                            this.companyIdClass.classList.add('henan')
                        }
                    } else {
                        alert(Data.msg);
                        return 
                    }
                })
        },
        getweixintoken () {
            let me = this;
            Http.get('/seller-web/wechat/open/jstoken')
              .then(res => {
                const Data = res.data;
                if (Data.ok) {
                    let data = Data.data;
                    me.appid = data.appid;
                    me.noncestr = data.noncestr;
                    me.signature = data.signature
                    me.timestamp = data.timestamp;
                    sessionStorage.setItem('appid', data.appid);
                    sessionStorage.setItem('noncestr', data.noncestr);
                    sessionStorage.setItem('signature', data.signature);
                    sessionStorage.setItem('timestamp', data.timestamp);

                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要 查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: me.appid, // 必填，企业号的唯一标识，此处填写企业号corpid
                        timestamp: me.timestamp, // 必填，生成签名的时间戳
                        nonceStr: me.noncestr, // 必填，生成签名的随机串
                        signature: me.signature,// 必填，签名，见附录1
                        jsApiList: [
                            'checkJsApi',
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo',
                            'onMenuShareQZone',
                            'scanQRCode',
                            'chooseWXPay'
                        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });

                    // config准备好后才可以wx.ready
                    me.$bus.emit('configready', true);

                    wx.ready(function(){
                        me.share()
                        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                    });
                    wx.error(function(res){
                        // alert('app错误：' + JSON.stringify(res));
                        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                    });
                }
            })
        },
        share() {
            var shareTitle = '我是title',
                shareLink = '',
                shareImg = '',
                shareDesc = '';

            wx.onMenuShareTimeline({
                title: shareTitle, // 分享标题
                link: shareLink, // 分享链接
                imgUrl: shareImg,
                desc: shareDesc,
                success: function () {

                }
            });
            wx.onMenuShareAppMessage({
                title: shareTitle, // 分享标题
                link: shareLink, // 分享链接
                imgUrl:shareImg,
                desc: shareDesc, // 分享描述
                trigger: function (res) {

                },
                success: function (res) {

                },
                cancel: function (res) {

                },
                fail: function (res) {

                }
            });
            wx.onMenuShareQQ({
                title: shareTitle, // 分享标题
                link: shareLink, // 分享链接
                imgUrl:shareImg,
                desc: shareDesc, // 分享描述
                trigger: function (res) {

                },
                success: function (res) {

                },
                cancel: function (res) {

                },
                fail: function (res) {

                }
            });
            wx.onMenuShareWeibo({
                title: shareTitle, // 分享标题
                link: shareLink, // 分享链接
                imgUrl:shareImg,
                desc: shareDesc, // 分享描述
                trigger: function (res) {

                },
                success: function (res) {

                },
                cancel: function (res) {

                },
                fail: function (res) {

                }
            });
            wx.onMenuShareQZone({
                title: shareTitle, // 分享标题
                desc: shareDesc, // 分享描述
                link: shareLink, // 分享链接
                imgUrl: shareImg, // 分享图标
                success: function () {

                },
                cancel: function () {

                }
            });
        }
    },
    computed: {
        companyIdClass () {
            return document.getElementById('app')
        }
    },
    components: {
      bottomNav
    }
}
</script>
<style lang="scss">
[v-cloak] {
    display: none;
}
</style>
