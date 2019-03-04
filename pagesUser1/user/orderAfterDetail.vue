<template>
	<view class="uni-page-body">
		<view class="">
			<view class="uni-bg-white uni-border-top">
			  
        <view class="" v-if="items.length">
        	<view class="uni-flex uni-common-pa " v-for="(item,index) in items" :key="index">
        		<view class="" style="width: 200upx;height: 200upx;">
        			<image lazy-load="true"  :src="item.cover" mode="scaleToFill" style="width: 200upx;height: 200upx;border-radius: 8upx;"></image>
        		</view>
        	  <view class="uni-flex-item uni-common-pl">
        	  	<view class="uni-ellipsis-2 uni-text-dark" style="height: 100upx;line-height: 50upx;">
        	  		{{ item.title }}
        	  	</view>
        	    <view class="uni-text-small uni-text-gray">
        	    	<view class="uni-flex-item uni-text-small uni-text-gray"  v-if="order.score_use">
        	    		<text>使用积分抵扣:</text>
        	    		<money :num="item.price_score_sell" v-if="!order.vip" />
        	    		<money :num="item.price_score_vip" v-else/>
                  <text class="uni-common-pl"> x {{ item.num }}</text>
        	    	</view>
        	    	<view class="uni-flex-item uni-text-small uni-text-gray " v-else>
        	    		未使用积分抵扣
        	    	</view>
        	    </view>
        	    <view class="uni-flex">
        	    	<view class="uni-flex-item uni-text-red uni-h4">
        	    		<money :nums="[item.price_sell,item.price_score_sell]" size="30" v-if="!order.vip" />
        	    		<money :nums="[item.price_vip,item.price_score_vip]" size="30" v-else/>
        	    	</view>
        	      <view class="uni-flex-item uni-right">
        	      	x {{ item.num }}
        	      </view>
        	    </view>
        	  </view>
        	</view>
        </view>  

			 
        <view class="uni-flex uni-common-pa uni-border-top">
          <view class="uni-flex-item">
            <text class="uni-text-dark">售后单号:</text>
          </view>
          <view class="uni-right">
            {{ info.after_no}}
          </view>
        </view>
        
        <view class="uni-flex uni-common-pa uni-border-top">
          <view class="uni-flex-item">
            <text class="uni-text-dark">申请时间:</text>
          </view>
          <view class="uni-right">
            {{ info.create_date }}
          </view>
        </view>
        
        
        <view class="uni-flex uni-common-pa uni-border-top">
          <view class="uni-flex-item">
            <text class="uni-text-dark">服务类型:</text>
          </view>
          <view class="uni-right">
            {{ info.category }}
          </view>
        </view>
        
        
        <view class="uni-flex uni-common-pa uni-border-top">
          <view class="uni-flex-item">
            <text class="uni-text-dark">申请原因:</text>
          </view>
          <view class="uni-right">
            {{ info.type }}
          </view>
        </view>
        
        <view class="uni-flex uni-common-pa uni-border-top">
          <view class="uni-flex-item">
            <text class="uni-text-dark">问题描述:</text>
          </view>
          <view class="uni-right">
            {{ info.info || '无' }}
          </view>
        </view>
        
        <view class="uni-common-pa uni-border-top uni-flex" v-if="info.imgs.length">
        	<view class="uni-common-mr-sm imgs-pre-item" v-for="(img , index1) in info.imgs" :key="index1" @tap="preImg(info.imgs, img)">
        		<image lazy-load="true"  :src="img" mode="scaleToFill" style="width: 100upx;height: 100upx;"></image>
        	</view>
        </view>

			  
			
			</view>
		</view>
    
    <!-- <view class="uni-fixed-bottom uni-right uni-bg-white">
    	取消申请
    </view> -->
	</view>
</template>

<script>
  import {mapState,mapActions} from 'vuex';
  import money from '@/components/money.vue';
  import uniIcon from '@/components/uni-icon.vue';
  export default {
    components:{
    	money,
      uniIcon
    },
    data(){
      return {
        info:{},
        order:{},
        items:[]
      }
    },
    computed:{
      ...mapState(['mallAfterData'])
    },
    methods:{
      preImg(paths, current){
        uni.previewImage({
            urls: paths,
            current: current,
            indicator:'number'
        });
      },
    },
    onLoad(opt) {
      console.log('onLoad info' , )
      this.info = this.mallAfterData.info
      this.order = this.info.order
      this.items = this.info.items
    }
  }
</script>

<style>
</style>
