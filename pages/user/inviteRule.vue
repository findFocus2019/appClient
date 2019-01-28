<template>
	<view class="uni-page-body">
    <view class="uni-common-pa">
    	<rule-box :title="title" :subTitle="subTitle" :content="content"></rule-box>
    </view>
		
	</view>
</template>

<script>
  import ruleBox from '@/components/user/rule-box.vue';
  export default {
    data(){
      return {
        title:'邀请规则',
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
