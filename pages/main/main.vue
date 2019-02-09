<template>
  <scroll-view scroll-y="true" class="scroll-view">
    <view class="content">
      <!-- 顶部的大背景 -->
      <view class="top-panel">
        <image class="top-panel-bg" src="/static/img/home_header_bg.jpg"/>
        <view class="search-bar-container">
          <search-bar @update:confirm="doSearch"/>
        </view>
        <view class="buttons">
          <view class="button checkout">
            <image src="/static/icon/home/icon_checkout.png"/>
            <text>签到</text>
          </view>
          <view class="button view-points">
            <image src="/static/icon/home/icon_pig.png"/>
            <text>查看</text>
          </view>
        </view>
      </view>

      <!-- 滑动banner -->
      <view class="swiper-banners">

        <swiper class="swiper" 
        :indicator-dots="swiper.indicatorDots"
        :autoplay="swiper.autoplay"
        :interval="swiper.interval"
        :duration="swiper.duration">
          <swiper-item class="swiper-item" v-for="(image, index) in imgList">
            <navigator class="banner" url="image.item1.link">
              <image :src="image.item1.img" class="banner-img"></image>
            </navigator>
            <navigator class="banner" url="image.item2.link">
              <image :src="image.item2.img" class="banner-img"></image>
            </navigator>
          </swiper-item>
        </swiper>

      </view>

      <!-- 焦点推荐 -->
      <view class="the-focus-sugguestions">
        <view class="header">
          <text class="title">焦点推荐</text>
          <navigator url="#"><text>更多&gt;&gt;</text></navigator>
        </view>
        <view class="body">
          <swiper>
            <swiper-item class="suggestion-swiper-item" v-for="item in suggestionList">
              <recommended-focus-item :link="item.link" :img="item.img" :title="item.title" :views="item.views" :shares="item.shares"/>
            </swiper-item>
          </swiper>
        </view>
      </view>

      <!-- 焦点咨询列表 -->
      <view class="the-focus-list">
        <view class="menu-navigator">
          <swiper class="menu-swiper">
            <!-- 定义菜单 -->
            <swiper-item v-for="(menu, index) in menus" class="swiper-menu-item">
              <view class="menu" :class="index === 0 ? 'activate' : ''">
                <navigator class="menu" :url="menu.url">
                  <text>{{ menu.name }}</text>
                </navigator>
              </view>
            </swiper-item>

          </swiper>
        </view>
        <view style="width: 100%;height: 1px;background: rgba(229,229,229,1);"></view>
        <view class="news-list">
            <block v-for="(news, index) in newsList">
              <news-item :cover="news.cover" :title="news.title" 
                        :publish_time="news.publish_time" :visits="news.visits"
                        :likes="news.likes" :shares="news.shares"/>
            </block>
        </view>
      </view>
    </view>
  </scroll-view>

</template>

<script>
// import { mapState } from "vuex";

import uniNavBar from "@/components/uni-nav-bar.vue";

import uniIcon from "@/components/uni-icon.vue";

import RecommendedFocusItem from "@/components/home/recommended-focus-item.vue";
import NewsItem from "@/components/home/news-item.vue";

import SearchBar from "@/components/search-bar.vue";

export default {
  components: {
    uniNavBar,
    uniIcon,
    RecommendedFocusItem,
    NewsItem,
    SearchBar,
  },

  data() {
		return {
			swiper: {
			  indicatorDots: true,
			  autoplay: true,
			  interval: 2000,
			  duration: 500
			},
			imgList: [
			  { 
			    item1: {
			      img: "/static/img/home/pic_1.png", 
			      link: "#"
			    }, 
			    item2: {
			      img: "/static/img/home/pic_2.png",
			      link: "#"
			    } 
			  }
      ],
      suggestionList: [
        {title: "测试标题", link: "#", img: "/static/img/home/pic_1.png", views: 0, shares: 0},
        {title: "测试标题2", link: "#", img: "/static/img/home/pic_2.png", views: 0, shares: 0}
      ],
      menus: [
        {name: "焦点咨询", url: "#"},
        {name: "社会", url: "#"},
        {name: "国际", url: "#"},
        {name: "娱乐", url: "#"},
        {name: "体育", url: "#"},
        {name: "科学", url: "#"}
      ],
      newsList: [
        {title: "世界记忆大师教你快速提升记忆力", cover: "/static/img/home/pic_1.png", publish_time: "2019-01-01", visits: 0, likes: 0, shares: 0},
        {title: "世界记忆大师教你快速提升记忆力", cover: "/static/img/home/pic_1.png", publish_time: "2019-01-01", visits: 0, likes: 0, shares: 0},
        
      ]
		}
  },
  computed: {},

  onShow() {},

  onLoad() {},

  methods: {
    doSearch (data) {
      console.log('doSearch: ', data);
    }
  }
};
</script>

