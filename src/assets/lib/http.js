/**
 * Author: Kuang
 * Creat Date: 2017-12-13
 * Description: 对axios二次封装
 */

import axios from 'axios'
// import qs from 'qs'

var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjQwMzI3OTkyODQsInBheWxvYWQiOiJ7XCJpZFwiOm51bGwsXCJvcGVuSWRcIjpcIm9OOWxYczg4OHRPSE5WOTNXMjJKN0taNTNkTjhcIixcIm5pY2tuYW1lXCI6bnVsbCxcImxhbmd1YWdlXCI6bnVsbCxcInByb3ZpbmNlXCI6bnVsbCxcImNpdHlcIjpudWxsLFwiaGVhZEltZ1VybFwiOm51bGwsXCJzZXhcIjpudWxsLFwic2V4SWRcIjpudWxsLFwiY291bnRyeVwiOm51bGwsXCJ1bmlvbklkXCI6bnVsbCxcInJlbWFya1wiOm51bGwsXCJhcHBJZFwiOlwid3hjMjliZWNjZDkzOGUyMDgwXCIsXCJwaG9uZU5vXCI6bnVsbCxcImN0aW1lXCI6bnVsbCxcInV0aW1lXCI6bnVsbH0ifQ.rk67t54O0SKrXwKc7f5sIu1NwQrTgCOxOCdCyhPC8jw';


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
