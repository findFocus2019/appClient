<template>
	<view class="uni-page-body uni-bg-white">
		<view class="uni-common-mt">
			<view class="uni-common-pa uni-center">
				
        <view class="uni-center uni-common-pt" >
        	<image lazy-load="true"  src="/static/img/user/sign-title.png" mode="widthFix" style="width: 420upx;"></image>
        </view>
        <view class="uni-text-gray">
        	累计登录7天，获得 <text class="uni-h3 uni-text-red">2元</text> 现金
        </view>
        
        <view class="uni-center uni-common-mt uni-common-pt">
        	
          <view class="" style="display: inline-block;border: 16upx solid #F7F7F7;border-radius: 100%;">
          	<view class="" style="border: 16upx solid #ededed;border-radius: 100%;">
          		<view class="" style="height: 300upx;width: 400upx;border: 8upx solid #BBBBBB;border-radius: 100%;line-height: 100upx;padding-top: 100upx;">
          			<view class="uni-text-dark" style="line-height: 100upx;height: 100upx;font-size: 40upx;">
          				您已累计登录
          			</view>
                <view class="" style="line-height: 100upx;">
                	<text class="uni-bold uni-text-red" style="font-size: 112upx;">{{signDayData.num}}</text>
                  天
                </view>
          		</view>
          	</view>
          </view>
        </view>
        
        <view class="uni-common-pa uni-center ">
          <view class="" style="display: inline-block;">
          	<view class="uni-flex" style="width: 592upx;height: 30upx;background: url('/static/img/user/sign-nums.png');background-size: 100% 100%;">
          		<view class="uni-flex-item uni-center" v-for="(num,i) in nums" :key="i" style="line-height: 40upx;">
          			<view class="uni-bg-red" style="width: 30upx;height: 30upx;border-radius: 100%;display: inline-block" v-if="signDayData.num >= num"></view>
                <view  style="width: 30upx;height: 30upx;border-radius: 100%;display: inline-block;background: #EEEEEE;" v-else></view>
          		</view>
          	</view>
          </view>
        	
        </view>
        
        <view class="uni-common-pa uni-text-light">
          
        	<view class="uni-btn uni-border-btn-radius uni-bg-gray"  v-if="signDayData.num < 7">
        		未发放
        	</view>
          
          <view class="uni-btn uni-border-btn-radius uni-bg-gray" v-if="signDayData.num >= 7">
          	已发放
          </view>
          
         <!-- <view class="uni-common-mt-sm">
          	连续登录7天即可获取现金奖励
          </view>
          <view class="">
          	VIP会员可到提现功能中提取
          </view> -->
          
        </view>
			</view>
		</view>
	</view>
</template>

<script>
  export default {
    data(){
      return {
        nums:[1,2,3,4,5,6,7],
        signNum:3,
        dailySignData:{
          continues_num: 0,
          active_days: [],
          score:0,
          balance:0,
          today_sign:0
        },
        signDayData:{}
      }
    },
    methods:{
      async getDailySignData(){
        // 获取数据
        let ret = await this.$store.dispatch('userDailySignDataGet')
        console.log('userDailySignDataGet =====' , ret)
        if(ret.code == 0){
          this.dailySignData = ret.data
          this.signNum = ret.data.continues_num
        }
      },
      async getSignDatData(){
        let signDayData = uni.getStorageSync('sign_day_date')
        console.log('getSignDatData:' + signDayData)
        signDayData = JSON.parse(signDayData)
        
        this.signDayData = signDayData
        
        if(this.$store.state.hasLogin){
          let ret = await this.$store.dispatch('userRecodeSignDay' , signDayData)
          console.log('userRecodeSignDay ret:' + JSON.stringify(ret))
          if(ret.code == 0){
            signDayData.num = ret.data.num
            uni.setStorageSync('sign_day_date', JSON.stringify(signDayData)) 
          }
        }
      },
      
      goToPage(page){
        uni.navigateTo({
        	url:'/pagesUser/user/assetsOut'
        })
      }
    },
    onLoad() {
    	this.getSignDatData()
    }
  }
</script>

<style>
</style>
