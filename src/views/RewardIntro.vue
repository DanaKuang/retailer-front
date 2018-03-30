<template>
	<div id="rewardintro" class="rewardintro">
		<!-- <img class="wholeimg" :src="image" alt=""> -->
		<div class="rank-bg">
			<div class="rank-title"></div>
			<div class="rank-prize"></div>
			<table class="prize-rule" cellpadding="0" cellspacing="0" border="0">
				<thead>
					<tr>
						<th>名次</th>
						<th>奖品</th>
						<th>市场价</th>
					</tr>
				</thead>
				<tbody v-if="prizeList.length > 0">
					<tr v-for="prizeItem in prizeList" :key="prizeItem.id">
						<td>第{{prizeItem.rankStart}}-{{prizeItem.rankEnd}}名</td>
						<td>{{prizeItem.awardName}}</td>
						<td>{{prizeItem.awardPrice}}元</td>
					</tr>
				</tbody>
			</table>
			<div class="rank-active"></div>
			<ul class="active-rule" v-if="activeRuleList.length > 0">
				<li v-for="ruleItem in activeRuleList" :key="ruleItem.index">{{ruleItem}}</li>
			</ul>
		</div>
	</div>
</template>
<script>
import Http from 'assets/lib/http.js'
export default {
	name: 'rewardintro',
	data() {
		return {
			// image: sessionStorage.getItem('rewardintro')
			prizeList: [],
			activeRuleList : []
		}
	},
	mounted () {
		this.$parent.loadingPage = false; //去掉loading
	},
	created() {
		this.getDetailInfo()
	},
	methods : {
		getDetailInfo() {
			let that = this;
			Http.get('/seller-web/achieve/detail')
			.then(res => {
				if(res.data.ok){
					this.prizeList = res.data.data.awards || [];
					let ruleHtml = res.data.data.ruleHtml;
					this.activeRuleList = that.splitStr(ruleHtml) || [];
				}
			})
		},
		splitStr(str){
			var temp = str.split(/[\n]/g);
				for(var i =0;i<temp.length;i++){
				if(temp[i] == ""){
					temp.splice(i, 1);
					//删除数组索引位置应保持不变
					i--;
				}	 
			}
			return temp;
		}
	}
}
</script>
<style lang="scss" scoped>
.rewardintro {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	.wholeimg {
		width: 100%;
		min-height: 100%;
	}
	.prize-rule {	
		width: 100%;
		height: auto;
		background-color: #FFFFFF;
		border-radius: .266rem;
		margin-top: .466rem;
		box-sizing: border-box;
		th {
			height: .84rem;
			line-height: .84rem;
			font-family: 'PingFangSC-Regular';
			font-size: .4rem;
			text-align: center;
		}
		th:nth-of-type(odd) {
			width: 25%;
		}
		th:nth-of-type(even) {
			width: 50%;
		}
		td {
			height: 1.12rem;
			line-height: 1.12rem;
			font-family: 'PingFangSC-Medium';
			font-size: .32rem;
			text-align: center;
		}
		td:nth-of-type(odd) {
			width: 25%;
		}
		td:nth-of-type(even) {
			width: 50%;
		}
	}
	.active-rule{
		font-family: 'PingFangSC-Regular';
		font-size: .32rem;
		padding : .48rem .4rem;
		margin-top: .173rem;
		background-color: #FFFFFF;	
		height: auto;
		li{
			line-height: .5rem;
			padding-left: .4rem;
			text-indent: -.34rem;
			margin-bottom: .1rem;
		}
		li:last-child{
			margin-bottom: 0rem;
		}
	}
}
</style>