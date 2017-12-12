<template>
	<div class="warehouse-wrap">
		<div class="warehouse">
			<p class="name">恭喜！成功入库6条奖励积分600分</p>
			<p class="tip">积分可在个人中心查看或使用</p>
			<div class="btns">
				<button class="theme-bg-color">查看积分</button>
				<button class="theme-bg-color">继续扫码</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {}
	},
	//实例初始化最之前，无法获取到data里的数据
	// beforeCreate(){
	// 	console.log('beforeCreate')
	// 	debugger

	// },
	// //在挂载开始之前被调用
	// beforeMount(){
	// 	console.log('beforeMount')
	// 	debugger

	// },
	// created() {
	// 	console.log('created')
	// 	debugger
	// },
	// //已成功挂载，相当ready()
	// mounted(){
	// 	console.log('mounted')
	// 	debugger
	// },
	//相关操作事件
	methods: {

	}
}
// ,
//   //实例初始化最之前，无法获取到data里的数据
//   beforeCreate(){
//     debugger

//   },
//   //在挂载开始之前被调用
//   beforeMount(){
//     debugger

//   },
//   created() {
//     debugger
//   },
//   //已成功挂载，相当ready()
//   mounted(){
//     debugger
//   },
//   //相关操作事件
//   methods: {

//   }
	
</script>

<style lang="scss">
@mixin border-radius($num) {
	-webkit-border-radius: $num;
	-moz-border-radius: $num;
	-ms-border-radius: $num;
	border-radius: $num;
}
.name {
	padding-top: 7rem;
	margin: 0 auto .5rem;
	width: 4.8rem;
	line-height: 1.3;
	text-align: center;
	color: #1F1E23;
	font-size: .48rem;
}
.tip {
	text-align: center;
	color: #666;
	font-size: .37rem;
}
.btns {
	margin: 1.2667rem auto 0;
	width: 8.4rem;
}
button {
	width: 3.5rem;
	height: 1.02rem;
	@include border-radius(5px);
	font-size: .48rem;
	color: #fff;
	&:last-child {
		margin-left: 1.3rem;
	}
}
</style>