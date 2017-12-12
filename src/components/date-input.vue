<template>
	<div class="duration-wrap">
		<div class="duration flex">
			<div class="default flex-item">
				<i class="icon-down"></i>
				<span>近三个月</span>
			</div>
			<div class="time flex-item">
				<div class="dateinput">
					<input class="date start border-color" type="text" placeholder="2017.08.27" readonly>
					<i class="border-color"></i>
					<input class="date end border-color" type="text" placeholder="2017.11.27" readonly>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'date-input'
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
		width: 2.4rem;
		height: .506rem;
		border-width: 1px;
		border-style: solid;
		text-align: center;
		color: #666;
		font-size: .373rem;
	}
	.date:first-of-type {
		margin-left: .7rem;
	}
	i {
		display: inline-block;
		margin: 0 .1rem .1rem;
		width: .42667rem;
		border-width: 2px;
		border-style: solid;
	}
}
</style>