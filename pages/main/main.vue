<template>
  <view class="uni-page-body">
    
    <uni-nav-bar color="#333333" background-color="transparent" fixed="true" >
       <block slot="left">
      	
      </block>
  
      <view class="input-search-view uni-flex" style="border-radius: 30upx;background: #FFFFFF;opacity: 0.5;" @tap="goSearch">
        <uni-icon type="search" size="22" color="#666666"></uni-icon>
        <input confirm-type="搜索" @confirm="confirm" class="input uni-flex-item" type="text" placeholder="输入搜索关键词" />
      </view>
      <block slot="right">
        <view class="uni-common-pr">
        	<uni-icon type="chat" size="22" color="#ffffff"></uni-icon>
        </view>
      </block>
    </uni-nav-bar >
      
    <view class="content">
      <!-- 顶部的大背景 -->
      <view class="top-panel">
        <!-- <image lazy-load="true" class="top-panel-bg" src="../../static/img/home/banner-bg.png" /> -->
        <view class="swiper-banners" style="background: url('/static/img/home/banner-bg.png');background-size: 750upx;height: 568upx;background-repeat: no-repeat;">

          <swiper class="swiper" :indicator-dots="swiper.indicatorDots" :autoplay="swiper.autoplay" :interval="swiper.interval"
            :duration="0" circular="false">
            <swiper-item>
              <view class="swiper-item" style="text-align: center;">
                
                <view class="uni-bg-red uni-inline-block" style="width: 320upx;height: 320upx;border-radius: 160upx;margin-top: 152upx;overflow: hidden;">
                	<image src="../../static/img/home/pic_1.png" mode="scaleToFill" style="width: 320upx;height: 320upx;border-radius: 160upx;"></image>
                </view>
      
              </view>
            </swiper-item>
            
            <swiper-item>
              <view class="swiper-item" style="text-align: center;">
                
                <view class="uni-bg-red uni-inline-block" style="width: 320upx;height: 320upx;border-radius: 160upx;margin-top: 152upx;overflow: hidden;">
                	<image src="../../static/img/home/pic_2.png" mode="scaleToFill" style="width: 320upx;height: 320upx;border-radius: 160upx;"></image>
                </view>
                  
              </view>
            </swiper-item>
            
          </swiper>

        </view>

        <!-- <view class="search-bar-container" @tap="goSearch">
          <search-bar />
        </view> -->
        
        <view class="buttons">
          <view class="button checkout" @tap="goDailySign">
            <image lazy-load="true" src="/static/icon/home/icon_checkout.png" />
            <text>签到</text>
          </view>
          <view class="button view-points" @tap="goBannerHref">
            <image lazy-load="true" src="/static/icon/home/icon_pig.png" />
            <text>查看</text>
          </view>
        </view>
      </view>

      <view class="uni-bg-white uni-common-pa uni-flex">
        <view class="uni-flex-item uni-left">
          <navigator :url="configs.main_sub_url_1">
            <image lazy-load="true" :src="configs.main_sub_img_1" mode="" style="width: 324upx;height:200upx ;"></image>
          </navigator>
        </view>
        <view class="uni-flex-item uni-right">
          <navigator :url="configs.main_sub_url_2">
            <image lazy-load="true" :src="configs.main_sub_img_2" mode="" style="width: 324upx;height:200upx ;"></image>
          </navigator>
        </view>
      </view>

      <!-- 焦点推荐 -->
      <view class="the-focus-sugguestions">
        <view class="header">
          <text class="title">焦点推荐</text>
          <navigator url="/pages/posts/recommend"><text class="uni-text-small">更多</text></navigator>
        </view>
        <view class="body">
          <swiper>
            <swiper-item class="suggestion-swiper-item" v-for="(item,index) in recommendList" :key="index" v-if="index < 10">
              <view class="" @tap="goToDetail(item)">
                <image lazy-load="true" :src="item.cover" mode="scaleToFill" style="width: 280upx;height: 210upx;"></image>
                <view class="uni-ellipsis uni-bold">
                  {{item.title}}
                </view>
              </view>
            </swiper-item>
          </swiper>
        </view>
      </view>

      <!-- 焦点咨询列表 -->
      <view class="the-focus-list">
        <view class="menu-navigator">
          <swiper class="menu-swiper">
            <!-- 定义菜单 -->
            <swiper-item v-for="(menu, index) in menus" class="swiper-menu-item" :key="index" @tap="goToPage(menu,index)">
              <view class="menu" :class="index === 0 ? 'activate' : ''">
                <view class="menu">
                  <text>{{ menu.name }}</text>
                </view>
              </view>
            </swiper-item>

          </swiper>
        </view>
        <!-- <view style="width: 100%;height: 1px;background: rgba(229,229,229,1);"></view> -->
        <view class="">
          <block v-for="(news, index) in newsList" :key="index" v-if="index < 10">
            <!-- <news-item :cover="news.cover" :title="news.title" 
                        :publish_time="news.publish_time" :visits="news.visits"
                        :likes="news.likes" :shares="news.shares"/> -->
            <view class="uni-flex uni-border-top uni-bg-white uni-common-pa uni-left" @tap="goToDetail(news)">
              <view class="">
                <image lazy-load="true" :src="news.cover" mode="scaleToFill" style="width: 280upx;height: 210upx;"></image>
              </view>
              <view class="uni-flex-item uni-common-pl">
                <view class="uni-ellipsis-2 uni-left uni-bold" style="height: 80upx;">
                  {{news.title}}
                </view>
                <view class="uni-common-pt uni-text-gray uni-text-small">
                  {{ news.publish_time}}
                </view>
                <view class="uni-common-pt-sm uni-text-gray uni-flex">
                  <view class="" style="width: 36upx;height: 36upx;padding-top: 6upx;">
                    <image lazy-load="true" src="/static/icon/posts/eye.png" mode="" style="width: 36upx;height: 36upx;"></image>
                  </view>
                  <view class="uni-flex-item uni-common-ml-sm">
                    <text>{{news.views}}</text>
                  </view>
                  <view class="" style="width: 36upx;height: 36upx;padding-top: 6upx;">
                    <image lazy-load="true" src="/static/icon/posts/zan.png" mode="" style="width: 36upx;height: 36upx;display: inline-block;"></image>
                  </view>
                  <view class="uni-flex-item uni-common-ml-sm">
                    <text>{{news.likes}}</text>
                  </view>
                  <view class="" style="width: 36upx;height: 36upx;padding-top: 6upx;">
                    <image lazy-load="true" src="/static/icon/posts/share.png" mode="" style="width: 36upx;height: 36upx;display: inline-block;"></image>
                  </view>
                  <view class="uni-flex-item uni-common-ml-sm">

                    <text>{{news.shares}}</text>
                  </view>
                </view>
              </view>
            </view>
          </block>

          <view class="uni-border-top uni-bg-white uni-common-pa ">
            <navigator url="/pages/news/list">查看更多</navigator>
          </view>
        </view>
      </view>
    </view>
  </view>

