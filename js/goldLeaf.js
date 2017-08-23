$(document).ready(function () {
    var searchStr = window.location.search;
    var len = searchStr.length;//获取url的长度
    var offset = searchStr.indexOf("?");//设置参数字符串开始的位置
    var newsidinfo = searchStr.substr(offset + 1, len)//取出参数字符串 这里会获得类似“id=1”这样的字符串
    var newsids = newsidinfo.split("=");//对获得的参数字符串按照“=”进行分割
    var newsid = newsids[1];//得到参数值
    console.log(newsid);
    $.ajax({
        type: "post",
        url: "/seller-web/consumer/seller/detail",
        data: {sellerId: newsid},
        timeout: 10000, //超时时间设置，单位毫秒
        success: function (list) {
            console.log(list);
            $(".goldLeafLogopic").attr('src', list.data.headImg);
            $("#goldLeafInfoLeftFootImg").attr('src', list.data.licenceImg);

            $("#goldLeafInfoRightPOne").html(list.data.ownerName);
            $("#goldLeafInfoRightPTwo").html(list.data.phoneNo);
            $("#goldLeafInfoRightPThree").html(list.data.shopName);
            $("#goldLeafInfoRightPFour").html(list.data.addrDetail);
            $("#goldLeafInfoRightPFive").html(list.data.licenceNo);

        }
    });
    var url = window.location.href;
    console.log(url);
    var winConfig = null;
    $.ajax({
        type: "post",
        url: "/seller-web/wxauth/jsapisignature",
        data: {url: url},
        async: false,
        timeout: 10000, //超时时间设置，单位毫秒
        success: function (data) {
            console.log(data);
            winConfig = data;
        }
    });
//	扫一扫

    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: winConfig.appId, // 必填，公众号的唯一标识
        timestamp: winConfig.timestamp, // 必填，生成签名的时间戳
        nonceStr: winConfig.nonceStr, // 必填，生成签名的随机串
        signature: winConfig.signature, // 必填，签名，见附录1
        jsApiList: [
            'scanQRCode'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(function () {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        //

        $("#testBut").click(function(){
            wx.scanQRCode({
                needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    //window.location.href = result;
                }
            });
        });

        document.getElementById('sao2').onclick = function () {

        }
    });
});
		