<template>
	<view class="score-show">
		<text>{{info}}</text>
	</view>
</template>

<script>
  export default {
    props:{
      info:{
        type: String,
        default:''
      }
    }
  }
</script>

<style>
  .score-show {
    position: fixed;
    width: 80%;
    left: 10%;
    bottom: 100upx;
    z-index: 1000;
    background: rgba(0,0,0,0.6);
    border-radius: 8upx;
    line-height: 80upx;
    text-align: center;
    color: #FFFFFF;
  }
</style>
