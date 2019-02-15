<template>
  <view class="uni-page-body uni-bg-white">
     <view class="uni-padding-wrap uni-common-mt">
       <form class="uni-common-mt uni-common-pt" @submit="formSubmit">
         <view class="uni-form-item uni-column uni-border-bottom">
           <input
             type="text"
             v-model="postData.mobile"
             required
             placeholder="请输入登录手机号码"
             class="uni-input"
           >
         </view>
         <view class="uni-form-item uni-column uni-border-bottom">
           <input
             type="password"
             v-model="postData.password"
             required
             placeholder="请输入登录密码"
             class="uni-input"
           >
         </view>
     
         <view class="uni-flex uni-border-bottom uni-form-item">
           <view class="uni-flex-item uni-column">
             <input
               type="password"
               v-model="postData.verify_code"
               required
               placeholder="请输入验证码"
               class="uni-input"
               maxlength="6"
             >
           </view>
           <view class="uni-common-pl uni-common-pr " >
             <view @tap="smsSendClick" class="uni-border-btn-radius uni-center btn-sms" style="">{{ sms.text }}</view>
           </view>
         </view>
         
         <view class="uni-flex uni-common-mt uni-common-pa">
         	<view class="">
            <checkbox @tap="checkChange" />
          </view>
          <view class="uni-flex-item uni-text-light">
          	我已阅读并同意 <text class="uni-text-red">用户使用协议</text>
          </view>
         </view>
     
         <view class="uni-common-mt uni-common-pl uni-common-pr">
           <button type="warn" formType="submit" class="uni-border-btn-radius">确定</button>
         </view>
         
         <view class="" style="position: relative;left: -30upx;height: 0;">
            <image src="../../static/img/user/reg-bg.png" mode="widthFix" style="width: 750upx;"></image>
         </view>
     
         <view class="uni-common-pa uni-common-mt uni-center uni-flex" style="position: relative;">
           
           <view class="uni-column uni-flex-item uni-link " @tap="goBack">
             <text class="uni-bold">返回登录</text>
           </view>
           
           <view class="uni-column uni-flex-item uni-link" @tap="goIndex">
             <text class="uni-bold">去首页</text>
           </view>
         </view>
         
         
       </form>
     </view>
  </view>
  
</template>

<script>
import Request from "@/store/request.js";
import uniIcon from "@/components/uni-icon.vue";
export default {
  components:{
    uniIcon
  },
  data() {
    return {
      postData: {
        mobile: "",
        password: "",
        verify_code: "",
        type:0
      },
      sms: {
        text: "获取验证码",
        second: 60,
        click: 0
      },
      checked:0
    };
  },
  computed:{
    oAuthId(){
      return this.$store.state.oAuthId
    },
		inviteUserId(){
			return this.$store.state.inviteUserId
		}
  },
  onShow() {
    let type = uni.getStorageSync('auth_reg_type') || 0
    this.postData.type = type
    if(type == 0){
      
    }else if(type == 1){
      uni.setNavigationBarTitle({
      	title:'重置密码'
      })
    }else if(type== 2){
      uni.setNavigationBarTitle({
      	title:'老用户绑定'
      })
    }else if(type == 3){
      uni.setNavigationBarTitle({
      	title:'三方登录绑定'
      })
    }
    
    let systemInfo = uni.getSystemInfoSync();
    this.postData.oauth_info = {
      platform: systemInfo.platform,
      device: systemInfo.model
    }
  },
  onHide(){
    uni.getStorageSync('auth_reg_type' , 0)
  },
  methods: {
    checkChange(){
      this.checked = !this.checked
      console.log('checkChange' , this.checked)
    },
    async formSubmit() {
      let postData = this.postData;
			postData.pid = this.inviteUserId;
      if(postData.type == 3){
        // 设置oauth的数据
        postData.oauth_info.oauth_id = this.oAuthId
      }
      console.log("formSubmit postData", JSON.stringify(postData));
      uni.showLoading({
        title: "注册中..."
      });
      let ret = await Request.post("auth/register", postData);
      console.log("formSubmit ret", JSON.stringify(ret));
      uni.hideLoading();
      if (ret.code == 0) {
        if(postData.type == 3){
          // 授权登录返回
          uni.showToast({
            title: "绑定成功",
            duration: 2000,
            icon: "success"
          });
          
          let token = ret.data.token;
          console.log("formSbumit token", token);
          uni.setStorageSync("user_auth_token", token);
          this.$store.state.hasLogin = true;
          this.$store.dispatch('userInfoGet')
          
          setTimeout(() => {
             uni.navigateBack({
               delta: 1
             });
          }, 1000)
          
        }else{
           uni.showToast({
             title: ret.message,
             duration: 2000,
             icon: "success"
           });
           setTimeout(() => {
              uni.navigateBack({
                delta: 1
              });
           },2000)
        }
        
        
      } else {
        uni.showToast({
          title: ret.message,
          duration: 2000,
          icon: "none"
        });
      }
    },
    async smsSendClick(){
      if(!this.sms.click){
        this.smsSend()
      }
    },
    async smsSend() {
      
      if (this.sms.second == 60) {
        // 发送
        console.log("sms send ... ...");
        this.sms.click = 1
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
    goBack() {
//       uni.navigateBack({
//         delta: 1
//       });
      uni.redirectTo({
        url:'/pages/auth/login'
      })
    },
    goIndex(){
      uni.reLaunch({
      	url:'/pages/main/main'
      })
    }
  },
  onLoad(opt) {
		let inviteUserId = opt.puid || 0
		this.$store.state.inviteUserId = inviteUserId
		
	}
};
</script>

<style>
  .btn-sms {
    width:200upx;
    height: 80upx;
    line-height: 80upx;
    border: 1px solid #d81e06;
    border-radius: 40upx;
    color: #d81e06;
  }
</style>

