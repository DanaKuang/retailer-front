/**
 * Author: Kuang
 * Creat Date: 2017-12-13
 * Description: 对axios二次封装
 */

import axios from 'axios'
// import qs from 'qs'

var publicMethod = {
    getCookie: function () {
        var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    }
}

var token = publicMethod.getCookie('uuu-token') || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjI1NTAzNzk1MTYsInBheWxvYWQiOiJ7XCJpZFwiOm51bGwsXCJvcGVuSWRcIjpcIm9OOWxYczVYM1FUaU9nZi1rRi14bnlZc0J2aUVcIixcIm5pY2tuYW1lXCI6bnVsbCxcImxhbmd1YWdlXCI6bnVsbCxcInByb3ZpbmNlXCI6bnVsbCxcImNpdHlcIjpudWxsLFwiaGVhZEltZ1VybFwiOm51bGwsXCJzZXhcIjpudWxsLFwic2V4SWRcIjpudWxsLFwiY291bnRyeVwiOm51bGwsXCJ1bmlvbklkXCI6bnVsbCxcInJlbWFya1wiOm51bGwsXCJhcHBJZFwiOlwid3hjMjliZWNjZDkzOGUyMDgwXCIsXCJwaG9uZU5vXCI6bnVsbCxcImN0aW1lXCI6bnVsbCxcInV0aW1lXCI6bnVsbH0ifQ.w65Vpm6dj3GXb3JWPOIIaqXSQjSWwYwDw6yrYU0dGzI';


// http请求拦截器
axios.interceptors.request.use(config => {
    // config.headers = Object.assign({}, config.headers, {
    //     token: token 
    // })
    config['X-Requested-With'] = 'XMLHttpRequest'
    config.timeout = 20000;
    return config
} , error => Promise.reject(error))

// http响应拦截器
axios.interceptors.response.use(response => {
    const Data = response.data;
    return response
}, error => Promise.resolve(error.response))

axios({}).catch((error)=>{
    console.log(error);
    throw new Error(error);
})

export default axios
