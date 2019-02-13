<template>
  <view class="page-user">
    
  	<view class="uni-padding-wrap page-user-head">
      <!-- #ifndef MP-WEIXIN -->
        <view class="uni-center uni-common-pa">
        	个人中心
        </view>
      <!-- #endif -->
      
      <!-- #ifdef MP-WEIXIN -->
      <view class="uni-right uni-common-pa " @tap="goToPage('/pages/user/setting')">
      	设置
      </view>
      <!-- #endif -->
      
      <view class="uni-flex uni-common-pt uni-common-pb"  v-if="hasLogin">
   
        <view class="user-avatar">
          <image lazy-load="true"  :src="userInfo.avatar" mode="scaleToFill" v-if="userInfo.avatar" ></image>
          <image lazy-load="true"  src="/static/icon/qq.png" mode="scaleToFill" v-else></image>
          
        </view>
 
        <view class="uni-flex uni-flex-item uni-common-pl">
        	<view class="uni-flex-item">
            <view class="">
            	{{ userInfo.nickname || '还未设置'}}
            </view>
            <view class="">
            	<image lazy-load="true"  src="/static/icon/user/vip-tag.png" mode="scaleToFill" style="width: 120upx;height: 30upx;"></image>
            </view>
        		
        	</view>
          <view class="uni-flex-item uni-right">
            <navigator url="/pages/notice/notice">
            <!-- <image lazy-load="true"  src="/static/icon/user/msg.png" mode="widthFix" style="width: 110upx;height: 110upx;"></image> -->
            <uni-icon type="chat" size="32"></uni-icon>
            </navigator>
          </view>
          
        </view>
        
      </view>
      
      <view class="uni-flex uni-common-pt uni-common-pb" v-else>
      	<view class="user-avatar">
      	  <image lazy-load="true"  src="../../static/icon/qq.png" mode="scaleToFill"></image>
      	</view>
        
        <view class="uni-flex uni-flex-item uni-common-pl">
        	<view class="uni-flex-item">
            <view class="uni-common-pt">
              <navigator url="/pages/auth/login" hover-class="navigator-hover">
                    还未登录，去登录
                </navigator>
            	
            </view>
        		
        	</view>
          <view class="uni-flex-item uni-right">
            <navigator url="/pages/notice/notice">
              <!-- <image lazy-load="true"  src="/static/icon/user/msg.png" mode="widthFix" style="width: 110upx;height: 110upx;"></image> -->
              <uni-icon type="chat" size="32" color="#ffffff"></uni-icon>
            </navigator>
            
            
          </view>
          
        </view>
      </view>
  		
  	</view>
   
    <view class="uni-common-pa page-user-content" >
    	<view class="uni-center uni-bg-white ">
    		<view class="uni-flex uni-common-pt uni-common-pb uni-border-bottom uni-radius-big">
    			<view class="uni-flex-item">
    				<view class="uni-text-dark">
    					总收益
    				</view>
            <view class="uni-h4">
            	{{userIndexData.balance}}
            </view>
    			</view>
          <view class="uni-flex-item uni-common-pt" @tap="goToPage('/pages/user/assetsOut')">
          	<text class="uni-bg-red" style="padding: 12upx 36upx;border-radius: 8upx;">提现</text>
          </view>
          <view class="uni-flex-item">
          	<view class="uni-text-dark">
          		积分余额
          	</view>
          	<view class="uni-h4">
          		{{ userIndexData.score}}
          	</view>
          </view>
    		</view>
        <view class="uni-flex uni-common-pt uni-common-pb uni-text-lighter">
        	<view class="uni-flex-item">
        		<view class="">
        			浏览量
        		</view>
            <view class="">
            	{{userIndexData.count.views}}
            </view>
        	</view>
          <view class="uni-flex-item">
          	<view class="">
          		评论量
          	</view>
          	<view class="">
          		{{userIndexData.count.comments}}
          	</view>
          </view>
          <view class="uni-flex-item">
          	<view class="">
          		点赞量
          	</view>
          	<view class="">
          		{{userIndexData.count.likes}}
          	</view>
          </view>
          <view class="uni-flex-item">
          	<view class="">
          		转发量
          	</view>
          	<view class="">
          		{{userIndexData.count.shares}}
          	</view>
          </view>
        </view>
    	</view>
      
      <view class="uni-common-mt">
      	<user-card :title="cards[0].title" :items="cards[0].items" :hasLogin="hasLogin"></user-card>
      </view>
      
      <view class="uni-common-mt uni-flex">
      	<view class="uni-flex-item uni-flex user-box-vip uni-common-pa" @tap="goToPage('/pages/user/vip')">
      		<view class="uni-flex-item uni-common-pr" style="width: 120upx;height: 120upx;">
      			<image lazy-load="true"  src="/static/icon/user/vip.png" mode="scaleToFill" style="width: 120upx;height: 120upx;"></image>
      		</view>
          <view class="uni-flex-item">
          	<view class="uni-text-dark uni-common-mt">
          		会员权益
          	</view>
          </view>
      	</view>
        <view class="uni-flex-item uni-flex user-box-ecard uni-common-pa" @tap="goToPage('/pages/user/ecard')">
        	<view class="uni-flex-item uni-common-pr" style="width: 120upx;height: 120upx;">
        		<image lazy-load="true"  src="/static/icon/user/ecard.png" mode="scaleToFill" style="width: 120upx;height: 120upx;"></image>
        	</view>
        	<view class="uni-flex-item">
        		<view class="uni-text-dark uni-common-mt">
        			代金券
        		</view>
        	</view>
        </view>
      </view>
      
      <view class="uni-common-mt" @tap="goToPage('/pages/user/dailySignHongbao')">
      	<image lazy-load="true"  src="/static/img/user-daily-sign.png" mode="widthFix" style="width: 100%;"></image>
      </view>
      
      <view class="uni-common-mt">
      	<user-card :title="cards[1].title" :items="cards[1].items" :hasLogin="hasLogin"></user-card>
      </view>
      
      <view class="uni-common-mt">
      	<user-card :title="cards[2].title" :items="cards[2].items" :hasLogin="hasLogin"></user-card>
      </view>
      
      
    </view>
    
    
    
  </view>
