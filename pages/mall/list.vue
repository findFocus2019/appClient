<template>
  <view class="uni-page-body">

  	<uni-nav-bar color="#333333" background-color="#FFFFFF" fixed="true" @click-left="goSearch"
  	 @click-right="goCart" id="mall-nav-bar">
  		<block slot="left">
  			<view class="uni-common-pl uni-common-pr" v-if="!mallSearch.open">
  				<uni-icon type="search" size="22" color="#666666"></uni-icon>
  			</view>
  		</block>
  		<view class="input-view uni-center"  v-if="!mallSearch.open">
  			<!-- {{ mallTypes[mallType] }} 
        <uni-icon type="arrowdown" size="24"></uni-icon> -->
        <view class="uni-inline-block uni-common-pl uni-common-pr" v-for="(type,index) in mallTypes" :key="index" v-if="type" @tap="changeMallType(index)">
        	<text v-if="index== mallType" class="uni-bold">{{type}}</text>
          <text v-else>{{type}}</text>
        </view>
        
        
  		</view>
      <view class="input-view uni-flex uni-bg-gray" style="border-radius: 30upx;" v-else >
      	<uni-icon type="search" size="22" color="#666666"></uni-icon>
      	<input confirm-type="search" class="input uni-flex-item" type="text" placeholder="输入搜索关键词" v-model="mallSearch.text" @tap="goSearch"/>
      	<uni-icon type="clear" size="22" color="#666666" @click="cancelSearch"></uni-icon>
      </view>
      <block slot="right">
        <view class="uni-common-pl uni-common-pr">
          <image lazy-load="true"  src="/static/icon/mall/cart.png" mode="widthFix" style="width: 48upx;height: 48upx;"></image>
        </view>
      </block>
  	</uni-nav-bar>
  	<!-- 使用非原生导航栏后需要在页面顶部占位 -->
  	<!-- <view style="height:80px;">...</view> -->
    
    <view class="mall-list-body" :style="{paddingTop:topHideViewHeight + 'px'}">
    	
      	<view class="uni-bg-white uni-border-bottom">
      		
          <scroll-view id="tab-bar" class="uni-swiper-tab uni-bg-white" scroll-x :scroll-left="scrollLeft"
            v-if="mallCategorys && mallCategorys.length">
            <view v-for="(tab,index) in mallCategorys" :key="index" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :data-current="index" @click="tapCategoryTab(index)">{{tab.name}}</view>
          </scroll-view>
      	</view>
      	
      	<view class="">
      		<view class="uni-flex order-type-items uni-bg-white">
      		  <view class="uni-flex-item uni-center uni-flex" v-for="orderType in mallOrderTypes" :key="orderType.name" :class="['order-type-item', mallOrderActive.name === orderType.name ? 'active' : '']"
      		    @tap="listOrderTypeChoose(orderType)">
      		    <text>{{orderType.text}}</text>
      		    <uni-icon type="arrowdown" size="22" v-if="orderType.type === 'desc'"></uni-icon>
      		    <uni-icon type="arrowup" size="22" v-else></uni-icon>
      		
      		  </view>
      		  <view class="uni-flex-item uni-center" @tap="changeMallShowType">
              <view class="" style="width: 40upx;height: 40upx;display: inline-block;" v-if="mallShowType == 1">
              	<image lazy-load="true" src="/static/icon/mall/list-2.png" mode="scaleToFill" style="width: 40upx;height: 40upx;"></image>
              </view>
              
              <view class="" style="width: 40upx;height: 40upx;display: inline-block;" v-if="mallShowType == 0">
              	<image lazy-load="true" src="/static/icon/mall/list-1.png" mode="scaleToFill" style="width: 40upx;height: 40upx;"></image>
              </view>
      		  </view>
      		</view>
      	</view>

        <view class="mall-list-ul" v-if="mallGoodsList.count">
        	
          <block v-if="mallType == 1 && mallShowType == 0">
            <view class="mall-list-item type-self uni-bg-white uni-border-top" v-for="(item,index) in mallGoodsList.list" :key="index" @tap="goToDetail(item)">
              <view class="">
                <image lazy-load="true"  :src="item.cover" mode="widthFix" style="width: 100%;"></image>
              </view>
              
              <view class="uni-common-pl uni-common-pr uni-common-pb " >
                <view class="uni-bold uni-h4">
                  {{ item.title }}
                </view>
                <view class="uni-flex">
                  <view class="">
                    <!-- <view class="uni-text-red" style="display: inline-block;">
                      <money :num="item.price_sell" size="48" /> 
                    </view> -->
                    <view class="uni-text-red uni-inline-block" >
                       <image src="/static/icon/mall/vip.png" mode="" style="width: 36upx;height: 36upx;"></image>
                       <money :num="item.price_vip" size="36"/>
                    </view>
                    <view class="uni-text-gray uni-inline-block uni-common-ml-sm" style="text-decoration: line-through;">
                    	<money :num="item.price"></money>
                    </view>
                  </view>
                  
                </view>
                <view class="uni-text-light uni-text-small uni-flex-item" >
                  已有{{ item.sales }}付款
                </view>
               <!-- <view class="uni-flex">
                  <view class="uni-text-gray uni-text-small">
                  	积分可抵扣
                    <money :num="item.price_score_sell"></money>
                    /vip
                    <money :num="item.price_score_vip"></money>
                  </view>
                	<view class="uni-text-light uni-text-small uni-right uni-flex-item" >
                	  已有{{ item.sales }}付款
                	</view>
                </view> -->
                
              </view>
              
            </view>
          </block>
          
          <block v-if="mallType == 2 && mallShowType == 0">
          
            <view class="mall-list-item type-jd uni-bg-white uni-border-top uni-flex uni-common-pa" v-for="(item,index) in mallGoodsList.list" :key="index" @tap="goToDetail(item)">
              <view class="goods-list-cover" >
                <image lazy-load="true" :src="item.cover" mode="scaleToFill" class="goods-list-cover"></image>
              </view>
              
              <view class="uni-common-pl goods-list-content" >
                <view class="uni-bold uni-ellipsis-2 title" >
                  {{ item.title }}
                </view>
								<view class="" style="line-height: 120upx;">
								  <!-- <view class="uni-text-red uni-bold" style="display: inline-block;">
								    <money :num="item.price_sell" size="32" /> 
								  </view> -->
								  <view class="uni-text-red uni-inline-block" style="">
										 <image src="/static/icon/mall/vip.png" mode="" style="width: 36upx;height: 36upx;"></image>
										 <money :num="item.price_vip" size="36"/>        
								  </view>
								  <view class="uni-text-gray uni-inline-block uni-common-ml-sm" style="text-decoration: line-through;">
								  	<money :num="item.price"></money>
								  </view>
								</view>
								<!-- <view class="" >
									<view class="uni-text-gray uni-text-small">
										积分可抵扣
									  <money :num="item.price_score_sell"></money>
									  /vip
									  <money :num="item.price_score_vip"></money>
									</view>
								</view> -->
                <view class="uni-text-light uni-text-small" >
                  已有{{ item.sales }}付款
                </view>
              </view>
              
            </view>
          </block>
          
          <block v-if="mallShowType == 1">
          
            <view class="mall-goods-list type-jd uni-bg-white uni-border-top" v-for="(item,index) in mallGoodsList.list" :key="index" @tap="goToDetail(item)">
              <view class="uni-center uni-common-pt" >
                <image lazy-load="true" :src="item.cover" mode="scaleToFill" class="goods-list-cover"></image>
              </view>
              
              
              <view class="uni-common-pa" >
                <view class="uni-bold uni-ellipsis " >
                  {{ item.title }}
                </view>
          			<view class="uni-ellipsis">
          			  <!-- <view class="uni-text-red uni-bold" style="display: inline-block;">
          			    <money :num="item.price_sell" size="32" /> 
          			  </view> -->
          			  <view class="uni-text-red uni-inline-block">
          					 <image src="/static/icon/mall/vip.png" mode="" style="width: 36upx;height: 36upx;"></image>
          					 <money :num="item.price_vip" size="36"/>        
          			  </view>
                  <view class="uni-text-gray uni-inline-block uni-common-ml-sm" style="text-decoration: line-through;">
                  	<money :num="item.price"></money>
                  </view>
          			    
          			</view>
          			<!-- <view class="" >
                  
          				<view class="uni-text-gray uni-text-small">
          					<view class="uni-text-gray uni-text-small">
          						积分可抵扣
          					</view>
          				  <money :num="item.price_score_sell"></money>
          				  /vip
          				  <money :num="item.price_score_vip"></money>
          				</view>
          			</view> -->
                <view class="uni-text-light uni-text-small" >
                  已有{{ item.sales }}付款
                </view>
              </view>
              
            </view>
          </block>
          
        </view>
        
        <view class="uni-common-pa uni-center" v-else="">
        	无数据
        </view>
      
    </view>
    
    <view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>

  </view>
  
