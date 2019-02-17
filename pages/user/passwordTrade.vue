<template>
  <view class="uni-page-body uni-bg-white">

    <view class="uni-common-pa">


      <view class="uni-flex uni-border-bottom uni-form-item">
        <view class="uni-flex-item uni-column">
          <input type="password" v-model="postData.verify_code" required placeholder="请输入验证码" class="uni-input"
            maxlength="6">
        </view>
        <view class="uni-common-pl uni-common-pr ">
          <view @tap="smsSendClick" class="uni-border-btn-radius uni-center btn-sms" style="">{{ sms.text }}</view>
        </view>
      </view>

      <view class="uni-text-gray uni-common-mt">
        设置支付密码需先进行手机验证，验证码发送至账号绑定手机
      </view>

      <view class="uni-common-mt">
        <button type="warn" class="uni-border-btn-radius" @tap="showPasswordTrade">确认</button>
      </view>
    </view>


    <view class="">
      <password-trade :title="passwordTradeSet.title" :show="passwordTradeSet.show" @confirm="confirm" @close="passwordTradeSetClose"></password-trade>
    </view>



  </view>
</template>

<script>
  import passwordTrade from '@/components/user/password_trade.vue';
  import {mapState} from 'vuex';
  export default {
    components: {
      passwordTrade
    },
    data() {
      return {
        postData: {
          verify_code: '',
          password: ''
        },
        sms: {
          text: "获取验证码",
          second: 60,
          click: 0
        },
        passwordTradeSet: {
          show: false,
          title: '设置新的支付密码'
        }
      }
    },
    computed:{
      ...mapState(['hasLogin' , 'userInfo']),
    },
    methods: {
      smsSendClick() {
        if (!this.sms.click) {
          this.smsSend()
        }
      },
      async smsSend() {

        if (this.sms.second == 60) {
          // 发送
          console.log("sms send ... ...");
          this.sms.click = 1
          let smsRet = await this.$store.dispatch('sendSmsCode', {
            mobile: this.userInfo.mobile
          })
          if (smsRet.code == 0) {
            uni.showToast({
              icon: 'success',
              title: '验证码发送成功'
            })
          } else {
            uni.showToast({
              icon: 'none',
              title: ret.message
            })
          }
        }

        if (this.sms.second == 0) {
          this.sms.second = 60;
          this.sms.text = "发送";
          this.sms.click = 0
        } else {
          this.sms.text = "(" + this.sms.second-- + "s)";
          console.log("sms send ... ...", this.sms.second);
          if (this.sms.second != 60) {
            setTimeout(() => {
              this.smsSend();
            }, 1000);
          }
        }

      },
      showPasswordTrade() {
        // this.passwordTradeSet.show = true
        let code = this.postData.verify_code
        console.log('code' , code)
        if (code.length == 4) {
          this.passwordTradeSet.show = true
        }
      },
      passwordTradeSetClose(){
        this.passwordTradeSet.show = false
      },
      async confirm(password) {
        this.postData.password = password
        
        let ret = await this.$store.dispatch('userPasswordTradeSet' , this.postData)
        if(ret.code == 0){
          uni.showToast({
          	icon:'success',
            title:'设置成功',
            success: () => {
            	uni.navigateBack({
            		delta:1
            	})
            }
          })
          
        }else {
          uni.showToast({
          	icon:'none',
            title:'设置失败，' + ret.message
          })
        }
      }
    },
    onLoad() {
    	if(!this.hasLogin){
        uni.navigateTo({
        	url:'/pages/auth/login'
        })
      }
    }
  }
</script>

<style>
  .fixed-bottom {
    position: fixed;
    width: 100%;
    bottom: 0;
  }

  .btn-sms {
    width: 200upx;
    height: 80upx;
    line-height: 80upx;
    border: 1px solid #d81e06;
    border-radius: 40upx;
    color: #d81e06;
  }
</style>
