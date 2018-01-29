<template>
	<ul class="list">
		<li v-for="item in myBalance">
			<div class="item">
				<p class="name">{{item.typeName}}</p>
				<p class="money plus" :class="[{plus: item.type == 1}, {minus: item.type == -1}]">{{item | processNum}}</p>
			</div>
			<div class="exchange-time">{{item.optTime | convertDate}}</div>
		</li>
	</ul>
</template>
<script>
export default {
	name: 'wallet-detail',
	props: ['balance'],
	data() {
		return {
			myBalance: this.balance
		}
	},
	watch: {

	},
	created() {
		
	},
	mounted() {

	},
	methods: {
		
	},
	filters: {
		convertDate(val) {
			return val ? new Date(val).toLocaleString().replace(/\//g, '-') : ''
		},
		processNum(obj) {
			return obj.type == 1 ? obj.amount : '-' + obj.amount
		}
	}
 }
</script>
<style lang="scss">
.plus {
	color: #ea5504;
}
.minus {
	color: #04bd08;
}
.list {
	margin-bottom: 1.3rem;
	background: #fff;
	li {
		margin: 0 .3rem;
		height: 1.8667rem;
		.item {
			overflow: hidden;
			height: 50%;
			line-height: 3;
			.name {
				float: left;
				font-size: .453rem;
			}
			.money {
				float: right;
				font-size: .48rem;
			}
		}
		.exchange-time {
			line-height: 2;
			height: 50%;
			font-size: .34667rem;
			color: #818184
		}
	}
	li:not(:last-child) {
		border-bottom: 1px solid #ccc;
	}
}
</style>