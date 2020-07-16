import sha1 from "sha1";
import md5 from 'md5';

function getStr(arr, key, starttime, token) {
  var tostr = arr ? getStrings(arr, "") : "";
  return md5(sha1(md5(tostr) + md5(key) + starttime) + token);
}
function ksort(o) {
  let sorted = {},
    keys = Object.keys(o);
  keys.sort();
  keys.forEach((key) => {
    sorted[key] = o[key];
  })
  return sorted;
}
function getStrings(data, str) {
  data = ksort(data);
  for (var x in data) {
    if (isJson(data[x])) {
      var i = 0;
      for (var k in data[x]) {
        i++;
        break;
      }
      if (i > 0) {
        str += x;
        str = getStrings(data[x], str);
      }
    } else if (isArray(data[x])) {
      if (data[x].length != 0) {
        str += x;
        str = getStrings(data[x], str);
      }
    } else {
      if (
        data[x] !== undefined &&
        data[x] !== null &&
        data[x] !== "" &&
        data[x] !== false &&
        data[x] !== true
      ) {
        str += x.toString() + data[x].toString();
      }
    }
  }
  return str;
}

function isArray(o) {
  return Object.prototype.toString.call(o) == "[object Array]";
}

function isJson(obj) {
  return (
    typeof obj == "object" &&
    Object.prototype.toString.call(obj).toLowerCase() == "[object object]" &&
    !obj.length
  );
}

export default getStr