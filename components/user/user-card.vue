<template>
	<view class="user-card uni-bg-white">
    <view class="user-card-header uni-common-pa uni-border-bottom uni-text-darker">
    	{{ title }}
    </view>
    <view class="user-card-body">
      <template v-for="item in items">
      	<view class="user-card-item">
          <view class=" uni-common-pa">
          	<view class="">
          		<!-- <image :src="item.icon" mode="scaleToFill"></image> -->
          	</view>
          	<view class="uni-text-light">
          		{{item.text}}
          	</view>
          </view>
      	</view>
      </template>
    	
    </view>
  </view>
</template>
<script>
  
  export default {
    props:{
      title: String,
      items: Array
    },
  }
</script>

<style>
  .user-card-body {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
  }
  .user-card-item {
    width: 25%;
    text-align: center;
  }
</style>