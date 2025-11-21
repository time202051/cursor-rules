import state from '../store';

// const signalR = require("./signalrNew.js");
import * as signalR from "@microsoft/signalr"

// import varible from "./variableFlage";

export function createConnection() {
  let connectionID;
  let token = state.state.user.token;
  let timer;
  let _that = this;
  //创建链接
  console.log(token, 'token');
  connectionID = new signalR.HubConnectionBuilder().withUrl(window.global_config.baseURL + window.global_config.signalrURL, {
    accessTokenFactory: () => token,
  }).build();

  console.log(connectionID, 'connectionID +=====>第一步');
  //执行链接
  connectionID.start().then(function () {
    //存链接
    state.state.user.connectionURL = connectionID;
    console.log(state.state.user.connectionURL, "state.state.user.connectionURL+存链接");
    connectionID.off("ReceiveMessage");
    connectionID.on("ReceiveMessage", function (data) {
      state.state.user.receiveMessage(data)
    });
    if (timer != null) {
      clearInterval(timer);
      // timer = null;
    }
    //监听停止链接后 重连链接 如果 重连失败继续链接 如果成功 就不用链接 （不报错了就代表重连成功）
    connectionID.onclose(function () {
      //重连的的方法
      if (token) {
        timer = setTimeout(createConnection, 5000);
      }
      console.error("连接断开");
    });
    timer = null;
  }).catch(function (err) {
    if (token) {
      timer = setTimeout(createConnection, 5000);
      console.error('TOKEN有值得时候catch重连');
    }
    connectionID.stop()
    .then(function () {
      // debugger;
      //清空链接
      // state.state.user.connectionURL= null;
      // clearInterval(timer);
      // timer = null;
      console.error('停止链接');
    })
    .catch(err => {
    });
    return console.error(err.toString(), 'catch重连');
  });


}

