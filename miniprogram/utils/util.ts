/**
 * 时间格式化
 * @param time { number | Date } number 时间戳 或者 时间对象
 * @param fmt 格式化格式 yyyy-MM-dd hh:mm:ss:SS
 * isTen:是否是10位
 */
export const formatTime = function (time: number | Date, fmt: string, isTen = true) {
  let date
  if (isTen && typeof time == "number") {
    date = new Date(time * 1000)
  } else {
    date = new Date(time)
  }

  var o = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "h+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    "S": date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      // @ts-ignore
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length))
    }
  }
  return fmt
}