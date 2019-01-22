<template>
  <view class="">
  	<!-- #ifndef MP -->
  	<!-- 固定在顶部的导航栏 -->
  	<uni-nav-bar color="#333333" background-color="#FFFFFF" fixed="true" @click-left="search"
  	 @click-right="cart" >
  		<block slot="left">
  			<view class="uni-common-pl uni-common-pr">
  				<uni-icon type="search" size="22" color="#666666"></uni-icon>
  			</view>
  		</block>
  		<view class="input-view uni-center">
  			<text class="uni-common-pr" @tap="changeType">自营商城</text>
        <text class="uni-h4 uni-common-pl" >京东商城</text>
  		</view>
      <block slot="right">
        <view class="uni-common-pl uni-common-pr">
        	<uni-icon type="search" size="22" color="#666666"></uni-icon>
        </view>
      </block>
  	</uni-nav-bar>
  	<!-- 使用非原生导航栏后需要在页面顶部占位 -->
  	<view style="height:80px;">...</view>
  	<!-- #endif -->
  </view>
  
</template>

<script>
  import uniNavBar from '../../components/uni-nav-bar.vue';
  import uniIcon from '../../components/uni-icon.vue';
  import { mapState, mapActions } from "vuex";
  export default {
    components: {
    	uniNavBar,
    	uniIcon
    },
    computed:{
      ...mapState(['mallType'])
    },
    methods:{
      ...mapActions(['mallChangeType']),
      changeType(){
        this.mallChangeType()
        uni.switchTab({
        	url:'/pages/mall/index'
        })
      },
      search(){
        
      },
      cart(){
        
      }
    }
  };
</script>
