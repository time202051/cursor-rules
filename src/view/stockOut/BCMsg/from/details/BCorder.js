export default {
  methods: {
    handleSearchBCorder(from) {
      this.BCorder.formSearchData.value = { ...from };
      this.BCorder.paginations.page = 1;
      this.getWaveOrderTable();
    },
    handleResetBCorder() {
      this.BCorder.formSearchData.value = {
        BillNo: null,
        OrderState: null,
        WarehouseCode: null,
        ShipperCode: null,
        arrivalTimer: [],
        timer: [],
      };
    },
    refreshTableBTNBCorder() {
      this.BCorder.paginations.page = 1;
      this.getWaveOrderTable();
    },
    SelectionChangeBCorder(row) {
      this.BCorder.multipleSelection = row;
    },
    handleSizeChangeBCorder(val) {
      this.BCorder.paginations.page = 1;
      this.BCorder.paginations.limit = val;
      this.getWaveOrderTable();
    },
    handleindexChangeBCorder(val) {
      this.BCorder.paginations.page = val;
      this.getWaveOrderTable();
    },
  },
};
