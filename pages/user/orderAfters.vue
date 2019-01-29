<template>
	<view class="uni-page-body">
		<view class="">
			
      <view class="uni-bg-white uni-common-mt" @tap="goToDetail">
        
      	<view class="uni-flex uni-common-pa uni-border-bottom">
      		<view class="uni-flex-item">
      			<text>售后单号:</text>
            <text class="uni-text-gray"></text>
      		</view>
          <view class="uni-right">
          	待处理
          </view>
      	</view>
        
        <view class="uni-flex uni-common-pa ">
        	<view class="" style="width: 200upx;height: 200upx;">
        		<image src="../../static/img/home/pic_2.png" mode="scaleToFill" style="width: 200upx;height: 200upx;"></image>
        	</view>
          <view class="uni-flex-item uni-common-pl">
          	<view class="uni-ellipsis-2 uni-text-dark" style="height: 100upx;line-height: 50upx;">
          		产品标题产品标题产品标题产品标题产品标题产品标题产品标题产品标题产品标题产品标题产品标题产品标题
          	</view>
            <view class="uni-text-small uni-text-gray">
            	积分可抵扣 ￥ 5.00
            </view>
            <view class="uni-flex">
            	<view class="uni-flex-item uni-text-red uni-h4">
            		￥ 29.9
            	</view>
              <view class="uni-flex-item uni-right">
              	x 2
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
        	  	待处理
        	  </view>
        	</view>
        </view>
        
        
        
      </view>
		</view>
	</view>
</template>

<script>
  export default {
    methods:{
      goToDetail(){
        uni.navigateTo({
        	url:'/pages/user/orderAfterDetail'
        })
      }
    }
  }
</script>

<style>
</style>
