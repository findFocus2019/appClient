<template>
  <view class="uni-bg-white uni-page-body">
    
     <view class="uni-padding-wrap uni-common-pt">
       <!-- <view class="uni-center uni-h3 uni-common-mt uni-common-pt">登录</view> -->
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
         
         <view class="uni-flex uni-border-bottom uni-common-pa uni-text-gray" v-if="signType && pid > 0">
           <view class="">
           	邀请人手机号：{{ inviteUser.mobile }}
           </view>
         </view>
     
         <view class="uni-flex uni-common-mt uni-common-pa">
          <view class="">
            <checkbox @tap="checkChange" />
          </view>
          <view class="uni-flex-item uni-text-light">
            我已阅读并同意 <text class="uni-text-red" @tap="goToAgree">《用户使用协议》</text>
          </view>
         </view>
     
         <view class="uni-common-mt uni-common-pl uni-common-pr">
           <button type="warn" formType="submit" class="uni-border-btn-radius">{{ signText }}</button>
         </view>
     
         <view class="uni-common-pl uni-common-pr uni-common-mt uni-center uni-flex" v-if="signType != 3">
           <view class="uni-column uni-flex-item uni-link">
             <!-- <navigator url="/pages/auth/register">没有账号去注册?</navigator>
              -->
              <text @tap="changeSignType" >{{ signChangeText }}</text>
           </view>
     
           <view class="uni-column uni-flex-item uni-link" @tap="notLogin">
             <text>暂不登录</text>
           </view>
         </view>
         
       </form>
     </view>
     
     
     <view style="position: absolute;top: 800upx;width: 100%;" v-if="signType == 0">
       <view class="" style="height: 180upx;">
       	<view class="uni-common-pa uni-common-mt uni-center uni-flex" v-if="hasProvider">
       	
       	     <view class="uni-column uni-flex-item" @tap="oauth(item.value)" v-for="(item,index) in providerList" :key="index">
       	       <image lazy-load="true"  :src="item.image" style="width:120upx;height:120upx;"></image>
       	     </view>
       	 
       	</view>
        
       </view>
       <view class="uni-center uni-text-gray uni-common-pb" v-if="hasProvider">
       	快捷登录
       </view>
     </view> 
     
  </view>
  
</template>

