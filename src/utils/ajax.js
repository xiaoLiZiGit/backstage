import axios from 'axios';

let ajax = axios.create({});

// 请求拦截器
ajax.interceptors.request.use(config => {
    return config;
}, err => {
    return Promise.reject(err);
});

// 响应拦截器
ajax.interceptors.response.use(res => {
    return res.data;
}, err => {
    return Promise.reject(err);
});

ajax.all = axios.all;
ajax.spread = axios.spread;

export default ajax;