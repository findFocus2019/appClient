<template>
	<view class="uni-page-body uni-bg-white">
		<view class="" v-if="listData.count">
      
			<view class="uni-common-pa uni-border-top" v-for="(item, index) in listData.list" :key="index">
			  <view class="uni-flex">
			    <view class="" style="width: 60upx;height: 60upx;">
			      <image lazy-load="true" :src="item.user_info.avatar" mode="" style="width: 60upx;height: 60upx;border-radius: 60upx;"></image>
			    </view>
			    <view class="uni-flex-item uni-common-pl uni-text-blue">
			      <text style="">{{ item.user_info.nickname}}</text>
			    </view>
			    <view class="uni-flex-item uni-text-gray uni-right">
			      <text style="">
			        {{ item.rate_date }}
			      </text>
			    </view>
			  </view>
			  
			  <view class="uni-flex uni-common-mt " v-if="item.rate_level > 0">
			    <view class="uni-inline-block" v-for="(level,index2) in levels" :key="index2">
			    	<view v-if="level <= item.rate_level">
			         <image src="/static/icon/user/start-a.png" mode="" style="width: 40upx;height: 40upx;margin-right: 20upx;"></image>
			    	</view>
			    	<view v-else>
			         <image src="/static/icon/user/start.png" mode="" style="width: 40upx;height: 40upx;margin-right: 20upx;"></image>
			    	</view>
			    	
			    </view>
			  </view>
			
			  <view class="uni-common-mt-sm">
			    {{ item.rate_info }}
			  </view>
			
			  <view class="uni-common-mt" v-if="item.rate_imgs.length">
			    <view class="uni-common-pr" style="display: inline-block;width: 100upx;height: 100upx;" v-for="(img,index1) in item.rate_imgs"
			      :key="index1" @tap="preImg(item.rate_imgs, img)">
			      <image lazy-load="true" :src="img" mode="scaleToFill" style="width: 100upx;height: 100upx;border-radius: 4upx;border: 1px solid #EEEEEE;"></image>
			    </view>
			  </view>
			</view>
			
		</view>
		
		<view class="uni-common-pa uni-center" v-else>无数据</view>
    
    <view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>
</template>

<script>
  import {mapState,mapActions} from 'vuex';
  import money from '@/components/money.vue';
  import uniIcon from '@/components/uni-icon.vue';
  export default {
		components:{
			money,
      uniIcon
		},
    data(){
      return {
        listData:{
          page:1,
          count:0,
          list:[]
        },
        goodsId:0,
        levels:[1,2,3,4,5],
        showLoadMore: false,
        loadMoreText:'加载中...',
      }
    },
    computed:{
 
    },
    methods:{
      preImg(paths, current){
        uni.previewImage({
            urls: paths,
            current: current,
            indicator:'number'
        });
      },
      async getData(){
        let params = {}
        params.page = this.listData.page
        params.goods_id = this.goodsId
        // params.rate = 1
        
        let ret = await this.$store.dispatch('mallGoodsRateList' , params)
				console.log('mallGoodsRateList ret' , ret)
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
      },
      async refresh(){
        uni.startPullDownRefresh({
        	success: async () => {
        		this.listData.page = 1
        		this.listData.count = 0
        		this.listData.list = []
        		
        		await this.getData()
        		uni.stopPullDownRefresh()
        	}
        })
      }
    },
    onLoad(opt) {
      this.goodsId = opt.goods_id
    	this.getData()
    },
    async onPullDownRefresh() {
    	this.listData.page = 1
    	this.listData.count = 0
      this.listData.list = []
      
      await this.getData()
      uni.stopPullDownRefresh()
    },
    async onReachBottom() {
    	this.showLoadMore = false
      await this.getData()
      this.showLoadMore = true
    },
    onShow() {
    	if(this.$store.state.userDataRefresh){
        this.refresh()
        this.$store.state.userDataRefresh = false
      }
    }
  }
</script>

<style>
  .btn-rate {
    padding: 8upx 16upx;
    border: 1px solid #d81e06;
    color: #D81E06;
    border-radius: 32upx;
  }
</style>
