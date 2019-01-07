<template>
  <view class="uni-padding-wrap uni-common-pt">
    <!-- <view class="btn-row">
      <button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
      
    </view>-->
    <button v-if="hasLogin" type="default" @tap="bindLogout">退出登录</button>
  </view>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["hasLogin", "forcedLogin"])
  },
  onLoad() {
    if (!this.hasLogin) {
      uni.navigateTo({
        url: "../auth/login"
      });
    }
  },
  onShow() {
    console.log("on show");
    if (!this.hasLogin) {
      uni.navigateTo({
        url: "../auth/login"
      });
    }
  },
  methods: {
    ...mapActions(["authLogout"]),
    bindLogin() {
      uni.navigateTo({
        url: "../auth/login"
      });
    },
    bindLogout() {
      this.authLogout();
      /**
       * 如果需要强制登录跳转回登录页面
       */
      if (this.forcedLogin) {
        uni.reLaunch({
          url: "../auth/login"
        });
      } else {
        uni.navigateTo({
          url: "../auth/login"
        });
      }
    }
  }
};
</script>

<style>
</style>
