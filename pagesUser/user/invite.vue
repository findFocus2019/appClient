<template>
	<view class="uni-page-body">
		<view class="invite-top uni-bg-red-linear"></view>
    <view class="" style="position: relative;height: 0;top: -100upx;">
    	<image src="../../static/img/user/invite-bg.png" mode="widthFix" style="width: 750upx;"></image>
    </view>
    
    <view class="uni-center" style="position: relative;">
    	<view class="invite-qrcode uni-center uni-common-mt">
    		<image lazy-load="true"  src="https://img-juren.oss-cn-shenzhen.aliyuncs.com/assets/images/invite-qrcode.png" mode="widthFix" style="width: 540upx;height: 800upx;"></image>
        <view class="qrcode-img" style="margin-top: -20upx;">
        	<image lazy-load="true"  :src="qrcodeImg" mode="" style="width: 200upx;height: 200upx;" ></image>

        </view>
    	</view>
      <view class="invite-info">
        <view class="uni-inline-block" style="width: 540upx;height: 323upx;overflow: hidden;">
        	<image lazy-load="true"  src="/static/img/user/invite-info.png" mode="widthFix" style="width: 540upx;height: 323upx;margin-left: -4upx;"></image>
        </view>
      	
        <view class="uni-common-pa user-info-box uni-text-gray">
        	<!-- <view class="uni-flex-item uni-center uni-common-mt" @tap="inviteShare('wx')">
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
          </view> -->
          <!-- <image lazy-load="true"  src="https://img-juren.oss-cn-shenzhen.aliyuncs.com/assets/images/invite-qrcode.png" mode="widthFix" style="width: 540upx;height: 800upx;"></image> -->
          <view class="qrcode-img uni-center" style="margin-top: 20upx;">
          	<image lazy-load="true"  :src="userInfo.avatar" mode="" style="width: 160upx;height: 160upx;border-radius: 80upx;" ></image>
          	<view class="uni-center uni-text-gray">
          		{{ userInfo.nickname }}
          	</view>
          </view>
        </view>

      </view>
    </view>
    
    <view class="uni-common-pa uni-flex uni-text-gray">
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
    <view class="uni-common-pa uni-center uni-text-gray">
    	<navigator url="/pagesUser/user/inviteList">
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
    data(){
      return {
        qrcodeImg:''
      }
    },
    computed:{
      ...mapState(['hasLogin','userInfo' , 'webDomain' , 'miniAppId', 'miniAppOrId'])
    },
    onNavigationBarButtonTap(e) {
    	if(e.index === 0){
       uni.navigateTo({
       	url:'/pagesUser/user/inviteRule'
       })
     }
    },
    methods:{
      inviteShare(type = 'wx'){
        // #ifndef APP-PLUS
        uni.navigateTo({
        	url:'/pages/auth/guide'
        })
        return
        // #endif
        console.log('userInfo:' + JSON.stringify(this.userInfo))
        let sharePage = 'pages/auth/register'
        sharePage = sharePage + '?isInvite=1&puid=' + this.userInfo.user_id
        let shareUrl = this.webDomain + '/' + sharePage
        // let postType = this.postInfo.type
        // console.log()
        console.log('inviteShare ：' , shareUrl)
        let imgUrl = 'https://img-juren.oss-cn-shenzhen.aliyuncs.com/assets/images/share.png';
        let shareData = {
          title: '发现焦点',
          description: '您的好友' + this.userInfo.nickname + '邀请您的注册',
          href: shareUrl,
          imgUrl: imgUrl,
          miniAppId: this.miniAppOrId,
          miniPage: sharePage
        }
        console.log('inviteShare ：' , JSON.stringify(shareData))
        if(type == 'wx'){
//           sharePage = 'pages/auth/mp'
//           sharePage = sharePage + '?isInvite=1&puid=' + this.userInfo.id
//           let shareUrl = this.webDomain + '/' + sharePage
//           shareData.shareUrl = shareUrl
          Share.mini(shareData)
          // Share.wx(shareData, 0)
        }else if (type == 'fr'){
          Share.wx(shareData , 1)
        }
      }
    },
    onLoad() {
      console.log('this.userInfo.user_id' , this.userInfo.user_id)
      
      // let domain = 'http://127.0.0.1:5001'
      let domain = 'https://api.faxianjiaodian.com'
      let inviteUrl = 'https://h5.faxianjiaodian.com/pages/auth/register?isInvite=1&puid=' + this.userInfo.user_id
      console.log('inviteUrl' , inviteUrl)
    	this.qrcodeImg = domain + '/upload/qrcode?url=' + encodeURIComponent(inviteUrl) 
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
    overflow: hidden;
  }
  
  .user-info-box {
    position: relative;
    top: -320upx;
    height: 0;
    margin: auto;
    width: 600upx;
  }
</style>
