export default {
  debounce: function (fn, t) {
    let timer = null;
    return function () {
      //借助闭包
      let th = this;
      let args = arguments;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn.apply(th, args);
      }, t);
    };
  },
};
