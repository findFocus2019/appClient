<template>
	<view class="uni-page-body">
		<view class="" v-if="recommendDatas && recommendDatas.list">
      <view class="uni-bg-white uni-common-mt" v-for="(news,index) in recommendDatas.list" :key="index">
        <view class="uni-flex uni-bg-white uni-common-pa uni-left" @tap="goToDetail(news)" >
        	<view class="">
        		<image lazy-load="true"  :src="news.cover" mode="scaleToFill" style="width: 280upx;height: 210upx;"></image>
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
        	url:'/pages/posts/detail?id=' + news.id
        })
      }
    }
  }
</script>

<style>
</style>
