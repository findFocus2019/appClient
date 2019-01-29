<template>
	<view class="uni-page-body uni-bg-white">
		<view class="uni-flex uni-common-pa uni-bg-white uni-border-top">
			<view class="uni-flex-item uni-right uni-common-pr" @tap="changeType(1)">
				<text v-if="type == 1" class="uni-bold">现金收支</text>
        <text v-else>现金收支</text>
			</view>
      <view class="uni-flex-item" @tap="changeType(2)">
      	<text v-if="type == 2" class="uni-bold">积分收支</text>
      	<text v-else>积分收支</text>
      </view>
		</view>
    
    <view class="uni-flex uni-bg-gray uni-common-pa">
    	<view class="uni-flex-item">
    		<picker mode="date" :value="date1" :start="startDate" :end="endDate" @change="bindDateChangeStart">
            <view class="uni-input">{{date1}}</view>
        </picker>
    	</view>
      <view class="uni-flex-item uni-center">
      至
      </view>
      <view class="uni-flex-item">
      	<picker mode="date" :value="date2" :start="startDate" :end="endDate" @change="bindDateChangeEnd">
      	    <view class="uni-input">{{date2}}</view>
      	</picker>
      </view>
    </view>
    
    <view class="">
    	<view class="" v-show="type == 1">
        
        <view class="uni-flex uni-border-bottom uni-common-pa">
        	<view class="uni-flex-item">
        		<view class="uni-text-dark">
        			现金收支类型
        		</view>
            <view class="uni-text-small uni-text-gray">
            	2018-10-01 10:11
            </view>
        	</view>
          <view class="uni-flex-item uni-right uni-h3">
          	+100000
          </view>
        </view>
        
    	</view>
      
      <view class="" v-show="type == 2">
        
      	<view class="uni-flex uni-border-bottom uni-common-pa">
      		<view class="uni-flex-item">
      			<view class="uni-text-dark">
      				积分收支类型
      			</view>
      	    <view class="uni-text-small uni-text-gray">
      	    	2018-10-01 10:11
      	    </view>
      		</view>
      	  <view class="uni-flex-item uni-right uni-h3">
      	  	+100000
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
        type: 1,
        // startDate:'2018-01-01',
        // endDate:'2018-12-31',
        date1:'',
        date2:''
      }
    },
    computed: {
        startDate() {
            return this.getDate('start');
        },
        endDate() {
            return this.getDate('end');
        }
    },
    methods:{
      changeType(i){
        this.type = i
      },
      bindDateChangeStart(e){
        console.log('bindDateChangeStart' , this.date1)
        this.date1 = e.target.value
        
        if(this.date1.replace('-','') > this.date2.replace('-','')){
          console.log('bindDateChangeStart 超出')
          this.date1 = this.date2
          return
        }
        
        
      },
      bindDateChangeEnd(e){
        
        this.date2 = e.target.value
        if(this.date2.replace('-','') < this.date1.replace('-','')){
          this.date2 = this.date1
          return
        }
        
        
      },
      getDate(type) {
        const date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (type === 'start') {
            day = 1
        } 
        month = month > 9 ? month : '0' + month;;
        day = day > 9 ? day : '0' + day;
        return `${year}-${month}-${day}`;
      }
    },
    onLoad() {
    	this.date1 = this.getDate('start')
      this.date2 = this.getDate('end')
    }
  }
</script>

<style>
</style>
