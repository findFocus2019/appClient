<template>
	<view class="uni-page-body">
		<view class="">
      
			<view class="uni-bg-white uni-common-pt uni-common-pb uni-common-mt">
			  
			  <view class="uni-flex uni-common-pl uni-common-pr">
			  	<view class="" style="width: 80upx;height: 80upx;">
			  		<image :src="userInfo.avatar" mode="" style="width: 80upx;height: 80upx;border-radius: 80upx;"></image>
			  	</view>
			    <view class="uni-flex-item uni-h4 uni-common-pl">
			    	<text style="">{{ userInfo.nickname}}</text>
			    </view>
			    <view class="uni-flex-item uni-text-gray uni-right">
			    	<text style="">2018-11-11 11:11:11</text>
			    </view>
			  </view>
			  
			  <view class="uni-common-mt-sm uni-common-pl uni-common-pr">
			  	评测内容评测内容评测内容评测内容评测内容评测内容评测内容评测内容评测内容评测内容评测内容评测内容
			  </view>
			  
			  <view class="uni-common-mt uni-common-pl">
			  	<view class="uni-common-pr" style="display: inline-block;width: 100upx;height: 100upx;">
			  		<image src="../../static/img/home/pic_1.png" mode="scaleToFill" style="width: 100upx;height: 100upx;"></image>
			  	</view>
          <view class="uni-common-pr" style="display: inline-block;width: 100upx;height: 100upx;">
          	<image src="../../static/img/home/pic_1.png" mode="scaleToFill" style="width: 100upx;height: 100upx;"></image>
          </view>
          <view class="uni-common-pr" style="display: inline-block;width: 100upx;height: 100upx;">
          	<image src="../../static/img/home/pic_1.png" mode="scaleToFill" style="width: 100upx;height: 100upx;"></image>
          </view>
			  </view>
        
        <view class="uni-common-pl uni-common-pr">
        	<view class="uni-common-pa uni-bg-gray uni-common-mt-sm uni-flex">
        		<view class="" style="width: 160upx;height: 160upx;">
        			<image src="../../static/img/home/pic_1.png" mode="scaleToFill" style="width: 160upx;height: 160upx;"></image>
        		</view>
            <view class="uni-flex-item uni-common-pl">
            	<view class="uni-ellipsis-2 ">
            		商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题
            	</view>
              <view class="">
              	<text class="uni-text-gray">商品价格:</text>
                <text class="uni-h3 uni-text-red">￥ 29.0</text>
              </view>
            </view>
        	</view>
        </view>
			  
			  <view class="uni-flex uni-common-pl uni-common-pr uni-common-mt-sm ">
			  	
          星星
			  </view>
				
			</view>
      
		</view>
    
    <view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>
</template>

<script>
  import {mapState,mapActions} from 'vuex';
  
  export default {
    data(){
      return {
        listData:{
          page:1,
          count:0,
          list:[]
        },
        showLoadMore: false,
        loadMoreText:'加载中...',
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
      async getData(){
        let params = {}
        params.page = this.listData.page
        
        let ret = await this.$store.dispatch('mallOrderItemListGet' , params)
        if(ret.code == 0){
          let data =ret.data
          this.listData.page += 1
          this.listData.count = data.count
          
          let rows = data.rows
          if(rows.length == 0){
            this.loadMoreText = '无更多'
          }
          
          rows.forEach(row => {
            this.listData.list.push(row)
          })
        }
      }
    },
    onLoad() {
    	this.getData()
    },
    async onPullDownRefresh() {
    	this.listData.page = 0
    	this.listData.count = 0
      this.listData.list = []
      
      await this.getData()
      uni.stopPullDownRefresh()
    },
    async onReachBottom() {
    	this.showLoadMore = false
      await this.getData()
      this.showLoadMore = true
    }
  }
</script>

<style>
</style>
