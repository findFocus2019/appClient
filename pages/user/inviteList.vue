<template>
	<view class="uni-page-body">
		<view class="uni-common-pa uni-center uni-border-top uni-bg-white" style="line-height: 60upx;">
			共邀请好友 <text class="uni-text-red uni-h3">{{ inviteListDatas.count }}</text> 人
		</view>
      
    <view class="uni-common-mt">
    	<view class="uni-flex uni-common-pa uni-border-bottom uni-bg-white" v-for="(item , index) in inviteListDatas.list" :key="index" >
    		<view class="" style="width: 60upx;height: 60upx;">
    			<image :src="item.cover" mode="scaleToFill" style="width: 60upx;height: 60upx;border-radius: 100%;"></image>
          
    		</view>
        <view class="uni-common-pl">
        	<text class="uni-bold">{{item.nickname || '未设置昵称'}}</text>
        </view>
        <view class="uni-flex-item uni-right uni-text-gray">
        	{{ item.create_date }}
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
        inviteListDatas:{
          page: 1,
          count: 0,
          list: [],
          timestamp:0
        },
        showLoadMore: false,
        loadMoreText:'加载中...',
      }
    },
    methods:{
      async getDatas(){
        let page = this.inviteListDatas.page
        let timestamp = this.inviteListDatas.timestamp
        let params = {
          page: page,
          timestamp: timestamp
        }
        let ret = await this.$store.dispatch('userInviteListGet' , params)
        console.log('userInviteListGet ret' , JSON.stringify(ret))
        if(ret.code == 0){
          
          this.inviteListDatas.timestamp = ret.data.timestamp
          this.inviteListDatas.count = ret.data.count
          this.inviteListDatas.page += 1
          
          let rows = ret.data.rows
          
          if(rows.length == 0){
            this.loadMoreText = '无更多...'
          }
          rows.forEach(row => {
            this.inviteListDatas.list.push(row)
          })
        }
        
        return ret
      }
    },
    onLoad() {
    	this.getDatas()
    },
    async onPullDownRefresh() {
    	this.inviteListDatas.page = 1
      this.inviteListDatas.list = []
      this.inviteListDatas.timestamp = 0
      this.inviteListDatas.count = 0
      
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
