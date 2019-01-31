<template>
	<view class="uni-page-body">
		<view class="">
			<view class="uni-common-pa uni-common-mt uni-bg-white uni-flex" @tap="goToDetail">
				<view class="" style="width: 200upx;height: 150upx;">
					<image src="../../static/img/home/pic_2.png" mode="scaleToFill" style="width: 200upx;height: 150upx;"></image>
				</view>
			  <view class="uni-flex-item uni-common-pl">
			  	<view class="post-list-title">
			  		新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题
			  	</view>
			    <view class="uni-text-small uni-text-gray">
			    	
			    </view>
			    <view class="uni-flex">
			    	<view class="uni-flex-item ">
			    		2018-11-12
			    	</view>
			    </view>
			  </view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
    methods:{
      goToDetail(){
        uni.navigateTo({
        	url:'/pages/notice/detail'
        })
      }
    }
	}
</script>

<style>
  .post-list-title{
    height: 100upx;
    word-break: break-all;
    display: -webkit-box;
    overflow: hidden;
    line-height: 50upx;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    flex-shrink:0;
  }
</style>
