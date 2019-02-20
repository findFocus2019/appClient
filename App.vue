<script>
  import config from '@/store/config.js'
export default {
  onLaunch: function() {
    console.log("App Launch");
    // 检查
    let device = uni.getSystemInfoSync();
    console.log('divice info:' + JSON.stringify(device));
    
    
    //  检查更新
    // #ifdef APP-PLUS
    var server = config.apiDomain + "/update"; //检查更新地址  
    let platform = device.platform
    uni.request({  
        url: server, 
        data: {
          version: config.version,
          platform: platform
        },
        success: (res) => {  
          console.log('check update ret:' , JSON.stringify(res.data))
            if (res.statusCode == 200 && res.data.status === 1) {  
              let url = res.data.url
                uni.showModal({ //提醒用户更新  
                    title: "更新提示",  
                    content: res.data.note,  
                    success: (res) => {  
                        if (res.confirm) {  
                          if(platform == 'android'){
                            plus.runtime.openURL(url)
                          } else if (platform == 'ios'){
                            plus.runtime.openURL(url)
                          }       
                        }  
                    }  
                })  
            }  
        }  
    }) 
    // #endif
    
  },
  async onShow() {
    console.log("App Show");
    let token = uni.getStorageSync('user_auth_token')
    if (token && !this.$store.state.hasLogin) {
      console.log('App Show userInfoGet')
      await this.$store.dispatch('userInfoGet')
      if (this.$store.state.userInfo.id) {
        this.$store.state.hasLogin = true
				console.log('App Show hasLogin' , this.$store.state.hasLogin)
      }
    }
  },
  onHide: function() {
    console.log("App Hide");
  }
  
};
</script>

<style>
@import "./common/uni.css";
@import "./static/css/common.css";

page {
  background-color: #f4f5f6;
  height: 100%;
  font-size: 28upx;
  line-height: 1.8;
}

img {
  max-width: 750upx;
}
uni-rich img {
  max-width: 100% !important;
}

uni-rich-text img {
    max-width: 100% !important;
  }
  
uni-rich-text p {
  line-height: 1.5;
  margin-bottom: 30upx;
  word-break: break-all;
}

.uni-popup-bottom {
  position: fixed !important;
}

</style>
