import http from "axios";
import qs from "qs";
import getStr from './sign'
import {
  Message
} from "iview";

let ReqFilter = [
  'teacher/Uploadfile/Upload',
  'teacher/Uploadfile/Uploadb'
]

// config http
let baseUrl = process.env.BASE_API;
http.defaults.baseURL = baseUrl;
// 后台A控制器request.getSession().setAttribute() B控制器request.getSession().getAttribute() 为null
// http.defaults.withCredentials = true; 
http.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
// 自动设置语言
const navLang = (navigator.language || navigator.browserLanguage).toLowerCase();
const lang = navLang.indexOf('zh') != -1 ? 'zh-cn' : 'en-us';
http.interceptors.request.use(function (config) {
  var starttime = Date.parse(new Date());
  if (config.method == "get") {
    config.url = encodeURI(config.url);
  }
  if (localStorage.getItem("username") == null || localStorage.getItem("username") == ""
  ) {
    window.localStorage.removeItem("username");
    return config
  }
  var token = window.localStorage.getItem("token");
  if (token) {
    // config.headers.common["token"] = String(token);
    config.headers.Authorization = token;
  }
  return config;
},
  function (error) {
    // console.log(error);
    return Promise.reject(error);
  },
);
// Add a response interceptor
http.interceptors.response.use(
  function (response) {
    // console.log(response);
    // Do something with response data
    if (response.data.code == 40012 || response.data.code == 40006) {
      Message.error(response.data.info)
      setTimeout(function () {
        window.localStorage.removeItem("userinfo");
        window.localStorage.removeItem("key");
        window.localStorage.removeItem("menuData");
        // window.location.href = location.origin + "/#/login";
      }, 1500);
    } else if (response.data.code == 40004) { // token 失效
      Message.error("请先登陆")
      setTimeout(function () {
        window.localStorage.removeItem("userinfo");
        window.localStorage.removeItem("key");
        window.localStorage.removeItem("menuData");
      }, 1500);
    }
    else if (response.data.code == 40002) {
    } else {
      return response.data;
    }
  },
  function (error) {
    // Do something with response error
    if (error.response) {
      if (error.response.status === 400) {
        Message.error("数据错误！");
      } else if (error.response.status === 401) {
        // define window.app=vm in main.js
        // window.app.$router.push({name: 'Login'});
      } else if (error.response.status === 403) {
        Message.error("您没有操作权限哦！");
      } else if (error.response.status === 404) {
        Message.error("对象不存在！");
      } else if (error.response.status === 500) {
        Message.error("服务器发生了一些错误哦！");
      }
    }
    return Promise.reject(error);
  }
);

export default http;