<style lang="less">
.scroll-view {
  width: 100%;
  height: 100%;

}
.content {
  position: absolute;
  left: 0;
  top: 0;

  display: block;
  // flex-flow: row nowrap;
  // justify-content: center;
  text-align: center;

  width: 100%;
  height: 100%;

  background-color: #F2F2F2;

  .top-panel {
    position: relative;
    left: 0;
    top: 0;
    display: flex;
    flex-flow: column nowrap;
    justify-content: top;
    align-items: center;

    width: 750upx;
    height: 480upx;
    background-position: center;

    background-size: 100% 100%;

    .top-panel-bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }

    .buttons {
      position: absolute;
      left: 0;
      bottom: 66.667upx;
      width: 100%;
      height: 56.94444upx;
      line-height: 56.944upx;

      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;

      color: #fff;
      font-size: 25upx;

      .button {
        width:150upx;
        height:56.944upx;
        background:rgba(0,0,0,1);
        opacity:0.2;
        border-radius:18.889upx;

        color: inherit;
        font-size: inherit;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;

        image {
          width: 40.278upx;
          height: 34.722upx;
          line-height: 1;
          margin-right: 10upx;
          
        }
      }
    }

    .search-bar-container {
      position: absolute;
      left: 50%;
      top: 53upx;
      transform: translateX(-50%);

      display: block;
      width: 549upx;
      height: 49upx;
      border-radius:24upx;

      overflow: hidden;
    }

  }

  .swiper-banners {
    position: relative;
    width: 694.444upx;
    height: 309.722upx;
    margin: 0 auto;
    margin-top: -30px;

    background: #fff;
    border-radius: 41.667upx 41.667upx 0px 0px;

    .swiper-item {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;

      .banner {
        width: 336.806upx;
        height: 208.333upx;

        .banner-img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .the-focus-sugguestions {
    display: block;
    width: 100%;
    height: auto;
    box-sizing: border-box;
    margin-top: 10.417upx;
    background-color: #fff;

    .header {
      display: flex;
      width: 100%;
      height: 69.444upx;
      box-sizing: border-box;
      margin: 0;
      padding: 0 27.778upx;

      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      
      font-size: 33.333upx;
      font-weight: 400;
      color: rgba(51,51,51,1);
      line-height: 25upx;

      .title {
        border-left: 8.333upx solid #c73441;
        padding-left: 12.5upx;
        font-size: inherit;
        color: inherit;
        line-height: inherit;
        font-weight: inherit;
      }


    }

    .body {
      width: 100%;
      height: auto;
      .suggestion-swiper-item {
        width: 305.556upx !important;
        height: auto;
        line-height: 1;
        // margin-left: 27.778upx;
        padding-left: 27.778upx;
      }
    }
  }

  .the-focus-list {
    margin-top: 10.417upx !important;
    background-color: #fff;

    .menu-navigator {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 97.917upx;
      line-height: 97.917upx;
      box-sizing: border-box;

      .menu-swiper {
        width: 100%;
        height: 100%;
        line-height: inherit;

        .swiper-menu-item {
          width: 130upx !important;
          height: 100%;
          line-height: inherit;
          box-sizing: border-box;

          .menu {
            line-height: inherit;

            width: auto !important;
            height: 100%;
            font-size: 29.167upx;
            color: #666;
            box-sizing: border-box;

            &.activate {
              font-size: 26.389upx;
              font-weight: bold;
              color: #333;
              border-bottom: 6.944upx solid #E03C45;
            }
          }
        }
      }
    }

    .news-list {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
