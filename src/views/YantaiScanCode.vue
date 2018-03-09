<template>
  <!--烟台扫一扫-->
	<div class="ytscancode">

	</div>
</template>

<script>
  import wx from 'weixin-js-sdk'

  export default {
	name: 'YantaiScanCode',
	data () {
		return {

		}
	},
  created() {
    this.scan()
  },
	methods: {
    scan() {
      wx.config({
        debug: false,
        appId: sessionStorage.getItem('appid'),
        timestamp: sessionStorage.getItem('timestamp'),
        nonceStr: sessionStorage.getItem('noncestr'),
        signature: sessionStorage.getItem('signature'),
        jsApiList: ['scanQRCode']
      });
      wx.ready(function () {
        wx.scanQRCode({
          needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: function(res) {
            // 当needResult 为 1 时，扫码返回的结果
          }
        })
      })


      pushHistory();

      window.addEventListener("popstate", function(e) {
        WeixinJSBridge.call('closeWindow');
        alert("我监听到了浏览器的返回按钮事件啦");
      }, false);

      function pushHistory() {
        var state = {
          title: "myCenter",
          url: "__SELF__"
        };
        window.history.pushState(state, state.title, state.url);
      }
    }
	},
}
</script>

<style lang="scss" scoped>
</style>
