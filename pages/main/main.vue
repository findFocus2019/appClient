<template>
  <view class="content">
    <view class="top-panel">
			<view class="search-bar">
      </view>
		</view>
  </view>
</template>

<script>
// import { mapState } from "vuex";

export default {
  computed: {
   
  },
  onShow() {
    
  },
  onLoad() {
   
  },
  methods:{
  }
};
</script>

<style lang="less">
	.content {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
    background-color: #fff;
    
    .top-panel {
      position: absolute;
      left: 0;
      top: 0;
      
      display: flex;
      flex-flow: column nowrap;
      justify-content: top;
      align-items: center;
      width: 100%;
      height: 555.56upx; 
      background: url('/static/img/home_header_bg.jpg');
      background-position: center;
      background-size: 100% 100%;

      .search-bar {
        
        display: flex;
        width: 548.61upx;
        height: 49.30upx;
        margin-top: 70upx;
        border: 1upx solid #fff;
        border-radius: 24.65upx;

        background: #fff;
      }
    }
	}
	
	
</style>
