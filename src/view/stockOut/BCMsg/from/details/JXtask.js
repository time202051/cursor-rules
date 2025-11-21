export default {
  methods: {
    handleSearchJXtask(from) {
      this.JXtask.formSearchData.value = { ...from };
      this.JXtask.paginations.page = 1;
      this.getWavePickTaskTable();
    },
    handleResetJXtask() {
      this.JXtask.formSearchData.value = {
        TaskStatus: null,
        LackStatus: null,
        ProductCode: null,
        timer: [],
      };
    },
    refreshTableBTNJXtask() {
      this.JXtask.paginations.page = 1;
      this.getWavePickTaskTable();
    },
    SelectionChangeJXtask(row) {
      this.JXtask.multipleSelection = row;
    },
    handleSizeChangeJXtask(val) {
      this.JXtask.paginations.page = 1;
      this.JXtask.paginations.limit = val;
      this.getWavePickTaskTable();
    },
    handleindexChangeJXtask(val) {
      this.JXtask.paginations.page = val;
      this.getWavePickTaskTable();
    },
  },
};
