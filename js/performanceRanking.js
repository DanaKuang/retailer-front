$(document).ready(function() {
	var current_count = 0;
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
	//	下拉刷新
//	mui.init({
//		pullRefresh: {
//			container: '#pullrefreshmdg',
//			up: {
////										contentrefresh: '正在加载',
//				callback: pullupRefresh
//			}
//		}
//	});
//	function lastThreeMonth(){
//	
//		current_count = 0;
//  	$(".InfoListUl").html("");
//  	
//  	mui('#pullrefreshmdg').pullRefresh().refresh(true);
//  
//  pullupRefresh();
// 	
// }
//	lastThreeMonth();
//	pullupRefresh();
//	function pullupRefresh() {
//		setTimeout(function() {
			var table = document.body.querySelector('.InfoListUl');
			
	$.ajax({
		type: "post",
		url: "/seller-web/statis/scan/count",
		async: true,
//		data:{pageSize:2,startPos:current_count},
		success: function(data) {
			
			console.log(data);
			for(var i = 0; i < 10; i++) {
				var li = document.createElement('li');
				li.className = 'listStyle';
				li.innerHTML =
					'<span class="index"  style="width:22.81%;border-right:0.5px solid #d8d8d8;height:2.9375rem;display: block;text-align:center;line-height:2.9375rem;">' + [i + 1] +
					'</span>' +
					'<span style="width:41.96%;border-right:0.5px solid #d8d8d8;height:2.9375rem;line-height:2.9375rem;display: block;text-align: center;">' + data.data.dataList[i].shopName + '</span>' +
					'<span style="display:block;width:35.23%;height:2.9375rem;line-height:2.9375rem;text-align: center;">' + data.data.dataList[i].scanNum + '</span>'
				table.appendChild(li);
//				current_count++;
				if(i == 0) {
					$('.index').eq(i).css('background', 'url(../static/img/numOne.png) no-repeat center');
					$('.index').eq(i).css('background-size', '1.7rem 2.2rem');
					$('.index').eq(i).html('');
				}
				if(i == 1) {
					$('.index').eq(i).css('background', 'url(../static/img/numTwo.png) no-repeat center');
					$('.index').eq(i).css('background-size', '1.7rem 2.2rem');
					$('.index').eq(i).html('');
				}
				if(i == 2) {
					$('.index').eq(i).css('background', 'url(../static/img/numThree.png) no-repeat center');
					$('.index').eq(i).css('background-size', '1.7rem 2.2rem');
					$('.index').eq(i).html('');
				}
				
				
				
					
			}
//			if(!data.ok || data.data.dataList.length==0){
//					mui('#pullrefreshmdg').pullRefresh().endPullupToRefresh(true); 
//				}else{
//					mui('#pullrefreshmdg').pullRefresh().endPullupToRefresh(false);				
//				}

			//业绩信息

		}
	});
//	}, 300);
//	}
})