<template>
  <view class="">
    <!-- 固定在顶部的导航栏 -->
    <uni-nav-bar color="#333333" background-color="#FFFFFF" fixed="true" @click-left="back" @click-right="cancel">
      <!-- #ifndef MP -->
      <block slot="left">
      	<view class="uni-common-pl">
      		<uni-icon type="back" size="22" color="#666666"></uni-icon>
      	</view>
      </block>
      <!-- #endif -->
      
      <view class="input-view">
        <uni-icon type="search" size="22" color="#666666"></uni-icon>
        <input confirm-type="search" @confirm="confirm" class="input" type="text" placeholder="输入搜索关键词" v-model="mallSearch.text"/>
        <uni-icon type="clear" size="22" color="#666666" @click="cancel"></uni-icon>
      </view>
      <block slot="right">
        <view class="uni-common-pr">
        	取消
        </view>
      </block>
    </uni-nav-bar >
  	<!-- 使用非原生导航栏后需要在页面顶部占位 -->
  	<view :style="{height:topHideViewStyle + 'px'}" class="uni-common-pa">&nbsp;</view>
    
    <view class="uni-common-pa">
    	<view class="uni-common-mb uni-common-pb uni-border-bottom" v-if="searchHistoryList.length">
        
        <view class="uni-bold">
        	历史搜索
        </view>
        
    		<view class="uni-inline-block uni-bg-gray uni-ellipsis search-item " v-for="(item,index) in searchHistoryList" :key="index" @tap="searchHistory(item)">
    			{{item}}
    		</view>
    	</view>
    </view>

  </view>
  
</template>

<script>
  import uniNavBar from '@/components/uni-nav-bar.vue';
  import uniIcon from '@/components/uni-icon.vue';
  import { mapState, mapActions } from "vuex";
  export default {
    data(){
      return {
        topHideViewStyle: 0,
        searchHistoryList:[]
      }
    },
    components: {
    	uniNavBar,
    	uniIcon
    },
    computed:{
      ...mapState(['mallSearch'])
    },
    methods:{
      back(){
        console.log('back this.mallSearch.text' ,this.mallSearch.text)
        if(!this.mallSearch.text){
          this.mallSearch.open = false
        }
        uni.navigateBack()
      },
      async confirm(){
        console.log('confirm this.mallSearch.text' ,this.mallSearch.text)
        if(this.mallSearch.text){
          // 重新获取列表
          let category = 'all'
          let type = this.$store.state.mallType
          this.$store.state.mallGoodsListData[type][category].page = 1
          this.$store.state.mallGoodsListData[type][category].rows = []
          this.$store.state.mallGoodsListData[type][category].timestamp = 0
          // store.state.mallGoodsList[category].order = []
          
          this.mallSearch.open = true
          
          uni.navigateBack({
            delta:1
          })
        }
      },
      searchHistory(item){
        this.mallSearch.text = item
        this.confirm()
      },
      async cancel(){
        
        this.mallSearch.open = true
        this.mallSearch.text = ''
        
        uni.navigateBack()
        
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
      console.log('onLoad===========')
    	this.searchHistoryList = await this.$store.dispatch('mallSearchList')
      console.log('this.searchHistoryList' , this.searchHistoryList)
    }
  };
</script>

<style>
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
  
  .input-view .uni-icon{
  	line-height:48upx !important;
  }
  
  .input-view .input {
  	height:48upx;
  	line-height:48upx;
  	width:90%;
  	padding: 0 3%;
  }
  
  .search-item {
    width: 150upx;
    height: 60upx;
    line-height: 60upx;
    margin-right: 20upx;
    margin-top: 10upx;
    border-radius: 30upx;
    padding: 0 30upx;
  }
  
  .search-item.xl{
    width: 260upx;
  }
</style>
