<template >
<div>


</div>
 
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        // value:{
        //     jobCode:"1008"
        // }


      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>