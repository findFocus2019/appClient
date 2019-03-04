<template>
  <view class="uni-page-body mall-goods-page uni-bg-white">

    <uni-nav-bar color="#333333" background-color="transparent" fixed="true" @click-left="goBack" @click-right="goCart">
      <!-- #ifndef MP -->
      <block slot="left">
        <view class="uni-common-pl">
          <uni-icon type="back" size="22" color="#666666" style="background: rgba(0,0,0,0.6);border-radius: 100%;"></uni-icon>
        </view>
      </block>
      <!-- #endif -->
      <block slot="right">
        <view class="uni-common-pl uni-common-pr">
          <image lazy-load="true" src="/static/icon/mall/cart.png" mode="widthFix" style="width: 48upx;height: 48upx;"></image>
        </view>
      </block>
    </uni-nav-bar>

    <swiper indicator-dots="true" v-if="imgUrls.length">
      <swiper-item v-for="(img,key) in imgUrls" :key="key">
        <image lazy-load="true" :src="img" style="height: 750upx;" />
      </swiper-item>
    </swiper>

    <view class="" v-else>
      <image :src="mallGoodsInfo.cover" mode="widthFix" style="width: 100%;"></image>
    </view>

    <view class="uni-common-pa uni-bg-white">
      <view class="uni-text-dark uni-h4">
        {{ mallGoodsInfo.title }}
      </view>
      <view class="uni-flex goods-info-price">
        <view class="">
          <text class="uni-text-small">优惠价:</text>
          <view class="uni-text-red uni-inline-block">
            <money :num="mallGoodsInfo.price_sell" size="30" />
          </view>
        </view>
        <view class="uni-text-gray uni-common-pl" style="text-decoration: line-through;">
          <text class="uni-text-small">原价:</text>
          <money :num="mallGoodsInfo.price" />
        </view>
        <view class="uni-text-light uni-common-pl">
          <text class="uni-text-small">积分可抵扣:</text>
          <money :num="mallGoodsInfo.price_score_sell" />
        </view>
      </view>

      <view class="">
        <text class="uni-text-small">VIP价:</text>
        <view class="uni-text-red uni-inline-block">
          <money :num="mallGoodsInfo.price_vip" size="30" />
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

    <view class="uni-common-mt uni-bg-white  uni-border-top">
      <view class="uni-border-bottom">
        <uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" styleType="text"
          activeColor="#d81e06"></uni-segmented-control>
      </view>

      <view class="content uni-common-mt uni-common-pa">
        <view v-show="current === 0">
          <rich-text :nodes="mallGoodsInfo.content"></rich-text>
        </view>
        <view v-show="current === 1">
          <view class="" v-if="mallGoodsInfo.img_1">
            <image lazy-load="true" :src="mallGoodsInfo.img_1" mode="widthFix" style="width: 100%;"></image>
          </view>
        </view>
        <view v-show="current === 2">
          <view class="" v-if="mallGoodsInfo.img_2">
            <image lazy-load="true" :src="mallGoodsInfo.img_2" mode="widthFix" style="width: 100%;"></image>
          </view>

        </view>
      </view>

    </view>

    <view class="goods-info-toolbar uni-flex uni-center uni-border-top">
      <view class="uni-flex-item uni-text-light" @tap="callServicePhone">
        <view class="" style="height: 50upx;line-height: 50upx;">
          <uni-icon type="phone" size="24"></uni-icon>
        </view>

        <view class="" style="height: 50upx;line-height: 50upx;">
          客服
        </view>
      </view>
      <view class="uni-flex-item uni-text-light" @tap="collectionAction">
        <view class="" style="height: 50upx;line-height: 50upx;">
          <uni-icon type="star-filled" size="24" v-if="mallGoodsInfo.isCollection == 1" color="#d81e06"></uni-icon>
          <uni-icon type="star" size="24" v-else></uni-icon>
        </view>

        <view class="" style="height: 50upx;line-height: 50upx;">
          收藏
        </view>
      </view>
      <view class="uni-flex-item uni-text-light" @tap="goodsShare">
        <view class="" style="height: 50upx;line-height: 50upx;">
          <image src="/static/icon/posts/share.png" mode="" style="width: 40upx;height: 40upx;margin-top: 10upx;"></image>
        </view>
        <view class="" style="height: 50upx;line-height: 50upx;">
          分享
        </view>
      </view>
      <view class="uni-bg-yellow uni-text-light" @tap="cartAdd" style="width: 200upx;">
        <text>加入购物车</text>
      </view>
      <view class=" uni-bg-red" @tap="readyToBuy" style="width: 200upx;">
        <text>立即购买</text>
      </view>
    </view>

    <uni-popup :show="showPopupBottom" type="bottom" msg="选择" @hidePopup="hidePopup">

      <view class="uni-left" v-if="mallGoodsInfo.type == 2">
        <user-address :address="userAddressCurrent" v-if="userAddressCurrent.id"></user-address>
        <user-address v-else></user-address>
      </view>

      <view class="uni-flex uni-common-pa uni-left uni-border-top uni-border-bottom">
        <view style="width: 200upx;">
          <image lazy-load="true" :src="mallGoodsInfo.cover" mode="widthFix" style="width: 200upx;height: 200upx;"></image>
        </view>
        <view class="uni-flex-item uni-common-pl">
          <view class="uni-text-dark uni-h4 uni-ellipsis" style="width: 430upx;line-height: 50upx;">
            {{ mallGoodsInfo.title }}
          </view>
          <view class="">
            <view class="uni-text-red">
              <money :num="mallGoodsInfo.price_sell" size="36" />
              <view class="uni-text-small uni-text-gray uni-common-ml-sm uni-inline-block">
                积分可抵扣:
                <money :num="mallGoodsInfo.price_score_sell" />
              </view>
            </view>
            <view class="uni-text-red">
              VIP
              <money :num="mallGoodsInfo.price_vip" size="30" />
              <view class="uni-text-small uni-text-gray uni-common-ml-sm uni-inline-block">
                积分可抵扣:
                <money :num="mallGoodsInfo.price_score_vip" />
              </view>
              <text class="uni-text-small uni-text-dark"></text>
            </view>
          </view>
        </view>
      </view>

      <view class="uni-input-row uni-border-bottom">
        <label>默认</label>
        <uni-number-box :min="0" :max="goodsInfoStock" :value="cartAddNum" @change="cartNumChange" :disabled="true"></uni-number-box>
      </view>

      <view class="uni-common-pa">
        <button type="warn" @tap="cartAddConfirm" v-if="goodsInfoStock != 0" class="uni-border-btn-radius">确定</button>
        <view class="uni-bg-gray uni-border-btn-radius uni-common-pt uni-common-pb" v-else>
          无库存
        </view>
      </view>



    </uni-popup>

    <!-- <view class="cart-icon bottom" @tap="goCart">
    	<image lazy-load="true"  src="/static/icon/mall/cart.png" mode="widthFix" style="width: 60upx;height: 60upx;"></image>
    </view> -->

    <score-show :info="scoreInfo"></score-show>
  </view>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'
  import Share from '@/static/js/share.js';
  import uniIcon from '@/components/uni-icon.vue';
  import uniPopup from '@/components/uni-popup.vue';
  import uniNumberBox from '@/components/uni-number-box.vue'
  import uniSegmentedControl from '@/components/uni-segmented-control.vue';
  import userAddress from '@/components/user/user-address.vue';
  import uniNavBar from '@/components/uni-nav-bar.vue';
  import money from '@/components/money.vue';
  import scoreShow from '@/components/score-show.vue';
  import Cart from '@/static/js/cart.js';
  export default {
    components: {
      uniSegmentedControl,
      uniIcon,
      uniPopup,
      uniNumberBox,
      uniNavBar,
      scoreShow,
      money,
      userAddress
    },
    data() {
      return {
        items: [
          '商品介绍',
          '规格参数',
          '售后保障'
        ],
        current: 0,
        imgUrls: [],
        showPopupBottom: false,
        cartAddNum: 1,
        addType: 0,
        scoreInfo: ''
        // shareId:0,
        // postId:0
      }
    },
    computed: {
      ...mapState(['hasLogin', 'userInfo', 'mallGoodsInfo', , 'miniAppId', 'miniAppOrId', 'webDomain',
        'userAddressCurrent', 'userAddressList'
      ]),
      shareId() {
        return this.$store.state.inviteShareId
      },
      postId() {
        return this.$store.state.invitePostId
      },
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
      ...mapActions(['goCart', 'goToLoginPage', 'callServicePhone']),
      goBack() {
        uni.navigateBack({
          delta: 1
        })
      },
      scoreShowPop(info) {
        this.scoreInfo = info
        setTimeout(() => {
          this.scoreInfo = ''
        }, 3000)
      },
      onClickItem(e) {
        console.log(e)
        this.current = e
      },
      hidePopup() {
        this.showPopupBottom = false
      },
      cartAdd() {
        this.addType = 0
        this.showPopupBottom = true
      },
      readyToBuy() {
        if (!this.hasLogin) {
          uni.navigateTo({
            url: '/pages/auth/login'
          })
          return
        }
        this.addType = 1
        this.showPopupBottom = true
      },
      cartNumChange(data) {
        this.cartAddNum = data.val
      },
      async cartAddConfirm() {
        let item = {}
        let goods = this.mallGoodsInfo
        if (!goods) {
          uni.showToast({
            icon: 'none',
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
        item.uuid = goods.uuid
        item.price_express = 0 // TODO运费

        console.log('cartAddConfirm item =======', item)

        let num = this.cartAddNum
        
        // 判断jd商品库存
        if(goods.type == 2){
          let stockRet = await this.getStockJd(goods.uuid, num)
          if(!stockRet){
            uni.showToast({
              icon: 'none',
              title: '京选商品库存不足'
            })
            return
          }
        }
        
        if (num <= 0) {
          uni.showToast({
            icon: 'none',
            title: '请选择商品数量'
          })
          return
        }
        
        if (this.addType == 0) {
          Cart.plus(item, this.cartAddNum)
          uni.showToast({
            title: '添加购物车成功'
          })
        } else if (this.addType == 1) {
          // 直接购买
          item.num = this.cartAddNum
          console.log('立即购买 item:', JSON.stringify(item))
          this.$store.state.cartListBuyItem = item
          // 发票默认不选
          this.$store.state.mallOrderConfirm.invoice = 0 //
          // return 
          uni.showLoading({
            title: '提交中...'
          })

          let page = '/pagesMall/mall/cartConfirm?type=1'
          if (goods.type == 2) {
            page += '&jdOrder=1'
          }
          setTimeout(() => {
            uni.navigateTo({
              url: page
            })
            uni.hideLoading()
          }, 1000)

        }

        this.showPopupBottom = false
      },
      async collectionAction() {
        if (!this.hasLogin) {
          this.goToLoginPage()
          return
        }


        console.log('postCollection')
        let params = {
          category: 'goods',
          type: 0,
          goods_id: this.mallGoodsInfo.id
        }
        uni.showLoading({
          mask: true,
          title: '提交中...'
        })
        let ret = await this.$store.dispatch('userCollectionAction', params)
        uni.hideLoading()
        if (ret.code == 0) {
          uni.showToast({
            title: ret.message,
            icon: 'success'
          })
          if (ret.data) {
            let score = ret.data.score || 0
            if (score) {
              this.scoreShowPop('收藏商品获得' + ret.data.score + '积分')
              //               uni.showToast({
              //               	title:'收藏商品获得'+ ret.data.score + '积分',
              //                 icon:'success'
              //               })
            }
          }
          this.$store.dispatch('getGoodsInfo', {
            id: this.mallGoodsInfo.id
          })
        } else {
          uni.showToast({
            title: ret.message,
            icon: 'none'
          })
        }
      },
      async goodsShare() {
        // #ifdef MP-WEIXIN
        uni.navigateTo({
          url: '/pages/auth/guide'
        })
        // #endif
        // 分享
        if (!this.hasLogin) {
          uni.navigateTo({
            url: '/pages/auth/login'
          })
          return
        }

        let shareId = 0
        let params = {}
        params.category = 'goods'
        params.post_id = 0
        params.goods_id = this.mallGoodsInfo.id || 0
        let shareRet = await this.$store.dispatch('userShareInfoGet', params)
        if (shareRet.code == 0) {
          let shareData = shareRet.data.info
          shareId = shareData.id
        } else {
          uni.showToast({
            icon: 'none',
            title: '分享发生错误，请稍后重试'
          })
          return
        }

        let sharePage = 'pagesMall/mall/goods'
        sharePage = sharePage + '?id=' + this.mallGoodsInfo.id + '&puid=' + this.userInfo.id + '&share_id=' + shareId
        let shareUrl = this.webDomain + '/' + sharePage
        // let postType = this.postInfo.type
        // console.log()
        console.log('分享 ：', shareUrl)
        let shareData = {
          title: this.mallGoodsInfo.title,
          description: this.mallGoodsInfo.description,
          href: shareUrl,
          imgUrl: this.mallGoodsInfo.cover + '!goodsCover',
          // imgUrl:'http://image.sinajs.cn/newchart/hk_stock/min_660/01652.gif',
          miniAppId: this.miniAppOrId,
          miniPage: sharePage
        }
        console.log('shareData:', JSON.stringify(shareData))
        uni.showActionSheet({
          itemList: ['分享给QQ好友', '分享到微信朋友圈', '分享到微信小程序'],
          success: (e) => {
            let index = e.tapIndex
            if (index == 0) {
              Share.qq(shareData)
            } else if (index == 1) {
              Share.wx(shareData, 1)
            } else if (index == 2) {
              Share.mini(shareData, 0)
            }
          }
        })
      },
      async getAlbums(id) {
        let albumsRet = await this.$store.dispatch('getAlbums', {
          type: 'goods',
          type_id: id
        })
        console.log('albumsRet =========:' + JSON.stringify(albumsRet))
        if (albumsRet.code == 0) {
          this.imgUrls = []
          let rows = albumsRet.data.rows || []
          rows.forEach(row => {
            this.imgUrls.push(row.img)
          })
        }
      },
      async getStockJd(skuId, num) {
        let address = this.userAddressCurrent
        if(!address.id){
          return false
        }
        let areas = [address.province , address.city, address.county, address.town]
        let area = areas.join('_')
        let skuNums = JSON.stringify([{
            skuId: skuId,
            num: 100
          }])
        let ret = await this.$store.dispatch('getJdGoodsStock', {
          skuNums:skuNums ,
          area: area
        })
        console.log('getJdGoodsStock ret:' + JSON.stringify(ret))
        if(ret.code == 0){
          let rets = ret.data
          let stockStateId= 0
          rets.forEach(item => {
            if(item.skuId == skuId){
              stockStateId = item.stockStateId
            }
          })
    
          if(stockStateId != 33){
            return false
          }
        }else {
          return false
        }
        
        // return false
        return true;
      }
    },
    async onLoad(opt) {
      console.log('onLoad=======================')
      console.log('opt:' + JSON.stringify(opt))
      // 获取商品信息
      let id = opt.id
      this.$store.state.mallGoodsInfo = {}
      await this.getAlbums(id)

      // 分享，评测
      let shareId = opt.share_id || 0
      let postId = opt.post_id || 0
      if (shareId) {
        this.$store.state.inviteShareId = shareId
      }
      if (postId) {
        this.$store.state.invitePostId = postId
      }

      await this.$store.dispatch('getGoodsInfo', {
        id: id,
        share_id: shareId
      })

      // 邀请人
      let inviteUserId = opt.puid || 0
      if (inviteUserId) {
        this.$store.state.inviteUserId = inviteUserId
      }

      console.log('mallGoodsInfo', this.mallGoodsInfo)

      // 设置添加数量
      this.cartAddNum = (this.goodsInfoStock > 0) ? 1 : 0


      if (this.hasLogin && !this.userAddressList.length) {
        this.$store.dispatch('userAddressGet')
      }

      console.log('userAddressCurrent', this.userAddressCurrent)
    },
    async onShow() {
      console.log('onShow=======================')
      if (this.mallGoodsInfo.id) {
        let ret = await this.$store.dispatch('getGoodsInfo', {
          id: this.mallGoodsInfo.id
        })
        console.log('onShow getGoodsInfo ret ==============', JSON.stringify(ret))

        this.getAlbums(this.mallGoodsInfo.id)
      }
    },
    onNavigationBarButtonTap() {
      this.goCart()
      // this.goodsShare()
    }
  }
</script>

<style lang="less">
  image,
  swiper,
  .img-view {
    width: 100%;
    height: 700upx;
    // height: 500upx;
  }

  .mall-goods-page {
    //     height: 100%;
    //     overflow: auto;
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
    // height: 645upx !important;
  }

  .cart-icon {
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

  .uni-popup-bottom {
    position: fixed;
  }
</style>
