<template>
	<view class="page">
    
    <view class="uni-center uni-common-mt" v-if="cartInfo && cartInfo.count === 0">
    	购物车什么都没有~
    </view>
    
		<view class="uni-common-mb" v-for="(list,index) in cartInfo.list" :key="index">
      	<view class="uni-bg-white uni-border-top uni-common-pa uni-h4" v-if="list.length">
      		自营商城
      	</view>
        <view class="uni-bg-white uni-border-top" v-for="(item,index2) in list" :key="item.uuid">
        	<scroll-view class="scroll-view_H cart-list" scroll-x="true" @scroll="scroll" scroll-left="0">
        		<view class="scroll-view-item_H">
              <view class="">
              	<view class="uni-flex">
              		<view class="cart-list-check uni-flex-item uni-center">
              			选择
              		</view>
              		<view class="cart-list-cover uni-common-pt uni-flex-item">
              			<image :src="item.cover" mode="" style="width: 180upx;height: 180upx;"></image>
              		</view>
              		<view class="uni-flex-item uni-common-pt uni-common-pl uni-common-pr cart-list-item" >
              			<view class="uni-text-dark cart-list-title uni-text-darker " style="width: 410upx;">
                     {{item.title}} 标题标题标题标题标题标题normal标题标题标题标题标题标题标题标题标题标题标题标题标题
              			</view>
                    <view class="uni-flex">
                    	<view class="uni-flex-item uni-text-small uni-text-light">
                    		积分可抵扣 <text>￥</text>{{item.price_score_sell}}
                    	</view>
                    </view>
                    <view class="uni-flex">
                      <view class="uni-text-red uni-flex-item">
                      	<text>￥</text>
                      	<text class="uni-h4">{{ item.price_sell }}</text>
                      </view>
                    	<view class="uni-right uni-flex-item">
                    		<uni-number-box  @change="onNumberChange" :value="item.num" :cartItem="item"></uni-number-box>
                    	</view>
                    </view>
              		</view>
              	</view>
              </view>
        	    <!--  -->
        	    
        	  </view>
        		<view class="scroll-view-item_H uni-center" style="background: #ff5c44;width: 100upx;color: #fff;" @tap="cartDel(item)">
              <view class="" style="display: inline-block;vertical-align: middle;" >
              	<view class="">
              		<uni-icon type="trash" size="24"></uni-icon>
              	</view>
                <view class="">
                  删除
                </view>
              </view>
              
            </view>
        	</scroll-view>
        </view>
      	
      </view>
			
		</view>
	</view>
</template>

<script>
  import Cart from '@/static/js/cart.js';
  import uniNumberBox from '@/components/uni-number-box.vue'
   import uniIcon from '@/components/uni-icon.vue';
  export default {
    data(){
      return {
        cartInfo:{}
      }
    },
    components:{
      uniNumberBox,
      uniIcon
    },
    computed:{
      
    },
    methods:{
      scroll: function(e) {
				console.log(e)
				// this.old.scrollTop = e.detail.scrollTop
			},
      onNumberChange(data){
        console.log('onNumberChange:' ,data)
        let item = data.item
        let num = item.num - data.val
        if(num > 0){
          Cart.minus(item ,num)
        }else if(num < 0){
          Cart.plus(item , -num)
        }
        
        this.cartInfo = Cart.info()
      },
      cartDel(item){
        Cart.minus(item ,item.num)
        this.cartInfo = Cart.info()
      }
    },
    onLoad() {
    	console.log('onLoad')
      this.cartInfo = Cart.info()
      console.log('cart info' , JSON.stringify(this.cartInfo))
    },
    onShow() {
    	console.log('onShow')
    },
    onReady() {
    	console.log('onReady')
    }
  }
</script>

<style lang="less">
  
  .scroll-view_H {
		white-space: nowrap;
    height: 240upx;
		width: 100%;
	}
  
  .scroll-view-item {
		height: 240upx;
		// line-height: 240upx;
		text-align: center;
		// font-size: 36upx;
	}
  
  .scroll-view-item_H {
		display: inline-block;
		width: 100%;
		height: 240upx;
		line-height: 240upx;
		// text-align: center;
		// font-size: 36upx;
	}
  
  .scroll-view-item_H.delete {
    width: 100upx;
    background: #ff5c44;
    color: #fff;
  }
  
  .cart-list {
    .cart-list-check {
      width: 100upx;
      line-height: 240upx;
    }
    
    .cart-list-cover {
      width: 180upx;
      
    }

    .cart-list-item {
      width: 470upx;
      line-height: 75upx;
      // flex-wrap:wrap;
      white-space:normal;
    }
    
    
  }
  
  .cart-list-title {
    // width: 300upx;
    // width: 300upx;
    height: 80upx;
    word-break: break-all;
    display: -webkit-box;
    overflow: hidden;
    line-height: 40upx;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    flex-shrink:0;
  }
  
  
  
</style>
