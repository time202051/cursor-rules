export default {
  data() {
    return {
      dialogFormVisible: false,
      title: "新增行",
      width: "55%",
      model: [
        {
          label: "零件编码",
          type: "selectRemoteMethod",
          prop: "productCode",
          child: [],
          loading: false,
          remoteMethod: this.remoteMethod,
          tempBoxData: [],
          //自定义指令
          loadmores: {
            fn: this.loadmoreGX,
            SELECTWRAP_DOM_index: 0,
            flage: "productCode",
          },
        },
        {
          label: "零件名称",
          type: "input",
          prop: "productName",
          disabled: true,
        },
        {
          label: "零件批次",
          type: "input",
          prop: "productBatch",
        },
        {
          label: "供应商批次",
          type: "input",
          prop: "supplierBatch",
        },
        {
          label: "收货日期",
          type: "date",
          prop: "receivingTime",
          props: {
            format: "yyyy/MM/dd",
            valueFormat: "yyyy-MM-dd",
          },
        },
        {
          label: "参考号",
          type: "input",
          prop: "referenceCode",
        },
        {
          label: "上架库区",
          type: "select",
          prop: "regionId",
          child: [],
          disabled: true,
        },
        {
          label: "货主编码",
          type: "select",
          prop: "ownerId",
          child: [],
        },
        {
          label: "子托盘编码",
          type: "input",
          prop: "subTrayCode",
        },
        {
          label: "质检状态",
          type: "select",
          prop: "quality",
          child: this.SET_enumsSelect({
            keyword: "qualityEnum",
          }),
        },
        {
          label: "是否寄售",
          type: "select",
          prop: "isNoStock",
          child: [
            { key: true, value: "是" },
            { key: false, value: "否" },
          ],
        },
        {
          label: "备注",
          type: "textarea",
          prop: "remark",
        },
      ],
      rules: {
        productCode: [{ required: true, message: "必填", trigger: "blur" }],
        productBatch: [{ required: true, message: "必填", trigger: "blur" }],
        subTrayCode: [{ required: true, message: "必填", trigger: "blur" }],
        ownerId: [{ required: true, message: "必填", trigger: "change" }],
        quality: [{ required: true, message: "必填", trigger: "change" }],
        isNoStock: [{ required: true, message: "必填", trigger: "change" }],
      },
      form: {
        productCode: "",
        productName: "",
        productBatch: "",
        supplierBatch: "",
        receivingTime: "",
        referenceCode: "",
        regionId: "",
        regionName: "",
        ownerId: "",
        ownerName: "",
        subTrayCode: "",
        quality: "",
        isNoStock:"",
        remark: "",
      },
    };
  },
};
