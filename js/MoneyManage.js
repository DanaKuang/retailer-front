$(document).ready(function() {
	var current_count = 0;
	var startTime = 0;
	var endTime = 0;
	$.ajax({
		timeout: 10000, //超时时间设置，单位毫秒
		type: "post",
		url: "/seller-web/seller/select/mywallet",
		header: "Access-Control-Allow-Origin: *",
		async: true,
		success: function(data) {
			console.log(data);
			//钱包信息
			$(".balance").html(data.data.balance);
			$(".totalIncome").html(data.data.totalIncome);
			$(".totalPay").html(data.data.totalPay);

		}
	});

	//	用户提现接口
	$(".btn-primary").click(function(e) {

		//			var txAmount = $('i').html();
		$.ajax({
			timeout: 10000, //超时时间设置，单位毫秒
			type: "post",
			url: "/seller-web/seller/wallet/tx",
			//		data:{txAmount:txAmount},
			success: function(data) {
				console.log(data);
				if(!data.ok) {
					$("#TiXianLoser").toggle();
					$("#dataMsg").html(data.msg);

				} else {
					$("#TiXianKuang").toggle();
				}

			}
		});

	});

	$("#KnowSoTaht").click(function() {
		$("#TiXianKuang").toggle();
		window.location.href = "/template/MoneyManage.html";
	});
	$("#KnowSoTahts").click(function() {
		$("#TiXianLoser").toggle();
		window.location.href = "/template/MoneyManage.html";
	});

	//	分界线>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.
	function lastThreeDay() {

		startTime = addDate(new Date(), -3).valueOf();
		endTime = new Date().valueOf();

		current_count = 0;
		$(".sellMoneyCenter").html("");

		mui('#sellMoney').pullRefresh().refresh(true);

		pullupRefresh();

	}



	function addDate(dd, dadd) {
		var a = new Date(dd)
		a = a.valueOf()
		a = a + dadd * 24 * 60 * 60 * 1000
		a = new Date(a)
		return a;
	}

	lastThreeDay();

	//	下拉刷新
	mui.init({
		pullRefresh: {
			container: '#sellMoney',
			up: {
				callback: pullupRefresh
			}
		}
	});







	/**
	 * 上拉加载具体业务实现
	 */
	function pullupRefresh() {
		setTimeout(function() {
			var table = document.body.querySelector('.sellMoneyCenter');

			$.ajax({
				type: "post",
				url: "/seller-web/seller/select/income-and-expenses",
				data:{startTime:startTime,endTime:endTime,pageSize:2,startPos:current_count},
				success: function(data) {
					console.log(data);

					var d = data.data;

					for(var i = 0; i < d.length; i++) {

						var tmpdatas = d[i];
						var list = document.createElement('div');
						list.className = 'sellMoneyCenter1';
						var innerHTML = '<div class="left">' +
							'<span class="left-p1">' + tmpdatas.typeName + '</span>' +
							'<span class="left-p2">' + new Date(tmpdatas.optTime).Format('yyyy-MM-dd hh:mm:ss') + '</span>' +
							'</div>';

						if(tmpdatas.type == 1) {
							innerHTML += '<span class="spanList" style="color:red;">' + '+' + tmpdatas.amount + '元' + '</span>';

						} else {
							innerHTML += '<span class="spanList" style="color:green;">' + -tmpdatas.amount + '元' + '</span>';
						}
						list.innerHTML = innerHTML;
						table.appendChild(list);

						current_count++;
					}

					if(!data.ok || data.data.length == 0) {
						mui('#sellMoney').pullRefresh().endPullupToRefresh(true);
					} else {
						mui('#sellMoney').pullRefresh().endPullupToRefresh(false);
					}
				}
			});



		

		}, 300);
	}





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