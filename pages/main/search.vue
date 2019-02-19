<template>
	<view class="uni-page-body uni-bg-white">
		<uni-nav-bar color="#333333" background-color="#ffffff" fixed="true" @click-left="back" @click-right="cancel">
		  <!-- #ifndef MP -->
		  <block slot="left">
		  	<view class="uni-common-pl">
		  		<uni-icon type="back" size="22" color="#666666"></uni-icon>
		  	</view>
		  </block>
		  <!-- #endif -->
		  
		  <view class="input-view uni-flex uni-bg-gray " style="border-radius: 30upx;">
		    <uni-icon type="search" size="22" color="#666666"></uni-icon>
		    <input confirm-type="搜索" @confirm="confirm" class="input uni-flex-item" type="text" placeholder="输入搜索关键词" v-model="mainSearchText"/>
		    <uni-icon type="clear" size="22" color="#666666" @click="cancel"></uni-icon>
		  </view>
		  <block slot="right">
		    <view class="uni-common-pr">
		    	取消
		    </view>
		  </block>
		</uni-nav-bar >
    
    <view style="height: 150upx;"></view>
    
    <view class="uni-common-pa">
      
      <view class="uni-common-mb uni-common-pb uni-border-bottom" v-if="postsList1.length">
      	<view class="uni-bold">
      		品牌故事
      	</view>
        
        <view class="">
        	<view class="uni-inline-block uni-bg-gray uni-ellipsis search-item xl" v-for="(item,index) in postsList1" :key="index" @tap="goToDetailPosts(item)">
        		{{ item.title }}
        	</view>
 
        </view>
      </view>
      
      <view class="uni-common-mb uni-common-pb uni-border-bottom" v-if="postsList2.length">
      	<view class="uni-bold">
      		新闻资讯
      	</view>
        
        <view class="">
        	<view class="uni-inline-block uni-bg-gray uni-ellipsis search-item xl" v-for="(item,index) in postsList2" :key="index" @tap="goToDetailPosts(item)">
        		{{ item.title }}
        	</view>
          
        </view>
      </view>
      
      <view class="uni-common-mb uni-common-pb uni-border-bottom" v-if="goods.length">
      	<view class="uni-bold">
      		产品
      	</view>
        
        <view class="">
        	<view class="uni-inline-block uni-bg-gray uni-ellipsis search-item" v-for="(item,index) in goods" :key="index" @tap="goToDetailGoods(item)">
        		{{ item.title }}
        	</view>

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
    components:{
      uniNavBar,
      uniIcon
    },
    data(){
      return {
        mainSearchText:'',
        postsList1:[],
        postsList2:[],
        goods: []
      }
    },
    computed:{
  
    },
    methods:{
      back(){
        uni.navigateBack({
        	delta:1
        })
      },
      cancel(){
        this.mainSearchText = ''
        uni.navigateBack({
        	delta:1
        })
      },
      goToDetailPosts(item){
        uni.navigateTo({
        	url:'/pages/posts/detail?id=' + item.id
        })
      },
      goToDetailGoods(item){
        uni.navigateTo({
        	url:'/pages/mall/goods?id=' + item.id
        })
      },
      async confirm(){
        if(!this.mainSearchText){
          return 
        }
        let searchRet1 = await this.$store.dispatch('searchPosts' , {type: 2, keyword: this.mainSearchText})
        console.log('searchPosts ret' , searchRet1)
        if(searchRet1.code == 0 && searchRet1.data.rows.length){
          this.postsList1 = searchRet1.data.rows
        }else {
          this.postsList1 = []
        }
        
        let searchRet2 = await this.$store.dispatch('searchPosts' , {type: 1, keyword: this.mainSearchText})
        console.log('searchPosts ret' , searchRet2)
        if(searchRet2.code == 0 && searchRet2.data.rows.length){
          this.postsList2 = searchRet2.data.rows
        }else {
          this.postsList2 = []
        }
        
        let searchRet3 = await this.$store.dispatch('searchGoods' , {keyword: this.mainSearchText})
        console.log('searchPosts ret' , searchRet3)
        if(searchRet3.code == 0 && searchRet3.data.rows.length){
          this.goods = searchRet3.data.rows
        }else {
          this.goods = []
        }
      }
    }
  }
</script>

<style>
  
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
