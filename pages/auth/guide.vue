<template>
	<view class="uni-page-body uni-bg-white">
		
		
		<view class="uni-common-pa uni-right" v-if="isWeixin">
			<uni-icon type="arrowthinup" size="80"></uni-icon>
			<view class="">
				点击在safari中打开
			</view>
		</view>
		
		<view class="uni-common-pa uni-common-mt uni-center">
			<image src="/static/logo.png" mode="" style="width: 200upx;height: 200upx;margin-top: 100upx;"></image>
			<view class="">
				下载发现焦点APP
			</view>
			
			<view class="uni-common-pa" v-if="!isWeixin">
				<button type="warn" class="uni-border-btn-radius">点击下载</button>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon.vue';
	export default {
		data(){
			return {
				isWeixin:0
			}
		},
		components: {
			uniIcon
		},
		onLoad() {
			// #ifdef H5
			function isWeiXin(){
				//window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
				var ua = window.navigator.userAgent.toLowerCase();
				//通过正则表达式匹配ua中是否含有MicroMessenger字符串
				if(ua.match(/MicroMessenger/i) == 'micromessenger'){
				return true;
				}else{
				return false;
				}
			}
			
			this.isWeixin = isWeiXin()
			// #endif
			
		}
	}
</script>

<style>
</style>
