// version:     接口版本
// routepath:   请求接口
// description: 接口描述
// proxyTarget: 转发地址

'use strict'

module.exports = [
	{
	    routepath: '/seller-web',
	    proxyTarget: 'http://cs-yxc.saotianxia.vip/'
	}, {
	    routepath: '/seller-manager',
	    proxyTarget: 'http://cs-yxc.saotianxia.vip/'   
	}, {
	    routepath: '/admin/login',
	    proxyTarget: 'https://sk.saotx.cn'  
	}
];
// seller-web/seller/enterHome