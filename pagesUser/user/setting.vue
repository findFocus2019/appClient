<template>
	<view class="uni-page-body uni-bg-white">
    
		<view class="uni-flex uni-common-pa uni-border-bottom" @tap="authWeixin">
			<view class="uni-flex-item" style="line-height: 80upx;">
        头像
			</view>
      <view class="uni-flex-item uni-right" v-if="userInfo.avatar" style="height: 80upx;">
      	<image lazy-load="true"  :src="userInfo.avatar" mode="" v-if="userInfo.avatar" style="width: 80upx;height: 80upx; border-radius: 40upx;"></image>
      </view>
      <view class="uni-flex-item uni-right" v-else >
      	上传头像
        <uni-icon type="arrowright" size="22"></uni-icon>
      </view>
		</view>
    
    <view class="uni-flex uni-common-pa uni-border-bottom" @tap="updateInputItem({name:'nickname',text:'设置昵称',val:userInfo.nickname})">
    	<view class="uni-flex-item">
        昵称
    	</view>
      <view class="uni-flex-item uni-right">
      	{{ userInfo.nickname }}
      </view>
    </view>
    
    <view class="uni-flex uni-common-pa uni-border-bottom" >
    	<view class="uni-flex-item">
        手机
    	</view>
      <view class="uni-flex-item uni-right">
      	{{ userInfo.mobile }}
      </view>
    </view>
    
    <view class="uni-flex uni-common-pa uni-border-bottom" >
    	<view class="uni-flex-item">
        性别
    	</view>
      <view class="uni-flex-item uni-right" @tap="chooseSex">
        <text v-if="userInfo.sex == 0">未知</text>
      	<text v-if="userInfo.sex == 1">男</text>
        <text v-if="userInfo.sex == 2">女</text>
      </view>
    </view>
    
    <view class="uni-flex uni-common-pa uni-border-bottom" @tap="goToPage('/pagesUser/user/passwordTrade')">
    	<view class="uni-flex-item">
        支付密码
    	</view>
      <view class="uni-flex-item uni-right">
        <uni-icon type="arrowright" size="22"></uni-icon>
      </view>
    </view>
    
    <view class="uni-flex uni-common-pa uni-border-bottom" @tap="updateInputItem({name:'alipay',text:'绑定支付宝',val:userInfo.alipay})">
    	<view class="uni-flex-item">
        绑定支付宝
    	</view>
      <view class="uni-flex-item uni-right">
        <text v-if="userInfo.alipay" class="uni-text-gray uni-text-small">已设置</text>
        <uni-icon type="arrowright" size="22"></uni-icon>
      </view>
    </view>
    
    <!-- <view class="uni-flex uni-common-pa uni-border-bottom" @tap="authWeixin">
    	<view class="uni-flex-item">
        绑定微信
    	</view>
      <view class="uni-flex-item uni-right">
        <text v-if="userInfo.openid" class="uni-text-gray uni-text-small">已设置</text>
        <uni-icon type="arrowright" size="22"></uni-icon>
      </view>
    </view> -->
    
    <view class="uni-flex uni-common-pa uni-border-bottom" >
    	<view class="uni-flex-item">
        版本号
    	</view>
      <view class="uni-flex-item uni-right">
       {{version}}
      </view>
    </view>
    
     <view class="uni-flex uni-common-pa " @tap="goToPage('/pagesUser/user/about')">
    	<view class="uni-flex-item">
        关于我们
    	</view>
      <view class="uni-flex-item uni-right">
        <uni-icon type="arrowright" size="22"></uni-icon>
      </view>
    </view>
    
     <view class="uni-flex uni-common-pa " @tap="goToLogout">
    	<view class="uni-flex-item">
        退出登录
    	</view>
      <view class="uni-flex-item uni-right">
        <uni-icon type="arrowright" size="22"></uni-icon>
      </view>
    </view>
    
    <uni-popup :show="showPopupBottom" type="bottom" @hidePopup="hidePopup">
      <view class="uni-center uni-common-pa">
        <view class="">
        	{{popupTitle}}
        </view>
      	<view class="uni-common-mt  uni-border-bottom">
      		<input type="text" v-model="updateVal" class="uni-left" @confirm="updateConfirm"/>
      	</view>

      </view>

    </uni-popup>
	</view>
