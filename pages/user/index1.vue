<template>
  <view class="uni-page-body">
    <view class="uni-padding-wrap uni-bg-white">
      <view class="uni-common-pa uni-flex uni-row">
        <view class="uni-flex" style="width: 25%;">
          <image :src="userInfo.avatar" mode="scaleToFill" style="width: 100px;height: 100px;" v-if="userInfo && userInfo.avatar"></image>
          <image src="../../static/img/user.png" mode="scaleToFill" style="width: 100px;height: 100px;" v-else></image>
        </view>
        <view class="uni-flex">
          <view v-if="!hasLogin">
            <navigator url="../auth/login" class="uni-common-pa">还未登录，去登录</navigator>
          </view>
          <view class="" v-else>
            <text class="uni-h3">{{ userInfo.nickname || '还未设置'}}</text>
            <view class="">
              {{ userInfo.mobile }}
            </view>
          </view>
        </view>
        
      </view>
      <view class="uni-flex uni-common-pb uni-common-pt" v-if="hasLogin">
         <view class="uni-flex-item uni-center">
         	<view class="">
         		余额
         	</view>
          <text class="uni-h3">100</text>
         </view>
         <view class="uni-flex-item uni-center">
         	<view class="">
         		积分
         	</view>
          <text class="uni-h3">100</text>
         </view>
      </view>
      
    </view>
 
    <view class="uni-card">
    	<view class="uni-list">
    		<view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="goToPage('../task/index')">
    			<view class="uni-list-cell-navigate uni-navigate-right">
    				每日任务
    			</view>
    		</view>
        <view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="goToPage('../task/list')">
        	<view class="uni-list-cell-navigate uni-navigate-right">
        		收益记录
        	</view>
        </view>
    	</view>
    </view>
    
    <view class="uni-card">
    	<view class="uni-list">
  
        <view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="goToPage('../mall/order')">
        	<view class="uni-list-cell-navigate uni-navigate-right">
        		商城订单
        	</view>
        </view>
        <view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover" @tap="goToPage('../user/address')">
        	<view class="uni-list-cell-navigate uni-navigate-right">
        		地址管理
        	</view>
        </view>
    	</view>
    </view>
    
    <view class="uni-card uni-common-mt">
    	<view class="uni-list">
    		<view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="goToPage('../user/views')">
    			<view class="uni-list-cell-navigate uni-navigate-right">
    				浏览
    			</view>
    		</view>
        <view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="goToPage('../user/comments')">
        	<view class="uni-list-cell-navigate uni-navigate-right">
        		评论
        	</view>
        </view>
        <view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="goToPage('../user/likes')">
        	<view class="uni-list-cell-navigate uni-navigate-right">
        		收藏
        	</view>
        </view>
        <view class="uni-list-cell uni-list-cell-last" hover-class="uni-list-cell-hover" @tap="goToPage('../user/posts')">
        	<view class="uni-list-cell-navigate uni-navigate-right">
        		评测
        	</view>
        </view>
    	</view>
    </view>
    
    <view class="uni-card">
    	<view class="uni-list">
    		<view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="goToPage('../notice')">
    			<view class="uni-list-cell-navigate uni-navigate-right">
    				系统公告
    			</view>
    		</view>
    	</view>
    </view>

    <view class="uni-padding-wrap uni-common-mt uni-center" v-if="hasLogin">
      <button type="warn" @tap="logout">退出登录</button>
    </view>

  </view>



</template>

<script>
  import {
    mapState,
    mapActions
  } from "vuex";
  export default {
    components: {},
    computed: {
      ...mapState(["hasLogin", "userInfo"])
    },
    data() {
      return {

      }
    },
    methods: {
      ...mapActions(["authLogout"]),
      logout() {
        this.authLogout();
        uni.navigateTo({
          url: "../auth/login"
        });
      },
      goToPage(page){
        if(!this.hasLogin){
          uni.navigateTo({
          	url:'../auth/login'
          })
        }else {
          uni.navigateTo({
          	url:page
          })
        }
      }
    }

  };
</script>

<style>
</style>
