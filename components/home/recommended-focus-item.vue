<template>
  <navigator class="suggestion-navigator" :url="link">
    <image class="suggestion-bg" :src="img"></image>
    <text class="suggestion-item-title">{{title}}</text>
    <view class="bottom">
      <view class="statistics-item">
        <image class="icon visits" src="/static/icon/home/icon_visit.png"></image>
        <text class="text visits">{{views}}</text>
      </view>
      <view class="statistics-item">
        <image class="icon shares" src="/static/icon/home/icon_share.png"></image>
        <text class="text shares">{{shares}}</text>
      </view>
    </view>
  </navigator>  
</template>

<script>
  export default {
    name: "RecommendedFocusItem",
    props: {
      link: String,
      img: String,
      title: String,
      views: Number,
      shares: Number
    }
  }
</script>

<style lang="less" scoped>
  .suggestion-navigator {
    width: 277.778upx;
    height: auto;
    
    .suggestion-bg {
      width: 100%;
      height: 208.333upx;
    }

    .suggestion-item-title {
      width: 240.278upx;
      height: 27.778upx;
      font-size: 27.778upx;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height: 38.889upx;
    }

    .bottom {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;

      width: 100%;
      height: 41.667upx;

      font-size:32px;
      font-weight:300;
      color:rgba(153,153,153,1);
      line-height: 41.667upx;

      .statistics-item {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;

        .icon {
          &.visits {
            width: 35.417upx;
            height: 22.222upx;
            margin-right: 11.806upx;
          }
          &.shares {
            width: 28.472upx;
            height: 30.556upx;
            margin-right: 11.806upx;
          }
        }
      }


    }

  }
      
</style>
