<template>
	<view class="uni-page-body">
		<view class="" v-if="newsDatas && newsDatas.list">
      <view class="uni-bg-white uni-border-top" v-for="(news,index) in newsDatas.list" :key="index">
        <view class="" @tap="goToDetail(news)">
        	<image lazy-load="true"  :src="news.cover" mode="scaleToFill" style="width: 750upx;height: 500upx;border-radius: 8upx;"></image>
        </view>
        <view class="uni-flex uni-bg-white uni-common-pa uni-left"  @tap="goToDetail(news)">
        	
          <view class="uni-flex-item">
          	<view class="uni-left uni-bold" >
          		{{news.title}}
          	</view>
            <view class="uni-common-pt uni-text-gray uni-flex">
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
        newsDatas:{},
        category:''
      }
    },
    computed:{
      ...mapState(['hasLogin','focusDatas'])
    },
    async onReachBottom() {
      this.showLoadMore = true;
      await this.initData();
      this.showLoadMore = false;
    },
    async onPullDownRefresh() {
			console.log('onPullDownRefresh');
      this.newsDatas.page = 1
      this.newsDatas.list = []
      this.newsDatas.timestamp = 0;
      
			await this.initData();
      
      uni.stopPullDownRefresh();
		},
    methods:{
      async initData(){
        let category = this.category
        
        let params = {}
        params.page = this.focusDatas[category].page || 1
        // params.recommend = 1
        params.category = this.category
        params.type = 2
        params.timestamp = this.focusDatas[category].timestamp || parseInt(Date.now() / 100)
        
        let ret = await this.$store.dispatch('postListGet', params)
        if(ret.code == 0){
          let data = ret.data
          this.focusDatas[category].page = data.page + 1;
          this.focusDatas[category].count = data.count
          this.focusDatas[category].timestamp = data.timestamp
          
          let rows = data.rows
          rows.forEach(row => {
            this.focusDatas[category].list.push(row)
          })
          
        }
      },
      goToDetail(news){
        uni.navigateTo({
        	url:'/pagesPost/posts/detail?id=' + news.id
        })
      }
    },
    async onLoad(opt) {
    	let category = opt.category
      this.category = category
      
      if(category == 'activity'){
        uni.setNavigationBarTitle({
        	title:'焦点活动'
        })
      }
 
      if(!this.focusDatas[category].list){
        this.focusDatas[category].list = []
      }
      
      await this.initData()
      
      this.newsDatas = this.focusDatas[category]
    }
  }
</script>

<style>
</style>
