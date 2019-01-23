<template>
	<view class="page">
		<swiper indicator-dots="true">
			<swiper-item v-for="(img,key) in imgUrls" :key="key">
				<image :src="img" />
			</swiper-item>
		</swiper>
    
    <view class="uni-common-pa">
    	<view class="uni-flex">
    		<view class="uni-flex-item">
    			优惠价
          <text class="uni-text-red uni-h4">￥ {{mallGoodsInfo.price_sell}}</text>
    		</view>
        <view class="uni-flex-item uni-text-gray" style="text-decoration: line-through;">
        	原价: ￥ {{ mallGoodsInfo.price_market }}
        </view>
        <view class="uni-flex-item uni-text-light">
        	积分可抵扣:￥ {{ mallGoodsInfo.price_score_sell}}
        </view>
    	</view>
    </view>
	</view>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  export default {
    data(){
      return {
        imgUrls: [
					"https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg",
					"https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg"
				],
      }
    },
    computed:{
      ...mapState(['mallGoodsInfo'])
    },
    methods:{
      
    },
    async onLoad(opt) {
      let id = opt.id
    	await this.$store.dispatch('getGoodsInfo' , {id: id})
    }
  }
</script>

<style lang="less">
  image,
	swiper,
	.img-view {
		width: 100%;
		// height: 500upx;
	}
  
</style>
