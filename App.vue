<script>
  import config from '@/store/config.js';
  export default {
    methods:{
      async signDaysSet(){
        let date = new Date();
        let year= date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        
        month = (month < 10) ? ('0' + month) : month,
        day = (day< 10) ? ('0' + day) : day
        
        let today = year.toString() + month.toString() + day.toString() 
   
        if(this.$store.state.hasLogin){
          let ret = await this.$store.dispatch('userRecodeSignDay' , {today:today})
          console.log('userRecodeSignDay ret:' + JSON.stringify(ret))
        }
   
      },
      async fsManage(){
        plus.io.requestFileSystem( plus.io.PRIVATE_WWW, function( fs ) {
        // 可通过fs进行文件操作 
        console.log( "Request file system success!" );
      }, function ( e ) {
        console.log( "Request file system failed: " + e.message );
      } );
      }
    },
    onLaunch: function() {
      console.log("App Launch");
      // 检查
      let device = uni.getSystemInfoSync();
      console.log('divice info:' + JSON.stringify(device));

      //  检查更新
      // #ifdef APP-PLUS
      
      var server = config.apiDomain + "/update"; //检查更新地址  
      let platform = device.platform
      
      if(platform == 'android'){
        uni.request({
          url: server,
          data: {
            version: plus.runtime.version,
            platform: platform
          },
          success: (res) => {
            console.log('check update ret:', JSON.stringify(res.data))
            if (res.statusCode == 200 && res.data.status === 1) {
              // plus.storage.clear();
              let url = res.data.url
              uni.showModal({ //提醒用户更新  
                title: "更新提示",
                content: res.data.note,
                success: (res) => {
                  if (res.confirm) {
                    if (platform == 'android') {
                      plus.runtime.openURL(url)
                    } else if (platform == 'ios') {
                      // plus.runtime.openURL(url)
                    }
                  }
                }
              })
            }
          }
        })
        
      }
      
      
      uni.subscribePush({
        provider: 'igexin',
        success: async (res) => {
          console.log('subscribePush success:' + JSON.stringify(res));
      
          let clientId = res.clientid
          let pushToken = res.token
          let platform = uni.getSystemInfoSync().platform
          
          if(clientId){
            let body = {
              client_id: clientId,
              platform: platform,
              status: 1,
              push_token: pushToken
            };
            console.log('pushInfo body:' + JSON.stringify(body))
            let pushRet = await this.$store.dispatch('pushInfo', body)
            console.log('pushInfo pushRet:' + JSON.stringify(pushRet))
            if (pushRet.code == 0) {
              this.$store.state.push.client_id = clientId
              this.$store.state.push.platform = platform
              this.$store.state.push.token = pushToken
            }
          }else {
            console.log('pushInfo no client id')
          }
          
          // 监听推送透传
          uni.onPush({
            provider: 'igexin',
            success: function() {
              console.log('监听透传成功');
            },
            callback: function(data) {
              console.log("接收到透传数据：" + JSON.stringify(data));
              let jsonData = data.data
              let errMsg = data.errMsg
              if(jsonData.title){
                uni.showToast({
                	title: jsonData.title,
                	mask: false,
                	duration: 1500,
                  success(){
                    if(!jsonData.page){
                      return 
                    }
                    uni.navigateTo({
                    	url: jsonData.page,
                    	fail: () => {
                        uni.switchTab({
                          url: jsonData.page
                        })
                      },
                    });
                  }
                });
              }
            },
            fail:()=>{
              console.log('监听透传失败');
            }
          });
          
      
        }
      });
      
      

      // #endif

      this.signDaysSet()
    },
    async onShow() {
      console.log("App Show ==============");
      let token = uni.getStorageSync('user_auth_token')
      if (token && !this.$store.state.hasLogin) {
        console.log('App Show userInfoGet')
        await this.$store.dispatch('userInfoGet')
        if (this.$store.state.userInfo.id) {
          this.$store.state.hasLogin = true
          console.log('App Show hasLogin', this.$store.state.hasLogin)
        }
      }

    },
    async onHide() {
      console.log("App Hide ================");

      // #ifdef APP-PLUS

      // 设置推送状态
//       if(this.$store.state.push.client_id){
//         let body = {
//           client_id: this.$store.state.push.client_id,
//           platform: this.$store.state.push.platform,
//           push_token: this.$store.state.push.token,
//           status: 0
//         }
//         
//         let pushRet = await this.$store.dispatch('pushInfo', body)
//         console.log('pushInfo pushRet:' + JSON.stringify(pushRet))
//       }
      
      // #endif
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
