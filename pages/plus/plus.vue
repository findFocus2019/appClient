<template>
	<view class="uni-page-body uni-page-plus">
		<view class="uni-page-plus-up">
			<view class="uni-center bg">
				<image lazy-load="true"  src="../../static/img/plus/bg.png" mode="scaleToFill"></image>
			</view>
      <view class="content">
      	<view class="uni-flex">
      		<view class="title left">
      			往左:
      		</view>
          <view class="uni-flex-item info">
          	评测产品将会提高个人关注度
          </view>
      	</view>
        
        <view class="uni-flex uni-common-mt">
        	<view class="title right">
        		往右:
        	</view>
          <view class="uni-flex-item info">
          	为产品代言，分享越多奖励拿到你手软
          </view>
        </view>
      </view>
		</view>
    <view class="uni-page-plus-down uni-common-pl uni-common-pr">
      
    	<view class="uni-common-pl uni-common-pr uni-flex">
    		<view class="uni-flex-item uni-common-pl uni-common-pr" @tap="goToPage('/pagesPlus/plus/post')">
    			<view class="">
    				<image lazy-load="true"  src="../../static/img/plus/post.png" mode="scaleToFill" style="width: 160upx;height: 160upx;"></image>
    			</view>
          <view class="uni-bold plus-item-title">
          	发布评测
          </view>
    		</view>
        <view class="uni-flex-item uni-right uni-common-pl uni-common-pr"  @tap="goToPage('/pagesPlus/plus/goods')">
        	<view class="">
        		<image lazy-load="true"  src="../../static/img/plus/share.png" mode="scaleToFill" style="width: 160upx;height: 160upx;"></image>
        	</view>
        	<view class="uni-bold plus-item-title">
        		代言分享
        	</view>
        </view>
    	</view>
      
      
    </view>
    
    <view class="uni-center plus-close">
    	<uni-icon type="close" size="60" @click="back" color="#666666"></uni-icon>
    </view>
	</view>
</template>

<script>
  import uniIcon from '@/components/uni-icon.vue';
  import {mapState} from 'vuex';
	export default {
    components:{
      uniIcon
    },
		data() {
			return {
				
			};
		},
    computed:{
      ...mapState(['hasLogin'])
    },
    methods:{
      back(){
        uni.showTabBar()
        uni.switchTab({
        	url:'/pages/main/main'
        })
      },
      goToPage(page){
        if(!this.hasLogin){
          uni.navigateTo({
          	url:'/pages/auth/login'
          })
          return
        }
        uni.navigateTo({
        	url:page
        })
      }
    },
    onLoad() {
    	uni.hideTabBar({})
    },
    onShow() {
    	uni.hideTabBar({})
    }
	}
</script>

<style lang="less">
  .uni-page-plus {
    height: 100%;
  }
  
  .uni-page-plus-up {
    height: 60%;
    background: linear-gradient(#fdf7de, #f8f3f0);
    
    .bg {
      position: relative;
      top: 200upx;
      height: 0;
    }
    
    .content {
      position: relative;
      top: 200upx;
      padding: 90upx 160upx;
      
      .title {
        color: #ff7b00;
        font-size: 48upx;
        line-height: 1.2;
      }
      
      .title.right {
        color: #7798ff;
      }
      
      .info {
        color: #999999;
        font-size: 32upx;
        padding-left: 10upx;
        line-height: 1.5;
      }
    }
  }
  
  .uni-page-plus-down {
    height: 40%;
    background:linear-gradient(#f8f3f0, #fdf7de);
  }
  
  .plus-item-title {
    display: inline-block;
    font-size: 32upx;
    width: 160upx;
    text-align: center;
  }
  
  .plus-close {
    position: fixed;
    bottom: 100upx;
    width: 100%;
  }
</style>
