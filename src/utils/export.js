//弹出层方法
export function fnexsl(res) {
  let blob = new Blob([res.data], {
    type: res.type
  });
  let downloadElement = document.createElement('a')
  let href = window.URL.createObjectURL(blob); //创建下载的链接
  downloadElement.href = href;
  downloadElement.download = decodeURI(res.fileName); //下载后文件名
  // debugger
  document.body.appendChild(downloadElement);
  downloadElement.click(); //点击下载
  document.body.removeChild(downloadElement); //下载完成移除元素
  window.URL.revokeObjectURL(href); //释放blob对象
}
export default fnexsl
