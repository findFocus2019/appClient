<template>
	<view class="uni-page-body">
		<view class="user-top-1 uni-bg-red"></view>
    <view class="uni-common-pa uni-center uni-text-white" style="position: relative;">
    	<view class="uni-h4">
    		连续累计签到
        <text class="uni-h1" style="margin-left: 10upx;margin-right: 10upx;">3</text>
        天
    	</view>
      <view class="">
      	累计获得奖励：
        <text class="uni-h3 uni-text-yellow" style="margin-left: 10upx;margin-right: 10upx;">888</text>
        积分
      </view>
      
      <view class="uni-common-pt">
      	<view class="uni-common-pa">
          <view class="" style="width: 630upx;height: 48upx;">
          	<image src="/static/img/user/sign-top.png" mode="" style="width: 630upx;height: 48upx;"></image>
          </view>
      		<view class="uni-bg-white ">
            
      			<view class="uni-flex uni-center uni-text-light uni-common-pa">
              <view class="" style="width: 50upx;height: 50upx;margin-right: 10upx;">
              	<image src="../../static/icon/user/sign-calendar.png" mode="" style="width: 50upx;height: 50upx;"></image>
              </view>
      				<view class="">
                签到记录
      				</view>
              <view class="uni-flex-item">
              	<text class="dot uni-bg-blue"></text>已签到
              </view>
              <view class="uni-flex-item">
              	<text class="dot uni-bg-gray"></text>未签到
              </view>
              <view class="uni-flex-item">
              	<text class="dot uni-bg-pink"></text>今日
              </view>
      			</view>
            
            <view class="uni-flex uni-center uni-text-dark uni-common-mt">
            	<view class="uni-flex-item" v-for="(day,index) in weekdays" :key="index">
            		{{ day }}
            	</view>
            </view>
            
            <view class="uni-flex uni-center uni-common-mt" v-for="(days,index1) in monthDays" :key="index1">
            	<view class="uni-flex-item" v-for="(day,index2) in days" :key="index2">
            		<text class="month-day-item">{{ day }}</text> 
            	</view>
            </view>
            
            <view class="uni-common-mt">
            	<view class="uni-common-pa">
                <view class="uni-common-pl uni-common-pr">
                	<view class="uni-bg-pink uni-border-btn-radius" style="line-height: 80upx;">
                		我要签到
                	</view>
                </view>
            		
            	</view>
            </view>
            
      		</view>
          
          <view class="uni-common-mt">
            <view class="uni-bg-gray uni-border-btn-radius" style="line-height: 100upx;">
            	<navigator url="/pages/user/dailySignHongbao">
            	  立即领取
            	</navigator>
            </view>
          	
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
        weekdays: ['日','一','二','三','四','五','六'],
        year:0,
        month:0,
        day:0,
        monthDays:[]
      }
    },
    computed:{
    },
    onNavigationBarButtonTap(e) {
    	if(e.index === 0){
       uni.navigateTo({
       	url:'/pages/user/dailySignRule'
       })
     }
    },
    onLoad() {
    	let date = new Date()
      this.year = date.getFullYear()
      this.month = date.getMonth() + 1
      this.day = date.getDate()
      // this.weekday = date.getDay()
      
      let monthDate = new Date(this.year, this.month, 0)
      let monthDayCount = monthDate.getDate()
      let monthDateFirth = new Date(this.year, this.month, 1)
      let monthFirstWeekday = monthDate.getDay()
      
      let i = 0
      let count = 0
      let dayCount = 1
      let weekdays = []
      for (var index = 0; index < monthFirstWeekday; index++) {
        if(!weekdays[i]){
          weekdays[i] = []
        }
      	weekdays[i].push('')
        count++
      }
      
      for (var index =0 ; index < monthDayCount; index++){
        if(!weekdays[i]){
          weekdays[i] = []
        }
        weekdays[i].push(dayCount)
        dayCount++
        count++
        
        if(count >= 7){
          count = 0
          i++
        }
      }
      
      console.log(weekdays)
      this.monthDays = weekdays
      
    }
  }
</script>

<style>
  .user-top-1 {
    position: fixed;
    width: 100%;
    height: 500upx;
  }
  
  .dot {
    display: inline-block;
    width: 20upx;
    height: 20upx;
    /* background: #000000; */
    border-radius: 10upx;
    margin-right: 10upx;
  }
  
  .month-day-item {
    display: inline-block;
    width: 24px;
    height: 24px;
    /* background: #000; */
    border-radius: 12px;
  }
  
</style>
