/*
 * success : 请求成功执行的函数
 * fail：请求失败执行的函数
 *  定义全局方法
 * import request from './service/request'
 * Vue.prototype.$request = request;
 * */
import http from './http';
import qs from 'qs'

//有的请求需要用户认证，视情况而定
const getConfig = function (auth) {
  let config = {}
  if (auth) {
    config.headers = {
      "Authorization": auth
    }
  }
  return config;
}

var request = {
  get: function (url, data, success, fail) {
    return http.get(url, {
      params: data
    })
      .then(function (res) {
        success(res);
      })
      .catch(function (error) {
        if (fail) {
          fail(error);
        }
        console.log(error);
      })
  },

  post: function (url, data, success, fail) {
    return http.post(url, qs.stringify(data))
      .then(function (res) {
        success(res);
      })
      .catch(function (error) {
        if (fail) {
          fail(error);
        }
        console.log(error);
      })
  },
  // Content-Type:application/json,去掉qs.stringify(data),
  //因为qs.stringify(data)会将参数转换成key-value
  postJson: function (url, data, success, fail) {
    return http.post(url, data, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
    })
      .then(function (res) {
        success(res);
      })
      .catch(function (error) {
        if (fail) {
          fail(error);
        }
        console.log(error);
      })
  },
  postExport: function (url, data, type, success, fail) {
    return http.post(url, qs.stringify(data), type)
      .then(function (res) {
        success(res);
      })
      .catch(function (error) {
        if (fail) {
          fail(error);
        }
        console.log(error);
      })
  },
  // 传json 对象，不需要传字符串的时候，例：上传logo
  postObj: function (url, data, success, fail) {
    return http.post(url, data)
      .then(function (res) {
        success(res);
      })
      .catch(function (error) {
        if (fail) {
          fail(error);
        }
        console.log(error);
      })
  },
}
export default request;
