<template>
  <view class="page">
    <swiper indicator-dots="true">
      <swiper-item v-for="(img,key) in imgUrls" :key="key">
        <image :src="img" />
      </swiper-item>
    </swiper>

    <view class="uni-common-pa uni-bg-white">
      <view class="uni-flex goods-info-price">
        <view class="">
          <text class="uni-text-small">优惠价:</text>
					<text>￥</text>
          <text class="uni-text-red uni-h4">{{mallGoodsInfo.price_sell}}</text>
        </view>
        <view class="uni-text-gray uni-common-pl" style="text-decoration: line-through;">
          <text class="uni-text-small">原价:</text>
					<text>￥</text>
					<text>{{ mallGoodsInfo.price_market }}</text>
        </view>
        <view class="uni-text-light uni-common-pl">
          <text class="uni-text-small">积分可抵扣:</text>
					<text>￥</text>
					<text>{{ mallGoodsInfo.price_score_sell}}</text>
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

    <view class="goods-info-toolbar uni-flex uni-center uni-border-top">
      <view class="uni-flex-item uni-text-light" @tap="callServicePhone">
        <uni-icon type="phone" size="24"></uni-icon>
        <view class="">
          联系客服
        </view>
      </view>
      <view class="uni-flex-item uni-text-light" @tap="likeAction">
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

      <view class="uni-flex uni-common-pa uni-left uni-border-top uni-border-bottom">
        <view style="width: 200upx;">
          <image :src="mallGoodsInfo.cover" mode="widthFix" style="width: 200upx;height: 200upx;"></image>
        </view>
        <view class="uni-flex-item uni-common-pl">
          <view class="uni-text-dark uni-h4 uni-ellipsis-2" style="width: 430upx;height: 100upx;line-height: 50upx;">
            {{ mallGoodsInfo.title }} 
          </view>
          <view class="uni-flex">
            <view class="uni-flex-item">
              <text class="uni-text-small uni-text-gray">已有{{mallGoodsInfo.sales}}人付款</text>
            </view>
            <view class="uni-flex-item">
              <text class="uni-text-small uni-text-gray">积分可抵扣:￥ {{ mallGoodsInfo.price_score_sell}}</text>
            </view>
          </view>
          <view class="">
            <text class="uni-text-red uni-h4">￥ {{mallGoodsInfo.price_sell}}</text>
          </view>
        </view>
      </view>

      <view class="uni-input-row uni-border-bottom">
        <label>默认</label>
        <uni-number-box :min="0" :max="goodsInfoStock" :value="cartAddNum" @change="cartNumChange"></uni-number-box>
      </view>

      <view class="uni-common-pa">
        <button type="warn" @tap="cartAddConfirm">确定</button>
      </view>

    </uni-popup>
    
    <!-- #ifdef APP-PLUS -->
      <view class="cart-icon bottom" @tap="goCart">
    	<image src="/static/icon/mall/cart.png" mode="widthFix" style="width: 60upx;height: 60upx;"></image>
    </view>
    <!-- #endif -->
    <!-- #ifndef APP-PLUS -->
     <view class="cart-icon top" @tap="goCart">
    	<image src="/static/icon/mall/cart.png" mode="widthFix" style="width: 60upx;height: 60upx;"></image>
    </view>
    <!-- #endif -->
  
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
  import Cart from '@/static/js/cart.js'
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
        showPopupBottom: false,
        cartAddNum: 1,
      }
    },
    computed: {
      ...mapState(['hasLogin', 'userInfo', 'mallGoodsInfo']),
      goodsInfoStock() {
        let stock = this.$store.state.mallGoodsInfo.stock
        if (stock == -1) {
          return 100000000
        } else {
          return stock
        }
      }
    },
    methods: {
      ...mapActions(['goCart','goToLoginPage', 'callServicePhone']),
      onClickItem(index) {
        if (this.current !== index) {
          this.current = index;
        }
      },
      hidePopup() {
        this.showPopupBottom = false
      },
      cartAdd() {
        this.showPopupBottom = true
      },
      cartNumChange(data) {
        this.cartAddNum = data.val
      },
      cartAddConfirm() {
        let item = {}
        let goods = this.mallGoodsInfo
        if(!goods){
          uni.showToast({
            title: '添加购物车失败'
          }) 
          return 
        }
        item.id = goods.id
        item.title = goods.title
        item.cover = goods.cover
        item.type = goods.type
        item.price_sell = goods.price_sell
        item.price_vip = goods.price_vip
        item.price_score_sell = goods.price_score_sell
        item.price_score_vip = goods.price_score_vip
        item.check = false
       
        Cart.plus(item , this.cartAddNum)
        uni.showToast({
          title: '添加购物车成功'
        })
        this.showPopupBottom = false
      },
      likeAction() {
        if (!this.hasLogin) {
          this.goToLoginPage()
        }
        uni.showToast({
          title: '收藏成功'
        })
      }
    },
    async onLoad(opt) {
      // 获取商品信息
      let id = opt.id
      await this.$store.dispatch('getGoodsInfo', {
        id: id
      })

      // 设置添加数量
      this.cartAddNum = (this.goodsInfoStock > 0) ? 1 : 0
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
    height: 645upx !important;
  }
  
  .cart-icon{
    position: fixed;
    right: 10upx;
    z-index: 1000;
    width: 60upx;
    height: 60upx;
    border-radius: 40upx;
    opacity: 0.7;
    background: #000;
    padding: 10upx
  }
  
  .cart-icon.top {
    top: 10upx;  
  }
  
  .cart-icon.bottom {
    bottom: 110upx 
  }
</style>
