<template>
	<view class="uni-page-body">
    
    <view class="" v-if="order.id">
    	<view class="uni-common-pa uni-bg-white uni-border-top uni-flex" v-if="order.address">
    		<view class="uni-common-pt">
    	    <uni-icon type="location" size="22"></uni-icon>
    		</view>
    	  <view class="uni-flex-item uni-common-pl" style="width: 600upx;">
    	  	<view class="">
    	      <text>{{ order.address.name }}</text>
    	      <text class="uni-common-ml-sm">{{ order.address.mobile }}</text>
    	  	</view>
    	    <view class="uni-ellipsis">
    	    	{{ order.address.info }}
    	    </view>
    	  </view>
    	</view>
    	
    	<view class="uni-common-pa uni-border-top uni-bg-white uni-flex" >
    		<view class="">
    			<text v-if="order.order_type == 1">自营</text>
    			<text v-if="order.order_type == 2">京选</text>
    		</view>
    	  <view class="uni-flex-item uni-right uni-bold">
    	  	<text v-if="order.status == 0">待付款</text>
          <text v-if="order.status == 1">待发货</text>
          <text v-if="order.status == 2">待收货</text>
          <text v-if="order.status == 9">已完成</text>
    	  </view>
    	</view>
    	
    	<view class="uni-common-pa uni-border-top uni-bg-white uni-flex" >
    		<view class="">
    			订单号
    		</view>
    	  <view class="uni-flex-item uni-right">
    	  	{{order.order_no}}
    	  </view>
    	</view>
    	
    	<view class="uni-border-top">
    		<view class="uni-bg-white" >
    	    
    		  <view class="uni-common-pl uni-common-pr" >
    	      
    		  	<view class="uni-flex uni-border-top uni-common-pt uni-common-pb" v-for="(item,index) in order.goods_items" :key="index">
    		  		<view class="" style="160upx;height: 160upx;">
    		  			<image lazy-load="true"  :src="item.cover" mode="scaleToFill" style="width: 160upx;height: 160upx;border-radius: 8upx;"></image>
    		  		</view>
    		      <view class="uni-flex-item uni-common-pl" >
    		      	<view class="uni-ellipsis-2 uni-text-darker" style="height: 80upx;">
    		      		{{item.title}}
    		      	</view>
    		        <view class="uni-flex ">
    		        	<view class="uni-flex-item uni-text-small uni-text-gray"  v-if="order.score_use">
    		        		<text>使用积分抵扣:</text>
    		        		<money :num="order.score" v-if="!order.vip" />
    		        		<money :num="order.score_vip" v-else/>
    		        	</view>
                  <view class="uni-flex-item uni-text-small uni-text-gray " v-else>
                  	未使用积分抵扣
                  </view>
    		          <view class="uni-flex-item uni-right ">
    		            
    		          </view>
    		        </view>
    		        <view class="uni-flex ">
    		        	<view class="uni-flex-item uni-text-red">
    		        		<!-- <text class="uni-text-small">￥</text> -->
    		        		<money :nums="[item.price_sell,item.price_score_sell]" size="30" v-if="!order.vip" />
    		        		<money :nums="[item.price_vip,item.price_score_vip]" size="30" v-else/>
                    
    	              <text style="margin-left: 10upx;">x</text>
    	              <text style="margin-left: 10upx;">{{ item.num }}</text>
    		        	</view>
    		          <view class="uni-flex-item uni-right uni-text-small uni-text-light" >
    		             <text class="uni-bg-gray order-detail-item-action" v-if="order.status == 9" @tap="goToAfterApply({order:order, items: [item]})" >售后</text>
                     <text class="uni-bg-gray order-detail-item-action" v-if="order.status == 9" @tap="goToOrderRate({order:order, items: [item]})" >评价</text>
    		          </view>
    		        </view>
    		      </view>
    		  	</view>
    	   
    		  </view>
    		  
    		</view>
    	</view>
    	
    	<view class="uni-common-pa uni-border-top uni-bg-white uni-flex" >
    		<view class="">
    			下单时间
    		</view>
    	  <view class="uni-flex-item uni-right">
    	  	{{ order.create_date }}
    	  </view>
    	</view>
    	
    	<view class="uni-common-pa uni-border-top uni-bg-white uni-flex" >
    		<view class="">
    			订单金额
    		</view>
    	  <view class="uni-flex-item uni-right uni-text-red">
    	  	<view v-if="order.score_use">
    	  	  <money :num="order.total" size="30" v-if="!order.vip" />
    	  	  <money :num="order.total_vip" size="30" v-else/>
    	  	</view>
    	  	<view v-else>
    	  	  <money :nums="[order.total, order.score]" size="30" v-if="!order.vip" />
    	  	  <money :nums="[order.total_vip, order.score_vip]" size="30" v-else/>
    	  	</view>
    	  </view>
    	</view>
    	
    	<view class="uni-common-pa uni-border-top uni-bg-white uni-flex" >
    		<view class="">
    			使用积分抵扣
    		</view>
    	  <view class="uni-flex-item uni-right">
    	  	<view class="uni-text-light uni-common-mr-sm uni-inline-block" v-if="order.score_use">

    	  	  <money :num="order.score" size="30" v-if="!order.vip" />
    	  	  <money :num="order.score_vip" size="30" v-else/>
    	  	</view>
    	  	<view class="uni-text-light uni-common-mr-sm uni-inline-block" v-else>
    	  		0
    	  	</view>
    	  </view>
    	</view>
    	
    	<view class="uni-common-pa uni-border-top uni-bg-white uni-flex" v-if="order.payment">
    		<view class="">
    			支付方式
    		</view>
    	  <view class="uni-flex-item uni-right">
    	  	<text v-if="order.payment.type == 1">代金券</text>
					<text v-if="order.payment.type == 2">账户余额</text>
					<text v-if="order.payment.type == 3 && order.payment.method == 'wx'">微信支付</text>
					<text v-if="order.payment.type == 3 && order.payment.method == 'alipay'">支付宝</text>
    	  </view>
    	</view>
    	
    	<view class="uni-common-mt" v-if="order.express">
    		<view class="uni-common-pa uni-border-top uni-bg-white uni-flex" >
    			<view class="">
    				物流信息
    			</view>
    		  <view class="uni-flex-item uni-right">
    		  	{{ order.express.company }}
    		  </view>
    		</view>
    		
    		<view class="uni-common-pa uni-border-top uni-bg-white uni-flex" >
    			<view class="">
    				物流单号
    			</view>
    		  <view class="uni-flex-item uni-right">
    		  	{{ order.express.express_no }}
    		  </view>
    		</view>
    	</view>
    	
    	<view class="uni-common-mt" v-if="order.invoice">
    	  
        
    		<view class="uni-common-pa uni-border-top uni-bg-white uni-flex" >
    			<view class="">
    				发票类型
    			</view>
    		  <view class="uni-flex-item uni-right">
    		  	<text v-if="order.invoice.category == 1">普通增值税发票</text> 
    		  </view>
    		</view>
            		
    		<view class="uni-common-pa uni-border-top uni-bg-white uni-flex" >
    			<view class="">
    				<text>发票抬头:</text> 
            <text v-if="order.invoice.type == 1">个人</text> 
            <text v-if="order.invoice.type == 2">公司</text> 
    			</view>
    		  <view class="uni-flex-item uni-right">
    		  	<text v-if="order.invoice.type == 1">{{ order.invoice.title }}</text> 
            <text v-if="order.invoice.type == 2">{{ order.invoice.company_title }}</text> 
    		  </view>
    		</view>
    	  
    	  <view class="uni-common-pa uni-border-top uni-bg-white uni-flex" >
    	  	<view class="">
    	  		发票内容
    	  	</view>
    	    <view class="uni-flex-item uni-right uni-text-small uni-text-gray">
            <text v-if="order.invoice.info == 1">发票内容显示详细商品名称及价格信息</text>
    	    	<text v-if="order.invoice.info == 2">发票内容显示商品类别及价格信息</text>
    	    </view>
    	  </view>
    	  
    	</view>
    	
    	<view class="uni-common-pt" style="height: 100upx;">
    		
    	</view>
    	
    	<view class="uni-fixed-bottom uni-bg-white uni-right order-detail-bottom uni-common-pr uni-border-top">
        <view class="" v-if="order.status == 0">
        	<text class="" @tap="goCancel(order)">取消</text>
        	<text class="uni-bg-red" @tap="goPayment(order)">去支付</text>
        </view>
        <view class="" v-if="order.status == 2">
        	<text class="order-btn" @tap="goComplete(order)">确认收货</text>
        </view>
        <view class="" v-if="order.status == 9">
        	<!-- <text @tap="goToComment">评价</text> -->
          <text @tap="goToAfterApply({order:order, items: order.goods_items})">申请售后</text>
        </view>
    	  
    	</view>
    </view>
		
    <view class="uni-common-pa uni-center" v-else>
    	未找到订单
    </view>
    
	</view>
