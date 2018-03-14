<template>
  <!--烟台扫一扫-->
	<div class="ytscancode">
    <button class="theme-bg-color again-btn" @click="scanAgain">继续扫码</button>
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
      this.$parent.loadingPage = false; //去掉loading
    },
    mounted() {
      let me = this;
      this.$bus.on('configready', function (val) {
        if (val) {
          me.scan()
        } else {
          console.log('我是烟台里面的，val不是true')
        }
      })
    },
    methods: {
      scan() {
        wx.ready(function () {
          console.log('我是yantai.vue的scan方法')
          wx.scanQRCode({
            needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            desc: 'scanQRCode desc',
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function(res) {
            },
            fail: function (res) {
              if (res.errMsg.indexOf('function_not_exist') > 0) {
                alert('版本过低请升级')
                return
              }
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
	},
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
  }

</style>
