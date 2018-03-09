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
          },
          cancel: function(res) {
            alert(1)
            window.history.go(-1);
          },
          trigger: function(res) {
            alert(2)
            window.history.go(-1);
          },
          fail: function(res) {
            alert(3)
            window.history.go(-1);
          },
          complete: function(res) {
//            alert(4)
//            window.history.go(-1);
          }
        })
      })

      pushHistory();

      window.addEventListener("popstate", function(e) {  //回调函数中实现需要的功能
//        window.history.go(-1);
        wx.closeWindow();
        alert("我监听到了浏览器的返回按钮事件啦");
//        location.href='你要跳转的链接';  //在这里指定其返回的地址
      }, false);

      function pushHistory() {
        var state = {
          title: "title",
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
