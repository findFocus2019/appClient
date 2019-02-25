<template>
	<view class="uni-page-body uni-bg-white">
    <image lazy-load="true" :src="configs.about_page_img" mode="widthFix" style="width: 100%;"></image>
	</view>
</template>

<script>
  export default {
    data(){
      return {
        aboutImgUrl:'/static/img/user/about.jpg'
        
      }
    },
    computed:{
      configs(){
        return this.$store.state.configs
      }
    }
  }
</script>

<style>
</style>
