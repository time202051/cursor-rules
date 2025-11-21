function test() {
    let date = new Date();
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    //  当前日期
    let nowDate =
        y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
    //   一月的时候年份要减一
    if (m == 1) {
        y--;
        m = 12;
    } else if (m == 3 && d > 28) {
        //三月要考虑是否为闰年
        m--;
        if ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0) {
            d = 29;
        } else {
            d - 28;
        }
    } else if ((m != 12 || m != 8) && d == 31) {
        //31号的月份要考虑上个月是否有31号
        m--;
        d = 30;
    } else {
        m--;
    }
    // 一个月前的日期
    let pastDate =
        y +
        "-" +
        (m < 10 ? "0" + m : m) +
        "-" +
        (d < 10 ? "0" + d : d) +
        " 00:00:00";
    return pastDate
}
function ymdTime() {
    Date.prototype.Format = function (fmt) {
        // author: meizz
        var o = {
            "M+": this.getMonth() + 1, // 月份
            "d+": this.getDate(), // 日
            "h+": this.getHours(), // 小时
            "m+": this.getMinutes(), // 分
            "s+": this.getSeconds(), // 秒
            "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
            S: this.getMilliseconds(), // 毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(
                RegExp.$1,
                (this.getFullYear() + "").substr(4 - RegExp.$1.length)
            );
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(
                    RegExp.$1,
                    RegExp.$1.length == 1
                        ? o[k]
                        : ("00" + o[k]).substr(("" + o[k]).length)
                );
        return fmt;
    };
    return new Date().Format("yyyy-MM-dd 23:59:59");
}
export function getTimer() {
    let temp = [test(), ymdTime()]
    return temp
}
export default getTimer