<template>
  <view class="page">
    <swiper indicator-dots="true">
      <swiper-item v-for="(img,key) in imgUrls" :key="key">
        <image :src="img" />
      </swiper-item>
    </swiper>

    <view class="uni-common-pa uni-bg-white">
      <view class="uni-flex goods-info-price">
        <view class="uni-flex-item">
          <text class="">优惠价</text>
          <text class="uni-text-red uni-h4">￥ {{mallGoodsInfo.price_sell}}</text>
        </view>
        <view class="uni-flex-item uni-text-gray" style="text-decoration: line-through;">
          <text class="">原价: ￥ {{ mallGoodsInfo.price_market }}</text>
        </view>
        <view class="uni-flex-item uni-text-light">
          <text class="">积分可抵扣:￥ {{ mallGoodsInfo.price_score_sell}}</text>
        </view>
      </view>

      <view class="uni-text-dark uni-h4">
        {{ mallGoodsInfo.title }}
      </view>

      <view class="uni-flex">
        <view class="uni-flex-item">
          <text class="uni-text-small uni-text-gray">已有{{mallGoodsInfo.sales}}人付款</text>
        </view>
        <view class="uni-flex-item uni-right">
          <text class="uni-text-small uni-text-gray">运费:包邮</text>
        </view>
      </view>


    </view>

    <view class="uni-common-mt uni-common-pt uni-bg-white">
      <uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" styleType="text"
        activeColor="#dd524d"></uni-segmented-control>

      <view class="content uni-common-mt uni-common-pa">
        <view v-show="current === 0">
          <rich-text :nodes="mallGoodsInfo.content"></rich-text>
        </view>
        <view v-show="current === 1">
          
        </view>
        <view v-show="current === 2">
          
        </view>
      </view>

    </view>
    
    <view class="goods-info-toolbar uni-flex uni-center">
    	<view class="uni-flex-item uni-text-light">
    		<uni-icon type="phone" size="24"></uni-icon>
        <view class="">
        	联系客服
        </view>
    	</view>
      <view class="uni-flex-item uni-text-light">
      	<uni-icon type="star" size="24"></uni-icon>
      	<view class="">
      		收藏
      	</view>
      </view>
      <view class="uni-flex-item uni-bg-yellow uni-text-light" @tap="cartAdd">
      	<text>加入购物车</text>
      </view>
      <view class="uni-flex-item uni-bg-red">
      	<text>立即购买</text>
      </view>
    </view>
    
    <uni-popup :show="showPopupBottom" type="bottom" msg="选择个数" @hidePopup="hidePopup">
      
      <view class="uni-input-row">
				<label>默认</label>
				<uni-number-box :min="0" :max="goodsInfoStock" :value="1" @change="cartNumChange"></uni-number-box>
			</view>
      
      <view class="uni-common-pa">
      	<button type="warn">确定</button>
      </view>
      
    </uni-popup>
  </view>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'
    import uniIcon from '@/components/uni-icon.vue';
    import uniPopup from '@/components/uni-popup.vue';
    	import uniNumberBox from '@/components/uni-number-box.vue'
  import uniSegmentedControl from '@/components/uni-segmented-control.vue';
  export default {
    components: {
      uniSegmentedControl,
      uniIcon,
      uniPopup,
      uniNumberBox
    },
    data() {
      return {
        items: [
          '商品介绍',
          '规格参数',
          '售后保障'
        ],
        current: 0,
        imgUrls: [
          "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg",
          "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg"
        ],
        showPopupBottom:false
      }
    },
    computed: {
      ...mapState(['mallGoodsInfo']),
      goodsInfoStock(){
        let stock = this.$store.state.mallGoodsInfo.stock
        if(stock == -1){
          return 100000000
        }else {
          return stock
        }
      }
    },
    methods: {
      onClickItem(index) {
        if (this.current !== index) {
          this.current = index;
        }
      },
      hidePopup(){
        this.showPopupBottom = false
      },
      cartAdd(){
        this.showPopupBottom = true
      }
    },
    async onLoad(opt) {
      let id = opt.id
      await this.$store.dispatch('getGoodsInfo', {
        id: id
      })
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

  .goods-info-price text {
    line-height: 60upx;
  }
  
  .content {
    min-height: 1000upx;
    padding-bottom: 120upx;
  }
  
  .goods-info-toolbar {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100upx;
    
    background: #fff;
    
    text {
      line-height: 100upx;
    }
  }
  
  .segmented-control {
    width: 100%;
  }
  
  .uni-popup-bottom {
    height: 400upx !important;
  }
</style>
