<template>
	<view class="uni-page-body uni-bg-white">
		<view class="user-top uni-bg-red"></view>
    
    <view class="uni-center " style="position: relative;">
      <view class="uni-common-pa" style="height:328upx;">
      	<image lazy-load="true"  src="/static/img/user/vip-card.png" mode="widthFix" style="width:600upx;height:328upx;border-radius: 12upx;overflow: hidden;"></image>
      </view>
      
      <view class="uni-left" style="height: 100upx;line-height: 100upx;position: relative;top: -120upx;left: 100upx;color: #faf4c7;" v-if="isVip">
      	到期时间: {{ userInfo.deadDate }}
      </view>
      
      <view class="uni-common-pt">
      	<image lazy-load="true"  src="/static/img/user/vip-title.png" mode="widthFix" style="width: 500upx;height: 144upx;"></image>
      </view>
      <view class="uni-text-small uni-text-light">
      	{{subTitle}}
      </view>
    </view>
    
    <view class="uni-common-pa uni-text-dark">
    	<view class="">
    		{{title}}
    	</view>
      <view class="" v-for="(item,index) in list" :key="index">
      	{{item}}
      </view>
    </view>
    
    <view class="uni-common-pa">
      <navigator url="/pagesUser/user/vipOrder" class="uni-btn uni-border-btn-radius uni-bg-red uni-center">
        续费会员
      </navigator>
    	
    </view>
	</view>
</template>

<script>
  import {mapState} from 'vuex';
  export default {
    data(){
      return {
        subTitle:'说明:会员福利仅有效期内可以享有。',
        title:'VIP功能覆盖范围：（4、5二选一且不包含京东，时效性一个自然月）',
        list: [
          '1、VIP定义，特有享利权限；',
          '2、购物享有一般用户不同折扣；',
          '3、积分获取翻倍',
          '4、享受级联推荐用户，3购送1、5购送1福利；',
          '5、享受级联推荐用户，购物返利',
          '6、现金券购买VIP资格，赠送等额代金券（非直接购买VIP资格，不赠送，有效期一年）',
        ]

      }
    },
    computed:{
      ...mapState(['hasLogin','userInfo','isVip'])
    }
  }
</script>

<style style="less">
  .user-top {
    height: 200upx;
    border-radius: 0 0 120upx 120upx;
    position: fixed;
    width: 100%;
  }
</style>
