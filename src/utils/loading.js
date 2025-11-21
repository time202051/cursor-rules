
import { Loading } from 'element-ui';  //全局的Message,Loading提示
let loading        //定义loading变量
let needLoadingRequestCount = 0 // 声明一个对象用于存储请求个数
export function startLoading() {    //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        spinner: 'el-icon-loading',
        text:'加载中...',
        background: 'rgba(255, 255,255, 0.25)',
        fullscreen: false,
        target: document.querySelector('.app-main') // 设置加载动画区域
    })
}
export function endLoading() {     //使用Element loading-close 方法
    loading.close()
}

export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }

    needLoadingRequestCount++;
}

export function hideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}
export default { showFullScreenLoading, hideFullScreenLoading }
