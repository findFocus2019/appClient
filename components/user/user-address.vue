<template>
  <view class="uni-flex uni-bg-white uni-common-pa uni-border-bottom">
    <view class="uni-left uni-common-pt" style="width: 80upx;" @tap="choose">
      <uni-icon
        type="location"
        size="22"
        color="#d81e06"
        v-if="current === address.id && current !== 0"
      ></uni-icon>
      <uni-icon type="location" size="22" v-else></uni-icon>
    </view>
    <view class="uni-flex-item" @tap="choose">
      <view class="uni-text-dark">
        <text class="uni-h4">{{address.name}}</text>
        <text class="uni-common-pl">{{address.mobile}}</text>
      </view>
      <view
        class="uni-ellipsis uni-text-small uni-text-light"
        style="width: 500upx;"
      >{{address.info}}</view>
    </view>
    <view class="uni-right uni-common-pt" style="width: 80upx;" @tap="goToAddress">
      <uni-icon type="arrowright" size="22"></uni-icon>
    </view>
  </view>
</template>

<script>
import uniIcon from "../uni-icon.vue";
export default {
  props: {
    address: {
      type: Object,
      default: () => {
        return {
          name: "还未填写姓名",
          mobile: "****",
          info: "还未填写收货地址",
          id: 0
        };
      }
    },
    toPage: {
      type: String,
      default: "/pagesMain/user/address"
    },
    current: {
      type: Number,
      default: 0
    }
  },
  components: {
    uniIcon
  },
  methods: {
    goToAddress() {
      uni.navigateTo({
        url: this.toPage
      });
    },
    choose() {
      let address = this.address;
      console.log("address", address);
      this.$emit("choose", address);
      //         uni.navigateBack({
      //         	delta:1
      //         })
    }
  }
};
</script>

<style>
</style>
