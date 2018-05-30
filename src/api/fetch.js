/**
 * Author: Kuang
 * Creat Date: 2018-04-04
 * Description: 封装ajax
 */

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

        //3、正式发送请求。
        xhr.send(null);
        // xhr.ontimeout = () => xhr.onabort();
    })
}

export default Fetch
