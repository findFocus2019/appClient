<template>
	<view class="uni-page-body">

    <view class="uni-bg-white">
    	<view class="uni-flex uni-common-pa uni-border-bottom uni-bg-white" v-for="(item , index) in assetsOutLogs.list" :key="index" >
    		<view class="uni-flex-item" >
          <view class="">
            提取金额：{{ item.balance }}
          </view>
          <view class="uni-flex-item uni-text-gray">
          	{{ item.create_date }}
          </view>
    		</view>
        <view class="uni-common-pl">
        	<text class="uni-bold uni-text-red" v-if="item.status == 0">处理中</text>
          <text class="uni-bold" v-if="item.status == 1">已完成</text>
        </view>
        
    	</view>
    </view>
    
    <view class="uni-center uni-text-gray uni-common-pa" v-if="showLoadMore">
    	{{loadMoreText}}
    </view>
    
	</view>

</template>

<script>
  
  export default {
    data(){
      return {
        assetsOutLogs:{
          page: 1,
          count: 0,
          list: []
        },
        showLoadMore: false,
        loadMoreText:'加载中...',
      }
    },
    methods:{
      async getDatas(){
        let page = this.assetsOutLogs.page
        let params = {
          page: page,
          type:2
        }
        let ret = await this.$store.dispatch('userTransactionListGet' , params)
        console.log('userInviteListGet ret' , JSON.stringify(ret))
        if(ret.code == 0){
  
          this.assetsOutLogs.count = ret.data.count
          this.assetsOutLogs.page += 1
          
          let rows = ret.data.rows
          
          if(rows.length == 0){
            this.loadMoreText = '无更多...'
          }
          rows.forEach(row => {
            this.assetsOutLogs.list.push(row)
          })
        }
        
        return ret
      }
    },
    onLoad() {
    	this.getDatas()
    },
    async onPullDownRefresh() {
    	this.assetsOutLogs.page = 1
      this.assetsOutLogs.list = []
      this.assetsOutLogs.count = 0
      
      await this.getDatas()
      uni.stopPullDownRefresh()
    },
    async onReachBottom() {
      this.showLoadMore = true
    	await this.getDatas()
      
      setTimeout(() => {
        this.showLoadMore = false
      } , 1000)
      
    }
  }
  
  
</script>

<style>
</style>
