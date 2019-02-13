<template>
	<view class="uni-page-body">
		<view class="" v-if="listData.count">
			
      <view class="uni-bg-white uni-common-mt" @tap="goToDetail(after)" v-for="(after,index) in listData.list" :key="index">
        
      	<view class="uni-flex uni-common-pa uni-border-bottom">
      		<view class="uni-flex-item">
      			<text>售后单号:</text>
            <text class="uni-text-gray">{{after.after_no}}</text>
      		</view>
          <view class="uni-right">
            <text v-if="after.status == 0">待处理</text>
            <text v-if="after.status == 1">处理中</text>
            <text v-if="after.status == 2">已处理</text>
          </view>
      	</view>
        
        <view class="">
        	<view class="uni-flex uni-common-pa " v-for="(item,index1) in after.items" :key="index1">
        		<view class="" style="width: 200upx;height: 200upx;">
        			<image lazy-load="true"  :src="item.cover" mode="scaleToFill" style="width: 200upx;height: 200upx;border-radius: 8upx;"></image>
        		</view>
        	  <view class="uni-flex-item uni-common-pl">
        	  	<view class="uni-ellipsis-2 uni-text-dark" style="height: 100upx;line-height: 50upx;">
        	  		{{ item.title }}
        	  	</view>
        	    <view class="uni-text-small uni-text-gray">
        	    	<view class="uni-flex-item uni-text-small uni-text-gray"  v-if="after.order.score_use">
        	    		<text>使用积分抵扣:</text>
        	    		<money :num="after.order.score" v-if="!after.order.vip" />
        	    		<money :num="after.order.score_vip" v-else/>
        	    	</view>
        	    	<view class="uni-flex-item uni-text-small uni-text-gray " v-else>
        	    		未使用积分抵扣
        	    	</view>
        	    </view>
        	    <view class="uni-flex">
        	    	<view class="uni-flex-item uni-text-red uni-h4">
        	    		<money :nums="[item.price_sell,item.price_score_sell]" size="30" v-if="!after.order.vip" />
        	    		<money :nums="[item.price_vip,item.price_score_vip]" size="30" v-else/>
        	    	</view>
        	      <view class="uni-flex-item uni-right">
        	      	x 2
        	      </view>
        	    </view>
        	  </view>
        	</view>
        </view>
        
        
        <view class="uni-common-pl  uni-common-pr uni-common-pb">
        	<view class="uni-flex uni-bg-gray uni-common-pa ">
        		<view class="uni-flex-item">
        			<text class="uni-text-dark uni-bold">申请原因:</text>
        		</view>
        	  <view class="uni-right">
        	  	{{ after.type }}
        	  </view>
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
        types:[
          
        ],
        showLoadMore: false,
        loadMoreText:'加载中...',
      }
    },
    methods:{
      
      goToDetail(after){
        console.log('goToDetail' , after)
        this.$store.state.mallAfterData.info = after
        uni.navigateTo({
        	url:'/pages/user/orderAfterDetail?id=' + after.id
        })
      },
      async getData(){
        let params = {}
        params.page = this.listData.page
        
        let ret = await this.$store.dispatch('mallOrderAfterListGet' , params)
				console.log('mallOrderItemListGet ret' , ret)
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
