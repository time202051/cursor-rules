export default {
  data() {
    return {
      // 用户信息
      userInfo: {
        workbenchCode: '',
        userName: '',
      },
      userInfoTimer: null,
      //容器号
      screenFrom: {
        containerCode: ''
      },
      //拣选任务
      bcFrom: {
        wavePickAllocationId: "",
        pickNo: "",
        sequenceNumber: '',
        waveNumber: "",
        cnumber: "",
        productCode: "",
        productName: "",
        qty: '',
        pickQty: '',
      },
      rules: {},
      //序列号table
      pickSerialNumber: {
        from: {
          serialNumber: '',
          taskCount: '',
          compeltedCount: '',
        },
        rules: {},
        table: {
          emptyImg: true,
          header: [
            {
              prop: "productSerialNumber",
              label: "序列号编码",
              minWidth: "",
            },
            {
              prop: "qty",
              label: "数量",
              minWidth: "100",
            }
          ],
          row: [],
          paginations: {
            page: 1, //当前位于那页面
            total: 0, //总数
            limit: 10, //一页显示多少条
          },
        },
      },

//分配拣选任务信息table
      JX: {
        from: {
          serialNumber: '',

        },
        rules: {},
        table: {
          emptyImg: true,
          header: [{
            prop: "taskNo",
            label: "任务号",
            minWidth: "150",
          },
            {
              prop: "productCode",
              label: "零件编码",
              minWidth: "120",
            },
            {
              prop: "produdctName",
              label: "零件名称",
              minWidth: "",
            },
            {
              prop: "qty",
              label: "分配数量",
              minWidth: "80",
            },
            {
              prop: "pickQty",
              label: "拣选数量",
              minWidth: "100",
            }
          ],
          row: [],
          paginations: {
            page: 1, //当前位于那页面
            total: 0, //总数
            limit: 10, //一页显示多少条
          },
        },
      },
      //格子
      boxList: [],
    }
  },
  created() {
    let workbenchCodeFlage = JSON.parse(localStorage.getItem("workbenchCodeFlage"));
    if (workbenchCodeFlage) this.userbindwork(workbenchCodeFlage)
  },
  mounted() {
    this.connectionFN();
    // setTimeout(() => {
      this.resetForm(false);
      //维护用户与工作台接口 5s调一次
      this.userInfoTimer = setInterval(this.onlinestagginfodto, 5000)
    // }, 2000)
  },
  destroyed() {
    clearInterval(this.userInfoTimer)
    this.userInfoTimer = null
  },
  methods: {
    // 在mounted 里面触发 执行并监听创建的链接
    connectionFN() {
      let _that = this;
      //监听触发方法
      this.$store.state.user.receiveMessageCallBack(function (data) {
        console.log(data, 'data')
        _that.handleMsg(data)
      });
    },
    handleMsg(obj) {
      let tempObj = JSON.parse(obj)
      if (tempObj.BussinessType == 1) {
        this.screenFrom.containerCode = tempObj.ContainerCode;
        this.containerCodeChange('screenFrom')
      } else if (tempObj.BussinessType == 0) {
        this.screenFrom.containerCode = tempObj.ContainerCode;
        this.$refs.containerCode.focus(); //料箱编码焦点聚焦
      } else if (tempObj.BussinessType == 2) {
        this.pickcargolocationinfo(true)
      }

    },

    //料箱编确认
    containerCodeChange(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.screenFrom.containerCode) {
            this.pickallocationtask();
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    //料箱重置
    resetForm(flage = true) {
      //料箱编码清空
      this.$refs['screenFrom'].resetFields();
      this.screenFrom.containerCode = null;
      //任务列表清空
      for (const key in this.bcFrom) {
        this.bcFrom[key] = ''
      }
      //序列号清空
      for (const key in this.pickSerialNumber.from) {
        this.pickSerialNumber.from[key] = ''
      }
      //序列号表格
      this.pickSerialNumber.table.row = []
      this.pickSerialNumber.table.paginations.total = 0
      this.pickSerialNumber.table.paginations.page = 1
      //分配拣选任务表格
      this.JX.table.row = []
      this.JX.table.paginations.total = 0
      this.JX.table.paginations.page = 1
      if (flage) this.pickcargolocationinfo(true) //格子接口
      this.$refs.containerCode.focus(); //料箱编码焦点聚焦

    },
    //退出登录
    loginOut() {
      this.$confirm("是否退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let workbenchCodeFlage = JSON.parse(localStorage.getItem("workbenchCodeFlage"))
        this.$store.dispatch("user/logout")
        this.$router.push({
          path: '/login', query: {
            workbenchCode: workbenchCodeFlage
          }
        })
      })
    },
    //缺货提交
    qhClick() {
      // if (this.pickSerialNumber.from.serialNumber) {
      this.$confirm("是否缺货提交?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.outofstockpick(true)
      })
      // }
    },
    //序列号方法change
    serialNumberChange() {
      if (this.pickSerialNumber.from.serialNumber) {
        this.scanserialnumber()
      }
    },
    handleSerialNumberSizeChange(val) {
      this.pickSerialNumber.table.paginations.page = val;
      this.pickserialnumberpages()
    },
    handleSerialNumberCurrentChange(val) {
      this.pickSerialNumber.table.paginations.page = 1;
      this.pickSerialNumber.table.paginations.limit = val;
      this.pickserialnumberpages()
    },

    handleJXSizeChange(val) {
      this.JX.table.paginations.page = val;
      this.pickcargolocationinput()
    },
    handleJXCurrentChange(val) {
      this.JX.table.paginations.page = 1;
      this.JX.table.paginations.limit = val;
      this.pickcargolocationinput()
    },
  }
}
