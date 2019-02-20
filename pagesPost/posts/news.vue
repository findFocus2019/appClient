<template>
  <view class="uni-page-body uni-bg-white uni-border-top">
    <scroll-view scroll-x="true" :scroll-left="scrollLeft" class="uni-swiper-tab news-channels">
      <view v-for="(item,index) in channels" :key="index" :class="['swiper-tab-list' , currentIndex == index ? 'active' : '']"
        @tap="tapChannel(item,index)">{{item.name}}</view>
    </scroll-view>
    <view class="uni-common-pa uni-center" :style="{display: refreshDisplay}" >
    	加载中...
    </view>
    <swiper :indicator-dots="false" :autoplay="false" :interval="3000" :duration="500" :current="currentIndex" class="swiper-box"
      @change="changeTab" :style="{height:swiperHeight}">
      <swiper-item v-for="(item,index) in channels" :key="index">
        <view class="swiper-item news-swiper-item">

          <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="refresh(item)"
            @scrolltolower="loadMore(item)" :style="{height:swiperHeight}" v-if="newsItems[item.id] && newsItems[item.id].count">

            <view class="uni-bg-white uni-common-pl uni-common-pr" v-for="(news,index2) in newsItems[item.id].list"
              :key="index2">

              <view class="uni-common-pt uni-common-pb uni-border-bottom" @tap="goToDetail(news)">
                <view class="uni-flex">
                  <view class="uni-common-mr" v-for="(img,index3) in news.imgs" :key="index3" v-if="index3 < 3" >
                    <image lazy-load="true"  :src="img.url" mode="scaleToFill" class="post-list-cover-inline"></image>
                  </view>
                </view>
								<view class="post-list-content-inline">
									
									<view class="uni-bold title">
									  {{news.title}}
									</view>
									
									<view class="uni-text-gray uni-flex icon-items">
										<view class="icon-img">
										  <image lazy-load="true" src="/static/icon/posts/eye.png" mode="" class="icon-img"></image>
										</view>
										<view class="uni-flex-item ">
										  <text>{{news.views}}</text>
										</view>
										<view class="icon-img">
										  <image lazy-load="true" src="/static/icon/posts/zan.png" mode="" class="icon-img"></image>
										</view>
										<view class="uni-flex-item">
										  <text>{{news.likes}}</text>
										</view>
										<view class="icon-img">
										  <image lazy-load="true" src="/static/icon/posts/share.png" mode="" class="icon-img"></image>
										</view>
										<view class="uni-flex-item">
										  <text>{{news.shares}}</text>
										</view>
									</view>
								</view>
                
                
              </view>
            </view>
          </scroll-view>
        </view>
      </swiper-item>

    </swiper>

    <view class="uni-center uni-common-pa" v-if="showLoadMore">
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
				showLoadMore:false,
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
      
      let currentItem = {}
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
      
      if(this.currentIndex >= 5){
        this.scrollLeft = 75 * this.currentIndex
      }else {
        this.scrollLeft = 0
      }
      console.log(this.scrollLeft , 'scrollLeftscrollLeftscrollLeftscrollLeftscrollLeftscrollLeft')
      // this.tapChannel(currentItem, this.currentIndex)
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

        this.swiperHeight = (data.height - 50) + 'px';
      }).exec();

    },
    methods: {
      async getChannelData(channel){
        if(!this.newsItems[channel] || !this.newsItems[channel].list || !this.newsItems[channel].list.length){
          let item = this.channels[this.currentIndex]
          
          this.refreshDisplay = 'block'
          let ret = await this.getNewsData(item , true)
          
          setTimeout(() => {
            this.refreshDisplay = 'none'
          } , 500)
        }
      },
      async tapChannel(item, index) {
        this.currentIndex = index        
      },
      async changeTab(e) {
        console.log('changeTab' , e)
        let index = e.detail.current;
        this.currentIndex = index;
        if(index >= 5){
          this.scrollLeft = 75 * index
        }else {
          this.scrollLeft = 0
        }
				
				let item = this.channels[index]
        await this.getChannelData(item.id)
				// this.tapChannel(item, index)
        
      },
      goToDetail(item) {
        uni.navigateTo({
          url: '/pagesPost/posts/detail?id=' + item.id
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
        params.type= 1
        if(!newsData){
          this.newsItems[channel] = {}
          this.newsItems[channel].list = []
        }
        
        if(newsData && newsData.list.length){
          params.page = newsData.page
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
          this.newsItems[channel].page = data.page + 1
          this.newsItems[channel].timestamp = data.timestamp

          for (var i = 0; i < rows.length; i++) {
            this.newsItems[channel].list.push(rows[i])
          }

        }

        return ret
      },
      async loadMore(item) {
        console.log('load more ...')
				this.showLoadMore = true
        this.loadMoreText = '加载更多...'

        let ret = await this.getNewsData(item)

        if (ret.data.rows.length == 0) {
          this.loadMoreText = '无更多'

          setTimeout(() => {
						this.showLoadMore = false
            this.loadMoreText = ''
          }, 1500)
        } else {
					this.showLoadMore = false
          this.loadMoreText = ''
        }


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
