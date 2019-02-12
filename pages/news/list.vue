<template>
  <view class="uni-page-body uni-bg-white">
    <scroll-view scroll-x="true" :scroll-left="scrollLeft" class="uni-swiper-tab news-channels">
      <view v-for="(item,index) in channels" :key="index" :class="['swiper-tab-list' , currentIndex == index ? 'active' : '']"
        @tap="tapChannel(item,index)">{{item.name}}</view>
    </scroll-view>
    <view class="uni-common-pa uni-center" :style="{display: refreshDisplay}" >
    	加载中...
    </view>
    <swiper :indicator-dots="false" :autoplay="false" :interval="3000" :duration="1000" :current="currentIndex" class="swiper-box"
      @change="changeTab" :style="{height:swiperHeight}">
      <swiper-item v-for="(item,index) in channels" :key="index">
        <view class="swiper-item news-swiper-item">

          <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="refresh(item)"
            @scrolltolower="loadMore(item)" :style="{height:swiperHeight}" v-if="newsItems[item.id] && newsItems[item.id].count" @scroll="scroll">

            <view class="uni-bg-white uni-common-pl uni-common-pr" v-for="(news,index2) in newsItems[item.id].list"
              :key="index2">

              <view class="uni-common-pt uni-common-pb uni-border-bottom" @tap="goToDetail(news)">
                <view class="uni-flex">
                  <view class="uni-flex-item" v-for="(img,index3) in news.imgs" :key="index3" v-if="index3 < 3">
                    <image :src="img.url" mode="scaleToFill" style="width: 200upx;height: 160upx;"></image>
                  </view>
                </view>
                <view class="uni-bold">
                  {{news.title}}
                </view>
                <view class="uni-common-pt-sm uni-text-gray uni-flex">
                	<view class="" style="width: 36upx;height: 36upx;padding-top: 6upx;">
                    <image src="/static/icon/posts/eye.png" mode="" style="width: 36upx;height: 36upx;"></image>  
                  </view>
                  <view class="uni-flex-item uni-common-ml-sm">
                    <text >{{news.views}}</text> 
                  </view>
                  <view class="" style="width: 36upx;height: 36upx;padding-top: 6upx;">
                    <image src="/static/icon/posts/zan.png" mode="" style="width: 36upx;height: 36upx;display: inline-block;"></image> 
                   </view>
                  <view class="uni-flex-item uni-common-ml-sm">
                  	<text>{{news.likes}}</text> 
                  </view>
                  <view class="" style="width: 36upx;height: 36upx;padding-top: 6upx;">
                    <image src="/static/icon/posts/share.png" mode="" style="width: 36upx;height: 36upx;display: inline-block;"></image> 
                   </view>
                  <view class="uni-flex-item uni-common-ml-sm">
                  	<text>{{news.shares}}</text> 
                  </view>
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
      </swiper-item>
    </swiper>

    <view class="uni-center uni-common-pt">
      {{loadMoreText}}
    </view>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex';
  export default {
    data() {
      return {
        channels: [{
          id: 'all',
          name: '全部'
        }],
        currentIndex: 0,
        scrollTop: 0,
        scrollLeft: 0,
        swiperHeight: 0,
        newsItems: {},
        loadMoreText: '',
        refreshDisplay:'none'
      }

    },
    computed: {
      ...mapState(['postChannels', 'newsDatas'])
    },
    async onLoad(opt) {
      let channel = opt.channel || 'all'
      this.newsItems = this.newsDatas
      
      if(!this.postChannels.length){
        await this.$store.dispatch('postChannelsGet' , {type : 1})
      }
      
      for (var i = 0; i < this.postChannels.length; i++) {
      	let item = this.postChannels[i]
        
        this.channels.push({
          id: item,
          name: item
        })
        if (item == channel) {
          this.currentIndex = i + 1
        }
        
      }

      if(!this.newsItems[channel] || !this.newsItems[channel].list || !this.newsItems[channel].list.length){
        let item = this.channels[this.currentIndex]
        
        this.refreshDisplay = 'block'
        // uni.startPullDownRefresh()
        let ret = await this.getNewsData(item , true)
        
        setTimeout(() => {
          this.refreshDisplay = 'none'
          // uni.stopPullDownRefresh()
        } , 500)
      }
      
      console.log(this.newsItems , true)

    },
    async onReady() {
      let view = uni.createSelectorQuery().select(".uni-page-body");
      view.fields({
        size: true,
        scrollOffset: true
      }, data => {
        console.log("得到节点信息" + JSON.stringify(data));
        console.log("节点的宽为" + data.width);

        this.swiperHeight = (data.height - 100) + 'px';
      }).exec();

    },
    methods: {
      async tapChannel(item, index) {
        this.currentIndex = index
        
        // this.getNewsData(item)
        let channel = item.id
        
        console.log('tapChannel' , channel)
        if(!this.newsItems[channel] || !this.newsItems[channel].list || !this.newsItems[channel].list.length){
          let item = this.channels[this.currentIndex]
          
          this.refreshDisplay = 'block'
          let ret = await this.getNewsData(item , true)
          
          setTimeout(() => {
            this.refreshDisplay = 'none'
          } , 500)
        }
      },
      changeTab(e) {
        let index = e.detail.current;
        this.currentIndex = index;
        if(index >= 5){
          this.scrollLeft = 75 * index
        }else {
          this.scrollLeft = 0
        }
        
      },
      goToDetail(item) {
        uni.navigateTo({
          url: '/pages/posts/detail?id=' + item.id
        })
      },
      async refresh(item) {
        console.log('refresh' , item.id)
        let newsData = this.newsItems[item.id] || {}
        let timestamp = newsData.timestamp || 0
        let now = parseInt(Date.now() / 1000)
        if(timestamp && (now - timestamp) < 15 * 60){
          console.log('refresh stop')
          return
        }
        
        this.refreshDisplay = 'block'
        let ret = await this.getNewsData(item , true)
        
        setTimeout(() => {
          this.refreshDisplay = 'none'
        } , 500)
      },
      async getNewsData(item , refresh = false) {
        let channel = item.id
        let now = parseInt(Date.now() / 1000)
        console.log('channel', channel)
        let newsData = this.newsItems[channel]
        let params = {}
        if(!newsData){
          this.newsItems[channel] = {}
          this.newsItems[channel].list = []
        }
        
        if(newsData && newsData.list.length){
          params.page = newsData.page + 1
          params.channel = channel
          params.timestamp = newsData.timestamp

        }else {

          params.page = 1
          params.channel = channel
          params.timestamp = now
          
        }
        
        if(refresh){
       
          // 刷新
          params.page = 1
          params.channel = channel
          params.timestamp = now
          
          this.newsItems[channel].list = []
        }

        console.log('params' , params)
        let ret = await this.$store.dispatch('postListGet', params)
        if (ret.code == 0) {
          let data = ret.data
          let rows = data.rows

          this.newsItems[channel].count = data.count
          this.newsItems[channel].page = data.page
          this.newsItems[channel].timestamp = data.timestamp

          for (var i = 0; i < rows.length; i++) {
            this.newsItems[channel].list.push(rows[i])
          }

        }

        return ret
      },
      async loadMore(item) {
        console.log('load more ...')
        this.loadMoreText = '加载更多...'

        let ret = await this.getNewsData(item)

        if (ret.data.rows.length == 0) {
          this.loadMoreText = '无更多'

          setTimeout(() => {
            this.loadMoreText = ''
          }, 3000)
        } else {
          this.loadMoreText = ''
        }


      },
      scroll(e){
        // console.log(e.detail.scrollTop)
      }
    }
  }
</script>

<style lang="scss">
  .news-channels {
    //     position: fixed;
    //     background: #fff;
    //     z-index: 100;
  }

  .swiper-tab-list.active {
    color: #d81e06;
  }

  .swiper-box {
    // padding-top: 100upx;
    // height: 655upx;
  }

  .news-swiper {
    display: block;
    height: 100%;

    .news-swiper-item {
      height: 100%;
    }
  }

  .scroll-Y {

    // height: 600px;
    .scroll-view-item {
      height: 600px;
    }
  }
</style>
