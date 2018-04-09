<template>
	<ul class="list">
		<li v-for="item in myBalance">
			<div class="item">
				<p class="name">{{item.typeName}}<span class="status" v-if="item.type != 1">({{item.statusName}})</span></p>
				<p class="money plus" :class="[{plus: item.type == 1}, {minus: item.type == -1 && item.status == 2}, 
					{wait: item.type == -1 && item.status == 1}, {error: item.type == -1 && item.status == 3}]">{{item | processNum}}</p>
			</div>
			<div class="exchange-time">{{item.optTime | convertDate}}</div>
			<div v-if="item.memo" class="exchange-error">失败原因：{{item.memo}}</div>
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
			return obj.type == 1 ? '+' + obj.amount : '-' + obj.amount
		}
	}
 }
</script>
<style lang="scss" scoped>
.plus {
	color: #ea5504;
}
.minus {
	color: #269828;
}
.wait{
	color: #818184;
}
.error{
	color: #269828;
}
.list {
	margin-bottom: 1.3rem;
	background: #fff;
	li {
		margin: 0 .3rem;
		// height: 1.8667rem;
		.item {
			overflow: hidden;
			// height: 50%;
			height: .933rem;
			line-height: 3;
			.name {
				float: left;
				font-size: .453rem;
				.status{
					padding-left: .2rem;
					font-size: .28rem;
					color: #818184;
				}
			}
			.money {
				float: right;
				font-size: .48rem;
			}
		}
		.exchange-time {
			line-height: 2;
			// height: 50%;
			height: .933rem;
			font-size: .34667rem;
			color: #818184;
		}
		.exchange-error{
			line-height: 2;
			height: .8rem;
			font-size: .34667rem;
			color: #818184;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
			margin-top: -.3rem;
		}
	}
	li:not(:last-child) {
		border-bottom: 1px solid #ccc;
	}
}
</style>