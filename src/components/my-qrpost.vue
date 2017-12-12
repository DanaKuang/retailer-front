<template>
	<div class="myqrpost border-box" @click="close">
		<p class="storename">苏州高新区昆山市万客</p>
		<img src="../assets/image/shankun/success.png" alt="">
		<p class="tip1">购烟扫店码 笔笔有奖励</p>
		<p class="tip2">更多活动详情咨询店内人员</p>
		<p class="bottom">山西昆明烟草有限责任公司监制</p>
	</div>
</template>

<script>
import { Popup } from 'mint-ui'

export default {
	name: 'my-qrpost',
	props: ['variate'],
	data() {
		return {
			myvariate: this.variate
		}
	},
	created() {
		var that = this;
		that.close = function () {
			that.myvariate = false;
			that.$emit('closeqrpost', {myvariate: that.myvariate})
		}
	},
}
</script>

<style lang="scss">
.myqrpost {
	.storename {
		margin-bottom: .8rem;
		font-size: .667rem;
		/*色值在各自的css里面设定*/
	}
	img {
		width: 5.30667rem;
		height: 5.30667rem;
	}
	.tip1 {
		margin-top: .3rem;
		font-size: .47rem;
	}
	.tip2 {
		margin-top: .3rem;
		font-size: .32rem;
		letter-spacing: 6px;
		color: #333;
	}
	.bottom {
		position: absolute;
		bottom: .6rem;
		left: 50%;
		-webkit-transform: translateX(-50%);
		-moz-transform: translateX(-50%);
		-ms-transform: translateX(-50%);
		transform: translateX(-50%);
		font-size: .32rem;
		font-weight: bold;
	}
}	
</style>