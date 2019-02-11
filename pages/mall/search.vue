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
        <input confirm-type="搜索" @confirm="confirm" class="input" type="text" placeholder="输入搜索关键词" v-model="mallSearch.text"/>
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
        uni.navigateBack()
      },
      async confirm(){
        console.log('confirm this.mallSearch.text' ,this.mallSearch.text)
        if(this.mallSearch.text){
          // 重新获取列表
          let category = 'all'
          this.$store.state.mallGoodsList[category].page = 1
          this.$store.state.mallGoodsList[category].rows = []
          // store.state.mallGoodsList[category].order = []
          let timestamp = parseInt(Date.now() / 1000)
          this.mallSearch.hasDone = true
          await this.$store.dispatch('getGoodsList' , {category: category, timestamp : timestamp})
          
          uni.navigateBack()
        }
      },
      async cancel(){
        
        this.mallSearch.open = false
        this.mallSearch.hasDone = false
        this.mallSearch.text = ''
        
        uni.navigateBack()
        
//         uni.reLaunch({
//         	url:'/pages/mall/index'
//         })
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
</style>
