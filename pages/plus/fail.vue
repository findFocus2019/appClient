<template>
	<view class="uni-page-body">
		<view class="uni-common-mt uni-common-pa uni-center">
			<uni-icon type="info-filled" size="100" color="#d81e06"></uni-icon>
		</view>
    <view class="uni-common-pt uni-center uni-bold uni-h3" v-if="type == 0">
    	发布失败
    </view>
    <view class="uni-common-pt uni-center uni-text-gray">
    	{{msg}}
    </view>
    
    <view class="uni-common-pa uni-common-mt uni-center uni-text-small uni-text-gray" @tap="goBack" v-if="type == 0">
    	<button type="warn" class="uni-border-btn-radius">返回发布</button>
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
        msg:'',
        type:0
      }
    },
    onLoad(opt) {
      let type = opt.type || 0
      if(type == 1){
        uni.setNavigationBarTitle({
        	title:'错误提示'
        })
      }
      this.type = type
    	this.msg = opt.msg || ''
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
