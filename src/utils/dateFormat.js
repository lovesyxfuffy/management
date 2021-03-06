/**
 * 格式化日期
 * fmt指定格式，例如yyyy-MM-dd hh:mm:ss;time要格式化的时间
 * @author hanchuyi
 */
const dateFormat = (time, fmt = 'yyyy-MM-dd hh:mm:ss') => {
  const o = {
    'M+': time.getMonth() + 1, // 月份
    'd+': time.getDate(), // 日
    'h+': time.getHours(), // 小时
    'm+': time.getMinutes(), // 分
    's+': time.getSeconds(), // 秒
    'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
    'S': time.getMilliseconds() // 毫秒
  }

  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))

  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}

export default dateFormat
