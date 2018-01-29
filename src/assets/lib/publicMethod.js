var publicMethod = {
	getCookie: function () {
	    var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	    return v ? v[2] : null;
	}
}

export default publicMethod
