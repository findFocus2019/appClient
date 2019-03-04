<template>
	<view class="uni-page-body uni-bg-white uni-center">
		
    <view class="uni-common-ma">
    	<view class="uni-common-pa">
    		
        <view class="uni-common-mt">
        	<image src="/static/logo.png" mode="" style="width: 200upx;height: 200upx;"></image>
        </view>
        
        <view class="uni-common-mt">
        	<view class="uni-h3">
        		发现焦点
        	</view>
          
          <view class="uni-h4">
          	人人都是焦点
          </view>
        </view>
        
        <view class="uni-common-pa">
          <view class="uni-common-pa">
          	<button type="warn" class="uni-border-btn-radius" open-type="getUserInfo" @getuserinfo="authUser">授权登录</button>
          </view>
        	
        </view>
    	</view>
    </view>
	</view>
</template>

<script>
  import Request from "@/store/request.js";
  export default {
    data(){
      return {
        isInvite:0,
        puid:0,
        jscode: '',
        openid: '',
        oauth_info: {
          platform:'',
          device: '',
          avatar:'',
          nickname:'',
          openid:'',
          type:''
        }
      }
    },
    methods:{
      async login(){
        uni.login({
          provider:'weixin',
          success: (loginRes) => {
            console.log('login res =========' , JSON.stringify(loginRes));
            
            let jscode = loginRes.code
            console.log('login jscode =====' , jscode)
            this.jscode = jscode
          }
        })
      },
      async getOpenId(){
        console.log('login 小程序，去后台取openid');
        let jscode = this.jscode
        if(!jscode){
          return false;
        }
        let jscodeRet = await this.$store.dispatch('authCodeToSession' , {jscode: jscode})
        if(jscodeRet.code == 0){
          this.oauth_info.openid = jscodeRet.data.openid
          return true
        }else {
          return false
        }
      },
      async oauthReq(){
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
      async authUser(e){
        let oauthInfo = e.detail.userInfo

        this.oauth_info.avatar = oauthInfo.avatarUrl
        this.oauth_info.nickname = oauthInfo.nickName
        
        let getOpenId = await this.getOpenId()
        if(!getOpenId){
          uni.showToast({
            icon:'none',
          	title: '小程序授权获取openid失败，请稍后重试',
          	mask: false,
          	duration: 1500
          });
        }
        
        this.oauthReq()
      },
      async oauth(){
        console.log('oauth type :' , type);
        uni.login({
          provider: 'weixin',
          success:(loginRes)=> {
            
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
      goAuthBind(type = 0){
        let page = '/pages/auth/register'
        if(this.isInvite){
          page += '?isInvite=1&puid=' + this.puid
          uni.setStorageSync('auth_reg_type' , type)
          uni.navigateTo({
          	url:page
          })
        }else {
          uni.setStorageSync('auth_reg_type' , type)
          uni.redirectTo({
          	url:page
          })
        }
        
      }
    },
    async onLoad(opt){
      this.isInvite = opt.isInvite || 0
      this.puid = opt.puid || 0
      console.log(this.isInvite , this.puid)
      this.login()
    },
    onShow() {
    	let systemInfo = uni.getSystemInfoSync();
      console.log('onShow systemInfo:' + JSON.stringify(systemInfo))
      this.oauth_info.platform = systemInfo.platform
      this.oauth_info.device = systemInfo.model
      this.oauth_info.type = 'mpwx'
    },
  }
</script>

<style>
</style>
