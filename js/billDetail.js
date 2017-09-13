
$(document).ready(function() {
	//// 	钱包信息
    $.ajax({
		timeout : 10000, //超时时间设置，单位毫秒
		type: "post",
		url: "/seller-web/seller/select/mywallet",
		header: "Access-Control-Allow-Origin: *",
		async: true,
		success: function(data) {
			console.log(data);
		//钱包信息
		$("#totalIncome").html('(￥'+data.data.totalIncome+')');
		$("#totalPay").html('(￥'+data.data.totalPay+')');

			
}
	});
//	点击收益按钮
	
//
//		$(".tiXian").css('background','#fff');
//		$(".tiXian>p").css('color','#ac815f');
//		$(".shouYi").css('background','#f0dac2');
//		$(".shouYi>p").css('color','#ac815f');
//		var current_count = 0;
//		var startTime = 0;
//		var endTime = 0;
		
		Zepto("#dateStartTwo").calendar({
			value: [new Date().valueOf()],
			onChange: function(p, values, displayValues) {
				current_count = 0;
				$(".sellMoneyCenter").html("");
				startTime = values[0];
				mui('#pullrefresh').pullRefresh().refresh(true);
				pullupRefresh();
			}
		});
		Zepto("#dateEndTwo").calendar({
			value: [new Date().valueOf()],
			onChange: function(p, values, displayValues) {
				current_count = 0;
				$(".sellMoneyCenter").html("");
				endTime = values[0];
				mui('#pullrefresh').pullRefresh().refresh(true);
				pullupRefresh();
			}
		});
		
		function lastThreeMonth() {

			startTime = addDate(new Date(), -90).valueOf();
			endTime = new Date().valueOf();

			current_count = 0;
			$(".sellMoneyCenter").html("");

			mui('#pullrefresh').pullRefresh().refresh(true);

			pullupRefresh();

		}
		
		function addDate(dd, dadd) {
			var a = new Date(dd)
			a = a.valueOf()
			a = a + dadd * 24 * 60 * 60 * 1000
			a = new Date(a)
			return a;
		}

		//	下拉刷新
		mui.init({
			pullRefresh: {
				container: '#pullrefresh',
				up: {
					//						contentrefresh: '正在加载...',
					callback: pullupRefresh
				}
			}
		});
	
		//加载详情 数据
		$("#ThreeMonthTwo").click(function(e) {

			lastThreeMonth();

		});

		lastThreeMonth();

		/**
		 * 上拉加载具体业务实现
		 */
		function pullupRefresh() {
			setTimeout(function() {

				var tables = document.body.querySelector('.sellMoneyCenter');
				console.log(startTime);
				console.log(endTime);
				$.ajax({
					timeout: 10000, //超时时间设置，单位毫秒
					type: "post",
					url: "/seller-web/seller/select/income/detail",
					data: { startTime: startTime, endTime: endTime, pageSize: 2, startPos: current_count },
					success: function(data) {
						console.log(data);

						var d = data.data;
						for(var i = 0; i < d.length; i++) {

							var tmpdatas = d[i];
							var lists = document.createElement('div');
							lists.className = 'sellMoneyCenter1';
							lists.innerHTML = '<div class="sellMoneyCenter1">' +
								'<div class="left">' +
								'<span class="left-p1">销售返现</span>' +
								'<span class="left-p2">' + new Date(tmpdatas.ctime).Format('yyyy-MM-dd hh:mm:ss') + '</span>' +
								'</div>' +

								'<span>' + '+' + tmpdatas.fxAmount + '元' + '</span>' +
								'</div>';
							tables.appendChild(lists);

							current_count++;
						}
						if(!data.ok || data.data.length == 0) {
							mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
						} else {
							mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
						}

					}
				});

			}, 300);
		}
		
$(".shouYi").click(function(e) {
	window.location.reload();
})
//	点击提现按钮
	$(".tiXian").click(function(e) {

		$(".shouYi").css('background', '#fff');
		$(".shouYi>p").css('color', '#ac815f');
		$(".tiXian").css('background', '#f0dac2');
		$(".tiXian>p").css('color', '#ac815f');
		var current_count = 0;
		var startTime = 0;
		var endTime = 0;

		Zepto("#dateStartTwo").calendar({
			value: [new Date().valueOf()],
			onChange: function(p, values, displayValues) {
				current_count = 0;
				$(".sellMoneyCenters").html("");
				startTime = values[0];
				mui('#pullrefresh').pullRefresh().refresh(true);
				pullupRefresh();
			}
		});
		Zepto("#dateEndTwo").calendar({
			value: [new Date().valueOf()],
			onChange: function(p, values, displayValues) {
				current_count = 0;
				$(".sellMoneyCenters").html("");
				endTime = values[0];
				mui('#pullrefresh').pullRefresh().refresh(true);
				pullupRefresh();
			}
		});

		function lastThreeMonth() {

			startTime = addDate(new Date(), -90).valueOf();
			endTime = new Date().valueOf();

			current_count = 0;
			$(".sellMoneyCenters").html("");

			mui('#pullrefresh').pullRefresh().refresh(true);

			pullupRefresh();

		}

		function addDate(dd, dadd) {
			var a = new Date(dd)
			a = a.valueOf()
			a = a + dadd * 24 * 60 * 60 * 1000
			a = new Date(a)
			return a;
		}

		//加载详情 数据
		$("#ThreeMonthTwo").click(function(e) {

			lastThreeMonth();

		});

		lastThreeMonth();

		/**
		 * 上拉加载具体业务实现
		 */
		$(".sellMoneyCenters").show();
		$(".sellMoneyCenter").hide();

		function pullupRefresh() {
			setTimeout(function() {
				var table = document.body.querySelector('.sellMoneyCenters');
				console.log(startTime);
				console.log(endTime);
				$.ajax({
					type: "post",
					url: "/seller-web/seller/select/expenses",
					data: { startTime: startTime, endTime: endTime},
					success: function(data) {
						console.log(data);

						var ds = data.data;

						for(var i = 0; i < ds.length; i++) {

							var tmpdata = ds[i];
							var list = document.createElement('div');
							list.className = 'sellMoneyCenter1';
							list.innerHTML = '<div class="sellMoneyCenter1">' +
								'<div class="left">' +
								'<span class="left-p1">' + '提现' + '</span>' +
								'<span class="left-p2">' + new Date(tmpdata.opt_finish_time).Format('yyyy-MM-dd hh:mm:ss') + '</span>' +
								'</div>' +

								'<span style="color:green;">' + -tmpdata.tx_amount + '元' + '</span>' +
								'</div>';
							table.appendChild(list);

							current_count++;
						}
					}
				});

			}, 300);
		}

	})
})

Date.prototype.Format = function(fmt) { //author: meizz   
	var o = {
		"M+": this.getMonth() + 1, //月份   
		"d+": this.getDate(), //日   
		"h+": this.getHours(), //小时   
		"m+": this.getMinutes(), //分   
		"s+": this.getSeconds(), //秒   
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度   
		"S": this.getMilliseconds() //毫秒   
	};
	if(/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}