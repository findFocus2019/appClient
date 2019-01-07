<template>
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
          <view class="uni-icon uni-icon-eye" :class="[!showPassword ? 'uni-active' : '']" @click="changePassword"></view>
        </view>
        	
      </view>

      <view class="uni-common-pl uni-common-pr uni-common-mt">
        <button type="primary" formType="submit">登录</button>
      </view>

      <view class="uni-common-pl uni-common-pr uni-common-mt uni-center uni-flex">
        <view class="uni-column uni-flex-item uni-link">
          <navigator url="/pages/auth/register">没有账号去注册?</navigator>
        </view>

        <view class="uni-column uni-flex-item uni-link" @tap="goAuthBind(1)">
          <text>忘记密码</text>
        </view>
      </view>

      <view :style="{position: 'absolute' ,top: positionTop + 'px', width: '100%'}">
        <view class="uni-common-pa uni-common-mt uni-center uni-flex" v-if="hasProvider">
          <template v-for="item in providerList">
             <view class="uni-column uni-flex-item" @tap="oauth(item.value)" >
               <image :src="item.image" style="width:64px;height:64px;"></image>
             </view>
          </template>
          
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
</template>

<script>
import Request from "./../../store/request.js";
export default {
  data() {
    return {
      postData: {
        mobile: "",
        password: ""
      },
      hasProvider: false,
      providerList: [],
      positionTop:0,
      showPassword:true
    };
  },
  methods: {
    changePassword(){
      this.showPassword = !this.showPassword
    },
    async formSubmit() {
      let postData = this.postData;
      console.log("formSubmit postData", JSON.stringify(postData));
      uni.showLoading({
        title: "正在登录..."
      });
      let ret = await Request.post("auth/login", postData);
      console.log("formSubmit ret", JSON.stringify(ret));
      uni.hideLoading();
      if (ret.code == 0) {
        uni.showToast({
          title: "登录成功",
          duration: 2000,
          icon: "success"
        });

        let token = ret.data.token;
        console.log("formSbumit token ", token);
        uni.setStorageSync("user_auth_token", token);
        this.$store.state.hasLogin = true;
        uni.navigateBack({
          delta: 1
        });
        
      } else {
        uni.showToast({
          title: "登录失败," + ret.message,
          duration: 2000,
          icon: "none"
        });
      }
    },
    async oauth(type = ''){
      console.log('oauth type :' , type);
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
  }
};
</script>

<style>
</style>

