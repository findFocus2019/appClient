<script>
export default {
  onLaunch: function() {
    console.log("App Launch");
    // 检查
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
</script>

<style>
@import "./common/uni.css";
</style>
<!-- 
<style lang="scss">
// @import "./node_modules/bootstrap/scss/bootstrap.scss";
/*每个页面公共css */
/* uni-app默认全局使用flex布局。因为flex布局有利于跨更多平台，尤其是采用原生渲染的平台。如不了解flex布局，请参考http://www.w3.org/TR/css3-flexbox/。如不使用flex布局，请删除或注释掉本行。*/
/* @import "./static/css/main.css"; */
</style> -->
