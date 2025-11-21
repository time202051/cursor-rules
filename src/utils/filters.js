//全局过滤器
//数值进行千分隔
export function formatNumberFilter(value) {
  if (value === "" || value === null || value === undefined) {
    return "";
  }
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
