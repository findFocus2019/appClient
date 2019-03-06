<template>
	<view class="uni-page-body" style="background: #de210a;height: 100%;">
    <!-- <view class="uni-common-pa">
    	<rule-box :title="title" :subTitle="subTitle" :content="content"></rule-box>
    </view> -->
		<image src="https://img-juren.oss-cn-shenzhen.aliyuncs.com/assets/images/signRule.jpg" mode="widthFix" style="width: 100%;"></image>
	</view>
</template>

<script>
  import ruleBox from '@/components/user/rule-box.vue';
  export default {
    data(){
      return {
        title:'签到规则',
        subTitle:'说明：xxxxxx',
        content:'XXXXXXXXXXXXXXXXXXXXx'
      }
    },
    components:{
      ruleBox
    }
  }
</script>

<style lang="less">

</style>
