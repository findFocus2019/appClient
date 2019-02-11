<template>
	<view class="uni-page-body">
		<view class="">
      <view class="uni-bg-white uni-common-mt uni-common-pt uni-common-pb" v-for="(news,index) in newsDatas.list" :key="index" @tap="goToDetail(news)">

        <view class="uni-flex uni-common-pl uni-common-pr">
          <view class="">
          	<image :src="news.user_avatar" mode="" style="width: 60upx;height: 60upx;border-radius: 30upx;"></image>
          </view>
          <view class="uni-common-ml-sm">
          	{{news.user_nickname}}
          </view>
          <view class="uni-flex-item uni-right uni-text-gray uni-text-small">
          	{{news.publish_time}}
          </view>
        	
        </view>
        
        <view class="uni-bold uni-common-pl uni-common-pr">
        	{{news.title}}
        </view>
        
        <view class="uni-common-pl uni-common-pr">
        	<view class="uni-bg-gray uni-bg-gray uni-common-pa uni-common-mt-sm " >
        	  <view class="uni-ellipsis-2 uni-text-small uni-text-light">
        	  	{{news.description}}
        	  </view>
        	</view>
        </view>
        
        
        <view class="uni-common-mt" v-if="news.imgs.length">
        	<view class="uni-flex uni-common-pr">
        		<view class="uni-flex-item uni-common-pl"  v-for="(img,index1) in news.imgs" :key="index1" v-if="index1 < 3">
              
        			<image :src="img.url" mode="scaleToFill"  style="width: 690upx;height: 400upx;" v-if="news.imgs.length == 1"></image>  
              <image :src="img.url" mode="scaleToFill"  style="width: 330upx;height: 240upx;" v-if="news.imgs.length == 2"></image>
              <image :src="img.url" mode="scaleToFill"  style="width: 210upx;height: 160upx;" v-if="news.imgs.length >= 3"></image>
        		</view>
      
        	</view>
        </view>
        
        <view class="uni-common-mt-sm uni-text-gray uni-flex uni-common-pl uni-common-pr">
          
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
    
    <view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    data(){
      return {
        showLoadMore: false,
        loadMoreText:'加载中...',
        newsDatas:{}
      }
    },
    computed:{
      ...mapState(['hasLogin','postsListDatas'])
    },
    async onReachBottom() {
      this.showLoadMore = true;
      await this.initData();
      this.showLoadMore = false;
    },
    async onPullDownRefresh() {
			console.log('onPullDownRefresh');
      this.postsListDatas.page = 1
      this.postsListDatas.list = []
      this.postsListDatas.timestamp = 0;
      
			await this.initData();
      
      uni.stopPullDownRefresh();
		},
    methods:{
      async initData(){
        
        let params = {}
        params.page = this.postsListDatas.page || 1
        // params.recommend = 1
        params.type = 3
        params.timestamp = this.postsListDatas.timestamp || parseInt(Date.now() / 100)
        
        let ret = await this.$store.dispatch('postListGet', params)
        // console.log(ret.data)
        if(ret.code == 0){
          let data = ret.data
          this.postsListDatas.page = data.page + 1;
          this.postsListDatas.count = data.count
          this.postsListDatas.timestamp = data.timestamp
          
          let rows = data.rows
          rows.forEach(row => {
            this.postsListDatas.list.push(row)
          })
          
        }
      },
      goToDetail(news){
        uni.navigateTo({
        	url:'/pages/posts/detail?id=' + news.id
        })
      }
    },
    async onLoad() {
      
      if(!this.postsListDatas.list){
        this.postsListDatas.list = []

      }
      
      if(this.postsListDatas.list.length <= 0){
        await this.initData()
      }
      
      this.newsDatas = this.postsListDatas
      // console.log(this.postsListDatas)
  
    }
  }
</script>

<style>
</style>
