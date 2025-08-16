// src/utils/http.js
import axios from 'axios';
import { BASE_URL } from './apiPath';
import { navigateTo } from './navigation';
// 创建 Axios 实例
const http = axios.create({
  baseURL: BASE_URL, // 替换为您的 API 基础 URL
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 从 localStorage 获取 token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 可以在这里添加其他通用请求处理逻辑
    console.log(`请求拦截: ${config.method?.toUpperCase()} ${config.url}`);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    // 统一处理响应数据
    if (response.status === 200) {
      return Promise.resolve(response.data);
    }

    return response;
  },
  (error) => {
    // 统一错误处理
    if (error.response) {
      // 服务器返回错误状态码
      const status = error.response.status;
      const errorData = error.response.data;
      switch (status) {
        case 401:
          console.error('未授权，请重新登录');
          navigateTo('/');
          return Promise.reject();
        case 403:
          console.error('拒绝访问');
          break;
        case 404:
          console.error('请求资源不存在');
          break;
        case 500:
          console.error('服务器错误');
          return Promise.reject(errorData);    
        default:
          console.error(`请求错误: ${status}`);
          return Promise.reject(errorData);
      }
    } else if (error.request) {
      // 请求已发出但没有响应
      console.error('无响应:', error.request);
    } else {
      // 请求设置错误
      console.error('请求错误:', error.message);
    }

    return Promise.reject(error);
  }
);

// 封装常用请求方法
export default {
  get: (url: any, params?: any, config?: any) => http.get(url, { params, ...config }),
  post: (url: any, data?: any, config?: any) => http.post(url, data, config),
  // put: (url: any, data: any, config: any) => http.put(url, data, config),
  // delete: (url: any ,config: any) => http.delete(url, config),

  // // 文件上传方法
  // upload: (url, file, config) => {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   return http.post(url, formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     },
  //     ...config
  //   });
  // }
};