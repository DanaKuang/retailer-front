/**
 * Author: Kuang
 * Creat Date: 2018-04-04
 * Description: 封装ajax
 */

 var _gctoken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjM1ODY2NDYyMzYsInBheWxvYWQiOiJ7XCJpZFwiOm51bGwsXCJvcGVuSWRcIjpcIm9OOWxYczVYM1FUaU9nZi1rRi14bnlZc0J2aUVcIixcIm5pY2tuYW1lXCI6bnVsbCxcImxhbmd1YWdlXCI6bnVsbCxcInByb3ZpbmNlXCI6bnVsbCxcImNpdHlcIjpudWxsLFwiaGVhZEltZ1VybFwiOm51bGwsXCJzZXhcIjpudWxsLFwic2V4SWRcIjpudWxsLFwiY291bnRyeVwiOm51bGwsXCJ1bmlvbklkXCI6bnVsbCxcInJlbWFya1wiOm51bGwsXCJhcHBJZFwiOlwid3hjMjliZWNjZDkzOGUyMDgwXCIsXCJwaG9uZU5vXCI6bnVsbCxcImN0aW1lXCI6bnVsbCxcInV0aW1lXCI6bnVsbH0ifQ.-FnJZh3MHU_VIcsabfgTlTksBpns_LFV4r1_wOPCTIQ'

 var _mytoken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjQ5MDU4NDcxMTAsInBheWxvYWQiOiJ7XCJpZFwiOm51bGwsXCJvcGVuSWRcIjpcIm9OOWxYczg4OHRPSE5WOTNXMjJKN0taNTNkTjhcIixcIm5pY2tuYW1lXCI6bnVsbCxcImxhbmd1YWdlXCI6bnVsbCxcInByb3ZpbmNlXCI6bnVsbCxcImNpdHlcIjpudWxsLFwiaGVhZEltZ1VybFwiOm51bGwsXCJzZXhcIjpudWxsLFwic2V4SWRcIjpudWxsLFwiY291bnRyeVwiOm51bGwsXCJ1bmlvbklkXCI6bnVsbCxcInJlbWFya1wiOm51bGwsXCJhcHBJZFwiOlwid3hjMjliZWNjZDkzOGUyMDgwXCIsXCJwaG9uZU5vXCI6bnVsbCxcImN0aW1lXCI6bnVsbCxcInV0aW1lXCI6bnVsbH0ifQ.KZAkcDPA0CcajWmczQ1A3o-_rnJUP8shU-JaXDwxTx4'

var defaultsConfig = {
    'Content-Type': 'application/json;charset=utf-8'
}

const Fetch = {};
Fetch.get = function (url, config) {
    return new Promise((resolve, reject) => {
        //1、创建XHR对象
        var xhr = new XMLHttpRequest();     
        xhr.timeout = 20000;

        xhr.onload = () => resolve(JSON.parse(xhr.responseText));
        xhr.onerror = () => reject(xhr.statusText);   

        //2、为发送请求做准备
        xhr.open('get', url, true);

        // setRequestHeader一定要在xhr opened以后执行，不然会报错
        if (process && process.env && process.env.NODE_ENV === 'development') {
            xhr.setRequestHeader('token', _mytoken)
        }

        //3、正式发送请求。
        xhr.send(null);
        // xhr.ontimeout = () => xhr.onabort();

    })
}

export default Fetch
