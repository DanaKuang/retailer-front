<template>
	<div class="pop-wrap border-box">
		<div class="pop-item sample">
			<span class="left">店码</span>
			<a href="javascript:;" class="labelpic">
				<img :src="myvariate.user.qrUrl" alt="">
			</a>
			<b>(提供精美标牌设计包装)</b>
		</div>
		<div class="pop-item address">
			<span class="left">收货地址</span>
			<p class="right">{{myvariate.user.addrProvinceName + myvariate.user.addrCityName}}</p>
		</div>
		<div class="pop-item house-number">
			<p>{{myvariate.user.addrDetail}}</p>
		</div>
		<div class="pop-item contact">
			<span class="left">联系人姓名</span>
			<p class="right">{{myvariate.user.ownerName}}</p>
		</div>
		<div class="pop-item contact-number">
			<span class="left">联系人电话</span>
			<p class="right">{{myvariate.user.phoneNo}}</p>
		</div>
		<div class="pop-item copy-fee">
			<span class="left">打印费用</span>
			<p class="right font-color">{{myvariate.price}}元</p>
		</div>
		<button class="theme-bg-color" @click="confirmOrder">{{buttonText}}</button>
		<i class="close font-color" @click="close">✕</i>
	</div>
</template>
<script>
import Http from 'assets/lib/http.js'
import { Popup } from 'mint-ui'

export default {
	name: 'pop-up',
	props: ['variate'],
	data () {
		return {
			myvariate: this.variate,
			buttonText: '确认下单',
			status: ''
		}
	},
	beforeCreate(){

	},
	//在挂载开始之前被调用
	beforeMount(){
		
	},
	created() {
		this.checkLatestOrder()
	},
	//已成功挂载，相当ready()
	mounted(){
				
	},
	//相关操作事件
	methods: {
		// 查询当前用户最新一条店码订单
		checkLatestOrder() {
			let me = this;
			Http.get('/seller-web/order/queryNewestOrder')
				.then(res => {
					const Data = res.data;
					if (Data.ok) {
						var data = Data.data;
						if (data != null) {
							me.status = data.status;
							if (data.status != 6 && data.status != 4) {
								// 按钮显示查询物流订单
								me.buttonText = '查看订单详情'
							}
						}
					}
				})
		},
		confirmOrder() {
			if (this.status) {
				if (this.status != 6 && this.status != 4) {
					// 跳转到订单页面，查询订单
					this.$router.push({path:'/retailer/orderdetail?sellerId=' + this.myvariate.user.sellerId})
				} else {
					this.createOrder()
				}
			} else {
				this.createOrder()
			}
		},
		createOrder() {
			var param = this.myvariate.user,
				price = this.myvariate.price;
			Http.get('/seller-web/order/createOrder', {
				params: {
					mobile: param.phoneNo,
					username: param.ownerName,
					province: param.addrProvince,
					city: param.addrCity,
					district: param.addrArea,
					address: param.addrDetail,
					totalFee: price,
					sellerId: param.sellerId,
					awardName: '店码标牌'
				}
			}).then(res => {
				const Data = res.data;
				if (Data.ok) {
					this.$router.push({path:'/retailer/orderdetail?sellerId=' + param.sellerId})
				} else {
					alert(Data.msg);
				}
			})
		},
		close() {
			this.$emit('closeLabelpop', {getlabelpop: false})
		}
	}
}
</script>