</template>

<script>
  import uniNavBar from '@/components/uni-nav-bar.vue';
  import uniIcon from '@/components/uni-icon.vue';
  import money from '@/components/money.vue';
  import { mapState, mapActions } from "vuex";
  export default {
    data(){
      return {
        // mallType:0,
        scrollLeft:0,
        tabIndex:0,
        topHideViewHeight:0,
        mallTypes:['','焦点商城','京选商城'],
        mallCategorys:[],
        mallGoodsList:{
          page:1,
          count: 0,
          list:[],
          timestamp:0
        },
        showLoadMore: false,
        loadMoreText:'加载中...',
        // mallShowType:1,
      }
    },
    components: {
    	uniNavBar,
    	uniIcon,
      money
    },
    computed:{
      ...mapState(['mallType', 'mallCategorysData','mallGoodsListData', 'mallSearch', 'mallOrderTypes', 'mallOrderActive', 'mallShowType'])
    },
    methods:{
      changeMallShowType(){
        this.$store.state.mallShowType = (this.mallShowType == 0) ? 1 : 0
      },
      async changeMallType(index){
        //
        uni.showLoading({
        	mask:true,
          title:'数据加载中...'
        })
        let type = this.mallType
        if(type == index){
          return
        }
        
        this.tabIndex = 0
        this.scrollLeft = 0
        this.$store.state.mallType = index
				this.mallGoodsListData[type]['all'] = null
        await this.getDatas()
        
        
        uni.hideLoading()
//         let item = (type == 1) ? this.mallTypes[2] : this.mallTypes[1]
//         uni.showActionSheet({
//         	itemList:[ '切换' + item],
//           success:(e)=> {
//             this.tabIndex = 0
//           	let index = e.tapIndex
//             if(index == 0){
//               his.$store.state.mallType = (type == 1) ? 2 : 1
//             }
//   
//           }
//         })
      },
      tapCategoryTab(index){
        this.tabIndex = index
        if(index >= 5){
          this.scrollLeft = ((index - 1) * 80)
        }else {
          this.scrollLeft = 0
        }
        this.getLists()
      },
      listOrderTypeChoose(orderType) {
        console.log('listTypeChoose orderType', orderType)
        let lastType = this.mallOrderActive
        if (lastType.name != orderType.name) {
          this.mallOrderActive.name = orderType.name
        } else {
          if (orderType.name !== 'sales') {
            orderType.type = (orderType.type) === 'desc' ? 'asc' : 'desc'
						
						this.mallOrderActive.type = orderType.type
          }
        }
				
				this.refresh()
      
      },
      listOrderTypeInit(){
        
      },
      cancelSearch(){
              
        this.mallSearch.open = false
        this.mallSearch.hasDone = false
        this.mallSearch.text = ''
        
        this.refresh()

      },
      async getDatas(){
        await this.getCategorys()
        await this.getLists()
      },
      async getCategorys(){
        let type = this.mallType
        let ret = await this.$store.dispatch('getGoodsCategory')
        console.log('getCategorys ret: =================================' + JSON.stringify(ret))
        if(ret.code == 0){
          this.mallCategorys = this.mallCategorysData[type]
        }
      },
      async getLists(){
        let type = this.mallType
        console.log(this.mallCategorys, this.tabIndex)
        let current = this.tabIndex || 0
        let category = this.mallCategorys[current].id
        
        if(!this.mallGoodsListData[type][category]){
          this.mallGoodsListData[type][category] = {
            page:1,
            list:[],
            count:0,
            timestamp:0
          }
        }
        
        let mallGoodsList = this.mallGoodsListData[type][category]
        
        let params = {}
        params.type = type
        params.category = category
        params.page = mallGoodsList.page
        params.timestamp = mallGoodsList.timestamp
				params.order = this.mallOrderActive
        
        let search = this.mallSearch.text || ''
        if(search){
          params.search = search
        }
       
        console.log('getLists params' , params)
        let ret = await this.$store.dispatch('getGooddList', params)
        console.log('getGooddList ret' , JSON.stringify(ret))
        if(ret.code == 0){
          let data= ret.data
          this.mallGoodsListData[type][category].page += 1
          this.mallGoodsListData[type][category].count = data.count
          this.mallGoodsListData[type][category].timestamp = data.timestamp
          
          let rows = data.rows
          if(rows.length == 0){
            this.loadMoreText = '无更多...'
          }else {
            if(search){
              this.$store.dispatch('mallSearchListAdd' , {item: search})
            }
          }
          rows.forEach(row => {
            this.mallGoodsListData[type][category].list.push(row)
          })
        }
        
        this.mallGoodsList = this.mallGoodsListData[type][category]
        return ret
      },
      async refresh(){
        console.log('refresh ==============')
   
        let type = this.mallType
        console.log(this.mallCategorys, this.tabIndex)
        let current = this.tabIndex || 0
        let category = this.mallCategorys[current].id
        
        this.mallGoodsListData[type][category]= null
        
        await this.getLists()
      },
      goCart() {
        uni.navigateTo({
          url: '/pagesMall/mall/cart'
        })
      },
      goSearch() {
        this.mallSearch.open = true
        uni.navigateTo({
          url: '/pagesMall/mall/search'
        })
      },
      goToDetail(item){
        uni.navigateTo({
          url: '/pagesMall/mall/goods?id=' + item.id
        })
      }
 
    },
    onReady() {
    	console.log('onReady')
    	let navbar = uni.createSelectorQuery().select('.uni-navbar')
    	navbar.boundingClientRect(data => {
    	  console.log("得到布局位置信息" + JSON.stringify(data));
    	  this.topHideViewHeight = data.height
    	}).exec();
    },
    onLoad() {
      console.log('onLoad............')
    	this.getDatas()
    },
    async onPullDownRefresh() {
    	await this.refresh()
    	uni.stopPullDownRefresh()
    },
    async onReachBottom() {
    	this.showLoadMore = true
    	await this.getLists()
    	
    	setTimeout(() => {
    	  this.showLoadMore = false
    	} , 1000)
    },
    onShow() {
    	console.log('onShow............')
      if(this.mallSearch.open){
        // 开启搜索
        console.log('onShow search............')
        this.tabIndex = 0
        this.refresh()
        
        if(!this.mallSearch.text){
          this.mallSearch.open = false
        }
      }
    }
  };
</script>

<style>
  .mall-list-body {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
/*  .order-type-items {
    position: fixed;
    top: 100px;
    z-index: 199;
    width: 100%;
    background: #fff;
    border-top: 1px solid #EEEEEE;
  } */
  .order-type-items {
    padding: 20upx 0;
  }
  
  .swiper-tab-list.active {
    color: #d81e06;
    font-size: 32upx;
  }
  
  .order-type-item.active {
    color: #d81e06;
  }
  
  .swiper-tab-list {
    width: 160upx;
    text-align: center;
  }
  
  .mall-list-item.type-self {
    width: 100%;
  }
  
  .mall-goods-list.type-jd {
    width: 50%;
    display: inline-block;
  }
</style>
