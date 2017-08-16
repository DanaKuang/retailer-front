$(document).ready(function() {

	var isFree = 0;
	var payParam = {};
	//	省市区三级联动接口
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

	$.ajax({
		timeout: 10000, //超时时间设置，单位毫秒
		type: "post",
		url: "/seller-web/seller/main",
		header: "Access-Control-Allow-Origin: *",
		async: true,
		success: function(data) {

			$("#headImgFooter").attr("src", "../static/img/weirenzheng.png");
			$(".identificationState").html('去认证');
			$(".identificationState").css('background', '#d6ad59');

			if(data.ok) {

				console.log(data);
				var walletInfo = data.data.walletInfo;
				var sellerInfo = data.data.sellerInfo;
				var orderInfo = data.data.orderInfo;
				var wxInfo = data.data.wxInfo;
				var param = data.data.param;
				//				$($("[name=qrStyle]:checked")).parent().show();
				$("#DayResidue").html(param.qrFreeNum + '个');
				if(orderInfo) {
					//				判断标牌状态
					if(orderInfo.orderStatus == 1) {
						$("#biaopaiZhuangTai").html('待支付');
					} else if(orderInfo.orderStatus == 2) {
						$("#biaopaiZhuangTai").html('处理中');
					} else if(orderInfo.orderStatus == 3) {
						$("#biaopaiZhuangTai").html('已发货');
					} else if(orderInfo.orderStatus == 4) {
						$("#biaopaiZhuangTai").html('已收货 ');
					} else if(orderInfo.orderStatus == 5) {
						$("#biaopaiZhuangTai").html('已取消');
					}

				}
				//设置领取二维码标牌订单内容
				$("#contactPhone").val(sellerInfo.contactPhone);
				$("#addrDetail").html(sellerInfo.addrDetail);
				$("#contactName").val(sellerInfo.contactName);
				if(param.qrFreeNum > 0 && param.isGetFreeQr != 1) {

					isFree = 1;
					$("#amount").val(0);
					$("#showFee").html(0);
					$("#isFree").val(isFree);

				} else {
					isFree = 0;
					$("#amount").val(param.qrExpenses);
					$("#showFee").html(param.qrExpenses);
					$("#isFree").val(isFree);

				}
				//设置三级联动的值
				$("#addrProvince").val(sellerInfo.addrProvince);
				$("#addrProvince").trigger('change');
				$("#addrCity").val(sellerInfo.addrCity);
				$("#addrCity").trigger('change');
				$("#addrArea").val(sellerInfo.addrArea);
				if(sellerInfo.authStatus == 1) {
					$("#headImgFooter").attr("src", "../static/img/RenzhengIng.png");
					$(".identificationState").html('去认证');
					$(".identificationState").css('background', '#9e9e9e');
					$(".listImgEWM").click(function(e) {
						$("#noRenZhengDianMa").show();

					});

					$("#KnowSoTahtDianMa").click(function(e) {
						$("#noRenZhengDianMa").hide();
						//						window.location.href = "/template/userInfos.html";

					});

					$("#BtnErWeiMa").click(function(e) {
						$("#noRenZhengDianMas").show();

					});
					$("#KnowSoTahtDianMas").click(function(e) {
						$("#noRenZhengDianMas").hide();
					});

				} else if(sellerInfo.authStatus == 2) {
					$("#headImgFooter").attr("src", "../static/img/yirenzheng.png");
					$(".identificationState").html('重新编辑');
					$(".identificationState").css('background', '#d7ae5c');
					$(".identificationState").click(function(e) {
						//						$("#Recertification").show();
						//						$("#RecertificationButton").click(function(e){
						window.location.href = "/template/userInfoss.html?t=" + new Date().valueOf();

						//						});
						//						$("#GoBackRecertification").click(function(e){
						//						$("#Recertification").hide();
						//							
						//						});
					});

					$('.listImgEWM').click(function(e) {
						$('#bigErWeiMa').show();
						$("#bigErWeiMa").on('touchmove', function(event) { event.preventDefault(); }, false);
						//获取二维码接口
						var style = $(this).attr('alt');
						$.ajax({
							type: "post",
							url: "/seller-web/seller/qr/style",
							data: { style: style },
							success: function(data) {

								console.log(data);
								$("#BigCenterImg").attr("src", data);

							},
						})

						if(sellerInfo.headImg) {
							$("#headImgUrlSmall").attr("src", sellerInfo.headImg);
						} else {
							$("#headImgUrlSmall").attr("src", wxInfo.headImgUrl);
						}

						$("#shopNameTanChuang").html(sellerInfo.shopName);

					})

					$("#guanbiImg").click(function(e) {
						$('#bigErWeiMa').hide();
					})

					//	二维码切换	
					$("#BtnErWeiMa").click(function(e) {
						$("#BtnErWeiMa").hide();
						$("#sureShow").show();
						$(".listErWeiMa").show();
						$(".FakeDiv").show();

					});

					//					if($(".qrStyle").show()){
					//	二维码选择跟下面已选相对应

					//						}

				} else if(sellerInfo.authStatus == 3) {
					$("#headImgFooter").attr("src", "../static/img/RenZhengLoser.png");
					$(".identificationState").html('重新认证');
					$(".identificationState").css('background', '#d7ae5c');

					//					错误提示滚动条弹窗显示
					$("#FalseWarn").show();
					$("#FalseWarnFont").html(data.data.faillog.failReason);

					$(".identificationState").click(function(e) {
						window.location.href = "/template/userInfos.html";
					});
					$(".listImgEWM").click(function(e) {
						$("#noRenZhengDianMa").show();

					});
					$("#KnowSoTahtDianMa").click(function(e) {
						$("#noRenZhengDianMa").hide();
						//						window.location.href = "/template/userInfos.html";

					})

					$("#BtnErWeiMa").click(function(e) {
						$("#noRenZhengDianMas").show();

					});

					$("#KnowSoTahtDianMas").click(function(e) {
						$("#noRenZhengDianMas").hide();
					});
				};
				//经营人信息
				$(".JinYinRenNameSpan").html(sellerInfo.ownerName);
				$(".phoneNumber").html(sellerInfo.contactPhone);
				$(".sex").html(wxInfo.sex);
				$(".contactName").html(sellerInfo.contactName);
				$(".contactPhone").html(sellerInfo.contactPhone);
				$(".shopName").html(sellerInfo.shopName);
				$(".applyTime").html(new Date(sellerInfo.applyTime).Format('yyyy-MM-dd'));
				$(".licenceNo").html(sellerInfo.licenceNo);
				$("#daYinMuch").html(data.data.param.qrExpenses);
				$(".balance").html(walletInfo.balance);
				$(".redPack").html(walletInfo.redPack);
				$(".top-center-P1").html(sellerInfo.shopName);
				if(sellerInfo.headImg) {
					$("#headImgUrl").attr("src", sellerInfo.headImg);

				} else {
					$("#headImgUrl").attr("src", wxInfo.headImgUrl);

				}

				$("#licenceImg").attr("src", sellerInfo.licenceImg);

				//领取二维码标牌

				$("#yanZheng").click(function(e) {

					$("#provinceName").val($("#addrProvince").text());
					$("#cityName").val($("#addrCity").text());
					$("#provinceName").val($("#addrArea").text());
					$("#Logistics").on('touchmove', function(event) { event.preventDefault(); }, false);
					if(isFree == 1) {
						//弹出 信息框						
						$("#Logistics").toggle();
					} else {
						//提示框
						//弹出信息框
						$("#BiaoPaiPanDuan").toggle();
						$("#GoShopping").click(function(e) {
							$("#Logistics").show();
							$("#BiaoPaiPanDuan").hide();
						})

					}

				});
				var InfoOrderDetail = data.data.orderDetail;
				if(InfoOrderDetail) {
					$("#shippingAddress").html(InfoOrderDetail.provinceName + InfoOrderDetail.cityName + InfoOrderDetail.areaName + InfoOrderDetail.addrDetail);
					$("#orderManageUserName").html(InfoOrderDetail.contactName);
					$("#orderManageTellPhone").html(InfoOrderDetail.contactPhone);

				}
				if(orderInfo) {
					$("#orderManageDaYinMoney").html(data.data.orderInfo.amout);

				}
				if(InfoOrderDetail) {
					if(!InfoOrderDetail.trackingNo) {
						$("#orderManageTrackingNumber").html("未派送");
					} else {
						$("#orderManageTrackingNumber").html(InfoOrderDetail.trackingNo);
					}

				}
				if(orderInfo) {

					if(data.data.orderInfo.isPay == 1) {
						$("#orderManageZhiFuState").html("已支付");

					} else if(data.data.orderInfo.isPay == 2) {
						$("#orderManageZhiFuState").html("未支付");
					}
					if(data.data.orderInfo.orderStatus == 1 || data.data.orderInfo.orderStatus == 2) {
						$("#orderManageCancelState").html('取消订单');
						$("#orderManageCancelState").click(function(e) {
							var orderId = data.data.orderDetail.orderId;
							$.ajax({
								type: "post",
								url: "/seller-web/order/cancel",
								data: { orderId: orderId },
								timeout: 10000, //超时时间设置，单位毫秒
								success: function(result) {
									console.log(result);

								}

							});

							$("#cancelOrderManage").show();
							$("#GoShoppingSad").click(function(e) {
								$("#cancelOrderManage").hide();
								$("#orderManage").hide();
								window.location.href = "/template/home.html";
							})

						});
					} else {
						$("#orderManageCancelState").html('关闭');
						$("#orderManageCancelState").click(function(e) {
							$("#orderManage").hide();
						});

					}
				}

				$("#closeThree").click(function(e) {

					$("#orderManage").hide();

				});

				//	弹出订单信息
				if(data.data.orderInfo) {
					$(".SuccessState").click(function(e) {
						$("#orderManage").show();
						$("#orderManage").on('touchmove', function(event) { event.preventDefault(); }, false);

					});
				} else {
					$(".SuccessStateCenter").hide();
					$("#DaYuHaoJianTou").hide();
				}

				$("#sureShow").click(function(e) {
					$("#sureShow").hide();
					$("#BtnErWeiMa").show();
					if($("[name=qrStyle]:checked")) {
						$($("[name=qrStyle]")).parent().hide();
						$($("[name=qrStyle]:checked")).parent().show();
					};

					var qrStyle = $("[name=qrStyle]:checked").val();

					$.ajax({
						timeout: 10000, //超时时间设置，单位毫秒
						type: "post",
						url: "/seller-web/seller/update/qrstyle",
						data: { qrStyle: qrStyle },

						success: function(data) {
							console.log(data);
							if(data.ok) {
								alert("恭喜你提交成功");
							} else {
								alert("抱歉！您提交失败！");
							}
							
							window.location.href="/template/home.html";
						}
					});

				});
				$(".qrStyle").each(function(i, value) {
					if($(this).val() == sellerInfo.qrStyle) {
						$(this).attr("checked", true);
						$(this).parent().show();
					};
				});

			} else {
				$("#ShouCinoRenZheng").show();
				$("#ShouCinoRenZheng").on('touchmove', function(event) { event.preventDefault(); }, false);
				$("#KnowSoTahts").click(function(e) {
					window.location.href = "/template/userInfo.html";
				});

			}

		}
	});

	//	弹出物流信息
	//	$("#yanZheng").click(function(e) {
	//		$("#Logistics").toggle();
	//
	//	});

	$("#ButtonBtns").click(function(e) {
		var addrProvince = $("#addrProvince :checked").text();
		var addrCity = $("#addrCity :checked").text();
		var addrArea = $("#addrArea :checked").text();
		$("#provinceName").val(addrProvince);
		$("#cityName").val(addrCity);
		$("#areaName").val(addrArea);
		//		alert(addrProvince);
		var form = $("#FormDetail");
		$.ajax({
			timeout: 10000, //超时时间设置，单位毫秒
			type: "post",
			url: "/seller-web/order/create/qrorder",
			data: form.serialize(),
			success: function(data) {

				console.log(data);

				var orderId = data.data.orderId;
				if(data.ok) {
					if(isFree == 1) {
						$("#SuccessShenQing").toggle();
						$("#Logistics").hide();
						$("#mineKnow").click(function(e) {
							window.location.href = "/template/home.html";
							$("#SuccessShenQing").toggle();
						})

					} else {
						$("#QueRenZhiFu").show();
						$("#Logistics").hide();

						$("#ButtonBtnQueRen").click(function(e) {
							var body = "标牌领取";
							var amount = $("#amount").val();
							window.location.href = "/pay.html?orderId=" + orderId;

							
						})
					}

				}
			}
		})
	});
	$("#close").click(function() {
		$("#Logistics").toggle();
	});
	$("#closeTwo").click(function() {
		$("#QueRenZhiFu").toggle();
	});

	//		未认证弹框
	$("#KnowSoTaht").click(function(e) {
		$("#noRenZheng").hide();

	});
	
	
	
	
	//	二维码选择跟下面已选相对应
	$(".FakeDiv").each(function(i){
		
		$(this).click(function(){
			$('.qrStyle').each(function(j){	
			 $(this).attr("checked",false);
		})
       
         $('.qrStyle').eq(i).attr("checked",true);
		});	
	});

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