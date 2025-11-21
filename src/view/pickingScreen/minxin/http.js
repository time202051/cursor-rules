import {pickingScreen, pickscreen} from '@/api/request/swagger'
import {createConnection} from '@/utils/signalRID'

export default {
  methods: {
    // 获取工作台用户信息  如果userName==null 返回到登录页
    onlinestagginfodto() {
      this.get({
        url: pickscreen.onlinestagginfodto,
        isLoading: false,
      }).then((res) => {
        if (!res.result.workbenchCode) {
          this.loginFn()
        }
        this.userInfo = {...res.result}
      }).catch(err => {
        this.loginFn()
      })
    },
    //用户绑定拣选台
    userbindwork(workbenchCodeFlage) {
      this.post({
        url: pickingScreen.userbindwork + '?workbenchCode=' + workbenchCodeFlage,
        isLoading: false,
        data: {
          workbenchCode: workbenchCodeFlage
        },
      }).then((res) => {
        //创建实时id
        createConnection()
        this.pickcargolocationinfo(false) //
        this.onlinestagginfodto();
      }).catch(err => {
        this.loginFn()
      })
    },
    //退出登录方法
    loginFn() {
      let workbenchCodeFlage = JSON.parse(localStorage.getItem("workbenchCodeFlage"));
      this.$store.dispatch("user/logout")
      this.$router.push({
        path: '/login', query: {
          workbenchCode: workbenchCodeFlage
        }
      })
    },
    //料箱编码接口
    pickallocationtask(isLoading = true) {
      this.get({
        url: pickscreen.pickallocationtask,
        isLoading: isLoading,
        data: {
          containerCode:
          this.screenFrom.containerCode
        },
      }).then((res) => {
        //任务列表赋值
        this.bcFrom = {...res.result}
        /*刷新格子接口*/
        this.pickcargolocationinfo(false)
        /*刷新序列号list*/
        this.pickserialnumberpages()
        /*刷新拣选table 列表*/
        this.pickcargolocationinput()
        /*获取任务进度*/
        this.containertaskprocessing()
        /*获取剩余未拣选货数量*/
        this.notpickcargolocation()
        /*序列号焦点聚焦*/
        this.$refs.serialNumber.focus();
      }).catch((err) => {
        this.resetForm(false)
      });
    },
    //剩余未拣选数量接口
    notpickcargolocation(){
      this.get({
        url: pickscreen.notpickcargolocation,
        isLoading: false,
        // data: {
        //   WaveAllocationKey: this.bcFrom.wavePickAllocationId,
        // }
      }).then((res) => {
        this.JX.from.serialNumber = res.result;
      })
    },
    //格子接口
    pickcargolocationinfo(isLoading = false) {
      this.get({
        url: pickscreen.pickcargolocationinfo,
        isLoading: false,
        data: {
          WaveAllocationKey: this.bcFrom.wavePickAllocationId,
        }
      }).then((res) => {
        // res.result[4].cargoLocationColor = 4
        // res.result[9].cargoLocationColor = 1
        for (let i = 0; i < res.result.length; i++) {
          const item = res.result[i];
          if (item.cargoLocationColor == 1) {
            item.className = 'orangered';
          }
          if (item.cargoLocationColor == 2) {
            item.className = 'green';
          }
          if (item.cargoLocationColor == 4) {
            item.className = 'blue';
          }
        }
        this.boxList = res.result;
        // console.log(this.boxList, ' this.boxList')
      })
    },
    //序列号table接口
    pickserialnumberpages(isLoading = false) {
      this.get({
        url: pickscreen.pickserialnumberpages,
        isLoading: isLoading,
        data: {
          WaveAllocationKey: this.bcFrom.wavePickAllocationId,
          Page: this.pickSerialNumber.table.paginations.page,
          MaxResultCount: this.pickSerialNumber.table.paginations.limit
        },
      }).then((res) => {
        this.pickSerialNumber.table.row = res.result.items
        this.pickSerialNumber.table.paginations.total = res.result.totalCount;
      })
    },
    //序列号change接口
    scanserialnumber() {
      this.post({
        url: pickscreen.scanserialnumber,
        isLoading: true,
        data: {
          wavePickAllocationId: this.bcFrom.wavePickAllocationId,
          serialNumber: this.pickSerialNumber.from.serialNumber,
        },
      }).then((res) => {
        this.serialFn(res)
      }).catch(err => {
        this.pickSerialNumber.from.serialNumber = null;
        this.$refs.serialNumber.focus();
      })
    },
    //任务进度接口
    containertaskprocessing() {
      this.get({
        url: pickscreen.containertaskprocessing,
        isLoading: false,
        data: {
          containerCode: this.screenFrom.containerCode
        }
      }).then((res) => {
        this.pickSerialNumber.from.taskCount = res.result.taskCount
        this.pickSerialNumber.from.compeltedCount = res.result.compeltedCount
      })
    },
    //拣选任务table接口
    pickcargolocationinput(isLoading = false) {
      this.get({
        url: pickscreen.pickcargolocationinput,
        isLoading: isLoading,
        data: {
          PickCargoLocationId: this.bcFrom.PickCargoLocationId,
          Page: this.JX.table.paginations.page,
          MaxResultCount: this.JX.table.paginations.limit
        },
      }).then((res) => {
        this.JX.table.row = res.result.items
        this.JX.table.paginations.total = res.result.totalCount;
      })
    },
    //  缺货提交接口
    outofstockpick(isLoading = false) {
      if (!this.bcFrom.wavePickAllocationId) return this.$message.info("没有正在进行中的任务！");
      this.post({
        url: pickscreen.outofstockpick,
        isLoading: isLoading,
        data: {
          wavePickAllocationId: this.bcFrom.wavePickAllocationId,
        },
      }).then((res) => {
        this.serialFn(res)
      })
    },
    serialFn(res) {
      if (res.result.isAllFinish) {
        /*刷新格子号 清空左1 左2-1*/
        this.pickcargolocationinfo(false)
        for (const key in this.bcFrom) {
          this.bcFrom[key] = ''
        }
        //拣选table
        this.pickcargolocationinput(false)
        /*获取剩余未拣选货数量*/
        this.notpickcargolocation()
        /*获取任务进度*/
        this.containertaskprocessing()
        this.pickSerialNumber.table.row = []
        this.pickSerialNumber.table.paginations.total = 0
        this.pickSerialNumber.table.paginations.page = 1
        this.pickSerialNumber.from.serialNumber = null;
        this.$refs.serialNumber.focus();
      } else {
        if (res.result.isComplted) {
          this.bcFrom.wavePickAllocationId = ''

          /*还有下一条任务 调用料箱编码接口*/
          this.pickallocationtask(false)
          //拣选table
          this.pickcargolocationinput(false)
          /*获取任务进度*/
          this.containertaskprocessing()
          /*获取剩余未拣选货数量*/
          this.notpickcargolocation()
          this.pickSerialNumber.from.serialNumber = null;
          this.$refs.serialNumber.focus();
        } else {
          /*实拣+res.result.serialNumberQty  刷新序列号列表*/
          this.bcFrom.pickQty = this.bcFrom.pickQty + res.result.serialNumberQty;
          this.pickserialnumberpages(false)
          //拣选table
          this.pickcargolocationinput(false)
          /*获取剩余未拣选货数量*/
          this.notpickcargolocation()
          /*获取任务进度*/
          this.containertaskprocessing()
          this.pickSerialNumber.from.serialNumber = null;
          this.$refs.serialNumber.focus();
        }
      }
    },
  }
}
