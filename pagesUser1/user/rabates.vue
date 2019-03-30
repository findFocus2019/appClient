<template>
	<view class="uni-page-body">
    <view class="" v-for="(item,index) in list" :key="index">
    	<view class="uni-common-pa uni-bg-white uni-border-top uni-flex" v-if="item.invite_user_id">
    		<view class="uni-flex-item">
    			购买商品邀请人奖励
          <view class="uni-text-small uni-text-gray">
          	{{ item.create_date }}
          </view>
    		</view>
    	  <view class="uni-bold uni-h3">
    	  	{{item.num_rabate_invite}}
    	  </view>
    	</view>
      
      <view class="uni-common-pa uni-bg-white uni-border-top uni-flex" v-if="item.share_user_id">
      	<view class="uni-flex-item">
      		购买商品分享人奖励
          <view class="uni-text-small uni-text-gray">
          	{{ item.create_date }}
          </view>
      	</view>
        <view class="uni-bold uni-h3">
        	{{item.num_rabate_share}}
        </view>
      </view>
      
      <view class="uni-common-pa uni-bg-white uni-border-top uni-flex" v-if="item.post_user_id">
      	<view class="uni-flex-item">
      		购买商品评测人奖励
          <view class="uni-text-small uni-text-gray">
          	{{ item.create_date }}
          </view>
      	</view>
        <view class="uni-bold uni-h3">
        	{{item.num_rabate_post}}
        </view>
      </view>
    </view>
		
	</view>
</template>

<script>
  export default {
    data(){
      return {
        list: []
      }
    },
    methods:{
      async getData(){
        let ret = await this.$store.dispatch('userRabates');
        console.log('userRabates ======' , JSON.stringify(ret) , ret)
        if(ret.code == 0){
          this.list = ret.data
        }
      }
    },
    onShow() {
    	console.log('onShow =======================')
      this.getData()
    },
    async onload(){
      console.log('onLoad =======================')
      this.getData()
    }
  }
</script>

<style>
  
</style>
