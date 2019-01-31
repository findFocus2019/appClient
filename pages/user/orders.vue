<template>
	<view class="uni-page-body">
		<view class="uni-flex uni-bg-white uni-common-pa uni-border-top" >
			<view class="uni-flex-item uni-center" v-for="(item,i) in statusItems" :key="i" @tap="changeStatus(item.status)">
				<text v-if="status === item.status" class="uni-bold">{{item.text}}</text>
        <text v-else>{{item.text}}</text>
			</view>
		</view>
    
    <view class="">
    	
      <view class="uni-bg-white uni-common-mt">
      	
        <view class="uni-flex uni-common-pa" @tap="goToDetail">
        	<view class="uni-flex-item">
        		自营:100101010101010010101010110
        	</view>
          <view class="">
          	类型
          </view>
        </view>
        
        <view class="uni-border-top  uni-common-pb" @tap="goToDetail">
          
        	<view class="uni-flex uni-common-pl uni-common-pr uni-common-pt">
        		<view class="" style="width: 200upx;height: 200upx;">
        			<image src="../../static/img/home/pic_2.png" mode="scaleToFill" style="width: 200upx;height: 200upx;"></image>
        		</view>
            <view class="uni-flex-item uni-common-pl">
            	<view class="uni-ellipsis-2 uni-text-dark" style="height: 100upx;line-height: 50upx;">
            		产品标题产品标题产品标题产品标题产品标题产品标题产品标题产品标题产品标题产品标题产品标题产品标题
            	</view>
              <view class="uni-text-small uni-text-gray">
              	积分可抵扣 ￥ 5.00
              </view>
              <view class="uni-flex">
              	<view class="uni-flex-item uni-text-red uni-h4">
              		￥ 29.9
              	</view>
                <view class="uni-flex-item uni-right">
                	x 2
                </view>
              </view>
            </view>
        	</view>
          
          <view class="uni-flex uni-common-pl uni-common-pr uni-common-pt">
          	<view class="" style="width: 200upx;height: 200upx;">
          		<image src="../../static/img/home/pic_2.png" mode="scaleToFill" style="width: 200upx;height: 200upx;"></image>
          	</view>
            <view class="uni-flex-item uni-common-pl">
            	<view class="uni-ellipsis-2 uni-text-dark" style="height: 100upx;line-height: 50upx;">
            		产品标题产品标题产品标题产品标题产品标题产品标题产品标题产品标题产品标题产品标题产品标题产品标题
            	</view>
              <view class="uni-text-small uni-text-gray">
              	积分可抵扣 ￥ 5.00
              </view>
              <view class="uni-flex">
              	<view class="uni-flex-item uni-text-red uni-h4">
              		￥ 29.9
              	</view>
                <view class="uni-flex-item uni-right">
                	x 2
                </view>
              </view>
            </view>
          </view>
          
        </view>
        
         <view class="uni-border-top uni-common-pa uni-right" @tap="goToDetail">
           <text class="uni-text-small uni-text-light uni-common-mr-sm ">
           	共4件
           </text>
          	<text class="uni-text-small uni-text-light uni-common-mr-sm">
          		积分可抵扣:￥5.00
          	</text>
            <text class="" style="line-height: 1;">
            	合计:<text class="uni-text-red uni-h3">￥ 20.00</text>
            </text>
          </view>
          
        </view>
        
        <view class="uni-flex uni-border-top uni-common-pa uni-bg-white">
        	<view class="uni-flex-item uni-text-small uni-text-light">
        		2019-11-12 10:26
        	</view>
          <view class="">
          	<text class="order-btn">查看物流</text>
            <text class="order-btn">查看物流</text>
          </view>
        </view>
        
      </view>
      
    </view>
	</view>
</template>

<script>
  export default {
    data(){
      return {
        statusItems:[
          {status: '' , text: '全部'},
          {status: 0 , text: '待付款'},
          {status: 1 , text: '待发货'},
          {status: 2 , text: '待收货'},
          {status: 9 , text: '已完成'},
        ],
        status:''
      }
    },
    methods:{
      changeStatus(status){
        this.status = status
      },
      goToDetail(){
        uni.navigateTo({
        	url:'/pages/user/orderDetail'
        })
      }
    }
    
  }
</script>

<style>
  .order-btn {
    display: inline-block;
    padding: 8upx 16upx;
    border: 1px solid #EEEEEE;
    border-radius: 24upx;
    color: #EEEEEE;
    line-height: 32upx;
    margin-left: 10upx;
    width: 120upx;
    text-align: center;
    font-size: 24upx;
  }
</style>
