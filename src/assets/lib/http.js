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

var token = publicMethod.getCookie('uuu-token') || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjE4NzY0MzY0MzIsInBheWxvYWQiOiJ7XCJpZFwiOm51bGwsXCJvcGVuSWRcIjpcIm9BYlNSMUNCdlJTOUV5VE9iZUx2Z3JYdTFwWUlcIixcIm5pY2tuYW1lXCI6bnVsbCxcImxhbmd1YWdlXCI6bnVsbCxcInByb3ZpbmNlXCI6bnVsbCxcImNpdHlcIjpudWxsLFwiaGVhZEltZ1VybFwiOm51bGwsXCJzZXhcIjpudWxsLFwic2V4SWRcIjpudWxsLFwiY291bnRyeVwiOm51bGwsXCJ1bmlvbklkXCI6bnVsbCxcInJlbWFya1wiOm51bGwsXCJhcHBJZFwiOlwid3g2Y2E3OGIyNjkwNWU0MDZhXCJ9In0.SQs8h8XoPqK4FZGXIshf5hbdLJrxuYkynEtus8uTFoc';


// http请求拦截器
axios.interceptors.request.use(config => {
    config.headers = Object.assign({}, config.headers, {
        token: token
    }) 
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
