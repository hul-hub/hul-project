// 时间格式化（时间戳）
export function formatDate(date, fmt) {
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
//（日期 转化为：yyyy-MM-dd）
export function formatDateYYYYMMDD(postDate) {
  if (postDate) {
    var date = postDate
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  }
  return "";

}
export function timestampToTime(timestamp) {
  if (timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    // return Y+M+D+h+m+s;
    return Y + M + D;
  } else {
    return "";
  }
}
export function timestampToTimeHHMMSS(date) {
  if (date) {
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
    var h = date.getHours() < 10 ? "0" + date.getHours() + ':' : date.getHours() + ':';
    var m = date.getMinutes() < 10 ? "0" + date.getMinutes() + ':' : date.getMinutes() + ':';
    var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
  } else {
    return "";
  }
}
export function timestampToTimeHHMM(timestamp) {
  if (timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() > 9 ? (date.getMinutes()) : "0" + (date.getMinutes());
    return Y + M + D + h + m;
  } else {
    return "";
  }
}
// 省市区的返回
export function getAreaCommon(selectedData, province, city, district) {
  let result = [];
  selectedData.forEach(item => {
    if (item.value == province) {
      result.push(item.value);
    }
    item.children.forEach(date => {
      if (date.value == city) {
        result.push(date.value);
      }
      date.children.forEach(ele => {
        if (ele.value == district) {
          result.push(ele.value);
        }
      });
    });
  });
  return result;
}
export function getAreaChina(selectedData, province, city, district) {
  let result = [];
  selectedData.forEach(item => {
    if (item.value == province) {
      result.push(item.label);
    }
    item.children.forEach(date => {
      if (date.value == city) {
        result.push(date.label);
      }
      date.children.forEach(ele => {
        if (ele.value == district) {
          result.push(ele.label);
        }
      });
    });
  });
  return result;
}
// 表格提示信息
export function changeDataText(objData, items) {
  let flag = true;
  let noDataText = "";
  for (let key in objData) {
    if (objData[key]) {
      if (items.length == 0) {
        noDataText = "找不到符合条件的信息";
        flag = false;
        return noDataText;
      }
    }
  }
  if (flag) {
    noDataText = "暂无数据";
  }
  return noDataText;
}
//字节转化
export function changeByte(limit) {
  var size = "";
  if (!limit || limit == "0.00") {
    return '';
  } else if (limit < 1024) {                            //小于1KB，则转化成B
    size = limit.toFixed(2) + "B"
  } else if (limit < 1024 * 1024) {            //小于1MB，则转化成KB
    size = (limit / 1024).toFixed(2) + "KB"
  } else if (limit < 1024 * 1024 * 1024) {        //小于1GB，则转化成MB
    size = (limit / (1024 * 1024)).toFixed(2) + "MB"
  } else {                                            //其他转化成GB
    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB"
  }
  var sizeStr = size + "";                        //转成字符串
  var index = sizeStr.indexOf(".");                    //获取小数点处的索引
  var dou = sizeStr.substr(index + 1, 2)            //获取小数点后两位的值
  if (dou == "00") {                                //判断后两位是否为00，如果是则删除00                
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
  }
  return size;
}