</template>

<script>
  import uniIcon from '@/components/uni-icon.vue';
  import money from '@/components/money.vue';
  export default {
    components:{
      uniIcon,money
    },
    data(){
      return {
        order:{
          
        }
      }
    },
    methods:{
      goToComment(){
        uni.navigateTo({
        	url:"/pagesUser1/user/orderRatePost"
        })
      },
      goToOrderRate(data){
        let order= data.order
        let goodsItems = data.items
        
        this.$store.state.mallAfterData.order = order
        this.$store.state.mallAfterData.goodsItems = goodsItems
        uni.navigateTo({
        	url:"/pagesUser1/user/orderRatePost?order_id="+order.id+"&item_id=" + goodsItems[0].id
        })
      },
      goToAfterApply(data){
        let order= data.order
        let goodsItems = data.items

        this.$store.state.mallAfterData.order = order
        this.$store.state.mallAfterData.goodsItems = goodsItems
        uni.navigateTo({
        	url:"/pagesUser1/user/orderAfterApply"
        })
      },
      goComplete(order) {
        uni.showModal({
          title: '订单完成',
          content: '确认收到货物完成订单',
          success: async (res) => {
            if (res.confirm) {
              console.log('用户点击确定');
              let ret = await this.$store.dispatch('mallOrderComplete', {
                order_id: order.id
              })
              console.log('mallOrderComplete ret', ret)
              if (ret.code == 0) {
                uni.showToast({
                  icon: 'success',
                  title: '操作成功',
                  mask: false,
                  duration: 1500
                });
        
//                 uni.startPullDownRefresh({
//                   success: async (res) => {
//                     await this.getData()
//                     uni.stopPullDownRefresh();
//                   }
//                 });
              this.$store.state.userDataRefresh = true
              uni.startPullDownRefresh({
              	success: async (res) => {
                  await this.getData()
                  uni.stopPullDownRefresh()
                }
              })

              } else {
                uni.showToast({
                  icon: 'none',
                  title: '操作成功，' + ret.message,
                  mask: false,
                  duration: 1500
                });
              }
        
        
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });
      },
      goCancel(order){
        uni.showModal({
            title: '取消订单',
            content: '确认取消当前订单',
            success: async (res) => {
                if (res.confirm) {
                    console.log('用户点击确定');
                    let ret = await this.$store.dispatch('mallOrderCancel' , {order_id: order.id})
                    console.log('mallOrderCancel ret', ret)
                    if(ret.code == 0){
                      uni.showToast({
                        icon:'success',
                      	title: '取消订单成功',
                      	mask: false,
                      	duration: 1500
                      });
                      
//                       uni.startPullDownRefresh({
//                       	success: async (res) => {
//                           await this.getData()
//                           uni.stopPullDownRefresh();
//                         }
//                       });
                      setTimeout(() => {
                        this.$store.state.userDataRefresh = true
                        uni.navigateBack({
                        	delta: 1
                        });
                      }, 1500)
                      
                      
                      
                    }else {
                      uni.showToast({
                        icon:'none',
                      	title: '取消订单失败，' + ret.message,
                      	mask: false,
                      	duration: 1500
                      });
                    }
                    
                    
                } else if (res.cancel) {
                    console.log('用户点击取消');
                }
            }
        });
      },
      goPayment(order){
        this.$store.state.mallPayment.orderIds =  [order.id]
        let isVip = order.vip
        let useScore = order.score_use 
        let totalVip = order.total_vip * 100
        let scoreVip = order.score_vip * 100
        let total = order.total * 100
        let score = order.score * 100
        let totals = isVip ? (useScore ? totalVip : totalVip + scoreVip) : (useScore ? total : total + score)
        totals = totals / 100
        this.$store.state.mallPayment.totals = totals
        
        uni.redirectTo({
        	url: '/pagesMall/mall/payment'
        })
      },
      async getData(){
        let ret = await this.$store.dispatch('mallOrderInfoGet' , {order_id: this.order.id})
        console.log('mallOrderInfoGet ret' , JSON.stringify(ret) , ret)
        if(ret.code == 0){
          this.order = ret.data.info
        }else{
          this.order= {}
        }
      }
    },
    onLoad(opt) {
    	let orderId = opt.id
      this.order.id = orderId
      this.getData()
    },
    async onPullDownRefresh() {
    	await this.getData()
      uni.stopPullDownRefresh()
    }
  }
</script>

<style>
  .order-detail-bottom text {
    display: inline-block;
    line-height: 60upx;
    height: 60upx;
    margin-top:20upx;
    margin-right: 30upx;
    /* width: 180upx; */
    padding: 0 30upx;
    border-radius: 30upx;
    border: 1px solid #EEEEEE;
    text-align: center;
    margin-left: 10upx;
    font-size: 24upx;
    width: 100upx;
  }
  
  .order-detail-item-action {
    margin-left: 10upx;
    line-height: 40upx;
    padding: 10upx 20upx;
    border-radius: 30upx;
  }
</style>
