

$(document).ready(function() {
	
	var current_count = 0;
    var startTime = 0;
    var endTime = 0;
	
	Zepto("#dateStart").calendar({
    value: [new Date().valueOf()],
     maxDate:[new Date()],
    onChange:function(p, values, displayValues){
		 	current_count = 0;
    	$(".ul3").html("");
		startTime = values[0];
		mui('#pullrefresh').pullRefresh().refresh(true);
		pullupRefresh();
    },

});
Zepto("#dateEnd").calendar({
    value: [new Date().valueOf()],
     maxDate:[new Date()],
     onChange:function(p, values, displayValues){
     	current_count = 0;
    	$(".ul3").html("");
		endTime = values[0];
		mui('#pullrefresh').pullRefresh().refresh(true);
		pullupRefresh();
    }

});

 function lastThreeMonth(){
 	
 	startTime = addDate(new Date(), -90).valueOf();
	endTime = new Date().valueOf();
	
		current_count = 0;
    	$(".ul3").html("");
    	
    	mui('#pullrefresh').pullRefresh().refresh(true);
    
    pullupRefresh();
 	
 }

   

	$.ajax({
		type: "post",
		url: "/seller-web/seller/select/income/count",
		header: "Access-Control-Allow-Origin: *",
		async: true,
		success: function(data) {
			console.log(data);
			//业绩信息
			if(!data.data.unitNumList){
				
			$(".listSpan").html(data.data.unitNumList[0].num);
			$(".list1I").html(data.data.unitNumList[0].unit);
			$(".listSpanTwo").html(data.data.unitNumList[1].num);
			$(".list1ITwo").html(data.data.unitNumList[1].unit);
			}
			$("#PXiaNum1").html(data.data.weekTotalNum);
			$("#PXiaNum2").html(data.data.monthTotalNum);
			$("#PXiaNum3").html(data.data.totalNum);
		}
	});

	
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
    $("#TreeMonth").click(function(e){
      	  
    lastThreeMonth();
    	
    });
    
    lastThreeMonth();
//  pullupRefresh();
	
	/**
	 * 上拉加载具体业务实现
	 */
	function pullupRefresh() {
		setTimeout(function() {
			
			var table = document.body.querySelector('.ul3');
			console.log(startTime);
			console.log(endTime);
			$.ajax({
			timeout : 10000, //超时时间设置，单位毫秒
			type: "post",
			url: "/seller-web/seller/select/income/detail",
			data: { startTime: startTime, endTime: endTime,pageSize:2,startPos:current_count},
			success: function(data) { 
				console.log(data);
				
				var d = data.data;
				
				for(var i=0;i<d.length;i++){
					
					var tmpdata  = d[i];
				  var li = document.createElement('li');
				      li.className = 'list1';
				      li.innerHTML = '<li class="Span1">' +tmpdata.goods+

					'<i style="font-style: normal;"></i>' +
					'</li>' +
					'<li class="Span2"  style="color:#666666;font-size:0.75rem">'+
					 new Date(tmpdata.ctime).Format('yyyy-MM-dd hh:mm')
					 +'</li><li class="Span3">'+tmpdata.num+'条'
					 +'</li>' +
					'<li class="Span4" style="color:#ec5504;">'+tmpdata.fxAmount+'元</li>';
				    table.appendChild(li);
				    
				    current_count++;	
				}
				
				if(!data.ok || data.data.length==0){
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); 
				}else{
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);				
				}
			}
		});
			
			
			
		}, 300);
	}


})


Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}  




