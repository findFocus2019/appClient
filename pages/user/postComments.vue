<template>
	<view class="uni-page-body">
    
    <view class="uni-border-top">
    	
      <view class="uni-flex uni-common-pa uni-bg-white uni-border-bottom">
      	<view class="">
      		<image :src="userInfo.avatar" mode="widthFix" style="width: 80upx;height: 80upx;border-radius: 40upx;"></image>
      	</view>
        <view class="uni-flex-item uni-common-pl">
        	<view class="uni-text-darker">
        		{{ userInfo.nickname }}
        	</view>
          <view class="uni-text-small uni-text-light">
          	2018-12-11 10:26:12
          </view>
          
          <view class="">
          	评论内容
          </view>
          
          <view class="uni-bg-gray uni-common-pa uni-flex">
          	<view class="" style="width: 160upx;height: 100upx;">
          		<image src="" mode="widthFix" style="width: 160upx;height: 100upx;"></image>
          	</view>
            <view class="uni-flex-item uni-ellipsis-2 uni-common-pl" style="height: 100upx;line-height: 50upx;">
            	文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题
            </view>
            
          </view>
        </view>
      </view>
      
    </view>
    

	</view>
</template>

<script>
  import {mapState,mapActions} from 'vuex';
  
  export default {
    computed:{
      ...mapState(['userInfo'])
    }
  }
</script>

<style>
</style>
