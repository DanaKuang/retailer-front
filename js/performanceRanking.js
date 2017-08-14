$(document).ready(function() {
	$.ajax({
		type: "post",
		url: "/seller-web/seller/main",
		async: true,
		success: function(data) {
			//			console.log(data);

			//				
			$("#TouXiangOneHeadImg").attr('src', data.data.sellerInfo.headImg);
			$(".top-center-P1").html(data.data.sellerInfo.shopName);
			$("#UserYuE").html(data.data.walletInfo.balance);
			$("#NumberMoneyHong").html(data.data.walletInfo.redPack);

		}
	});

	$.ajax({
		type: "post",
		url: "/seller-web/seller/select/income/count",
		async: true,
		success: function(data) {
			//			console.log(data);
			$(".weekTotalNum").html(data.data.weekTotalNum);
			$(".monthTotalNum").html(data.data.monthTotalNum);
			$(".totalNum").html(data.data.totalNum);

		}
	});

	$.ajax({
		type: "post",
		url: "/seller-web/statis/scan/count",
		async: true,
		success: function(data) {
			var table = document.body.querySelector('.InfoListUl');
			console.log(data);
			$("#MyOrder").html(data.data.myOrder);
//			$("#NumberOneName").html(data.data.dataList[0].shopName);
//			$("#NumberOneYeJi").html(data.data.dataList[0].scanNum);
//			$("#NumberTwoName").html(data.data.dataList[1].shopName);
//			$("#NumberTwoYeJi").html(data.data.dataList[1].scanNum);
//			$("#NumberThreeName").html(data.data.dataList[2].shopName);
//			$("#NumberThreeYeJi").html(data.data.dataList[2].scanNum);
//						var len=data.data.dataList.length;
			for(var i = 0; i < 10; i++) {
			  var li = document.createElement('li');
				  li.innerHTML=
						'<span style="width:22.81%;height:2.9375rem;display: block;">'+
						'</span>'+
	'<span style="width:41.96%;height:2.9375rem;line-height:2.9375rem;display: block;text-align: center;">'+data.data.dataList[i].shopName+'</span>'+
						'<span style="display:block;width:35.23%;height:2.9375rem;line-height:2.9375rem;text-align: center;">'+data.data.dataList[i].scanNum+'</span>'
							
							table.appendChild(li);
			}
			//业绩信息

		}
	});
})