<template>
	<view class="uni-page-body">
		<view class="" v-if="recommendDatas && recommendDatas.list">
      
      <view class="uni-bg-white uni-border-top" v-for="(news,index) in recommendDatas.list" :key="index">
        <view class="uni-flex uni-bg-white uni-common-pa uni-left" @tap="goToDetail(news)" >
        	<view class="post-list-cover">
        		<image lazy-load="true"  :src="news.cover" mode="scaleToFill" class="post-list-cover"></image>
        	</view>
          <view class="uni-flex-item uni-common-pl post-list-content">
          	<view class="uni-ellipsis-2 uni-left uni-bold title" >
          		{{news.title}}
          	</view>
            <view class="uni-text-gray uni-text-small  uni-flex">
              <view class="time">
              	{{ news.publish_time}}
              </view>
              <view class="uni-flex-item recommend-type-inline uni-right">
                <view class="">
                	<text v-if="news.type == 1" class="recommend-type type-1">资讯</text>
                	<text v-if="news.type == 1" class="recommend-type-triangle type-1"></text>
                </view>
              	<view class="">
              		<text v-if="news.type == 2" class="recommend-type type-2">品牌</text>
              		<text v-if="news.type == 2" class="recommend-type-triangle type-2"></text>
              	</view>
                
              </view>
            	
            </view>
            <view class="uni-text-gray uni-flex icon-items">
              
            	<view class="" style="width: 36upx;height: 36upx;padding-top: 6upx;">
                <image lazy-load="true"  src="/static/icon/posts/eye.png" mode="" style="width: 36upx;height: 36upx;"></image>  
              </view>
              <view class="uni-flex-item uni-common-ml-sm">
                <text >{{news.views}}</text> 
              </view>
              <view class="" style="width: 36upx;height: 36upx;padding-top: 6upx;">
                <image lazy-load="true"  src="/static/icon/posts/zan.png" mode="" style="width: 36upx;height: 36upx;display: inline-block;"></image> 
               </view>
              <view class="uni-flex-item uni-common-ml-sm">
              	<text>{{news.likes}}</text> 
              </view>
              <view class="" style="width: 36upx;height: 36upx;padding-top: 6upx;">
                <image lazy-load="true"  src="/static/icon/posts/share.png" mode="" style="width: 36upx;height: 36upx;display: inline-block;"></image> 
               </view>
              <view class="uni-flex-item uni-common-ml-sm">
                
              	<text>{{news.shares}}</text> 
              </view>
            </view>
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
      }
    },
    computed:{
      ...mapState(['hasLogin','recommendDatas'])
    },
    async onReachBottom() {
      this.showLoadMore = true;
      await this.initData();
      this.showLoadMore = false;
    },
    async onPullDownRefresh() {
			console.log('onPullDownRefresh');
      this.recommendDatas.page = 1
      this.recommendDatas.list = []
      this.recommendDatas.timestamp = 0;
      
			await this.initData();
      
      uni.stopPullDownRefresh();
		},
    methods:{
      async initData(){
        
        let params = {}
        params.page = this.recommendDatas.page || 1
        params.recommend = 1
        params.timestamp = this.recommendDatas.timestamp || parseInt(Date.now() / 100)
        
        let ret = await this.$store.dispatch('postListGet', params)
        if(ret.code == 0){
          let data = ret.data
          this.recommendDatas.page = data.page + 1;
          this.recommendDatas.count = data.count
          this.recommendDatas.timestamp = data.timestamp
          
          let rows = data.rows
          rows.forEach(row => {
            this.recommendDatas.list.push(row)
          })
          
        }
      },
      goToDetail(news){
        uni.navigateTo({
        	url:'/pagesPost/posts/detail?id=' + news.id
        })
      }
    }
  }
</script>

<style>
  .recommend-type-inline {
    display: inline-block;
    line-height: 36upx;
    height: 36upx;
  }
  
  .recommend-type {
    display: inline-block;
    line-height: 36upx;
    color: #FFFFFF;
    padding: 0 30upx;
    border-radius: 4upx;
    font-size: 24upx;
  }
  
  .recommend-type.type-1{
    background: #d81e06;
  }
  
  .recommend-type.type-2{
    background: #09BB07;
  }
  
  .recommend-type-triangle {
   /*  width: 0;
    height: 0;
    border-top: 18upx solid transparent;
    border-left: 18upx solid #d81e06;
    border-bottom: 18upx solid transparent;
    display: inline-block;
    line-height: 36upx; */
    /* margin-top: 10upx; */
  }
</style>