</template>

<script>
  import {mapState,mapActions} from 'vuex';
  import uniPopup from '@/components/uni-popup.vue';
  import uniIcon from '@/components/uni-icon.vue';
  export default {
    data(){
      return {
        showPopupBottom: false,
        popupTitle:'',
        updateName: '',
        updateVal:'',
        sexItems: ['男','女']
      }
    },
    components:{
      uniIcon,
      uniPopup
    },
    computed:{
      ...mapState(['version','userInfo'])
    },
    methods:{
      goToPage(page){
        uni.navigateTo({
        	url:page
        })
      },
      async goToLogout(){
        await this.$store.dispatch('authLogout')
        this.$store.state.userIndexData = {
          balance:0,
          score:0,
          count: {
            views:0,
            comments:0,
            likes:0,
            shares:0
          }
        }
        setTimeout(function() {
          uni.navigateBack({
          	delta:1
          })
        }, 1000);
        
      },
      authWeixin(){
        // #ifdef MP-WEIXIN
          return
        // #endif
        let authLogin = () => {
          uni.login({
            provider: 'weixin',
            success: (loginRes) => {
           
              uni.getUserInfo({
                provider: 'weixin',
                success: async (infoRes) => {
                  // console.log('用户昵称为：' + infoRes.userInfo.nickName);
                  let openid = infoRes.userInfo.openId || infoRes.userInfo.openid;
									let avatarUrl = infoRes.userInfo.avatarUrl

									this.updateName = 'avatar'
									this.updateVal = avatarUrl
                  
                  let ret = await this.updateUserInfo()
                  if(ret.code == 0){
                    uni.showToast({
                    	title: '设置头像成功',
                    	mask: false,
                    	duration: 1500
                    });
                  }
                  
                }
              });
            },
            fail() {
            	console.log()
              uni.showToast({
              	icon:'none',
                title:'不支持微信授权或授权失败'
              })
            }
          });
        }
        
//         uni.showActionSheet({
//           itemList: [this.userInfo.openid ? '重新绑定':'授权绑定'],
//           success: (res) => {
//               if(res.tapIndex == 0){
//                 authLogin()
//               }
//           },
//           fail: function (res) {
//               console.log(res.errMsg);
//           }
//         })

				uni.showActionSheet({
          itemList: [this.userInfo.openid ? '重新获取头像':'获取微信头像'],
          success: (res) => {
              if(res.tapIndex == 0){
                authLogin()
              }
          },
          fail: function (res) {
              console.log(res.errMsg);
          }
        })
   
      },
      chooseSex(){
        let sexItems = this.sexItems
        uni.showActionSheet({
          itemList: sexItems,
          success: (res) => {
              console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
              this.updateName = 'sex'
              this.updateVal = res.tapIndex + 1
              
              this.updateUserInfo()
          },
          fail: function (res) {
              console.log(res.errMsg);
          }
        })
      },
      updateInputItem(item){
        
        this.popupTitle = item.text
        this.updateName = item.name
        this.updateVal = item.val
        
        this.showPopupBottom = true
      },
      hidePopup(){
        this.showPopupBottom = false
      },
      updateConfirm(){
        console.log('updateConfirm')
        this.updateUserInfo().then(() => {
          this.showPopupBottom = false
        })
        
      },
      async updateUserInfo(){
        let postData = {}
        postData[this.updateName] = this.updateVal
        console.log('updateUserInfo postData',JSON.stringify(postData))
        let ret = await this.$store.dispatch('userInfoUpdate' , postData)
        console.log('userInfoUpdate' , JSON.stringify(ret))
        if(ret.code== 0){
          await this.$store.dispatch('userInfoGet')
        }
        
        return ret
      }
    }
  }
</script>

<style>
</style>
