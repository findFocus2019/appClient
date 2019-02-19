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
        <view class="uni-common-pr" @tap="goNotice">
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
            :duration="0" circular="false" :current="bannerIndex">
            <swiper-item v-for="(banner,index) in banners" :key="index" @tap="bannerTap(banner)">
              <view class="swiper-item" style="text-align: center;">
                
                <view class="uni-bg-red uni-inline-block" style="width: 320upx;height: 320upx;border-radius: 160upx;margin-top: 152upx;overflow: hidden;">
                	<image lazy-load="true" :src="banner.img" mode="scaleToFill" style="width: 320upx;height: 320upx;border-radius: 160upx;"></image>
                </view>
      
              </view>
            </swiper-item>
                       
          </swiper>

        </view>
        
        <view class="buttons">
          <view class="button checkout left" @tap="goDailySign">
            <image lazy-load="true" src="/static/icon/home/icon_checkout.png" />
            <text class="uni-text-white">签到</text>
          </view>
          <view class="button view-points right" @tap="goUserCenter">
            <image lazy-load="true" src="/static/icon/home/icon_pig.png" />
            <text>查看</text>
          </view>
        </view>
      </view>

      <view class="uni-bg-white uni-common-pa uni-flex">
        <view class="uni-flex-item uni-left" style="height:200upx;">
          <navigator :url="configs.main_sub_url_1">
            <image lazy-load="true" :src="configs.main_sub_img_1" mode="" style="width: 320upx;height:200upx;"></image>
          </navigator>
        </view>
        <view class="uni-flex-item uni-right" style="height:200upx;">
          <navigator :url="configs.main_sub_url_2">
            <image lazy-load="true" :src="configs.main_sub_img_2" mode="" style="width: 320upx;height:200upx;"></image>
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
          <swiper autoplay="true" interval="3000" duration="1000" circular="true" style="height: 280upx;">
            <swiper-item class="suggestion-swiper-item" v-for="(item,index) in recommendList" :key="index" v-if="index < 10">
              <view class="" @tap="goToDetail(item)">
								<view class="post-list-cover-xl">
									<image lazy-load="true" :src="item.cover" mode="scaleToFill" class="post-list-cover-xl"></image>
								</view>
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
            <swiper-item v-for="(menu, index) in menus" class="swiper-menu-item" :key="index" @tap="changeNewsChannel(menu,index)">
              <view class="menu" :class="menu.id === newsCurrentchannel ? 'activate' : ''">
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

            <view class="uni-flex uni-border-top uni-bg-white uni-common-pa uni-left" @tap="goToDetail(news)">
              <view class="post-list-cover">
                <image lazy-load="true" :src="news.cover" mode="scaleToFill" class="post-list-cover"></image>
              </view>
              <view class="uni-flex-item uni-common-pl post-list-content">
                <view class="uni-ellipsis-2 uni-left uni-bold title" >
                  {{news.title}}
                </view>
                <view class="uni-text-gray uni-text-small time" >
                  {{ news.publish_time}}
                </view>
                <view class="uni-text-gray uni-flex icon-items">
                  <view class="icon-img">
                    <image lazy-load="true" src="/static/icon/posts/eye.png" mode="" class="icon-img"></image>
                  </view>
                  <view class="uni-flex-item">
                    <text>{{news.views}}</text>
                  </view>
                  <view class="icon-img">
                    <image lazy-load="true" src="/static/icon/posts/zan.png" mode="" class="icon-img"></image>
                  </view>
                  <view class="uni-flex-item ">
                    <text>{{news.likes}}</text>
                  </view>
                  <view class="icon-img">
                    <image lazy-load="true" src="/static/icon/posts/share.png" mode="" class="icon-img"></image>
                  </view>
                  <view class="uni-flex-item ">
                    <text>{{news.shares}}</text>
                  </view>
                </view>
              </view>
            </view>
          </block>

          <view class="uni-border-top uni-bg-white uni-common-pa" v-if="newsCount > 10" @tap="goToMore">
            查看更多
          </view>
          
          <view class="uni-bg-white uni-common-pa ">
          	
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

  export default {
    components: {
      uniNavBar,
      uniIcon
    },

    data() {
      return {
        swiper: {
          indicatorDots: true,
          autoplay: true,
          interval: 3000,
          duration: 500
        },
				banners:[],
				bannerIndex:0,
        imgList: [],
        recommendList: [],
        newsList: [],
        newsCount:0,
        newsItems:{},
        newsCurrentchannel:'all',
        menus: [{
          "id":"all",
          name: "焦点资讯",
          url: "/pages/posts/list"
        }],
        
      }
    },
    computed: {
      ...mapState(['hasLogin', 'userInfo','mainSearchText', 'postChannels', 'newsDatas', 'recommendDatas', 'configs'])
    },
    onShow() {
      console.log('onShow ================')
    },

    async onLoad() {
      console.log('onLoad ======================')
      
      // 获取配置
      let configs = this.configs
      if (Object.keys(configs).length == 0) {
        this.$store.dispatch('getConfigs')
      }
			
			await this.getAlbums()
      
      // 获取新闻频道
      let channelRet = await this.$store.dispatch('postChannelsGet', {
        type: 1
      })
      if (channelRet.code == 0) {
        
        let channels = this.postChannels
        console.log('onLoad', channels)
        channels.forEach(channel => {
          this.menus.push({
            id:channel,
            name: channel,
            url: '/pages/news/list'
          })
        })
      }

      // 获取数据,焦点资讯
      this.newsItems = this.newsDatas
      
      let channel = this.newsCurrentchannel
      let newsListRet = await this.getNewsList(channel , 0)
      if(newsListRet.code == 0){
        let data = newsListRet.data
        
        this.newsItems[channel] = {}
        this.newsItems[channel].count = data.count
        this.newsItems[channel].page = data.page + 1
        this.newsItems[channel].timestamp = data.timestamp
        this.newsItems[channel].list = data.rows
        
        this.newsList = data.rows
        this.newsCount = data.count
      }

      // 获取数据，焦点推荐
      let recommendListRet = await this.getNewsList('' , 1)
      console.log('recommendListRet===============', recommendListRet)
      if (recommendListRet.code == 0) {
        let data = recommendListRet.data
        console.log('recommendListRet===============', data.timestamp)
        this.recommendDatas.list = data.rows
        this.recommendDatas.page = data.page + 1
        this.recommendDatas.count = data.count
        this.recommendDatas.timestamp = data.timestamp
        
        this.recommendList = data.rows
      }
 
    },
    methods: {
			goNotice(){
				uni.navigateTo({
				  url: '/pages/notice/notice'
				})
			},
      goToPage(item, index) {
        if (index > 0) {
          uni.navigateTo({
            url: item.url + '?channel=' + item.name
          })
        }
      },
      goToMore(){
        uni.navigateTo({
          url: '/pages/news/list?channel=' + this.newsCurrentchannel
        })
      },
      goToDetail(news) {
        uni.navigateTo({
          url: '/pages/posts/detail?id=' + news.id
        })
      },
      goDailySign(){
        if(!this.hasLogin){
          uni.navigateTo({
          	url:'/pages/auth/login'
          })
          return
        }
        uni.navigateTo({
        	url:'/pages/user/dailySign'
        })
      },
      goBannerHref(){
				let bannerIndex = this.bannerIndex
				let banner = this.banners[bannerIndex] || {}
				
				this.bannerTap(banner)
      },
			goUserCenter(){
				uni.switchTab({
					url:'/pages/user/index'
				})
			},
      goSearch(){
        uni.navigateTo({
        	url:'/pages/main/search'
        })
      },
			bannerTap(banner){
				if(banner.url){
					uni.navigateTo({
						url:banner.url,
						fail: () => {
							console.log('fail')
							uni.switchTab({
								url:banner.url
							})
						}
					})
				}
			},
      async changeNewsChannel(menu,index){
        this.newsCurrentchannel = menu.id
        let channel = this.newsCurrentchannel
        
        let newsData = this.newsItems[channel]
        if(!newsData){
          let newsListRet = await this.getNewsList(channel , 0)
          if(newsListRet.code == 0){
            let data = newsListRet.data
            
            this.newsItems[channel] = {}
            this.newsItems[channel].count = data.count
            this.newsItems[channel].page = data.page + 1
            this.newsItems[channel].timestamp = data.timestamp
            this.newsItems[channel].list = data.rows
            
            this.newsList = data.rows
            this.newsCount = data.count
          }
        }else {
          this.newsList = newsData.list || []
          this.newsCount = newsData.count || 0
        }
      },
      async getNewsList(channel = '', recommend = 0){
        console.log('channel', channel)
        let now = parseInt(Date.now() / 1000)
        if(channel){
          let newsData = this.newsItems[channel]
          if(!newsData){
            this.newsItems[channel] = {}
            this.newsItems[channel].list = []
          }    
        }
        
        let params = {}
  
        params.page = 1
        params.timestamp = now
        
        if(channel){
          params.channel = channel
          params.type = 1
        }

        if(recommend){
          params.recommend = 1
        }
      
        console.log('params' , params)
        let ret = await this.$store.dispatch('postListGet', params)
        return ret
        
      },
			async getAlbums(){
				let albumsRet = await this.$store.dispatch('getAlbums' , {type: 'banner'})
				if(albumsRet.code == 0){
					let rows = albumsRet.data.rows || []
					rows.forEach(row => {
						this.banners.push({
							img: row.img,
							url: row.url
						})
					})
				}
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
          background: rgba(0, 0, 0, 0.5);

          color: #fff;
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
        
        .button.left {
          border-radius: 0 20upx 20upx 0;
        }
        
        .button.right {
          border-radius: 20upx 0 0 20upx;
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

      .swiper-item {
        height: 568upx;
      }
    }

    .the-focus-sugguestions {
      display: block;
      width: 100%;
      height: auto;
      box-sizing: border-box;
      margin-top: 20upx;
      background-color: #fff;

      .header {
        display: flex;
        width: 100%;
        height: 100upx;
        box-sizing: border-box;
        margin: 0;
        padding: 0 30upx;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        font-size: 32upx;
        line-height: 40upx;

        .title {
          border-left: 8upx solid #c73441;
          padding-left: 12upx;
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
          width: 300upx !important;
          height: auto;
          line-height: 1;
          padding-left: 30upx;
        }
      }
    }

    .the-focus-list {
      margin-top: 20upx !important;
      background-color: #fff;

      .menu-navigator {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100upx;
        line-height: 100upx;
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
              font-size: 30upx;
              color: #666;
              box-sizing: border-box;

              &.activate {
                font-size: 26upx;
                font-weight: bold;
                color: #333;
                border-bottom: 6upx solid #E03C45;
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
