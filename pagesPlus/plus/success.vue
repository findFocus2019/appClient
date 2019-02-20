<template>
	<view class="uni-page-body">
		<view class="uni-common-mt uni-common-pa uni-center">
			<uni-icon type="checkbox-filled" size="100" color="green"></uni-icon>
		</view>
    <view class=" uni-common-pt uni-center uni-bold uni-h3">
    	发布成功
    </view>
    <view class="uni-common-pt uni-center ">
    	<navigator url="/pagesUser1/user/postsList">已提交平台审核，点击查看</navigator>
    </view>
    
    <view class="uni-common-mt uni-common-pa uni-common-mt uni-center uni-text-small uni-text-gray" @tap="goBack">
    	<button type="warn" class="uni-border-btn-radius">继续发布</button>
    </view>
	</view>
</template>

<script>
  import uniIcon from '@/components/uni-icon.vue';
  export default {
    components:{
      uniIcon
    },
    methods:{
      goBack(){
        uni.navigateBack({
        	delta:1
        })
      }
    }
  }
</script>

<style>
</style>
