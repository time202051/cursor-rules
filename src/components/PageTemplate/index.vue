<template>
  <div>
    <FormSearch
      :form-search-data="pageOBJ.formSearchData"
      @handleSearch="handleSearch"
      @handleReset="handleReset"
    />
    <MyTable
      :paginations="pageOBJ.paginations"
      :btnlist="pageOBJ.btnlist"
      :emptyImg="pageOBJ.tableData.emptyImg"
      :tableData="pageOBJ.tableData"
      :multipleSelection="multipleSelection"
      @SelectionChange="SelectionChange"
    >
    </MyTable>
  </div>
</template>

<script>
export default {
  name: "PageTemplate",
  props: {
    pageOBJ: Object,
  },
    model: {
    prop: "multipleSelection",
    event: "SelectionChange",
  },
  watch: {
    pageOBJ: {
      handler(val) {
      },
      deep: true,
    },
  },
  data() {
    return {
      multipleSelection: [],
    };
  },
  methods: {
    handleSearch(val) {
      this.$emit("handleSearch", val);
    },
    handleReset(val) {
      this.$emit("handleReset", val);
    },
    SelectionChange(val) {
      this.$emit("SelectionChange", val);
    },
  },
};
</script>

<style>
</style>