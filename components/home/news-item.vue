<template>
  <view class="news-item">
    <image lazy-load="true"  class="cover" :src="cover" mode="scaleToFill"></image>
    <view class="content">
      <text class="uni-ellipsis-2">{{title}}</text>
      <text class="publish-date">发布时间：{{publish_time}}</text>
      <view class="statistics-info">
        <view class="statistics-item visits">
          <image lazy-load="true"  class="icon-visits" src="/static/icon/home/icon_visit.png"></image>
          <text>{{visits}}</text>
        </view>
        <view class="statistics-item likes">
          <image lazy-load="true"  class="icon-likes" src="/static/icon/home/icon_like.png"></image>
          <text>{{likes}}</text>
        </view>
        <view class="statistics-item shares">
          <image lazy-load="true"  class="icon-shares" src="/static/icon/home/icon_share.png"></image>
          <text>{{shares}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "NewsItem",
  props: {
    cover: String,
    title: String,
    publish_time: String,
    visits: Number,
    likes: Number,
    shares: Number
  },

}
</script>

<style lang="less" scoped>
     .news-item {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;

        width: 694.444upx;
        height: 267.361upx;
        background: #fff;
        box-sizing: border-box;
        border-bottom: 0.694upx solid #e5e5e5;

        .cover {
          width: 280upx;
          height: 180upx;
        }

        .content {
          position: relative;
          width: 388.889upx;
          height: 208.333upx;
          overflow: hidden;
          text-align: left;
          background-color: #fff;

//           .title {
//             width: 100%;
//             height: 72.917upx !important;
//             font-size: 27.778upx;
//             font-family: MicrosoftYaHei;
//             font-weight: 400;
//             color: #333;
//             line-height: 38.889upx !important;
//           }

          .publish-date {
            display: block;
            font-size: 22upx;
            font-family:MicrosoftYaHeiLight;
            font-weight:300;
            color: #666;
            line-height: 41.667upx;
          }

          .statistics-info {
            width: 100%;
            height: 34.722upx;
            margin-top: 30upx;
            overflow: hidden;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;

            .statistics-item {
              display: flex;
              flex-flow: row nowrap;
              justify-content: center;
              align-items: center;

              width: auto;
              height: 100%;

              font-size: 32px;
              font-weight: 300;
              color: #999;

              &.visits {
                .icon-visits {
                  width: 35.417upx;
                  height: 22.222upx;
                  margin-right: 11.806upx;
                }
              }
              &.likes {
                .icon-likes {
                  width: 26.389upx;
                  height: 26.389upx;
                  margin-right: 11.806upx;
                }

              }
              &.shares {
                .icon-shares {
                  width: 28.472upx;
                  height: 30.556upx;
                  margin-right: 11.806upx;
                }
              }
            }
          }
          
        }
      }
</style>