</template>

<script>
  import UserCard from '../../components/user/user-card.vue';
  import uniIcon from '@/components/uni-icon.vue';
  import {
    mapState,
    mapActions
  } from "vuex";
   export default {
     components:{
       UserCard,
       uniIcon
     },
     computed: {
       ...mapState(["hasLogin", "userInfo","userIndexData" , "userDataRefresh"])
     },
     methods:{
       ...mapActions(["authLogout"]),
       logout() {
         this.authLogout();
         uni.navigateTo({
           url: "../auth/login"
         });
       },
       goToPage(page){
         if(!this.hasLogin){
           uni.navigateTo({
           	url:'../auth/login'
           })
         }else {
           uni.navigateTo({
           	url:page
           })
         }
       },
       refresh(){
         if(this.hasLogin){
           this.$store.dispatch('userIndexDataGet')
         }
       }
     },
     onNavigationBarButtonTap(e) {
     	if(e.index === 0){
        if(!this.hasLogin){
          uni.navigateTo({
          	url:'../auth/login'
          })
          
        }else{
          uni.navigateTo({
          	url:'/pages/user/setting'
          })
        }
        
      }
     },
     data(){
       return {
         cards : [
           {title : '我的服务' ,items: [
             {text: '收支记录' , icon : 'trade' , path: '/pages/user/trade'},
             {text: '商城订单' , icon : 'order' , path: '/pages/user/orders'},
             {text: '我的售后' , icon : 'after' , path: '/pages/user/orderAfters'},
             {text: '我的团队' , icon : 'team', path: '/pages/user/inviteList'},
             {text: '我的评价' , icon : 'rate', path: '/pages/user/orderRates'},
             {text: '品牌申请' , icon : 'brand', path: '/pages/user/brandApply'},
           ]},
           {title : '我的足迹' ,items: [
             {text: '收货地址' , icon : 'address', path: '/pages/user/address'},
             {text: '我的评论' , icon : 'comment', path: '/pages/user/postComments'},
             {text: '我的收藏' , icon : 'like', path: '/pages/user/collection'},
             {text: '我的评测' , icon : 'posts', path: '/pages/user/postsList'}
           ]},
           {title : '每日任务' ,items: [
             {text: '推荐注册' , icon : 'invite-reg', path: '/pages/user/invite'},
             {text: '登录签到' , icon : 'daily-sign', path: '/pages/user/dailySign'},
             {text: '文章评论' , icon : 'post-comment',path: '/pages/news/list'},
             {text: '内容点赞' , icon : 'post-like',path: '/pages/news/list'}
           ]}
         ]
       }
     },
     onLoad() {
        if(this.hasLogin){
          this.$store.dispatch('userIndexDataGet')
        }

     },
     onShow() {
        this.refresh()
     },
     async onPullDownRefresh() {
        this.refresh()
     }
   }
</script>

<style>
  .page-user-head {
    /* #ifdef MP-WEIXIN */
    background: #d81e06;
    /* #endif */
    /* #ifndef MP-WEIXIN */
    background: linear-gradient(#ff5d44 , #d81e06);
    /* #endif */
    color: #FFFFFF;
    padding-bottom: 150upx;
  }

  .user-avatar {
    width: 94upx;
    height: 94upx;
    border-radius: 50upx;
    overflow: hidden;
    border: 6upx solid #febdb5;
  }
  
  .page-user-content {
    position: relative;
    top: -150upx;
  }
  
  .user-avatar image {
    width: 100upx;height: 100upx;
  }
  
  .user-box-vip {
    padding-top: 32upx;
    margin-right: 8upx;
    background: #FFFFFF;
  }
  .user-box-ecard{
    padding-top: 32upx;
    margin-left: 8upx;
    background: #FFFFFF;
  }
  .user-box-detail-link {
    border-radius: 32upx;
    margin-top: 16upx;
  }
</style>