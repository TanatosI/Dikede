<template>
  <div>111</div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 10px);
  width: 100%;
  padding-left: 210px;
  position: relative;
  overflow: hidden;
  position: absolute;
  right: 0px;
  margin-top: 60px;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
/* 内容 */
.dkd-home {
  width: 100%;
  height: 100%;
  background-color: aqua;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
