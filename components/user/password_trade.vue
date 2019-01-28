<template>
	<view class="uni-common-pt">
    <view class="uni-center">
    	<view class="uni-h4" v-if="title">
    		{{ title }}
    	</view>
      <view class="" v-if="description">
      	<rich-text :nodes="description"></rich-text>
      </view>
    </view>
    
		<view class="uni-common-pa uni-comment-mt">
      <view class="uni-common-pl uni-common-pr">
        <view class="text-nums uni-flex ">
        	<view class="text-num uni-flex-item" >
            <text v-if="password[0] !== undefined">*</text>
        	</view>
        	<view class="text-num uni-flex-item uni-border-left">
            <text v-if="password[1] !== undefined">*</text>
        	</view>
        	<view class="text-num uni-flex-item uni-border-left">
            <text v-if="password[2] !== undefined">*</text>
        	</view>
        	<view class="text-num uni-flex-item uni-border-left">
            <text v-if="password[3] !== undefined">*</text>
        	</view>
        	<view class="text-num uni-flex-item uni-border-left">
            <text v-if="password[4] !== undefined">*</text>
        	</view>
        	<view class="text-num uni-flex-item uni-border-left">
            <text v-if="password[5] !== undefined">*</text>
        	</view>
        </view>
      	
      </view>
			
		</view>
    
    <view class="keyboard-nums uni-bg-gray uni-center">
    	<view class="uni-flex">
    		<view class="uni-flex-item keyboard-num" @tap="inputPassword('1')">
    			1
    		</view>
        <view class="uni-flex-item keyboard-num" @tap="inputPassword('2')">
        	2
        </view>
        <view class="uni-flex-item keyboard-num" @tap="inputPassword('3')">
        	3
        </view>
    	</view>
      <view class="uni-flex">
      	<view class="uni-flex-item keyboard-num" @tap="inputPassword('4')">
      		4
      	</view>
      	<view class="uni-flex-item keyboard-num" @tap="inputPassword('5')">
      		5
      	</view>
      	<view class="uni-flex-item keyboard-num" @tap="inputPassword('6')">
      		6
      	</view>
      </view>
      <view class="uni-flex">
      	<view class="uni-flex-item keyboard-num" @tap="inputPassword('7')">
      		7
      	</view>
      	<view class="uni-flex-item keyboard-num" @tap="inputPassword('8')">
      		8
      	</view>
      	<view class="uni-flex-item keyboard-num" @tap="inputPassword('9')">
      		9
      	</view>
      </view>
      <view class="uni-flex">
      	<view class="uni-flex-item keyboard-num bg-none">
      		
      	</view>
      	<view class="uni-flex-item keyboard-num " @tap="inputPassword('0')">
      		0
      	</view>
      	<view class="uni-flex-item keyboard-num bg-none" @tap="delPassword">
      		del
      	</view>
      </view>
    </view>
	</view>
</template>

<script>
  export default {
    props:{
      title:{
        type:String,
        default:''
      },
      description:{
        type:String,
        default:''
      }
    },
    data(){
      return {
        password:[]
      }
      
    },
    methods:{
      inputPassword(s){
        console.log('password' , this.password)
        if(this.password.length >= 6){
          return 
        }
        this.password.push(s)
        
        if(this.password.length == 6){
          this.$emit('confirm' , this.password.join(''))
        }
      },
      delPassword(){
        this.password.splice(this.password.length - 1,1)
      }
    }
  }
</script>

<style>
  .text-nums {
    border: 1px solid #EEEEEE;
    border-radius: 8upx;
  }
  .text-num {
    text-align: center;
    /* background: #FFFFFF; */
    width: 100upx;
    height: 100upx;
    line-height: 100upx;
    font-size: 50upx;
  }
  .keyboard-nums {
    padding: 8upx;
  }
  .keyboard-num {
    background: #FFFFFF;
    margin: 8upx;
    height: 80upx;
    line-height: 80upx;
    font-size: 40upx;
    color: #333333;
    border-radius: 8upx;
  }
  .keyboard-num.bg-none{
    background: none;
  }
</style>
