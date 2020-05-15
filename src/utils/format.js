/**
 * 帮助类
 */
class Format {
  /**
     * 时间格式化
     * @param {*} date 
     * @param {*} fmt 
     * let date = new Date()
        formatDate("YYYY-mm-dd HH:MM", date)
        >>> 2019-06-06 19:45`
     */
  static formatDate(date, fmt) {
    let ret;
    const opt = {
      "y+": date.getFullYear().toString(), // 年
      "M+": (date.getMonth() + 1).toString(), // 月
      "d+": date.getDate().toString(), // 日
      "H+": date.getHours().toString(), // 时
      "m+": date.getMinutes().toString(), // 分
      "s+": date.getSeconds().toString(), // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(
          ret[1],
          ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
        );
      }
    }
    return fmt;
  }

  static pathCombine() {
    let url = "";
    let bine = "";
    for (let i = 0; i < arguments.length; i++) {
      bine = arguments[i];
      if (bine.includes("//")) {
        url += bine;
      } else if (bine.indexOf("/") == 0) {
        url += bine.substr(1, bine.length - 1);
      } else {
        url += bine;
      }
    }
    return url;
  }
}

export default Format;
