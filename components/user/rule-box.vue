<template>
	<view class="">
		<view class="uni-center uni-common-pt">
			<text class="rule-title">{{title}}</text> 
		</view>
    <view class="uni-center uni-text-small uni-text-light">
    	{{subTitle}}
    </view>
    
    <view class="uni-common-pt">
    	<rich-text :nodes="content"></rich-text>
    </view>
	</view>
</template>

<script>
  export default {
    props:{
      title:{
        type: String,
        default:''
      },
      subTitle:{
        type: String,
        default:''
      },
      content:{
        type:String,
        default:''
      }
    }
  }
</script>

<style>
  .rule-title {
    width: 630upx;
    height: 70upx;
    text-align:center;
    display: inline-block;
    background: url(/static/img/user/rule-title-bg.png);
    background-size: 100%;
    line-height: 70upx;
    font-size: 48upx;
  }
</style>
