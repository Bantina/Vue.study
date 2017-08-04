//模块化编程的思想
//将统一的常用的方法放在common中统一处理。

/*将GMT标准时间 转化为某种模版日期形式
* @date 传进来的GMT标准时间
* @fmt 模版格式，eg:yyyy-MM-dd hh:mm:ss */
export function formatDate(date,fmt) {
  if(/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4-RegExp.$1.length)); //RegExp.$1匹配字符串-->yyyy
  }
  let o = {
    'M+':date.getMonth() + 1,
    'd+':date.getDate(),
    'h+':date.getHours(),
    'm+':date.getMinutes(),
    's+':date.getSeconds()
  }
  for(let k in o){
    if(new RegExp(`(${k})`).test(fmt)){
      let str = o[k]+''; //+''字符串化
      fmt = fmt.replace(RegExp.$1,(RegExp.$1.length === 1)?str:padLeftZero(str));
    }
  }

  return fmt;
}

//检查0
function padLeftZero(str) {
  return ('00'+str).substr(str.length);
}
