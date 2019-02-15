<template>
	<view class="uni-page-body">
		<view class="invite-top uni-bg-red-linear"></view>
    <view class="" style="position: relative;height: 0;top: -100upx;">
    	<image src="../../static/img/user/invite-bg.png" mode="widthFix" style="width: 750upx;"></image>
    </view>
    
    <view class="uni-center" style="position: relative;">
    	<view class="invite-qrcode uni-center uni-common-mt">
    		<image lazy-load="true"  src="/static/img/user/invite-qrcode.png" mode="widthFix" style="width: 540upx;height: 600upx;"></image>
        <view class="qrcode-img" style="">
        	<image lazy-load="true"  :src="userInfo.avatar" mode="" style="width: 160upx;height: 160upx;border-radius: 80upx;" ></image>
        	<view class="uni-center uni-text-white">
        		{{ userInfo.nickname }}
        	</view>
        </view>
    	</view>
      <view class="invite-info">
      	<image lazy-load="true"  src="/static/img/user/invite-info.png" mode="widthFix" style="width: 540upx;height: 323upx;"></image>
        <view class="uni-common-pa user-info-box uni-flex uni-text-gray">
        	<view class="uni-flex-item uni-center uni-common-mt" @tap="inviteShare('wx')">
        		<image src="../../static/icon/weixin.png" mode="" style="width: 140upx;height: 140upx;border-radius: 80upx;"></image>
            <view class="">
            	邀请微信好友
            </view>
        	</view>
          <view class="uni-flex-item uni-center uni-common-mt uni-text-gray" @tap="inviteShare('fr')">
          	<image src="../../static/icon/friend.png" mode="" style="width: 140upx;height: 140upx;border-radius: 80upx;"></image>
            <view class="">
            	分享到朋友圈
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- <view class="uni-common-pa">
    	
    </view> -->
    <view class="uni-common-pa uni-center uni-text-gray">
    	<navigator url="/pages/user/inviteList">
        点击查看邀请记录
      </navigator>
    </view>
    
	</view>
</template>

<script>
  import {
    mapState
  } from "vuex";
  import Share from '@/static/js/share.js';
  export default {
    computed:{
      ...mapState(['hasLogin','userInfo' , 'webDomain' , 'miniAppId'])
    },
    onNavigationBarButtonTap(e) {
    	if(e.index === 0){
       uni.navigateTo({
       	url:'/pages/user/inviteRule'
       })
     }
    },
    methods:{
      inviteShare(type = 'wx'){
        let sharePage = 'pages/auth/register'
        sharePage = sharePage + '?puid=' + this.userInfo.id
        let shareUrl = this.webDomain + '/' + sharePage
        // let postType = this.postInfo.type
        // console.log()
        console.log('inviteShare ：' , shareUrl)
        let shareData = {
          title: '发现焦点',
          description: '您的好友' + this.userInfo.nickname + '邀请您的注册',
          href: shareUrl,
          imgUrl: this.userInfo.avatar,
          miniAppId: this.miniAppId,
          miniPage: sharePage
        }
        console.log('inviteShare ：' , JSON.stringify(shareData))
        if(type == 'wx'){
          Share.wx(shareData)
        }else if (type == 'qq'){
          Share.qq(shareData)
        }
      }
    }
    
  }
</script>

<style lang="less">
  .invite-top {
    position: fixed;
    width: 100%;
    height: 500upx;
    // background-image: url('/static/img/user/invite-bg.png');
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
    margin: auto;
    width: 600upx;
  }
</style>
