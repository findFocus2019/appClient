<template>
	<view class="uni-page-body">
		<view class="uni-common-pa uni-bg-white uni-border-top">
			<view class="uni-h3">
				{{info.title}}
			</view>
      <view class="uni-text-small uni-text-gray">
      	{{ info.create_date }}
      </view>
		</view>
    
    <view class="uni-common-pa uni-bg-white uni-common-mt">
    	<rich-text :nodes="info.info"></rich-text>
    </view>
	</view>
</template>

<script>
    export default {
        computed:{
            info(){
                return this.$store.state.appNoticeData.info
            }
        }
    }
</script>

<style>
</style>
