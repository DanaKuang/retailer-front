<template>
	<div class="exchange-detail">
		<div class="date-input-wrap">
			<date-input></date-input>
		</div>
		<ul class="tabpanel">
			<li class="tab active theme-bg-color font-color"><span>收益</span>（￥<em>100</em>）</li>
			<li class="tab font-color"><span>提现</span>（￥<em>90</em>）</li>
            <!-- <li 
            v-for="(item,index) in tabs" 
            :class="{active:index == num}"
             @click="tab(index)">{{item}}</li> -->
        </ul>
        <div class="tabcontent wallet-detail">
			<wallet-detail></wallet-detail>
		</div>
            <!-- <div 
            v-for='(itemCon,index) in tabContents' 
            v-show="index == num">{{itemCon}}</div> -->
		<!-- <bottom-nav></bottom-nav> -->
	</div>
</template>

<script>
// import bottomNav from '../components/bottom-nav'
import axios from 'axios'
import dateTime from '../components/date-time'
import dateInput from '../components/date-input'
import walletDetail from '../components/wallet-detail'

export default {
  	name: 'Exchangedetail',
  	data () {
 		return {

 		}
  	},
  	created () {

  	},
  	mounted () {
  		this.showDetail()
  	},
  	methods: {
  		showDetail () {
  			axios.get('/seller-web/seller/select/income/detail', {
	 			params: {
	 				startTime: '1507564800000',
	 				endTime: '1512896993853',
	 				startPos: 1
	 			}
	 		}).then(res => {

	 		}).catch(res => {

	 		})
  		}
  	},
  	components: { 
  		// bottomNav,
  		dateTime,
  		dateInput,
  		walletDetail
  	}
}
</script>

<style lang="scss">
	.date-input-wrap {
		margin-bottom: .4rem;
	}
	.tabpanel {
		margin-bottom: .4rem;
		height: 1.33rem;
		background: #fff;
		li {
			float: left;
			width: 50%;
			height: 100%;
			line-height: 1.33rem;
			text-align: center;
			span {
				margin-right: .3rem;
				font-size: .45rem;
				letter-spacing: 5px;
				font-weight: 400;
			}
			em {
				font-size: .32rem;
			}
		}
		li.active {
			color: #fff!important;
		}
	}
</style>