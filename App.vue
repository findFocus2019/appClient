<script>
export default {
  onLaunch: function() {
    console.log("App Launch");
    // 检查
    let res = uni.getSystemInfoSync();
    console.log('divice info' , JSON.stringify(res));
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

page {
  background-color: #f4f5f6;
  height: 100%;
  font-size: 28upx;
  line-height: 1.8;
}

uni-rich-text img {
    max-width: 100% !important;
  }
  
uni-rich-text p {
  line-height: 1.5;
  margin-bottom: 30upx;
  word-break: break-all;
}

.uni-popup-bottom {
  position: fixed !important;
}

</style>
