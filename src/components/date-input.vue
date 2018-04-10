<template>
	<div class="duration-wrap">
		<div class="duration flex">
			<i class="font-color">时间周期:</i>
			<div class="time flex-item">
				<div class="dateinput">
					<span class="date start border-color" @click="open('startDate')">{{startTime}}</span>
					<i class="border-color"></i>
					<span class="date end border-color" @click="open('endDate')">{{endTime}}</span>
				</div>
			</div>
		</div>
		<!-- 开始时间 -->
		<mt-datetime-picker
			class="startPop"
		    	ref="startDate"
		    	type="date"
		    	year-format="{value} 年"
			month-format="{value} 月"
			date-format="{value} 日"
		    	:startDate="startDate"
      		:endDate="endDate"
		    	@confirm="handleSTConfirm">
		</mt-datetime-picker>
		<!-- 结束时间 -->
		<mt-datetime-picker
			class="startPop"
		    	ref="endDate"
		    	type="date"
		    	year-format="{value} 年"
			month-format="{value} 月"
			date-format="{value} 日"
		    	:startDate="startDate"
      		:endDate="endDate"
		    	@confirm="handleETConfirm">
		</mt-datetime-picker>
	</div>
</template>
<script>
import { DatetimePicker } from 'mint-ui'

export default {
	name: 'date-input',
	data() {
		return {
			startTime: '',
			endTime: '',
			emitStartTimeMM: '',
			emitEndTimeMM: '',
			startDate: new Date('2017'),
      		endDate: new Date(),
      		start: ''
		}
	},
	created() {
		this.startTime = this.defaultShowDate(3);
		this.endTime = this.defaultShowDate();
		this.emitStartTimeMM = this.startTime + ' 00:00:00';
		this.emitEndTimeMM = this.endTime + ' 00:00:00'
	},
	methods: {
		defaultShowDate(n) {
			// n代表几个月前
			var date = new Date(),
				y    = date.getFullYear(),
				m    = date.getMonth(),
				d    = date.getDate(),
				thatday;
			if (n) {
				if (m - n < 0) {
					y = y - 1;
					m = (12 + (m - n) + 1) < 10 ? '0' + (12 + (m - n) + 1) : (12 + (m - n) + 1);
				} else {
					m = (m - n) + 1 < 10 ? '0' + (m - n + 1) : (m - n + 1);
				}
			} else {
				m = m + 1 < 10 ? '0' + (m + 1) : m + 1;
			}
			d = d < 10 ? '0' + d : d;
			return [y, m, d].join('-');
		},
		defaultMMdate () {
			var _a_splitTime = this.startTime.split('-');
			return {
				receiveSTMM: new Date(_a_splitTime[0], Number(_a_splitTime[1])-1, _a_splitTime[2]).getTime(), // 这样处理比较恶心...
				receiveETMM: +new Date
			}
		},
		formatShowDate(val) {
			// 转化标准时间的显示
			var y = val.getFullYear(),
				m = (val.getMonth() + 1) >= 10 ? (val.getMonth() + 1) : '0' + (val.getMonth() + 1),
				d = val.getDate() >= 10 ? val.getDate() : ('0' + val.getDate());
			return [y,m,d].join('-')
		},
		open(picker) {
	        this.$refs[picker].open();
	    	},
	    	handleSTConfirm(value) {
		        this.startTime = this.formatShowDate(value);
		        // this.emitStartTimeMM = value.getTime();
		        this.emitStartTimeMM = this.startTime + ' 00:00:00';
		        this.$emit('receiveStartDate', {receiveSTMM: this.emitStartTimeMM});
	    	},
	    	handleETConfirm(value) {
				this.endTime = this.formatShowDate(value);
				// console.log(value.getTime());
				// var t = 1000 * 60 * 60 * 15 + 1000 * 60 * 59 + 1000 * 59;
				//  // 插件是默认早上8点，需要加上15小时59分59秒等量的毫秒
		  //       this.emitEndTimeMM = value.getTime() + t;
		  //       console.log(this.emitEndTimeMM)
		  		this.emitEndTimeMM = this.endTime + ' 00:00:00';
		        	this.$emit('receiveEndDate', {receiveETMM: this.emitEndTimeMM})
	    	}
	}
 }
</script>

<style lang="scss" scoped>
.duration-wrap {
	padding-left: .3rem;
	padding-right: .3rem;
	background: #fff;
}
.duration {
	justify-content: flex-start;
	height: 1.53rem;
	line-height: 1.53rem;
	i {
		font-size: .42rem;
	}
}
.dateinput {
	.date {
		display: inline-block;
		padding: .03rem .1rem .03rem;
		width: 2.6rem;
		height: .506rem;
		line-height: .51rem;
		border-width: 1px;
		border-style: solid;
		text-align: center;
		color: #666;
		font-size: .373rem;
		background: transparent;
		border-radius: 0;
	}
	.date:first-of-type {
		margin-left: .7rem;
	}
	i {
		display: inline-block;
		margin: 0 .1rem .1rem;
		width: .42667rem;
		border-width: 1px;
		border-style: solid;
	}
}
</style>