<template>
	<view class="uni-page-body" style="background: #f7f8fa;">
		
		<view class="uni-center" style="position: absolute;top: 0;left: 0;width: 100%;" @click="download">
			<image src="https://img-juren.oss-cn-shenzhen.aliyuncs.com/assets/images/guide.jpeg" mode="widthFix" style="width: 100%;"></image>
			<!-- <view class="" @click="download">
				下载发现焦点APP
			</view>
			
			<view class="uni-common-pa" v-if="!isWeixin">
				<button type="warn" class="uni-border-btn-radius"  @click="download">点击下载</button>
			</view> -->
		</view>
    
    <!-- <view class="uni-common-pa uni-right" v-if="isWeixin"  style="position: absolute;right: 30upx;top: 30upx;">
    	<uni-icon type="arrowthinup" size="80"></uni-icon>
    	<view class="">
    		点击在safari中打开
    	</view>
    </view> -->
    
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
    methods:{
      download(){
//         if(this.isWeiXin){
//           
//           uni.showToast({
//           	icon:'none',
//             title:'请使用默认浏览器打开'
//           })
//           
//           return
//         }
        
        let device = uni.getSystemInfoSync();
        console.log('divice info:' + JSON.stringify(device));
        if(device.platform == 'ios'){
          location.href = 'https://itunes.apple.com/cn/app/发现焦点/id1439012110'
          
        }else if(device.platform == 'android') {
          // location.href = 'https://www.pgyer.com/j5Um'
          location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.dfn.newdiscoverfocusnews'
        }
      }
    },
		onLoad(opt) {
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
			
      if(opt.operate){
        this.download()
      }
      
		}
	}
</script>

<style>
</style>
