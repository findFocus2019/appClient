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
    
    <view class="uni-flex uni-common-pa uni-border-top">
    	<view class="uni-bold">
    		不可提取金额
    	</view>
      <view class="uni-flex-item uni-right uni-text-gray uni-bold">
      	<money :num="forzenNum" size="28"/>
      </view>
    </view>
    
    <view class="" v-if="userInfo.balance >= 10">
    
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
    
    <view class="uni-common-pa uni-center">
    	<navigator url="/pagesUser/user/assetsOutLogs">提现记录</navigator>
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
        noitceText:`
        <p>尊敬的注册用户，请您仔细阅读账户余额提现规则详情，以确保您的账户内余额可以正常提现。</p>
<p>规则说明：</p>
<p>1. 适用的主体范围：完成实名身份认证并按本规则绑定完成微信、支付宝等第三方支付工具的实名注册用户，且为发现焦点的vip用户。</p>
<p>2. 认证要求：绑定支付宝账号或微信账号，认证真实姓名、身份证号码、身份证照片，请务必保证该收款账号经过实名认证，并与身份证信息一致或与注册使用的联系电话一致。</p>
<p>3. 最低和最高提现额度：用户满足的最低提现要求为账户内余额大于人民币壹拾元（10元，含本数）方可提现；最高提现额度根据提现方式不同有不同的额度，请以提现时的页面提示为准。</p>
<p>4. 提现方式：目前仅提供支付宝，后续将接入微信或其他银行端。</p>
<p>5. 提现的到账时间：提现成功后一般将在1-3个工作日到账，周末顺延。如逾期未到账，请查询账户入账明细及个人中心余额是否有退回。</p>
<p>6. 用户发起提现请求，即视为同意本规则；</p>
<p>7. 提现办理时间：每日的9:00-17:00（国家法定节假日或公休日除外）。</p>
<p>8. 如在提现过程中有任何疑问，请致电平台客服电话：400-836-5151，或联系客服qq：1952516666</p>`,
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
        },
        forzenNum:0
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
            if (index == 0){
              if(!this.userInfo.openid){
                uni.showToast({
                	icon:'none',
                  title:'请先设置支付宝账号',
                  success: () => {
                  	uni.navigateTo({
                  		url:'/pagesUser/user/setting'
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
    
    async onLoad() {
    	
      if(!this.hasLogin){
        uni.navigateTo({
        	url:'/pages/auth/login'
        })
        return
      }else {
        let userInfoRet = await this.$store.dispatch('userInfoGet')
        if(userInfoRet.code == 0){
          this.forzenNum = userInfoRet.data.balance_frozen
        }
      }
      
      console.log('userInfo' , JSON.stringify(this.userInfo))
      
      let alipay = this.userInfo.alipay
      
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
