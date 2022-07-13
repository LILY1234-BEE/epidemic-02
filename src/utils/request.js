/*
 * @Author: Hancy 
 * @Date: 2020-12-29 15:27:54 
 * @Last Modified by: Hancy
 * @Last Modified time: 2021-01-06 20:45:28
 */

//配置axios
//导入
import axios from 'axios';
import qs from 'qs';
axios.defaults.baseURL = 'http://101.201.155.36:8001';

// const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJOZz09Iiwic3ViIjoiYWRtaW4xIiwiaXNzIjoiMDk4ZjZiY2Q0NjIxZDM3M2NhZGU0ZTgzMjYyN2I0ZjYiLCJpYXQiOjE2MDk4OTc0MTIsImF1ZCI6InJlc3RhcGl1c2VyIiwiZXhwIjoxNjEwMDcwMjEyLCJuYmYiOjE2MDk4OTc0MTJ9.LC6lkCenzjxbHZ17GWmQ-KgU_K3CjPtWFyPT71bTs7U';
//拦截器
axios.interceptors.request.use(config => {
    // Do something before request is sent
    // console.log(config, '-----------');
    // alert(1);
    config.headers = {
            // accept:'',
            ...config.headers,
            Authorization: sessionStorage.getItem("token"),
        }
        // Authorization: sessionStorage.clear(),
        // Authorization: sessionStorage.removeItem("token"),
        // console.log(config.data, config.method);
    if (config.method == 'post' && config.url !== "/user/login") {
        // if (config.url !== "/user/login") {
        config.data = qs.stringify(config.data);
        // }
    }
    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    console.log(response.data.massage);
    // Do something before response is sent
    // console.log(response, '++++++++++');
    let res = {
        ...response,
        data: response.data.data,
        status: response.data.status,
        statusText: response.data.message,
        timestamp: response.data.timestamp,
    }
    return res;
}, error => {
    // Do something with response error
    return Promise.reject(error);
});
axios.defaults.baseURL = 'http://47.93.206.13:5588';
//axios.defaults.headers.common["Authorization"] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJOZz09Iiwic3ViIjoiYWRtaW4xIiwiaXNzIjoiMDk4ZjZiY2Q0NjIxZDM3M2NhZGU0ZTgzMjYyN2I0ZjYiLCJpYXQiOjE2MDkyOTA5NTEsImF1ZCI6InJlc3RhcGl1c2VyIiwiZXhwIjoxNjA5NDYzNzUxLCJuYmYiOjE2MDkyOTA5NTF9.7AX-fIPVC5_5VQMBDgQJG1oFqvsgdxHNhFHBxsrcYk0';
//导出
export default axios;