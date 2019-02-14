<template>
  <view class="uni-common-pa" >
  	<view class="uni-flex uni-bg-white" @tap="ecardTap">
  		<view class="" style="width: 218upx;height: 200upx;">
  			<image lazy-load="true"  src="/static/icon/user/ecard0.png" mode="widthFix" style="width: 218upx;height: 200upx;" v-if="ecard.status == 1"></image>
        <image lazy-load="true"  src="/static/icon/user/ecard1.png" mode="widthFix" style="width: 218upx;height: 200upx;" v-if="ecard.status == 0"></image>
  		</view>
  	  <view class="uni-flex-item uni-center">
  	  	<view class="uni-text-red uni-h2 " style="line-height: 200upx;" v-if="ecard.status == 1">
  	  		 <!-- {{ ecard.amount }} -->
					 <money :num="ecard.amount" size="60"/>
  	  	</view>
        <view class="uni-text-gray uni-h2 " style="line-height: 200upx;" v-if="ecard.status == 0">
        	 <!-- {{ ecard.price }} -->
					 <money :num="ecard.price" size="60"/>
        </view>
  	  </view>
  	  <view class="uni-center uni-text-red uni-common-pt ecard-right-text" v-if="ecard.status == 1">
  	  	立即使用
  	  </view>
      <view class="uni-center uni-text-gray uni-common-pt ecard-right-text status-0" v-if="ecard.status == 0">
      	已失效
      </view>
  	</view>
  </view>
	
</template>

<script>
	import money from '@/components/money.vue';
  export default {
		components:{
			money
		},
    props:{
      ecard:{
        type: Object,
        default(){
          return {
            id:0,
            amount: 0,
            price: 0,
            status: 0
          }
        }
      }
    },
    methods:{

      ecardTap(){
        console.log('ecardTap======' ,this.ecard )
        if(this.ecard.status == 1){
          this.$emit('ecardItemTap' , this.ecard)
        }else {
          console.log('===========不可选')
        }
        
      }
    }
  }
</script>

<style>
  .ecard-right-text {
    width: 50upx;border-left: 1px #EEEEEE dashed;padding: 26upx 20upx;line-height: 1.3;
  }
  
  .ecard-right-text.status-0 {
    padding-top: 40upx;
  }
</style>
