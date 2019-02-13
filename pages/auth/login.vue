<template>
  <view class="uni-bg-white uni-page-body">
     <view class="uni-padding-wrap uni-common-mt">
       <!-- <view class="uni-center uni-h3 uni-common-mt uni-common-pt">登录</view> -->
       <form class="uni-common-mt uni-common-pt" @submit="formSubmit">
         <view class="uni-form-item uni-column">
           <input
             type="text"
             v-model="postData.mobile"
             required
             placeholder="请输入登录手机号码"
             class="uni-input"
           >
         </view>
         <view class="uni-form-item uni-column">
           <view class="with-fun">
             <input
               v-model="postData.password"
               required
               placeholder="请输入登录密码"
               class="uni-input"
               :password="showPassword"
             >
             <view class="uni-icon uni-icon-eye" :class="[!showPassword ? 'uni-active' : '']" @click="changePassword" style="font-size: 36upx;"></view>
           </view>
           	
         </view>
     
         <view class="uni-common-mt uni-common-pl uni-common-pr">
           <button type="warn" formType="submit" class="uni-border-btn-radius">登录</button>
         </view>
     
         <view class="uni-common-pl uni-common-pr uni-common-mt uni-center uni-flex">
           <view class="uni-column uni-flex-item uni-link">
             <!-- <navigator url="/pages/auth/register">没有账号去注册?</navigator>
              -->
              <text @tap="goAuthBind(0)">没有账号去注册?</text>
           </view>
     
           <view class="uni-column uni-flex-item uni-link" @tap="goAuthBind(1)">
             <text>忘记密码</text>
           </view>
         </view>
     
         <view :style="{position: 'absolute' ,top: positionTop + 'px', width: '100%'}">
           <view class="uni-common-pa uni-common-mt uni-center uni-flex" v-if="hasProvider">

                <view class="uni-column uni-flex-item" @tap="oauth(item.value)" v-for="(item,index) in providerList" :key="index">
                  <image lazy-load="true"  :src="item.image" style="width:64px;height:64px;"></image>
                </view>
 
           </view>
     
           <view class="uni-common-pa uni-center uni-flex">
             <view class="uni-column uni-flex-item uni-link" @tap="goAuthBind(2)">
               <text>老用户入口</text>
             </view>
             <view class="uni-column uni-flex-item uni-link" @tap="notLogin">
               <text>暂不登录</text>
             </view>
           </view>
         </view>
         
       </form>
     </view>
  </view>
  
</template>

<script>
import Request from "./../../store/request.js";
export default {
  data() {
    return {
      postData: {
        mobile: "",
        password: "",
        auth_info: {}
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
        openid:''
      }
    };
  },
  onShow() {
  	let systemInfo = uni.getSystemInfoSync();
  	this.postData.auth_info = {
  	  platform: systemInfo.platform,
  	  device: systemInfo.model
  	}
    this.oauth_info.platform = systemInfo.platform
    this.oauth_info.device = systemInfo.model
  },
  methods: {
    changePassword(){
      this.showPassword = !this.showPassword
    },
    async formSubmit() {
      let postData = this.postData;
      console.log("formSubmit postData", JSON.stringify(postData));
      
//       let systemInfo = uni.getSystemInfoSync();
//       postData.auth_info = {
//         platform: systemInfo.platform,
//         device: systemInfo.model
//       }
      uni.showLoading({
        title: "正在登录..."
      });
      let ret = await Request.post("auth/login", postData);
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
           uni.navigateBack({
             delta: 1
           });
        }, 1000)
         
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
                    // 去绑定
                    this.goAuthBind(3)
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
        	console.error('授权登录失败，' , JSON.stringify((err)))
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
        this.positionTop = uni.getSystemInfoSync().windowHeight - 160;
        console.log('positionTop' , this.positionTop);
    },
    notLogin(){
      uni.reLaunch({
        url:'../news/list'
      })
    },
    goAuthBind(type = 0){
      uni.setStorageSync('auth_reg_type' , type)
      uni.redirectTo({
      	url:'../auth/register'
      })
    }
  },
  onLoad() {
      this.initProvider();
      this.initPosition();
      
      // #ifdef MP-WEIXIN
      this.oauth('weixin');
      // #endif
  }
};
</script>

<style>
</style>

