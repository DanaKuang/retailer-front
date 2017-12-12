<template>
	<div class="pop-wrap border-box">
		<div class="pop-item sample">
			<span class="left">店码</span>
			<a href="javascript:;" class="labelpic">
				<img src="" alt="">
			</a>
			<b>(提供精美标牌设计包装)</b>
		</div>
		<div class="pop-item address">
			<span class="left">收货地址</span>
			<p class="right">7栋2单元501</p>
		</div>
		<div class="pop-item house-number">
			<p>soho塔1B座1201</p>
		</div>
		<div class="pop-item contact">
			<span class="left">联系人姓名</span>
			<p class="right">霞光没</p>
		</div>
		<div class="pop-item contact-number">
			<span class="left">联系人电话</span>
			<p class="right">15321271919</p>
		</div>
		<div class="pop-item copy-fee">
			<span class="left">打印费用</span>
			<p class="right font-color">20元</p>
		</div>
		<button class="theme-bg-color">确认下单</button>
		<i class="close font-color" @click="close">✕</i>
	</div>
</template>
<script>
import { Popup } from 'mint-ui'

export default {
	name: 'pop-up',
	props: ['variate'],
	data () {
		return {
			myvariate: this.variate
		}
	},
	beforeCreate(){
		console.log('beforeCreate')

	},
	//在挂载开始之前被调用
	beforeMount(){
		console.log('beforeMount')

	},
	created() {
		console.log('created')
		var that = this;
		that.close = function () {
			that.myvariate = false;
			that.$emit('closeLabelpop', {myvariate: that.myvariate})
		}
	},
	//已成功挂载，相当ready()
	mounted(){
		console.log('mounted');
		
	},
	//相关操作事件
	methods: {

	}
}
</script>