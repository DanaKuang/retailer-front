<template>
	<div class="duration-wrap">
		<div class="duration flex">
			<div class="default flex-item" @click="setDefaultDate">
				<i class="icon-down"></i>
				<span>近三个月</span>
			</div>
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
	watch: {

	},
	created() {
		this.startTime = this.defaultShowDate(3);
		this.endTime = this.defaultShowDate();
		this.emitStartTimeMM = this.defaultMMdate().receiveSTMM,
		this.emitEndTimeMM = this.defaultMMdate().receiveETMM
	},
	mounted() {
		
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
					// (11 - (m - n) + 1) < 10 ? '0' + (11 - (m - n) + 1) : (11 - (m - n) + 1);
				} else {
					m = (m - n) + 1 < 10 ? '0' + (m - n + 1) : (m - n + 1);
				}
			} else {
				m = m + 1 < 10 ? '0' + (m + 1) : m + 1;
			}

			d = d < 10 ? '0' + d : d;
			thatday = [y, m, d].join('-');
			return thatday
		},
		defaultMMdate () {
			let _a_splitTime = this.startTime.split('-');
			return {
				receiveSTMM: new Date(_a_splitTime[0], Number(_a_splitTime[1])-1, _a_splitTime[2]).getTime(), // 这样处理比较恶心...
				receiveETMM: +new Date
			}
		},
		setDefaultDate () {
			this.startTime = this.defaultShowDate(3);
			this.endTime = this.defaultShowDate();
			this.$emit('receiveDefaultDate', 
				{
					receiveSTMM: this.defaultMMdate().receiveSTMM,
					receiveETMM: this.defaultMMdate().receiveETMM
				}
			)
		},
		formatShowDate(val) {
			// 转化标准时间的显示
			val = val.toLocaleString();
			val = val.slice(0, val.indexOf(' '));
			val = val.replace(/\//g, '-');
			return val
		},
		open(picker) {
	        this.$refs[picker].open();
	    },
	    handleSTConfirm(value) {
	        this.startTime = this.formatShowDate(value)
	        this.emitStartTimeMM = value.getTime();
	        this.$emit('receiveStartDate', {receiveSTMM: this.emitStartTimeMM})
	    },
	    handleETConfirm(value) {
			this.endTime = this.formatShowDate(value)
	        this.emitEndTimeMM = value.getTime();
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
	height: 1.33rem;
	line-height: 1.33rem;
	.default {
		.icon-down {
			margin-right: .2rem;
			display: inline-block;
			vertical-align: -4%;
		}
		span {
			font-size: .42667rem;
		}
	}
}
.dateinput {
	.date {
		padding: .03rem .1rem .03rem;
		width: 2.8rem;
		height: .506rem;
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