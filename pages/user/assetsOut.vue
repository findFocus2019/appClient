<template>
	<view class="uni-page-body uni-bg-white">
		
    <view class="uni-flex uni-common-pa uni-border-top">
    	<view class="uni-bold">
    		可提取金额
    	</view>
      <view class="uni-flex-item uni-right uni-text-red uni-bold">
      	<money :num="userInfo.balance" size="28"/>
      </view>
    </view>
    
    <view class="" v-if="this.userInfo.balance > 10">
    
    	<view class="uni-flex uni-common-pa uni-border-top" >
    		<view class="">
    			提取方式
    		</view>
    	  <view class="uni-flex-item uni-right" @tap="chooseMethod">
    	    <text v-if="method" class="uni-text-gray">{{ methodVals[method]}}</text>
    	  <uni-icon type="arrowright" size="20"></uni-icon>
    	  </view>
    	</view>
      
      <view class="uni-flex uni-common-pa uni-border-top uni-border-bottom" >
      	<view class="">
      		金额
      	</view>
        <view class="uni-flex-item uni-right" >
          <input type="number" v-model="balance" :placeholder="userInfo.balance.toString()" @input="balanceInput"/>
        </view>
      </view>
      <view class="uni-common-mt-sm uni-common-pl uni-common-pr uni-right " @tap="balanceAll">
      	全部提取
      </view>
    	
    	<view class="uni-common-pa " @tap="checkClick" >
    		<uni-icon type="circle" size="20" v-if="!checked"></uni-icon>
    	  <uni-icon type="checkbox-filled" size="20" v-else color="#d81e06"></uni-icon>
    	  <text>我已认真阅读并同意</text>
    	  <text class=""> 《用户提现协议》</text>
    	</view>
    	
    	<view class="uni-common-pa uni-common-mt" @tap="confirm">
    		<button type="warn" class="uni-border-btn-radius" :loading="btn.loading" :disabled="btn.disabled">提现</button>
    	</view>
    </view>
    
    <view class="uni-center uni-text-gray uni-common-pa uni-common-mt" v-else>
    	提现金额不足10元，无法提现
    </view>
    
    <view class="uni-common-pa uni-common-mt">
    	<view class="uni-bold">
    		注意事项
    	</view>
      <view class="uni-text-light uni-common-mt-sm">
      	<rich-text :nodes="noitceText"></rich-text>
      </view>
    </view>
    
    
	</view>
</template>

<script>
  import {mapState} from 'vuex';
  import uniIcon from '@/components/uni-icon.vue';
  import money from '@/components/money.vue';
  export default {
    components:{
      uniIcon,
      money
    },
    data(){
      return {
        noitceText:'<p>1.xxxxxxxxxxxxxx</p><p>2.ppppppppppp</p>',
        methods:[],
        balance:0,
        method:'',
        methodVals:{
          wxpay:'微信支付',
          alipay:'支付宝'
        },
        checked:false,
        btn:{
          disabled: false,
          loading: false
        }
      }
    },
    computed:{
      ...mapState(['hasLogin','userInfo','isVip'])
    },
    methods:{
      async confirm(){
        if(!this.checked){
          return 
        }
        
        if(!this.method){
          uni.showToast({
          	icon:'none',
            title:'请选择提现方式'
          })
          return
        }
        
        if(!this.balance || this.balance < 10){
          uni.showToast({
          	icon:'none',
            title:'请输入正确提现金额'
          })
          return
        }
        
        let postData = {
          balance: this.balance,
          method: this.method
        }
        console.log('postData' , JSON.stringify(postData))
        this.btn.loading = true
        this.btn.disabled = true
        
        let ret = await this.$store.dispatch('userTransOut' , postData)
        console.log('userTransOut ret' , JSON.stringify(ret))
        this.btn.loading = false
        this.btn.disabled = false
        if(ret.code == 0){
          uni.showToast({
          	icon:'success',
            title:'提交成功'
          })
          this.$store.dispatch('userInfoGet')
          
        }else {
          uni.showToast({
          	icon:'none',
            title:'提交失败，'+ ret.message
          })
        }
      },
      balanceAll(){
        this.balance = this.userInfo.balance
      },
      balanceInput(e){
        if(e.detail.value > this.userInfo.balance){
          this.balance = this.userInfo.balance
        }

      },
      checkClick(){
        this.checked = !this.checked
      },
      chooseMethod(){
        uni.showActionSheet({
        	itemList:this.methods,
          success: (e) => {
          	let index = e.tapIndex
            if(index == 0){
              if(!this.userInfo.alipay){
                uni.showToast({
                	icon:'none',
                  title:'请先设置微信支付',
                  success: () => {
                  	uni.navigateTo({
                  		url:'/pages/user/setting'
                  	})
                  }
                })
                
                return 
              }else {
                this.method = 'wxpay'
              }
            }else if (index == 1){
              if(!this.userInfo.openid){
                uni.showToast({
                	icon:'none',
                  title:'请先设置支付宝账号',
                  success: () => {
                  	uni.navigateTo({
                  		url:'/pages/user/setting'
                  	})
                  }
                })
                
                return 
              }else {
                this.method = 'alipay'
              }
            }
            
          }
        })
      },
    },
    
    onLoad() {
    	
      if(!this.hasLogin){
        uni.navigateTo({
        	url:'/pages/auth/login'
        })
        return
      }else {
        this.$store.dispatch('userInfoGet')
      }
      
      console.log('userInfo' , JSON.stringify(this.userInfo))
      
      let alipay = this.userInfo.alipay
      let openid =this.userInfo.openid
      
      if(openid){
        this.methods.push('微信支付')
      }else {
        this.methods.push('微信支付(未设置)')
      }
      
      if(alipay){
        this.methods.push('支付宝')
      }else {
        this.methods.push('支付宝(未设置)')
      }
 
     
    }
  }
</script>

<style>
</style>
