/**
 * Author: Kuang
 * Creat Date: 2018-04-04
 * Description: 对axios二次封装
 */

import {getCookie} from 'assets/lib/publicMethod'

let _token = getCookie('uuu-token') || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjM1ODY2NDYyMzYsInBheWxvYWQiOiJ7XCJpZFwiOm51bGwsXCJvcGVuSWRcIjpcIm9OOWxYczVYM1FUaU9nZi1rRi14bnlZc0J2aUVcIixcIm5pY2tuYW1lXCI6bnVsbCxcImxhbmd1YWdlXCI6bnVsbCxcInByb3ZpbmNlXCI6bnVsbCxcImNpdHlcIjpudWxsLFwiaGVhZEltZ1VybFwiOm51bGwsXCJzZXhcIjpudWxsLFwic2V4SWRcIjpudWxsLFwiY291bnRyeVwiOm51bGwsXCJ1bmlvbklkXCI6bnVsbCxcInJlbWFya1wiOm51bGwsXCJhcHBJZFwiOlwid3hjMjliZWNjZDkzOGUyMDgwXCIsXCJwaG9uZU5vXCI6bnVsbCxcImN0aW1lXCI6bnVsbCxcInV0aW1lXCI6bnVsbH0ifQ.-FnJZh3MHU_VIcsabfgTlTksBpns_LFV4r1_wOPCTIQ';

let _contentType = 'application/json;charset=utf-8';


const defaults = {
    method: 'get',
    url: ''
}

export default function Http(opts) {
    const options = Object.assign({}, defaults, opts);
    console.log(options)
    xhr.setRequestHeader('Content-Type', _contentType);
    xhr.setRequestHeader('token', _token);

    // xhr.onreadystatechange => {
    //     if (xhr.readyState == 4) {
    //         if (xhr.status == 200 || xhr.status == 304) {
    //             const data = JSON.parse(xhr.responseText);
    //             console.log(data);
    //         } else {
    //             console.log(xhr.status);
    //         }
    //     }
    // }
    // xhr.open(options.method ,options.url, true);
    // xhr.send(null); 
}
