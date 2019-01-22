<template>
  <view class="uni-page-body">
    <!-- #ifndef MP -->
    <!-- 固定在顶部的导航栏 -->
    <uni-nav-bar color="#333333" background-color="#FFFFFF" fixed="true" @click-left="search" @click-right="cart">
      <block slot="left">
        <view class="uni-common-pl">
          <uni-icon type="search" size="22" color="#666666"></uni-icon>
        </view>
      </block>
      <view class="input-view uni-center" v-if="mallType == 1" id="mall-nav-bar">
        <text class="uni-h4 uni-common-pr">自营商城</text>
        <text class="uni-common-pl" @tap="changeType">京东商城</text>
      </view>
      <view class="input-view uni-center" v-if="mallType == 2">
        <text class="uni-common-pr" @tap="changeType">自营商城</text>
        <text class="uni-h4">京东商城</text>
      </view>
      <block slot="right">
        <view class="uni-common-pr">
          <uni-icon type="search" size="22" color="#666666"></uni-icon>
        </view>
      </block>
    </uni-nav-bar>
    <!-- 使用非原生导航栏后需要在页面顶部占位 -->
    <view :style="{height:topHideViewStyle + 'px'}">&nbsp;</view>
    <!-- #endif -->

    <view class="uni-tab-bar uni-bg-white">
      <scroll-view id="tab-bar" class="uni-swiper-tab uni-bg-white" scroll-x :scroll-left="scrollLeft" style="position: fixed;z-index: 997;">
        <view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']"
          :id="tab.id" :data-current="index" @click="tapTab(index)">{{tab.name}}</view>
      </scroll-view>
      
     <!-- <view class="uni-flex uni-center uni-bg-white" style="margin-top: 110upx;">
        <view class="uni-flex-item uni-common-pa" @tap="listTypeChoose(orderType)" :class="['order-type-item', order.type == orderType.name ? 'active' : '']"
          v-for="(orderType,index) in orderTypes" :key="orderType.name">
          {{orderType.text}}
          <uni-icon type="arrowdown" v-if="orderType.type === 'desc'"></uni-icon>
          <uni-icon type="arrowup" v-else></uni-icon>
        </view>
        <view class="uni-flex-item uni-common-pa" :class="['order-type-item', order.type == 'default' ? 'active' : '']">
      
        </view>
      </view> -->
      
      <swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab" :style="{'min-height':swiperBoxHeight + 'px'}">
      	<swiper-item v-for="(list,index1) in tabLists" :key="index1">
      		<scroll-view class="list" scroll-y @scrolltolower="loadMore(index1)">

              <view class="" v-for="(item,index2) in list.rows" :key="index2">
              	<view class="mall-goods-list">
              		<view class="goods-item-cover">
              			<image :src="item.cover" mode="widthFix" style="width: 100%;"></image>
              		</view>
              	  <view class="uni-common-pa">
              	  	<view class="uni-h4">
              	  		{{ item.title }}
              	  	</view>
              	    <view class="uni-flex">
              	    	<view class="uni-flex-item">
              	    		<view class="">
              	    			<text class="uni-text-red">{{item.price_sell}}</text>
              	    		</view>
              	        <view class="uni-text-light">
              	        	{{ item.description}}
              	        </view>
              	    	</view>
              	      <view class="uni-flex-item" style="width: 10%;">
              	      	
              	      </view>
              	    </view>
              	  </view>
              	</view>
              </view>
     
      			<view class="uni-tab-bar-loading">
      				<uni-load-more :loadingType="list.loadingType" :contentText="loadingText"></uni-load-more>
      			</view>
      		</scroll-view>
      	</swiper-item>
      </swiper>
      
    </view>

    


  </view>

</template>

