/* 是否手机号码或者固话*/
export function validatePhoneTwo(rule, value, callback) {
  const reg = /^((0\d{2,3}-\d{7,8})|(1[345789]\d{9}))$/;;
  if (value == '' || value == undefined || value == null) {
    callback();
  } else {
    if ((!reg.test(value)) && value != '') {
      callback(new Error('请输入正确的电话号码或者固话号码'));
      // callback('请输入正确的电话号码或者固话号码');
    } else {
      callback();
    }
  }
}
export function validateNum11(rule, value, callback) {
  // const reg = /^((0\d{2,3}-\d{7,8})|(1[345789]\d{9}))$/;;
  const reg = /^1\d{10}$/;
  if (value == '' || value == undefined || value == null) {
    callback();
  } else {
    if ((!reg.test(value)) && value != '') {
      callback(new Error('请输入正确的电话号码或者固话号码'));
      // callback('请输入正确的电话号码或者固话号码');
    } else {
      callback();
    }
  }
}
/** 验证邮箱*/
export function validateMail(rule, value, callback) {
  var reg = new RegExp(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/)
  if (value && !reg.test(value)) {
    callback(new Error('请输入邮箱格式'));
  }
  callback()
}
export function validatePhoneStudio(rule, value, callback) {
  const reg = /^((0\d{2,3}-\d{7,8})|(1[345789]\d{9}))$/;
  if (value == '' || value == undefined || value == null) {
    callback();
  } else {
    if ((!reg.test(value)) && value != '') {
      callback(new Error('请输入正确的手机号或者固话号码'));
    } else {
      callback();
    }
  }
}
/** 是否输入得是数字*/
export function validatePayNumber(rule, value, callback) {
  var reg = new RegExp(/^\d+(?=\.{0,1}\d+$|$)/)
  if (value && !reg.test(Number(value))) {
    callback(new Error('请输入数字格式'));
  }
  callback()
}
/** 中文 + 英文 +阿拉伯数字 */
export function validateChinaEnglishNumber(rule, value, callback) {
  var reg = new RegExp(/(^[\u4e00-\u9fa5_a-zA-Z0-9]+$)/)
  if (value && !reg.test(value)) {
    callback(new Error('请输入中文英文数字'));
  }
  callback()
}
/** 中文 + 英文 +阿拉伯数字 */
export function validateChinaEnglishNumberBlank(rule, value, callback) {
  var reg = new RegExp(/(^[\u4e00-\u9fa5_a-zA-Z0-9-\s]+$)/)
  if (value && !reg.test(value)) {
    callback(new Error('请输入中文英文数字'));
  }
  callback()
}
/** 英文 +阿拉伯数字 */
export function validateEnglishNumber(rule, value, callback) {
  var reg = new RegExp(/(^[0-9a-zA-Z]+$)/)
  if (value && !reg.test(value)) {
    callback(new Error('请输入英文和数字'));
  }
  callback()
}
/** 密码验证 */
export function validatePassword(rule, value, callback) {
  var reg = new RegExp(/((?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$)/)
  if (value && !reg.test(value)) {
    callback(new Error('密码至少包含数字和英文，长度6-20'));
  }
  callback()
}
//自定义下拉框校验函数
export function isSelect(rule, value, callback) {
  console.log(value);
  if (value == 0) { //如果值是 0，提示用户选择正确的选项
    return callback(new Error("请正确选择一级标题"));
  } else {
    callback();
  }
};

