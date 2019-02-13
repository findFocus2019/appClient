<template>
	<view class="uni-page-body uni-bg-white">
		<image lazy-load="true"  :src="aboutImgUrl" mode="widthFix" style="width: 100%;"></image>
	</view>
</template>

<script>
  export default {
    data(){
      return {
        aboutImgUrl:'/static/img/user/about.jpg'
        
      }
    }
  }
</script>

<style>
</style>