</template>

<script>
  import {
    mapState
  } from "vuex";

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
          interval: 3000,
          duration: 500
        },
        imgList: [{
          item1: {
            img: "/static/img/home/banner-bg.png",
            link: "#"
          },
          item2: {
            img: "/static/img/home/pic_2.png",
            link: "#"
          }
        }],
        //       suggestionList: [
        //         {title: "测试标题", link: "#", img: "/static/img/home/pic_1.png", views: 0, shares: 0},
        //         {title: "测试标题2", link: "#", img: "/static/img/home/pic_2.png", views: 0, shares: 0},
        //         {title: "测试标题2", link: "#", img: "/static/img/home/pic_2.png", views: 0, shares: 0}
        //       ],
        recommendList: [],
        newsList: [],
        menus: [{
          name: "焦点资讯",
          url: "/pages/posts/list"
        }]
      }
    },
    computed: {
      ...mapState(['hasLogin', 'userInfo','mainSearchText', 'postChannels', 'newsDatas', 'recommendDatas', 'configs'])
    },

    onShow() {},

    async onLoad() {
      // 获取配置
      let configs = this.configs
      if (Object.keys(configs).length == 0) {
        this.$store.dispatch('getConfigs')
      }

      let channelRet = await this.$store.dispatch('postChannelsGet', {
        type: 1
      })
      if (channelRet.code == 0) {
        let channels = this.postChannels
        console.log('onLoad', channels)
        channels.forEach(channel => {
          this.menus.push({
            name: channel,
            url: '/pages/news/list'
          })
        })
      }

      // 获取数据,焦点资讯
      let postsAllDatas = this.$store.state.newsDatas.all || {}
      let params = {}
      if (!postsAllDatas.list || postsAllDatas.list.length <= 0) {
        params.page = 1
        params.type = 1
        params.channel = 'all'
        params.timestamp = parseInt(Date.now() / 100)
      } else {
        params.page = postsAllDatas.page
        params.type = 1
        params.channel = 'all'
        params.timestamp = postsAllDatas.timestamp
      }

      let ret = await this.$store.dispatch('postListGet', params)
      if (ret.code == 0) {
        this.$store.state.newsDatas.all = {
          page: ret.data.page,
          list: ret.data.rows,
          count: ret.data.count,
          newCount: ret.data.newCount,
          timestamp: ret.data.timestamp
        }
      }
      this.newsList = this.newsDatas.all.list

      // 获取数据，焦点推荐
      let recommendDatas = this.$store.state.recommendDatas
      params = {}
      params.page = this.recommendDatas.page || 1
      params.recommend = 1
      params.timestamp = this.recommendDatas.timestamp || parseInt(Date.now() / 100)

      let retR = await this.$store.dispatch('postListGet', params)
      console.log('retR===============', retR)
      if (retR.code == 0) {
        this.$store.state.recommendDatas = {
          page: retR.data.page + 1,
          list: retR.data.rows,
          count: retR.data.count,
          newCount: retR.data.newCount,
          timestamp: retR.data.timestamp
        }
      }
      this.recommendList = this.recommendDatas.list

      // 检查登录状态
      let token = uni.getStorageSync('user_auth_token')
      if (token && !this.hasLogin) {
        console.log('获取用户信息')
        await this.$store.dispatch('userInfoGet')
        if (this.userInfo.id) {
          this.$store.state.hasLogin = true
        }
      }

    },
    methods: {
      goToPage(item, index) {
        if (index > 0) {
          uni.navigateTo({
            url: item.url + '?channel=' + item.name
          })
        }
      },
      goToDetail(news) {
        uni.navigateTo({
          url: '/pages/posts/detail?id=' + news.id
        })
      },
      goDailySign(){
        uni.navigateTo({
        	url:'/pages/user/dailySign'
        })
      },
      goBannerHref(page){
        uni.navigateTo({
        	url:page
        })
      },
      goSearch(){
        uni.navigateTo({
        	url:'/pages/main/search'
        })
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
      height: 568upx;
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
        bottom: 60upx;
        width: 100%;
        height: 60upx;
        line-height: 60upx;

        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;

        color: #fff;
        font-size: 25upx;

        .button {
          width: 150upx;
          height: 60upx;
          background: rgba(0, 0, 0, 1);
          opacity: 0.2;
          border-radius: 20upx;

          color: inherit;
          font-size: inherit;
          display: flex;
          flex-flow: row nowrap;
          justify-content: center;
          align-items: center;

          image {
            width: 40upx;
            height: 34upx;
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
        border-radius: 24upx;

        overflow: hidden;
      }

    }

    .swiper-banners {
      position: relative;
      width: 750upx;
      height: 568upx;
      margin: 0 auto;

      .swiper {
        height: 568upx;
      }

      // margin-top: -30px;

      // background: #fff;
      // border-radius: 41.667upx 41.667upx 0px 0px;

      .swiper-item {
        height: 568upx;
        //       display: flex;
        //       flex-flow: row nowrap;
        //       justify-content: space-between;
        //       align-items: center;
        // 
        //       .banner {
        //         width: 336.806upx;
        //         height: 208.333upx;
        // 
        //         .banner-img {
        //           width: 100%;
        //           height: 100%;
        //         }
        //       }
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
        height: 80upx;
        box-sizing: border-box;
        margin: 0;
        padding: 0 27.778upx;

        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;

        font-size: 33.333upx;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
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

      //     .news-list {
      //       display: flex;
      //       flex-flow: column nowrap;
      //       justify-content: center;
      //       align-items: center;
      //     }
    }
  }
</style>
