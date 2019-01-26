<template>
	<view class="page">
    
    <view class="uni-border-top">
    	<user-address :address="userAddressCurrent" v-if="userAddressCurrent.id"></user-address>
    	<user-address v-else ></user-address>
    </view>
    
    <view class="uni-common-mt uni-bg-white ">
    	<view class="" v-for="(list,index) in cartList" :key="index">
    		<view class="" v-if="list.length">
    			<view class="uni-common-pa" v-if="index == 1">
    				自营商城
    			</view>
          <view class="uni-common-pa uni-border-top" v-if="index == 2">
          	京选商城
          </view>
          
          <view class="uni-common-pl uni-common-pr" v-for="(item,index2) in list" :key="index2">
          	<view class="uni-flex uni-border-top uni-common-pt uni-common-pb">
          		<view class="" style="160upx;height: 160upx;">
          			<image :src="item.cover" mode="scaleToFill" style="width: 160upx;height: 160upx;"></image>
          		</view>
              <view class="uni-flex-item uni-common-pl" >
              	<view class="uni-ellipsis-2 uni-text-darker">
              		{{item.title}}商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题
              	</view>
                <view class="uni-flex ">
                	<view class="uni-flex-item uni-text-small uni-text-light">
                		<text>积分可抵扣</text>
                		<text style="margin-left: 10upx;">￥</text>
                		<text>{{item.price_score_sell}}</text>
                	</view>
                  <view class="uni-flex-item uni-right ">
                    
                  </view>
                </view>
                <view class="uni-flex ">
                	<view class="uni-flex-item uni-text-red">
                		<text class="uni-text-small">￥</text>
                		<text>{{item.price_sell}}</text>
                	</view>
                  <view class="uni-flex-item uni-right uni-text-small uni-text-light">
                    <text>x</text>
                    <text style="margin-left: 10upx;">{{ item.num}}</text>
                  </view>
                </view>
              </view>
          	</view>
          </view>
          
    		</view>
        
        
    	</view>
    </view>
    
    <view class="uni-common-mt uni-common-pl uni-common-pr uni-bg-white uni-border-top">
      
    	<view class="uni-flex uni-common-pt uni-common-pb uni-border-bottom ">
    		<view class="uni-flex-item input-label">
    			积分余额
    		</view>
    	  <view class="uni-flex-item uni-right">
    	  	{{userInfo.score}}
    	  </view>
    	</view>
    	
    	<view class="uni-flex uni-common-pt uni-common-pb uni-border-bottom " @tap="scoreUse">
    		<view class="uni-flex-item input-label">
    			使用积分
    		</view>
    	  <view class="uni-flex-item uni-right" >
          <text style="margin-right: 10upx;">{{score * 1000}}</text> 
    	  	<uni-icon type="checkbox-filled" size="22" v-if="postData.score" color="#ff5c44"></uni-icon>
    	  	<uni-icon type="circle" size="22" v-else></uni-icon>
    	  </view>
    	</view>
      
      <view class="uni-flex uni-common-pt uni-common-pb " >
      	
        <view class="uni-flex-item uni-right" >
          <text v-if="postData.score" class="uni-text-small uni-text-light">积分抵扣:￥{{score}}</text>
          <text style="margin-left: 10upx;">小计</text>
        	<text class="uni-text-red">￥</text>
          <text class="uni-text-red uni-h4">{{total}}</text>
        </view>
      </view>
    </view>
    
    <!-- <view class="uni-common-mt uni-common-pl uni-common-pr uni-bg-white uni-border-top">
    	<view class="uni-flex uni-common-pb uni-common-pt">
    		<view class="uni-flex-item input-label">
    			支付方式
    		</view>
    	</view>
    	
    	<view class="uni-flex uni-common-pt uni-common-pb uni-border-top" v-for="item in payTypes" :key="item.id" @tap="payTypeChoose(item)">
    		<view class="uni-flex-item input-label">
    			{{item.name}}
    		</view>
    	  <view class="uni-flex-item uni-right" >
    	  	<uni-icon type="checkbox-filled" size="22" v-if="payTypeId == item.id" color="#ff5c44"></uni-icon>
          <uni-icon type="circle" size="22" v-else></uni-icon>
    	  </view>
    	</view>
    </view> -->
    
    <view class="uni-common-mt uni-common-pl uni-common-pr uni-bg-white uni-border-top">
    	<view class="uni-flex uni-common-pt uni-common-pb">
    		<view class="uni-flex-item input-label">
    			发票信息
    		</view>
    	  <view class="uni-flex-item uni-right" @tap="invoiceChoose">
    	  	<view class="" v-if="!mallOrderConfirm.invoice">
    	  		不开发票
    	  	</view>
    	    <view class="" v-else>
    	    	<uni-icon type="arrowright" size="22"></uni-icon>
    	    </view>
    	  </view>
    	</view>
    	
    	<view class="uni-flex uni-common-pt uni-common-pb uni-border-top">
    		<view class="input-label">
    			备注
    		</view>
    	  <view class="uni-flex-item uni-right uni-common-pa uni-bg-gray" >
    	  	<textarea type="text" placeholder="备注信息" auto-height="true" style="width: 500upx;"/>
    	  </view>
    	</view>
    </view>
    
    <view style="height: 120upx;">
    	
    </view>

    <view class="uni-fixed-bottom uni-center uni-bg-red" @tap="orderCreate">
    	提交
    </view>
	</view>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex';
  import Cart from '@/static/js/cart.js';
  import userAddress from '@/components/user/user-address.vue';
  import uniIcon from '@/components/uni-icon.vue';
	export default {
    data(){
      return {
        postData:{
          pay_type:0,
          pay_method:'',
          score:0,
          total:0
        },
        cartList:[],
        address : {},
        // invoice:false
//         payTypes: [
//           {id: 1, name:'微信支付','pay_type':'3' , 'pay_method':'wx'},
//           {id: 2, name:'支付宝','pay_type':'3' , 'pay_method':'alipay'},
//           {id: 3, name:'代金券','pay_type':'1' , 'pay_method':'ecard'},
//           {id: 4, name:'账户余额','pay_type':'2' , 'pay_method':'balance'},
//         ],
        payTypeId:0,
        score:0
      }
    },
    components:{
      userAddress,
      uniIcon
    },
    computed:{
      ...mapState(['hasLogin', 'userInfo','userAddressList' , 'userAddressCurrent' , 'mallOrderConfirm'])
    },
		methods:{
      ...mapActions(['goToLoginPage']),
			orderCreate(){
				
			},
      invoiceChoose(){
        uni.showActionSheet({
        	itemList: ['不开发票', '填写发票信息'],
        	success: (e) => {
        		console.log(e.tapIndex);
        		if (e.tapIndex == 0) {
        			this.mallOrderConfirm.invoice = 0
        		} else{
        			uni.navigateTo({
        				url:'/pages/user/invoice'
        			})
        		}
        	}
        })
      },
//       payTypeChoose(item){
//         this.postData.pay_type = item.pay_type
//         this.postData.pay_method = item.pay_method
//         this.payTypeId = item.id
//       },
      scoreUse(){
        if(this.score * 1000 > this.userInfo.score){
          uni.showToast({ title: '积分余额不足', icon: "none" })
          return 
        }
        
        this.postData.score = (this.postData.score == 0) ? 1: 0
        if(this.postData.score){
          this.total = Cart.total
        }else{
          this.total = Cart.total + Cart.score
        }
      }
		},
    onLoad() {
      
      console.log('onLoad ====================')
    	if(!this.hasLogin){
    	  this.goToLoginPage()
    	  return
    	}
      
      if(!this.userAddressList.length){
        this.$store.dispatch('userAddressGet')
        
      }
      
      console.log('userAddressCurrent' , this.userAddressCurrent)
      
      let cartInfo = Cart.info()
      
      console.log('cartInfo' , cartInfo)
      this.score = cartInfo.score
      this.total = cartInfo.total + this.score
      this.cartList = Cart.listChecked()
      
      console.log('cartList' , this.cartList)
      // 发票默认不选
      // this.$store.state.mallOrderConfirm.invoice = 0
      // this.address = this.userAddressCurrent
    }
	}
</script>

<style>
  
</style>
