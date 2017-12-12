<template>
	<div class="myqresult border-box">
		<div class="info border-box">
			<div class="left">
				<div class="avatar certified"><a href="javascript:;"><img src="" alt=""></a></div>
				<div class="certificate"><img src="" alt=""></div>
			</div>
			<div class="right">
				<div class="item">
					<span class="name">经营人姓名</span>：
					<div class="content">张三</div>
				</div>
				<div class="item">
					<span class="name">手机号</span>：
					<div class="content">15889898899</div>
				</div>
				<div class="item">
					<span class="name">店铺名称</span>：
					<div class="content">张三的店</div>
				</div>
				<div class="item">
					<span class="name">门店地址</span>：
					<div class="content">河南省郑州市管城区创新文月99号十里堡酒店</div>
				</div>
				<div class="certificate-number">
					<span class="name">烟草专卖零售许可证件号</span>：
					<div class="content">1234567891021201201</div>
				</div>
			</div>
		</div>
		<button class="scan theme-bg-color"><img src="" alt="">扫一扫</button>
		<p class="tip font-color">绑定店码后，扫烟包二维码，中奖概率提升10%</p>
	</div>
</template>
<script>
	
</script>
<style lang="scss" scoped>
.myqresult {
	padding-top: 5.09rem;
	.info {
		display: flex;
		margin: 0 auto;
		padding: .8rem .3rem;
		width: 7.8667rem;
		height: 5.33rem;
		.left {
			width: 2rem;
			.avatar {
				position: relative;
				width: 100%;
				a {
					overflow: hidden;
					display: block;
					margin: 0 auto;
					width: 1.44rem;
					height: 1.44rem;
					line-height: 1.44rem;
					-webkit-border-radius: 50%;
					-moz-border-radius: 50%;
					-ms-border-radius: 50%;
					border-radius: 50%;
					img {
						width: 100%;
						vertical-align: middle;
					}
				}
			}
			.certificate {
				margin: .6rem auto;
				width: 1.76rem;
				height: 1.2rem;
			}
		}
		.right {
			flex: 1;
			color: #E4341D;
			font-size: .293rem;
			.name {
				font-weight: bold;
			}
			.item {
				overflow: hidden;
				margin-bottom: .18rem;
				.name {
					float: left;
					width: 2.09rem;
					text-align-last: justify;
				}
				.content {
					float: right;
					width: 2.8rem;
					text-align: left;
					line-height: 1.2;
				}
			}
			.certificate-number {
				.content {
					line-height: 1.8;
				}
			}
		}
	}
	.scan {
		display: block;
		margin: 1.4266rem auto .4rem;
		width: 4.54667rem;
		height: 1.1733rem;
		font-size: .613rem;
		color: #fff;
		-webkit-border-radius: 4px;
		-moz-border-radius: 4px;
		-ms-border-radius: 4px;
		border-radius: 4px;
	}
	.tip {
		text-align: center;
		font-size: .32rem;
	}
}
</style>