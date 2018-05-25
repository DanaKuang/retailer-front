/**
 * Author: Kuang
 * Creat Date: 2017-12-13
 * Description: 对axios二次封装
 */

import axios from 'axios'
// import qs from 'qs'

// http请求拦截器
axios.interceptors.request.use(config => {
    config['X-Requested-With'] = 'XMLHttpRequest'
    config.timeout = 20000;
    return config
} , error => Promise.reject(error))

// http响应拦截器
axios.interceptors.response.use(response => {
    const Data = response.data;
    console.log(response);
    return response
}, error => Promise.resolve(error.response))

axios({}).catch((error)=>{
    console.log(error);
    throw new Error(error);
})

export default axios
