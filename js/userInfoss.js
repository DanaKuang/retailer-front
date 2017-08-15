$(document).ready(function() {
	var YeTai=['食杂店', '便利店', '超市', '商场', '烟酒商店', '娱乐服务', '其他'];
	//	var jq=$.noConflict();
	//省,市,区三级联动
	$.ajax({
		type: "post",
		url: "/seller-web/region/province",
		async: false,
		timeout: 10000, //超时时间设置，单位毫秒
		success: function(result) {
			console.log(result);
			var stroption = '<option>省</option>';
			for(var i = 0; i < result.length; i++) {
				stroption += '<option value=' + result[i].code + '>';
				stroption += result[i].shortName;
				stroption += '</option>';
			}
			$('#addrProvince').html(stroption);
		}
	});

	$('#addrProvince').change(function() {

		var data = { parentCode: $(this).val() };

		$.ajax({
			type: "post",
			timeout: 10000, //超时时间设置，单位毫秒
			url: "/seller-web/region/city",
			async: false,
			data: data,
			success: function(result) {
				console.log(result);
				var strocity = '<option>市</option>';
				for(var i = 0; i < result.length; i++) {
					strocity += '<option value=' + result[i].code + '>';
					strocity += result[i].shortName;
					strocity += '</option>';
				}
				$('#addrCity').html(strocity);
			}
		})
	});

	$('#addrCity').change(function() {
		var data = { parentCode: $(this).val() };
		$.ajax({
			timeout: 10000, //超时时间设置，单位毫秒
			type: "post",
			url: "/seller-web/region/district",
			data: data,
			async: false,
			success: function(result) {
				console.log(result)
				var stroarea = '<option>区</option>';
				for(var i = 0; i < result.length; i++) {
					stroarea += '<option value=' + result[i].code + '>';
					stroarea += result[i].shortName;
					stroarea += '</option>';
				}
				$('#addrArea').html(stroarea);
			}
		})
	});

	//	上传照片弹窗

	$('#picPost').click(function() {
		$('#paiZhaoPupup').show();
	});

	//	上传许可证
	$('#picPost2').click(function() {
		$('.xuKeZhengPupup').show();
	});
	$('#XuKeZhengPost').click(function() {
		$('.xuKeZhengPupup').hide();
	});
	
	
	
	

	//加载重新编辑默认选项
	$.ajax({
		timeout: 10000, //超时时间设置，单位毫秒
		type: "post",
		url: "/seller-web/seller/main",
		header: "Access-Control-Allow-Origin: *",
		async: true,
		success: function(data) {
			console.log(data);
			if(!data.ok){
			$("#submitApply").attr('disabled',true);
		}
			var sellerInfo=data.data.sellerInfo;
			$("#ImgTan").attr('src',sellerInfo.headImg);
			$("#ownerName").val(sellerInfo.ownerName);
			$("#phoneNo").val(sellerInfo.contactPhone);
			
			$(".contactGender").each(function(i,value){
				if($(this).val() == sellerInfo.contactGender){
					$(this).attr("checked",true);
				};
			});
			$("#contactName").val(sellerInfo.contactName);
			$("#contactPhone").val(sellerInfo.contactPhone);
			$("#shopName").val(sellerInfo.shopName);
			$("#addrDetail").val(sellerInfo.addrDetail);
			$("#ImgTanFJ").attr('src',sellerInfo.licenceImg);
			$("#licenceImg").val(sellerInfo.licenceImg);
			$("#licenceNo").val(sellerInfo.licenceNo);
			$("#headImg").val(sellerInfo.headImg);
			
			$(".district").each(function(i,value){
				if($(this).val() == sellerInfo.district){
					$(this).attr("checked",true);
				};
			});
//			picker
//
			//设置三级联动的值
					$("#addrProvince").val(sellerInfo.addrProvince);
					$("#addrProvince").trigger('change');
					$("#addrCity").val(sellerInfo.addrCity);
					$("#addrCity").trigger('change');
					$("#addrArea").val(sellerInfo.addrArea);
					$("#picker").val(YeTai[sellerInfo.commercial-1]);
					$("#sellerId").val(sellerInfo.sellerId);
					$("#commercial").val(sellerInfo.commercial);
					
			$(".qrStyle").each(function(i,value){
				if($(this).val() == sellerInfo.qrStyle){
					$(this).attr("checked",true);
				};
			});

		}
		
	});
	
	
//	二维码选择跟下面已选相对应
	$(".changeRadio").each(function(i){
		
		$(this).click(function(){
			$('.YiXuanChangeRadio').each(function(j){	
			 $(this).attr("checked",false);
		})
       
         $('.YiXuanChangeRadio').eq(i).attr("checked",true);
		});	
	});
	
	
	
		


	
	
	$("#submitApply").click(function() {
		
		//							表单验证
					if(!$("#headImg").val()) {
						Zepto.toast("请上传头像");
						return;
					};
					if(!$("#ownerName").val()) {
						Zepto.toast("经营人名称不能为空！");
						return;
					};

					if($("#phoneNo").val().length == 0) {
						Zepto.toast('手机号码不能为空！');
						return false;
					}
					if($("#phoneNo").val().length != 11) {
						Zepto.toast('请输入有效的手机号码，需是11位！');
						return false;
					}

					var myreg =/^1[34578]\d{9}$/;
					if(!myreg.test($("#phoneNo").val())) {
						Zepto.toast('请输入有效的手机号码！');
						return false;
					}

					if(!$("#shopName").val()) {
						Zepto.toast("店铺名称不能为空！");
						return;
					};
					 if(!$("#addrProvince").val()) {
						Zepto.toast("请选择门店省地址！");
						return;
					};
					if(!$("#addrCity").val()) {
						Zepto.toast("请选择门店市地址！");
						return;
					};
					if(!$("#addrArea").val()) {
						Zepto.toast("请选择门店区地址！");
						return;
					};
					
					
					if(!$("#licenceImg").val()) {
						Zepto.toast("请上传烟草专卖零售许可证件照");
							return;
						};

						if(!$("#licenceNo").val()) {
							Zepto.toast('烟草专卖零售许可证件号不能为空!');
							return false;
						}; 
						var zmnumReg = /^[0-9a-zA-Z]*$/;
						if(!zmnumReg.test($("#licenceNo").val())) { 
							Zepto.toast('许可证件号只能是字母或者数字!');
							return false;
						};
		var form = new FormData($('#tf')[0]);
		//		var form={};
		$.ajax({
			timeout : 10000, //超时时间设置，单位毫秒
			type: "post",
			url: "/seller-web/seller/apply/reedit",
			//      url: "/seller-web/seller/apply/certification",
			//      /seller-web/seller/apply/certification
			data: form,
			processData: false,
			contentType: false,
			async: true,
			success: function(result) {
				console.log(result);
				if(result.ok) {
					$("#SuccessRenZheng").show();
					$("#SuccessRenZheng").on('touchmove',function(event) { event.preventDefault(); }, false);
					$("#KnowSoTahts").click(function(e) {
						window.location.href = "/template/home.html";
					});

				} else {
					alert(result.msg);
				}
			}
		})
		

	});

	var uploader = WebUploader.create({
		// 选完文件后，是否自动上传。
		auto: true,
		// 文件接收服务端。
		server: '/seller-web/file/upload',
		// 选择文件的按钮。可选。
		// 内部根据当前运行是创建，可能是input元素，也可能是flash.
		pick: '#filePicker', //
		//设置文件上传域的name
		fileVal: 'filePicker',
		// 只允许选择图片文件。
		accept: {
			title: 'Images',
			extensions: 'gif,jpg,jpeg,bmp,png',
			mimeTypes: 'image/*'
		}
	});
	uploader.on('uploadSuccess', function(file, response) {
		//       $('.uploader-list').append('<img src="'+response+'"/>');
		$("#ImgTan").attr("src", response);
		$("#headImg").val(response);

		console.log(response);
	});

//	var uploaderTwo = WebUploader.create({
//		// 选完文件后，是否自动上传。
//		auto: true,
//		// 文件接收服务端。
//		server: '/seller-web/file/upload',
//		// 选择文件的按钮。可选。
//		// 内部根据当前运行是创建，可能是input元素，也可能是flash.
//		pick: '#filePicker2', //
//		//设置文件上传域的name
//		fileVal: 'filePicker2',
//		// 只允许选择图片文件。
//		accept: {
//			title: 'Images',
//			extensions: 'gif,jpg,jpeg,bmp,png',
//			mimeTypes: 'image/*'
//		}
//	});

//	uploaderTwo.on('uploadSuccess', function(file, response) {
//		//       $('#uploaderList').append('<img src="'+response+'"/>');
//
//		$("#ImgTanFJ").attr("src", response);
//		$("#licenceImg").val(response);
//
//		console.log(response);
//	});

	// 业态弹框
	Zepto("#picker").picker({
		toolbarTemplate: '<header class="bar bar-nav">\
<button class="button button-link pull-right close-picker" id="button-link">确定</button>\
	</header>',
		cols: [{
			textAlign: 'center',
			displayValues: ['食杂店', '便利店', '超市', '商场', '烟酒商店', '娱乐服务', '其他'],
			values: [1, 2, 3, 4, 5, 6, 7],

		}],
		formatValue: function(picker, value, displayValue) {
			$('#commercial').val(value);
			$('#picker').attr('value', displayValue);
			return displayValue;
		}
	});

});