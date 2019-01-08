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
     </view>
     
     <view class="uni-padding-wrap uni-common-mt uni-center" v-if="hasLogin">
      <button type="warn" @tap="logout">退出</button>
     </view>
     
  </view>
  
  
  
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  components:{
  },
  computed: {
    ...mapState(["hasLogin" , "userInfo"])
  },
  data(){
    return {
      
    }
  },
  methods:{
    ...mapActions(["authLogout"]),
    logout(){
      this.authLogout();
      uni.navigateTo({
        url: "../auth/login"
      });
    }
  }
  
};
</script>

<style>
</style>
