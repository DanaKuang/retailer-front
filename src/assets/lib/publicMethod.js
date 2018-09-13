const getCookie = function (name) {
	var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	return v ? v[2] : null;
}

const setCookie = function (name, domain, cvalue, exdays) {
	var d = new Date();  
    d.setTime(d.getTime() + (exdays*24*60*60*1000));  
    var expires = "expires=" + d.toUTCString();  
    document.cookie = name + "=" + cvalue + "; " + expires + ';domain=' + domain + ';path=/';
}

const deleteCookie = function (name, domain) {
	setCookie(name, domain, "", -1);
}

const getQueryString = function (name) {
    var reg = new RegExp("(?:^|&)" + name + "=([^&]*)(?:&|$)", 'i');
    var str_arr = window.location.search.substr(1).match(reg);
    return str_arr != null ? str_arr[1] : null;
}

const processParams = function (param) {
    var stringlize = '';
    Object.keys(param).forEach((n, i) => {
        if (stringlize == '') {
            stringlize += '?' + n + '=' + param[n]
        } else {
            stringlize += '&' + n + '=' + param[n]
        }
    })
    return stringlize
}


export {getCookie, setCookie, deleteCookie, getQueryString, processParams}
