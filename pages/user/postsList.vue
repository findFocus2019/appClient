<template>
	<view class="uni-page-body">

    <view class="uni-bg-white uni-common-pt uni-common-pb uni-common-mt">
      
      <view class="uni-right uni-common-pl uni-common-pr" style="position: relative;height: 0;">
      	<image src="../../static/img/user/audit-no.png" mode="widthFix" style="width: 160upx;"></image>
      </view>
      
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
      
      <view class="uni-bold uni-common-mt-sm uni-common-pl uni-common-pr">
      	评测标题
      </view>
      
      <view class="uni-common-pl uni-common-pr">
      	<view class="uni-common-pa uni-bg-gray uni-common-mt-sm uni-text-small uni-text-light">
      		评测内容评测内容评测内容评测内容评测内容评测内容评测内容评测内容评测内容评测内容评测内容评测内容
      	</view>
      </view>
      
      <view class="uni-flex uni-common-mt uni-common-pl">
      	<view class="uni-flex-item uni-common-pr">
      		<image src="../../static/img/home/pic_1.png" mode="widthFix" style="width: 100%;"></image>
      	</view>
        <view class="uni-flex-item uni-common-pr">
        	<image src="../../static/img/home/pic_1.png" mode="widthFix" style="width: 100%;"></image>
        </view>
        <!-- <view class="uni-flex-item uni-common-pr">
        	<image src="../../static/img/home/pic_1.png" mode="widthFix" style="width: 100%;"></image>
        </view> -->
      </view>
      
      <view class="uni-flex uni-common-pl uni-common-pr uni-text-gray">
      	<view class="uni-flex-item ">
      		浏览
      	</view>
        <view class="uni-flex-item uni-center">
        	点赞
        </view>
        <view class="uni-flex-item uni-right">
        	分享
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
