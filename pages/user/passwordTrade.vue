<template>
	<view class="uni-page-body">

    	<password-trade title="设置交易密码"></password-trade>

		
	</view>
</template>

<script>
  import passwordTrade from '@/components/user/password_trade.vue';
  export default {
    components:{
      passwordTrade
    }
  }
</script>

<style>
  .fixed-bottom{
    position: fixed;
    width: 100%;
    bottom: 0;
  }
</style>