<script>
  import uniNavBar from '../../components/uni-nav-bar.vue';
  import uniIcon from '../../components/uni-icon.vue';
  import uniLoadMore from '../../components/uni-load-more.vue';
  import {
    mapState,
    mapActions
  } from "vuex";
  export default {
    data() {
      return {
        topHideViewStyle: 0,
        swiperBoxHeight: 600,
        scrollLeft: 0,
        isClickChange: false,
        tabIndex: 0,
        tabLists:[],
        order: {
          type: 'default'
        },
        orderTypes: [{
          name: 'default',
          text: '综合',
          type: 'desc'
        }, {
          name: 'sell',
          text: '销量',
          type: 'desc'
        }, {
          name: 'price',
          text: '价格',
          type: 'desc'
        }],
        loadingText: {
          contentdown: "上拉显示更多",
          contentrefresh: "正在加载...",
          contentnomore: "没有更多数据了"
        },
        tabBars: [{
          name: '关注',
          id: 'guanzhu'
        }, {
          name: '推荐',
          id: 'tuijian'
        }, {
          name: '体育',
          id: 'tiyu'
        }, {
          name: '热点',
          id: 'redian'
        }, {
          name: '财经',
          id: 'caijing'
        }, {
          name: '娱乐',
          id: 'yule'
        }, {
          name: '军事',
          id: 'junshi'
        }, {
          name: '历史',
          id: 'lishi'
        }, {
          name: '本地',
          id: 'bendi'
        }]
      }
    },
    components: {
      uniNavBar,
      uniIcon,
      uniLoadMore
    },
    computed: {
      ...mapState(['mallType', 'mallGoodsList'])
    },
    methods: {
      ...mapActions(['mallChangeType']),
      changeType() {
        this.mallChangeType()
        //         uni.redirectTo({
        //         	url:'/pages/mall/list'
        //         })
      },
      search() {
        uni.redirectTo({
          url: '/pages/mall/search'
        })
      },
      cart() {

      },
      loadMore(e) {
        this.tabLists[e].loadingType = 1;
        setTimeout(() => {
          this.addData(e);
        }, 1200);
      },
      addData(e) {
        console.log('addData' , 0)
        let item = (index) => {
          return {
            title: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题' + index,
            cover: 'http://placehold.it/300x200',
            price_market: '100.00',
            price_sell: '98.00',
            price_vip: '95.00',
            description: '商品描述描述描述商品描述描述描述商品描述描述描述商品描述描述描述商品描述描述描述'
          }
        }
        
        for (let i = 1; i <= 10; i++) {
          this.tabLists[e].rows.push(item(i));
        }
        console.log('list',JSON.stringify(this.tabLists[e]))
        this.tabLists[e].loadingType = 1;
        
        // this.tabLists = this.mallGoodsList[this.mallType]
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
      async getTabData(index) {
        let tabData = this.tabBars[index]
        console.log('tabData', tabData)

        let item = (index) => {
          return {
            title: '标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题' + index,
            cover: 'http://placehold.it/300x200',
            price_market: '100.00',
            price_sell: '98.00',
            price_vip: '95.00',
            description: '商品描述描述描述商品描述描述描述商品描述描述描述商品描述描述描述商品描述描述描述'
          }
        }
        this.mallGoodsList[this.mallType][index] = {
          rows: [item(index), item(index + 1)]
        }

        if (index < this.tabBars.length - 1) {
          this.mallGoodsList[this.mallType][index + 1] = {
            rows: [item(index), item(index + 1)]
          }
        }

      },
      async tapTab(index) { //点击tab-bar
        if (this.tabIndex === index) {
          return false;
        } else {
          let tabBar = await this.getElSize("tab-bar"),
            tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
          this.scrollLeft = tabBarScrollLeft;
          this.isClickChange = true;
          console.log('tapTab index', index)

          await this.getTabData(index)
          this.tabIndex = index;
        }

      },
      async changeTab(e) {
        let index = e.detail.current;
        if (this.isClickChange) {
          this.tabIndex = index;
          this.isClickChange = false;

          this.getTabData(index)
          return;
        }
        let tabBar = await this.getElSize("tab-bar"),
          tabBarScrollLeft = tabBar.scrollLeft;
        let width = 0;

        for (let i = 0; i < index; i++) {
          let result = await this.getElSize(this.tabBars[i].id);
          width += result.width;
        }
        let winWidth = uni.getSystemInfoSync().windowWidth,
          nowElement = await this.getElSize(this.tabBars[index].id),
          nowWidth = nowElement.width;
        if (width + nowWidth - tabBarScrollLeft > winWidth) {
          this.scrollLeft = width + nowWidth - winWidth;
        }
        if (width < tabBarScrollLeft) {
          this.scrollLeft = width;
        }
        this.isClickChange = false;
        console.log('changeTab index', index)
        this.tabIndex = index; //一旦访问data就会出问题

        this.getTabData(index)
      },
      async listTypeChoose(orderType) {
        let lastType = this.order.type
        if (lastType != orderType.name) {
          this.order.type = orderType.name
        } else {
          orderType.type = (orderType.type) === 'desc' ? 'asc' : 'desc'
        }

      }
    },
    onReady() {
      console.log('onReady')
      let navbar = uni.createSelectorQuery().select('.uni-navbar')
      navbar.boundingClientRect(data => {
        console.log("得到布局位置信息" + JSON.stringify(data));
        this.topHideViewStyle = data.height
      }).exec();
      
    },
    onShow() {
//       console.log('onShow')
//       this.getTabData(0)
    },
    onLoad() {
      console.log('onLoad')
      
      if(!this.mallGoodsList[this.mallType][0]){
         this.getTabData(0)
         this.tabLists = this.mallGoodsList[this.mallType]
      }
      
    },
    
  };
</script>

<style>
  .order-type-item {}

  .order-type-item.active {
    color: #ff5c44;
  }

  .swiper-tab-list.active {
    color: #333333;
    font-size: 36upx;
  }
</style>
