<template>
	<view class="uni-page-body">
		<view class="user-top-1 uni-bg-red"></view>
    <view class="uni-common-pa uni-center uni-text-white" style="position: relative;">
    	<view class="uni-h4">
    		连续累计签到
        <text class="uni-h1" style="margin-left: 10upx;margin-right: 10upx;">{{dailySignData.continues_num}}</text>
        天
    	</view>
      <view class="">
      	累计获得奖励：
        <text class="uni-h3 uni-text-yellow" style="margin-left: 10upx;margin-right: 10upx;">{{dailySignData.score}}</text>
        积分
      </view>
      
      <view class="uni-common-pt">
      	<view class="uni-common-pa">
          <view class="" style="width: 630upx;height: 48upx;">
          	<image lazy-load="true"  src="/static/img/user/sign-top.png" mode="" style="width: 630upx;height: 48upx;"></image>
          </view>
      		<view class="uni-bg-white ">
            
      			<view class="uni-flex uni-center uni-text-light uni-common-pa">
              <view class="" style="width: 50upx;height: 50upx;margin-right: 10upx;">
              	<image lazy-load="true"  src="../../static/icon/user/sign-calendar.png" mode="" style="width: 50upx;height: 50upx;"></image>
              </view>
      				<view class="">
                签到记录
      				</view>
              <view class="uni-flex-item">
              	<text class="sign-dot uni-bg-blue"></text>已签到
              </view>
              <view class="uni-flex-item">
              	<text class="sign-dot uni-bg-gray"></text>未签到
              </view>
              <view class="uni-flex-item">
              	<text class="sign-dot uni-bg-pink"></text>今日
              </view>
      			</view>
            
            <view class="uni-flex uni-center uni-text-dark uni-common-mt">
            	<view class="uni-flex-item" v-for="(item,index) in weekdays" :key="index" >
            		{{ item }}
            	</view>
            </view>
            
            <view class="uni-flex uni-common-mt" v-for="(days,index1) in monthDays" :key="index1">
            	<view class="uni-center" v-for="(item,index2) in days" :key="index2" style="width: 90upx;">
                <block v-if="item.day == day">
                  <text class="month-day-item month-day-item-active" v-if="item.active">{{ item.day }}</text>
                  <text class="month-day-item month-day-item-today" v-else>{{ item.day }}</text>
                </block>

                <text class="month-day-item" v-if="item.day > day">{{ item.day }}</text>
                <block v-if="item.day < day && item.day > 0">
                  <text class="month-day-item month-day-item-active" v-if="item.active">{{ item.day }}</text>
                  <text class="month-day-item month-day-item-no-active" v-else>{{ item.day }}</text>
                </block>
                
            	</view>
            </view>
            
            <view class="uni-common-mt">
            	<view class="uni-common-pa">
                <view class="uni-common-pl uni-common-pr">
                	<view class="uni-bg-pink uni-border-btn-radius" style="line-height: 80upx;" v-if="dailySignData.today_sign == 0" @tap="dailySignAction">
                		我要签到
                	</view>
                  <view class="uni-bg-gray uni-border-btn-radius" style="line-height: 80upx;" v-else>
                  	已签到
                  </view>
                </view>
            		
            	</view>
            </view>
            
      		</view>
          
          <view class="uni-common-mt">
            <!-- view class="uni-text-dark" style="line-height: 100upx;">
            	<navigator url="/pagesMain/user/dailySignHongbao">
            	  查看连续签到情况
            	</navigator>
            </view> -->
          	
          </view>
      	</view>

      </view>
    </view>
    
    <score-show :info="scoreInfo"></score-show>
	</view>
</template>

<script>
  import scoreShow from '@/components/score-show.vue';
  export default {
    components:{
      scoreShow
    },
    data(){
      return {
        weekdays: ['日','一','二','三','四','五','六'],
        year:0,
        month:0,
        day:0,
        monthDays:[],
        
        dailySignData:{
          continues_num: 0,
          active_days: [],
          score:0,
          balance:0,
          today_sign:0
        },
        scoreInfo:'',
      }
    },
    computed:{
    },
    onNavigationBarButtonTap(e) {
    	if(e.index === 0){
       uni.navigateTo({
       	url:'/pagesMain/user/dailySignRule'
       })
     }
    },
    methods:{
      scoreShowPop(info){
        this.scoreInfo = info
        setTimeout(() => {
          this.scoreInfo = ''
        }, 3000)
      },
      async dailySignAction(){
        uni.showLoading({
        	mask:true,
          title:'签到中...'
        })
        let ret= await this.$store.dispatch('userDailySignAction')
        console.log('userDailySignAction' , JSON.stringify(ret))
        uni.hideLoading()
        if(ret.code == 0){
          let data = ret.data
          let score = data.score
          let balance = data.balance
          let title = '签到成功'
          if(score){
            title += ',获得' + score + '积分奖励'
          }
//           if(balance){
//             title += ',获得' + balance + '现金奖励'
//           }
//           uni.showToast({
//           	icon:'success',
//             title:title
//           })
          this.scoreShowPop(title)
          
          this.getDailySignData()
        }else {
          uni.showToast({
          	icon:'none',
            title:ret.message
          })
        }
      },
      async getDailySignData(){
        // 获取数据
        let ret = await this.$store.dispatch('userDailySignDataGet')
        console.log('userDailySignDataGet =====' , ret)
        if(ret.code == 0){
          this.dailySignData = ret.data
        }
      }
    },
    async onLoad() {
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
      
      await this.getDailySignData()
      
      for (var index =0 ; index < monthDayCount; index++){
        if(!weekdays[i]){
          weekdays[i] = []
        }
        let dayData = {}
        if(this.dailySignData.active_days.indexOf(dayCount) > -1){
          dayData.day = dayCount
          dayData.active = true
        }else {
          dayData.day = dayCount
          dayData.active = false
        }
        weekdays[i].push(dayData)
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
  
  .sign-dot {
    display: inline-block;
    width: 20upx;
    height: 20upx;
    /* background: #000000; */
    border-radius: 10upx;
    margin-right: 10upx;
  }
  
  .month-day-item {
    display: inline-block;
    width: 48upx;
    height: 48upx;
    /* background: #000; */
    border-radius: 24upx;
  }
  
  .month-day-item-today {
    background: #ff6262;
    color: #FFFFFF;
  }
  
  .month-day-item-active {
    background: #007aff;
    color: #FFFFFF;
  }
  
  .month-day-item-no-active {
    background: #EEEEEE;
    /* color: #333333; */
  }
  
</style>
