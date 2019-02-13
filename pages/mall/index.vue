<template>
  <view class="uni-tab-bar">
    <!-- 固定在顶部的导航栏 -->
    <uni-nav-bar color="#333333" background-color="#FFFFFF" fixed="true" @click-right="cancelSearch" v-if="mallSearch.open">
      <view class="input-view uni-flex">
        <uni-icon type="search" size="22" color="#666666"></uni-icon>
        <input confirm-type="搜索" @focus="goSearch" class="input" type="text" placeholder="输入搜索关键词" v-model="mallSearch.text" />
        <uni-icon type="clear" size="22" color="#666666" @click="cancelSearch"></uni-icon>
      </view>
      <block slot="right">
        <view class="uni-common-pr">
          取消
        </view>
      </block>
    </uni-nav-bar>
    <uni-nav-bar color="#333333" background-color="#FFFFFF" fixed="true" @click-left="goSearch" @click-right="goCart"
      v-else>
      <block slot="left">
        <view class="uni-common-pl">
          <uni-icon type="search" size="22" color="#666666"></uni-icon>
        </view>
      </block>
      <view class="uni-flex" v-if="mallType == 1">
        <text class="uni-h4 uni-flex-item uni-right uni-common-pr">自营商城</text>
        <text class="uni-flex-item" @tap="changeType">京选商城</text>
      </view>
      <view class="uni-flex" v-if="mallType == 2">
        <text class="uni-flex-item uni-right uni-common-pr" @tap="changeType">自营商城</text>
        <text class="uni-h4 uni-flex-item">京选商城</text>
      </view>
      <block slot="right">
        <view class="uni-common-pr">
          <image lazy-load="true"  src="/static/icon/mall/cart.png" mode="widthFix" style="width: 60upx;"></image>
        </view>
      </block>
    </uni-nav-bar>
    <!-- 使用非原生导航栏后需要在页面顶部占位 -->
    <view :style="{height:topHideViewStyle + 'px'}" class="uni-common-pa">&nbsp;</view>
    <scroll-view id="tab-bar" class="uni-swiper-tab uni-bg-white" scroll-x :scroll-left="scrollLeft" :style="{position:'fixed' , top:topHideViewStyle + 'px',zIndex:198}"
      v-if="mallCategorys && mallCategorys.length">
      <view v-for="(tab,index) in mallCategorys" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']"
        :id="tab.id" :data-current="index" @click="tapTab(index)">{{tab.name}}</view>
    </scroll-view>

    <view class="uni-flex uni-common-pt uni-common-pb order-type-items" :style="{top:topHideViewStyle + 50 + 'px'}">
      <view class="uni-flex-item uni-center uni-flex" v-for="orderType in mallOrderTypes" :key="orderType.name" :class="['order-type-item', mallOrderActive.name === orderType.name ? 'active' : '']"
        @tap="listTypeChoose(orderType)">
        <text>{{orderType.text}}</text>
        <uni-icon type="arrowdown" size="22" v-if="orderType.type === 'desc'"></uni-icon>
        <uni-icon type="arrowup" size="22" v-else></uni-icon>

      </view>
      <view class="uni-flex-item uni-center">

      </view>
    </view>
    <swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab" :style="{position:'relative' , paddingTop:topHideViewStyle + 55 + 'px'}">
      <swiper-item v-for="(tab,index1) in tabDatas" :key="index1">
        <scroll-view class="list" scroll-y @scrolltolower="loadMore(index1)">
          <block v-for="(item,index2) in tab.rows" :key="index2">
            <view class="" @tap="goDetail(item)">
              <view class="" style="width: 100%;">
                <image lazy-load="true"  :src="item.cover" mode="widthFix" style="width: 100%;"></image>
              </view>
              <view class="uni-bg-white uni-common-pa ">
                <view class="">
                  <view class="uni-text-darker uni-title">
                    {{ item.title }}
                  </view>
                  <view class="uni-text-small uni-text-light uni-flex">

                    <view class="uni-flex-item uni-common-pr " style="width: 80%;">
                      <view class="uni-text-red uni-h4">
                        <!-- {{ '￥' + item.price_sell }} -->
                        <money :num="item.price_sell" />
                      </view>
                      <view class="uni-text-small uni-ellipsis" style="width: 100%;">
                        {{ item.description }}
                      </view>

                    </view>

                    <view class="uni-right" style="width: 100upx">
                      <image lazy-load="true"  src="/static/icon/mall/cart1.png" mode="widthFix" style="width: 100upx"></image>
                    </view>
                  </view>

                </view>

              </view>
            </view>
          </block>
          <view class="uni-tab-bar-loading">
            <uni-load-more :loadingType="tab.loadingType" :contentText="loadingText"></uni-load-more>
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>
<script>
  import uniIcon from '@/components/uni-icon.vue';
  import money from '@/components/money.vue';
  import uniNavBar from '@/components/uni-nav-bar.vue';
  import mediaList from '@/components/tab-nvue/mediaList.vue';
  import uniLoadMore from '@/components/uni-load-more.vue';
  import {
    mapState,
    mapActions
  } from "vuex";
  export default {
    components: {
      uniIcon,
      money,
      uniNavBar,
      mediaList,
      uniLoadMore
    },
    data() {
      return {
      
        topHideViewStyle: 0,
        loadingText: {
          contentdown: "上拉显示更多",
          contentrefresh: "正在加载...",
          contentnomore: "没有更多数据了"
        },
        scrollLeft: 0,
        isClickChange: false,
        tabIndex: 0,
        tabDatas: []
      }

    },
    computed: {
      ...mapState(['mallType', 'mallGoodsList', 'mallCategorys', 'mallSearch', 'mallOrderTypes', 'mallOrderActive']),
      
    },
    methods: {
      ...mapActions(['mallChangeType']),
      async listTypeChoose(orderType) {
        console.log('listTypeChoose orderType', orderType)
        let lastType = this.mallOrderActive
        if (lastType.name != orderType.name) {
          this.mallOrderActive.name = orderType.name
        } else {
          if (orderType.name !== 'sales') {
            orderType.type = (orderType.type) === 'desc' ? 'asc' : 'desc'
          }
        }

      },
      goCart() {
        uni.navigateTo({
          url: '/pages/mall/cart'
        })
      },
      goSearch() {
        this.mallSearch.open = true
        uni.navigateTo({
          url: '/pages/mall/search'
        })
      },
      cancelSearch() {
        this.mallSearch.open = false
        this.mallSearch.hasDone = false
        this.mallSearch.text = ''

        uni.reLaunch({
          url: '/pages/mall/index'
        })

      },
      changeType() {
        this.mallChangeType()
      },
      goDetail(item) {
        uni.navigateTo({
          url: '/pages/mall/goods?id=' + item.id
        })
      },
      async loadMore(e) {
        this.tabDatas[e].loadingType = 1;
        await this.addData(e);
        // 				setTimeout(() => {
        // 					
        // 				}, 1200);
      },
      async addData(e) {
        console.log('addData', e)
        // console.log(this.mallCategorys)
        // let category = this.mallCategorys[e].id
        let category = e
        await this.$store.dispatch('getGoodsList', {
          category: category
        })

      },
      async changeTab(e) {
        let index = e.detail.current;
        if (this.isClickChange) {
          this.tabIndex = index;
          this.isClickChange = false;
          return;
        }
        let tabBar = await this.getElSize("tab-bar"),
          tabBarScrollLeft = tabBar.scrollLeft;
        let width = 0;

        for (let i = 0; i < index; i++) {
          let result = await this.getElSize(this.mallCategorys[i].id);
          width += result.width;
        }
        let winWidth = uni.getSystemInfoSync().windowWidth,
          nowElement = await this.getElSize(this.mallCategorys[index].id),
          nowWidth = nowElement.width;
        if (width + nowWidth - tabBarScrollLeft > winWidth) {
          this.scrollLeft = width + nowWidth - winWidth;
        }
        if (width < tabBarScrollLeft) {
          this.scrollLeft = width;
        }
        this.isClickChange = false;
        this.tabIndex = index; //一旦访问data就会出问题

        if (this.mallSearch.open) {
          this.cancelSearch()
        }

        this.getNexTabData(index)
      },
      getElSize(id) { //得到元素的size
        return new Promise((res, rej) => {
          uni.createSelectorQuery().select('#' + id).fields({
            size: true,
            scrollOffset: true
          }, (data) => {
            res(data);
          }).exec();
        });
      },
      async tapTab(index) { //点击tab-bar
        if (this.tabIndex === index) {
          return false;
        } else {
          let tabBar = await this.getElSize("tab-bar"),
            tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
          this.scrollLeft = tabBarScrollLeft;
          this.isClickChange = true;
          this.tabIndex = index;
        }

        if (this.mallSearch.open) {
          this.cancelSearch()
        }

        this.getNexTabData(index)
      },
      async getNexTabData(index) {
        if (!this.mallCategorys[index + 1]) {
          return
        }
        let category = this.mallCategorys[index + 1].id

        await this.$store.dispatch('getGoodsList', {
          category: category
        })
      }
    },
    async onReady() {
      console.log('onReady')
      let navbar = uni.createSelectorQuery().select('.uni-navbar')
      navbar.boundingClientRect(data => {
        console.log("得到布局位置信息" + JSON.stringify(data));
        this.topHideViewStyle = data.height
      }).exec();
    },
    async onLoad() {
      console.log('onLoad')
      await this.$store.dispatch('getGoodsCategory')
      let mallCategorys = this.$store.state.mallCategorys
      console.log('mallCategorys', JSON.stringify(mallCategorys))
      
      let mallGoodsList = this.$store.state.mallGoodsList
      if (mallGoodsList.all && mallGoodsList.all.rows.length > 0) {
        // console.log(mallGoodsList.all)
        // this.tabDatas = this.$store.state.mallGoodsList
        // return
      }else {
        this.$store.state.goodsTimestamp = parseInt(Date.now() / 1000)
        let category = mallCategorys[0].id
        console.log('category', category)
        await this.$store.dispatch('getGoodsList', {
          category: category
        })
        if (mallCategorys.length > 1) {
          let category = mallCategorys[1].id
          console.log('category', category)
          await this.$store.dispatch('getGoodsList', {
            category: category
          })
        }
      }

      this.tabDatas = this.$store.state.mallGoodsList
      

      // this.tabDatas = this.randomfn()
      
    },
    onShow() {
      console.log('onShow')
      if (this.mallSearch.hasDone) {
        console.log('================搜索过')
        // 搜索跳转到tab0
        this.tapTab(0)
        // this.mallSearch.hasDone = false
      }
      
      
    },
    async onPullDownRefresh() {
      console.log('refresh');
      //         setTimeout(function () {
      //             uni.stopPullDownRefresh();
      //         }, 1000);
      let category = this.mallCategorys[this.tabIndex].id
      console.log('refresh  category', category)
      this.$store.state.mallGoodsList[category] = {}
      this.$store.state.mallGoodsList[category].rows = []
      this.$store.state.mallGoodsList[category].page = 1
      this.$store.state.mallGoodsList[category].order = []
      this.$store.state.mallGoodsList[category].timestamp = parseInt(Date.now() / 1000)

      await this.$store.dispatch('getGoodsList', {
        category: category
      })

      uni.stopPullDownRefresh();
    }
  }
</script>

<style>
  /* #ifdef MP-ALIPAY */
  .swiper-tab-list {
    display: inline-block;
  }

  /* #endif */

  .swiper-tab-list.active {
    color: #333333;
    font-size: 32upx;
  }

  .order-type-items {
    position: fixed;
    top: 100px;
    z-index: 199;
    width: 100%;
    background: #fff;
    border-top: 1px solid #EEEEEE;
  }

  .order-type-item.active {
    color: #d81e06;
  }

  .input-view {

    display: flex;
    background-color: #e7e7e7;
    height: 48upx;
    border-radius: 48upx;
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    line-height: 48upx;
  }

  .input-view .uni-icon {
    line-height: 48upx !important;
  }

  .input-view .input {
    height: 48upx;
    line-height: 48upx;
    width: 90%;
    padding: 0 3%;
  }
</style>
