import Vue from "vue";
import Cookies from "js-cookie";
Vue.prototype.Cookies = Cookies;
// require('@aspnet/signalr');
import "normalize.css/normalize.css"; // a modern alternative to CSS resets
// import * as signalR from "@aspnet/signalr";
import Element from "element-ui";
import "./styles/element-variables.scss";
// import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store";

import elDragDialog from "@/directive/el-drag-dialog"; // base on element-ui
Vue.use(elDragDialog);

import "./icons"; // icon
import "./permission"; // permission control
import "./utils/error-log"; // error log

import * as filters from "@/utils/filters"; // global filters
import "@/utils/jprint";
// 全局组件
import globleModule from "@/utils/install";
import fnexsl from "@/utils/export";
import barcode from "@/utils/barcode";
import { SET_enumsSelect, Handle_Select } from "@/utils/setenumsSelect";
Vue.prototype.SET_enumsSelect = SET_enumsSelect;
Vue.prototype.Handle_Select = Handle_Select;
import "@/utils/directives";
import JsonViewer from 'vue-json-viewer'
Vue.use(JsonViewer)
Vue.use(globleModule);
import { get, post, del, put } from "@/api/request/sendRuest";
Vue.prototype.get = get;
Vue.prototype.post = post;

Vue.prototype.del = del;
Vue.prototype.put = put;
Vue.prototype.fnexsl = fnexsl;
Vue.prototype.barcode = barcode;

import { hasBtn } from "@/utils/hasBtn";
Vue.prototype.hasBtn = hasBtn;
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === "production") {
  // const { mockXHR } = require('../mock')
  // mockXHR()
}

Vue.use(Element, {
  size: Cookies.get("size") || "medium", // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
});

// register global utility filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
import router from "./router";
import i18n from "./i18n/i18n";

https: Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  i18n,
  render: (h) => h(App),
});
