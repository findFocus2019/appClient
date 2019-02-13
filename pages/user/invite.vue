<template>
	<view class="uni-page-body">
		<view class="invite-top uni-bg-red-linear"></view>
    
    <view class="uni-center">
    	<view class="invite-qrcode uni-center uni-common-mt">
    		<image lazy-load="true"  src="/static/img/user/invite-qrcode.png" mode="widthFix" style="width: 540upx;height: 600upx;"></image>
        <view class="qrcode-img" style="">
        	二维码
        </view>
    	</view>
      <view class="invite-info">
      	<image lazy-load="true"  src="/static/img/user/invite-info.png" mode="widthFix" style="width: 540upx;height: 323upx;"></image>
        <view class="uni-common-pa user-info-box">
        	<image lazy-load="true"  :src="userInfo.avatar" mode="" style="width: 160upx;height: 160upx;border-radius: 80upx;margin-top: 20upx;" ></image>
          <view class="uni-center">
          	{{ userInfo.nickname }}
          </view>
        </view>
      </view>
    </view>
    
    <view class="uni-common-pa">
    	<button type="warn" class="uni-border-btn-radius">邀请好友</button>
    </view>
    <view class="uni-common-pa uni-center">
    	<navigator url="/pages/user/inviteList">点击查看邀请记录</navigator>
    </view>
    
	</view>
</template>

<script>
  import {
    mapState
  } from "vuex";
  
  export default {
    computed:{
      ...mapState(['hasLogin','userInfo'])
    },
    onNavigationBarButtonTap(e) {
    	if(e.index === 0){
       uni.navigateTo({
       	url:'/pages/user/inviteRule'
       })
     }
    },
  }
</script>

<style lang="less">
  .invite-top {
    position: fixed;
    width: 100%;
    height: 500upx;
  }
  
  .invite-qrcode {
    /* width: 540upx; */
    height: 600upx;
    overflow: hidden;
    
    .qrcode-img {
      position: relative;
      width: 100%;
      height: 200upx;
      top: -260upx;
      text-align: center;
    }
  }
  
  .invite-info {
    position: relative;
    top: -20upx;
  }
  
  .user-info-box {
    position: relative;
    top: -320upx;
    height: 0;
  }
</style>
