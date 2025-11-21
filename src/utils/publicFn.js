
  /**
     * 获取日期范围
     */
  export function getDaysBefore(val) {
    const now = new Date(); // 当前日期
    const nowDayOfWeek = now.getDay(); // 今天本周的第几天
    const nowDay = now.getDate(); // 当前日
    const nowMonth = now.getMonth(); // 当前月
    const nowYear = now.getFullYear(); // 当前年
    const jd = Math.ceil((nowMonth + 1) / 3);
    let startTime;
    let endTime;
    let customTime = [];
    switch (val) {
      case "today": // 今日
        startTime = new Date(nowYear, nowMonth, nowDay );
        endTime = new Date(nowYear, nowMonth, nowDay );
        break;
      case "yesterday": // 昨日
        startTime = new Date(nowYear, nowMonth, nowDay - 1);
        endTime = new Date(nowYear, nowMonth, nowDay - 1);
        break;
      case "week": // 本周
        startTime = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
        endTime = new Date(nowYear, nowMonth, nowDay + 6 - nowDayOfWeek);
        break;
      case "pastWeek": // 近 7 日
        startTime = new Date(nowYear, nowMonth, nowDay - 6);
        endTime = new Date(nowYear, nowMonth, nowDay);
        break;
      case "past15days": // 近 15 日
        startTime = new Date(nowYear, nowMonth, nowDay - 14);
        endTime = new Date(nowYear, nowMonth, nowDay);
        break;
      case "month": // 本月
        startTime = new Date(nowYear, nowMonth, 1);
        endTime = new Date(nowYear, nowMonth + 1, 0);
        break;
      case "pastMonth": // 最近1个月
        startTime = new Date(nowYear, nowMonth - 1, nowDay);
        endTime = new Date(nowYear, nowMonth, nowDay);
        break;
      case "past3months": // 最近3个月
        startTime = new Date(nowYear, nowMonth - 3, nowDay);
        endTime = new Date(nowYear, nowMonth, nowDay);
        break
      case "quarter": // 本季度
        startTime = new Date(nowYear, (jd - 1) * 3, 1);
        endTime = new Date(nowYear, jd * 3, 0);
        break;
      case "year": // 今年
        startTime = new Date(nowYear, 0, 1);
        endTime = new Date(nowYear, 11, 31);
        break;
      case "past1year": // 最近1年
        startTime = new Date(nowYear -1 , nowMonth, nowDay);
        endTime = new Date(nowYear, nowMonth, nowDay);
        break
      default: // 自定义时间
        customTime = val.split(" - ");
        break;
    }
    return customTime.length
      ? customTime
      : [
          formatDate(startTime) + " 00:00:00",
          formatDate(endTime) + " 23:59:59",
        ];
  }
function  formatDate(date) {
    const y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? `0${m}` : m;
    let d = date.getDate();
    d = d < 10 ? `0${d}` : d;
    return `${y}-${m}-${d}`;
  }