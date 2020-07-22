'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',

  // BASE_API: '"http://192.168.31.251:9000/"', // 吴 xiaomi 
  // BASE_API: '"http://192.168.101.13:9000/"', // 谢 5g  
  // BASE_API: '"http://47.114.32.158:80/"', // 本地服务器s
  // BASE_API: '"https://47.111.161.50:9000/"', // 测试服务器
  // BASE_API: '"http://api-test.hooskp.com/"', // 测试服务器http
  BASE_API: '"https://api-test.hooskp.com:9100/"', // 测试服务器https
  // BASE_API: '"https://api.hooskp.com/"', // 正式服务器


  // 二维码招生推广
  QRCODE_URL: '"http://other.test.zhihuiqintong.com/org/qrcode/index?key="',
  // 文件上传
  UPLOAD_URL: '"http://files.test.zhihuiqintong.com/"',
})
