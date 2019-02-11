<template>
  <view class="page">
    <swiper indicator-dots="true">
      <swiper-item v-for="(img,key) in imgUrls" :key="key">
        <image :src="img" />
      </swiper-item>
    </swiper>

    <view class="uni-common-pa uni-bg-white">
      <view class="uni-text-dark uni-h4">
        {{ mallGoodsInfo.title }}
      </view>
      <view class="uni-flex goods-info-price">
        <view class="">
          <text class="uni-text-small">优惠价:</text>
          <view class="uni-text-red uni-inline-block">
            <money :nums="[mallGoodsInfo.price_sell,mallGoodsInfo.price_score_sell]" size="30" />
          </view>
        </view>
        <view class="uni-text-gray uni-common-pl" style="text-decoration: line-through;" >
          <text class="uni-text-small">原价:</text>
					<money :num="mallGoodsInfo.price_market" />
        </view>
        <view class="uni-text-light uni-common-pl" >
          <text class="uni-text-small">积分可抵扣:</text>
					<money :num="mallGoodsInfo.price_score_sell" />
        </view>
      </view>
      
      <view class="">
        <text class="uni-text-small">VIP价:</text>
        <view class="uni-text-red uni-inline-block">
          <money :nums="[mallGoodsInfo.price_vip, mallGoodsInfo.price_score_vip]" size="30" />
        </view>
      	
        <text class="uni-text-small uni-common-ml-sm ">积分可抵扣:</text>
        <money :num="mallGoodsInfo.price_score_vip" />
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
        activeColor="#d81e06"></uni-segmented-control>

      <view class="content uni-common-mt uni-common-pa">
        <view v-show="current === 0">
          <rich-text :nodes="mallGoodsInfo.content"></rich-text>
        </view>
        <view v-show="current === 1">
          <view class="" v-if="mallGoodsInfo.img_1">
          	<image :src="mallGoodsInfo.img_1" mode="widthFix" style="width: 100%;"></image>
          </view>
        </view>
        <view v-show="current === 2">
          <view class="" v-if="mallGoodsInfo.img_2">
          	<image :src="mallGoodsInfo.img_2" mode="widthFix" style="width: 100%;"></image>
          </view>
          
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
      <view class="uni-flex-item uni-text-light" @tap="collectionAction">
        <uni-icon type="star-filled" size="24" v-if="mallGoodsInfo.isCollection == 1" color="#d81e06"></uni-icon>
        <uni-icon type="star" size="24" v-else></uni-icon>
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
          <view class="uni-text-dark uni-h4 uni-ellipsis" style="width: 430upx;line-height: 50upx;">
            {{ mallGoodsInfo.title }} 
          </view>
          <view class="">
            <view class="uni-text-red" >
              <money :nums="[mallGoodsInfo.price_sell,mallGoodsInfo.price_score_sell]" size="36" />
              <view class="uni-text-small uni-text-gray uni-common-ml-sm uni-inline-block" >
                积分可抵扣:
                <money :num="mallGoodsInfo.price_score_sell" />
              </view>
            </view>
            <view class="uni-text-red">
              
              <money :nums="[mallGoodsInfo.price_vip,mallGoodsInfo.price_score_vip]" size="30" />
              <view class="uni-text-small uni-text-gray uni-common-ml-sm uni-inline-block" >
                积分可抵扣:
                <money :num="mallGoodsInfo.price_score_vip" />
              </view>
              <text class="uni-text-small uni-text-dark">(VIP)</text>
            </view>
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
  import money from '@/components/money.vue';
  import Cart from '@/static/js/cart.js';
  export default {
    components: {
      uniSegmentedControl,
      uniIcon,
      uniPopup,
      uniNumberBox,
      money
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
        shareId:0,
        postId:0
      }
    },
    computed: {
      ...mapState(['hasLogin', 'userInfo', 'mallGoodsInfo']),
      goodsInfoStock() {
        let stock = this.$store.state.mallGoodsInfo.stock || 0
        if (stock == -1) {
          return 100000000
        } else {
          return stock
        }
      }
    },
    methods: {
      ...mapActions(['goCart','goToLoginPage', 'callServicePhone']),
      onClickItem(e){
        console.log(e)
        this.current = e
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
        item.price_cost = goods.price_cost
        item.price_market = goods.price_market
        item.check = false
        item.share_id = this.shareId
        item.post_id = this.postId
       
        Cart.plus(item , this.cartAddNum)
        uni.showToast({
          title: '添加购物车成功'
        })
        this.showPopupBottom = false
      },
      async collectionAction() {
        if (!this.hasLogin) {
          this.goToLoginPage()
          return
        }
        
        
        console.log('postCollection')
        let params = {
          category:'goods',
          type: 0,
          goods_id: this.mallGoodsInfo.id
        }
        uni.showLoading({
        	mask:true,
          title:'提交中...'
        })
        let ret = await this.$store.dispatch('userCollectionAction' , params)
        uni.hideLoading()
        if(ret.code== 0){
          if(ret.data){
            let score = ret.data.score || 0
            if(score){
              uni.showToast({
              	title:'收藏商品获得'+ ret.data.score + '积分',
                icon:'success'
              })
            }
          }
          this.$store.dispatch('getGoodsInfo' , {id: this.mallGoodsInfo.id})
        }else {
          uni.showToast({
          	title:ret.message,
            icon:'none'
          })
        }
      }
    },
    async onLoad(opt) {
      // 获取商品信息
      let id = opt.id
      this.$store.state.mallGoodsInfo = {}
      await this.$store.dispatch('getGoodsInfo', {
        id: id
      })
      this.shareId = opt.share_id || 0
      this.postId = opt.post_id || 0
      
      console.log('mallGoodsInfo' , this.mallGoodsInfo)

      // 设置添加数量
      this.cartAddNum = (this.goodsInfoStock > 0) ? 1 : 0
    },
    async onShow() {
    	if(this.mallGoodsInfo.id){
    	  let ret = await this.$store.dispatch('getGoodsInfo' , {id: this.mallGoodsInfo.id})
    	  console.log('onShow getGoodsInfo ret ==============' , JSON.stringify(ret))
    	  
    	}
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
