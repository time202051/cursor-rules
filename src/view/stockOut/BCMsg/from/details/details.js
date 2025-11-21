export default {
  methods: {
    handleSearchJXtaskFPdetails(from) {
      this.JXtask.FPdetails.formSearchData.value = {...from};
      this.JXtask.FPdetails.paginations.page = 1;
      this.wavepickallocationpages();
    },
    handleResetJXtaskFPdetails() {
      this.JXtask.FPdetails.formSearchData.value = {
        WaveNumber: null,
        WaveState: null,
        ShipperCode: null,
        WarehouseCode: null,
        timer: [],
      }
    },
    refreshTableBTNBJXtaskFPdetails(){
      this.JXtask.FPdetails.paginations.page = 1;
      this.wavepickallocationpages();
    },
    SelectionChangeJXtaskFPdetails(row) {
      this.JXtask.FPdetails.multipleSelection = row;
    },
    handleSizeChangeJXtaskFPdetails(val) {
      this.JXtask.FPdetails.paginations.page = 1;
      this.JXtask.FPdetails.paginations.limit = val;
      this.wavepickallocationpages();
    },
    handleindexChangeJXtaskFPdetails(val) {
      this.JXtask.FPdetails.paginations.page = val;
      this.wavepickallocationpages();
    },
  }
}