<script>
import Request from "@/store/request.js";
export default {
  data() {
    return {
      signText:'登录',
      signType:0,
      signChangeText:'没有账号去注册?',
      pid:0,
      isReg:0,
      postData: {
        mobile: "",
        verify_code: "",
        auth_info: {}
      },
      sms: {
        text: "获取验证码",
        second: 60,
        click: 0
      },
      inviteUser:{
        mobile:''
      },
      hasProvider: false,
      providerList: [],
      positionTop:0,
      showPassword:true,
      oauth_info:{
        platform:'',
        device: '',
        avatar:'',
        nickname:'',
        openid:'',
        type:''
      }
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
  methods: {
    checkChange(){
      this.checked = !this.checked
      console.log('checkChange' , this.checked)
    },
    goToAgree(){
      uni.navigateTo({
      	url:'/pagesMain/user/agreement'
      })
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
        if(!this.postData.mobile || this.postData.mobile.length != 11){
          uni.showToast({
            icon: 'none',
            title: '输入正确手机号'
          })
          return
        }
        
        this.sms.click = 1
        
        let smsRet = await this.$store.dispatch('sendSmsCode', {
          mobile: this.postData.mobile
        })
        if (smsRet.code == 0) {
          uni.showToast({
            icon: 'success',
            title: '验证码发送成功'
          })
        } else {
          uni.showToast({
            icon: 'none',
            title: smsRet.message
          })
          
          return
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
    
    async formSubmit() {
      if(!this.checked){
        uni.showToast({
          title: "请阅读并同意《用户使用协议》",
          duration: 2000,
          icon: "none"
        });
        return
      }
      
      let postData = this.postData;
      console.log("formSubmit postData", JSON.stringify(postData));
      
      // return 
//       let systemInfo = uni.getSystemInfoSync();
//       postData.auth_info = {
//         platform: systemInfo.platform,
//         device: systemInfo.model
//       }
      if(this.signType){
        postData.pid = this.inviteUserId || 0;
        if(this.oAuthId){
          postData.oauth_info = this.oauth_info
          postData.oauth_info.oauth_id = this.oAuthId
        }
        
      }
      
      console.log("formSubmit postData", JSON.stringify(postData));
      // return
      uni.showLoading({
        title: "正在登录..."
      });
      let ret = await Request.post("auth/sign", postData);
      console.log("formSubmit ret", JSON.stringify(ret));
      uni.hideLoading();

      if (ret.code == 0) {
        uni.showToast({
          title: "登录成功",
          duration: 1500,
          icon: "success"
        });

        let token = ret.data.token;
        console.log("formSbumit token", token);
        uni.setStorageSync("user_auth_token", token);
        this.$store.state.hasLogin = true;
        this.$store.dispatch('userInfoGet')
        
        setTimeout(() => {
          if(this.isReg){
            uni.switchTab({
            	url:'/pages/main/main'
            })
          }else {
            uni.navigateBack({
              delta: 1
            });
          }
        }, 2000)
         
      } else {
        uni.showToast({
          title: "登录失败," + ret.message,
          duration: 1500,
          icon: "none"
        });
      }
    },
    async oauth(type = ''){
      console.log('oauth type :' , type);
      uni.login({
        provider: type,
        success:(loginRes)=> {
          console.log('login res =========' , JSON.stringify(loginRes));
          if(type == 'sinaweibo'){
            this.oauth_info.openid = loginRes.authResult.uid
          }
          // #ifdef MP-WEIXIN
          let jscode = loginRes.code
          console.log('login jscode =====' , jscode)
          // #endif
          
          uni.getUserInfo({
              provider: type,
              withCredentials: true,
              success: async (infoRes) => {
                  /**
                   * 实际开发中，获取用户信息后，需要将信息上报至服务端。
                   * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
                   */
                  console.log(JSON.stringify(infoRes))
                  let oauthInfo = infoRes.userInfo
                  this.oauth_info.avatar = oauthInfo.avatarUrl
                  this.oauth_info.nickname = oauthInfo.nickName
                  if(oauthInfo.openid){
                     this.oauth_info.openid = oauthInfo.openid
                  }
									if(oauthInfo.openId){
									   this.oauth_info.openid = oauthInfo.openId
									}
                  
                  // #ifdef MP-WEIXIN
                  console.log('login 小程序，去后台取openid');
                  let jscodeRet = await this.$store.dispatch('authCodeToSession' , {jscode: jscode})
                  if(jscodeRet.code == 0){
                    this.oauth_info.openid = jscodeRet.data.openid
                  }else {
                    uni.showToast({
                      icon:'none',
                    	title: '小程序授权获取openid失败，请稍后重试',
                    	mask: false,
                    	duration: 1500
                    });
                    return
                  }
                  // #endif
   
                  console.log(JSON.stringify((this.oauth_info)))
                  
                  let oauthRet = await Request.post('auth/loginOauth' , this.oauth_info)
                  if(oauthRet.code == 0){
                    uni.showToast({
                      title: "授权登录成功",
                      duration: 1500,
                      icon: "success"
                    });
                    
                    let token = oauthRet.data.token;
                    console.log("loginOauth token", token);
                    uni.setStorageSync("user_auth_token", token);
                    this.$store.state.hasLogin = true;
                    this.$store.dispatch('userInfoGet')
                    
                    setTimeout(() => {
                       uni.navigateBack({
                         delta: 1
                       });
                    }, 1000)
                  }else if(oauthRet.code == 2){
                    // 设置oauth_id
                    this.$store.state.oAuthId = oauthRet.data.oauth_id
                    
                    this.signType = 3
                    this.signText = '第三方登录绑定'
                    this.signChangeText = ''
                    
                    // 去绑定
                    // this.goAuthBind(3)
                  }else {
                    uni.showToast({
                      title: "授权登录失败,请稍后重试",
                      duration: 1500,
                      icon: "none"
                    });
                  }
              },
              fail:(err)=> {
                console.error('授权登录失败，' , JSON.stringify((err)))
                uni.showToast({
                  title: "授权登录失败,获取用户信息出错",
                  duration: 1500,
                  icon: "none"
                });
              }
          });
        },
        fail:(err)=> {
        	console.error('授权登录失败:' + JSON.stringify((err)))
          uni.showToast({
            title: "授权登录失败, " + err.errMsg || '请稍后再试',
            duration: 1500,
            icon: "none"
          });
        }
      });
    },
    initProvider() {
        const filters = ['weixin', 'qq', 'sinaweibo'];
        uni.getProvider({
            service: 'oauth',
            success: (res) => {
                if (res.provider && res.provider.length) {
                    for (let i = 0; i < res.provider.length; i++) {
                        if (~filters.indexOf(res.provider[i])) {
                            this.providerList.push({
                                value: res.provider[i],
                                image: '../../static/icon/' + res.provider[i] + '.png'
                            });
                        }
                    }
                    this.hasProvider = true;
                }
            },
            fail: (err) => {
                console.error('获取服务供应商失败：' + JSON.stringify(err));
            }
        });
    },
    initPosition() {
        /**
         * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
         * 反向使用 top 进行定位，可以避免此问题。
         */
        let systemInfo =  uni.getSystemInfoSync()
        console.log('systemInfo :' + JSON.stringify(systemInfo))
        this.positionTop = systemInfo.windowHeight - 140;
        console.log('positionTop' , this.positionTop);
    },
    changeSignType(){
      this.signType = this.signType ? 0 : 1
      if(this.signType) {
        this.signText = '注册'
        this.signChangeText = '返回登录'
      }else {
        this.signText = '登录'
        this.signChangeText = '没有账号去注册?'
      }
      uni.setNavigationBarTitle({
      	title: this.signText
      })
    },
    notLogin(){
//       uni.reLaunch({
//         url:'../news/list'
//       })
      uni.navigateBack({
      	delta:1
      })
    },
    goAuthBind(type = 0){
      uni.setStorageSync('auth_reg_type' , type)
      
      if(type == 1){
        uni.navigateTo({
        	url:'../auth/register'
        })
      }else {
        uni.redirectTo({
        	url:'../auth/register'
        })
      }
      
    }
  },
  async onLoad(opt) {
      this.initProvider();
      this.initPosition();
      
      this.$store.state.hasLogin = false
      uni.setStorageSync("user_auth_token", "");
      
      let signType = opt.sign_type || 0
      
			// #ifdef H5
// 			uni.redirectTo({
// 				url:'/pages/auth/down'
// 			})
			// #endif
      // #ifdef MP-WEIXIN
      // this.oauth('weixin');
      if(signType != 3){
        uni.redirectTo({
        	url:'/pages/auth/mp'
        })
      }
      // #endif

      this.signType = signType
      if(signType == 3) {
        this.signText = '第三方登录绑定'
        this.signChangeText = ''
        this.isReg = 1
      }else if(signType == 1){
        this.signText = '注册'
        this.signChangeText = '返回登录'
        this.isReg = 1
      } else {
        this.signText = '登录'
        this.signChangeText = '没有账号去注册?'
      }
      uni.setNavigationBarTitle({
      	title: this.signText
      })
      
      let pid = this.$store.state.inviteUserId
      this.pid = pid
      console.log('pid==========' , pid)
      if(pid){
        let inviteUserRet = await this.$store.dispatch('getInviteUser', {pid: pid})
        if(inviteUserRet.code == 0){
          this.inviteUser.mobile = inviteUserRet.data.mobile
        }
      }
  },
  onShow() {

  	let systemInfo = uni.getSystemInfoSync();
    let type = ''
    // #ifdef APP-PLUS
    type = 'app'
    // #endif
    // #ifdef H5
    type = 'h5'
    // #endif
    // #ifdef MP-WEIXIN
    type = 'mpwx'
    // #endif
  	this.postData.auth_info = {
  	  platform: systemInfo.platform,
  	  device: systemInfo.model,
      type: type
  	}
    this.oauth_info.platform = systemInfo.platform
    this.oauth_info.device = systemInfo.model
    this.oauth_info.type = type
    
  },
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

