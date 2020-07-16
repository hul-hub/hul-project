'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"test"',
  BASE_API: '"http://api.org.test.zhihuiqintong.com/"',
  // BASE_API: '"http://zhqtorgapi/"', 
  // 二维码招生推广
  QRCODE_URL: '"http://other.test.zhihuiqintong.com/org/qrcode/index?key="',
  // 腾讯云cos直传参数获取
  COS_KEYS_PATH: '"http://public.test.zhihuiqintong.com/v3/cos/getKeys"',
  // 文件上传
  UPLOAD_URL: '"http://files.test.zhihuiqintong.com/"',
   // 腾讯云直播
   VOD_KEYS_PATH:'"http://public.test.zhihuiqintong.com/v3/vod/sign"',
})
