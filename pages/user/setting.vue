<template>
	<view class="uni-page-body uni-bg-white">
    
		<view class="uni-flex uni-common-pa uni-border-bottom" >
			<view class="uni-flex-item">
        头像
			</view>
      <view class="uni-flex-item uni-right">
      	<image :src="userInfo.avatar" mode="" v-if="userInfo.avatar" style="width: 80upx;height: 80upx; border-radius: 40upx;"></image>
      </view>
		</view>
    
    <view class="uni-flex uni-common-pa uni-border-bottom" >
    	<view class="uni-flex-item">
        昵称
    	</view>
      <view class="uni-flex-item uni-right">
      	{{ userInfo.nickname }}
      </view>
    </view>
    
    <view class="uni-flex uni-common-pa uni-border-bottom" >
    	<view class="uni-flex-item">
        手机
    	</view>
      <view class="uni-flex-item uni-right">
      	{{ userInfo.mobile }}
      </view>
    </view>
    
    <view class="uni-flex uni-common-pa uni-border-bottom" >
    	<view class="uni-flex-item">
        性别
    	</view>
      <view class="uni-flex-item uni-right">
        <text v-if="userInfo.sex == 0">未知</text>
      	<text v-if="userInfo.sex == 1">男</text>
        <text v-if="userInfo.sex == 2">女</text>
      </view>
    </view>
    
    <view class="uni-flex uni-common-pa uni-border-bottom" @tap="goToPage('/pages/user/passwordTrade')">
    	<view class="uni-flex-item">
        支付密码
    	</view>
      <view class="uni-flex-item uni-right">
        <uni-icon type="arrowright" size="22"></uni-icon>
      </view>
    </view>
    
    <view class="uni-flex uni-common-pa uni-border-bottom" >
    	<view class="uni-flex-item">
        绑定支付宝
    	</view>
      <view class="uni-flex-item uni-right">
        <uni-icon type="arrowright" size="22"></uni-icon>
      </view>
    </view>
    
    <view class="uni-flex uni-common-pa uni-border-bottom" >
    	<view class="uni-flex-item">
        绑定微信
    	</view>
      <view class="uni-flex-item uni-right">
        <uni-icon type="arrowright" size="22"></uni-icon>
      </view>
    </view>
    
    <view class="uni-flex uni-common-pa uni-border-bottom" >
    	<view class="uni-flex-item">
        版本号
    	</view>
      <view class="uni-flex-item uni-right">
        1.0.6
      </view>
    </view>
    
     <view class="uni-flex uni-common-pa " @tap="goToPage('/pages/user/about')">
    	<view class="uni-flex-item">
        关于我们
    	</view>
      <view class="uni-flex-item uni-right">
        <uni-icon type="arrowright" size="22"></uni-icon>
      </view>
    </view>
    
	</view>
</template>

<script>
  import {mapState,mapActions} from 'vuex';
  import uniIcon from '@/components/uni-icon.vue';
  export default {
    components:{
      uniIcon
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
      goToPage(page){
        uni.navigateTo({
        	url:page
        })
      }
    }
  }
</script>

<style>
</style>
