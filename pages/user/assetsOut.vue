<template>
	<view class="uni-page-body uni-bg-white">
		
    <view class="uni-flex uni-common-pa uni-border-top">
    	<view class="uni-bold">
    		可提取金额
    	</view>
      <view class="uni-flex-item uni-right uni-text-red uni-bold">
      	$ 100
      </view>
    </view>
    
    <view class="uni-flex uni-common-pa uni-border-top">
    	<view class="">
    		提取方式
    	</view>
      <view class="uni-flex-item uni-right">
      <uni-icon type="arrowright" size="20"></uni-icon>
      </view>
    </view>
    
    <view class="uni-common-pa uni-border-top">
    	<uni-icon type="circle" size="20"></uni-icon>
      <text>我已认证阅读并同意</text>
      <text class=""> 《用户提现协议》</text>
    </view>
    
    <view class="uni-common-pa uni-common-mt">
    	<button type="warn" class="uni-border-btn-radius">提现</button>
    </view>
    
    <view class="uni-common-pa uni-common-mt">
    	<view class="uni-bold">
    		注意事项
    	</view>
      <view class="uni-text-light uni-common-mt-sm">
      	<rich-text :nodes="noitceText"></rich-text>
      </view>
    </view>
    
    
	</view>
</template>

<script>
  import uniIcon from '@/components/uni-icon.vue';
  export default {
    components:{
      uniIcon
    },
    data(){
      return {
        noitceText:'<p>1.xxxxxxxxxxxxxx</p><p>2.ppppppppppp</p>'
      }
    }
  }
</script>

<style>
</style>
