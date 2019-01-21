<template>
  <view class="page-user">
    
  	<view class="uni-padding-wrap uni-common-pt page-user-head">
      <view class="uni-flex page-user-head-title">
         <view class="uni-flex-item">
         	
         </view>
         <view class="uni-flex-item uni-center uni-h3">
         	个人中心
         </view>
         <view class="uni-flex-item uni-right">
         	
         </view>
      </view>
      
      <view class="uni-flex uni-common-pt uni-common-pb" style="width: 100%;">
   
        <view class="user-avatar">
          <image src="../../static/icon/qq.png" mode="scaleToFill"></image>
        </view>
 
        <view class="uni-flex uni-flex-item uni-common-pl">
        	<view class="uni-flex-item">
            <view class="">
            	用户昵称
            </view>
            <view class="">
            	是否vie
            </view>
        		
        	</view>
          <view class="uni-flex-item uni-right">
          	消息
          </view>
          
        </view>
        
      </view>
  		
  	</view>
    
    <view class="uni-common-pa page-user-content ">
    	<view class="uni-center uni-bg-white ">
    		<view class="uni-flex uni-common-pt uni-common-pb uni-border-bottom uni-radius-big">
    			<view class="uni-flex-item">
    				<view class="uni-h5">
    					总收益
    				</view>
            <view class="uni-h4">
            	10000
            </view>
    			</view>
          <view class="uni-flex-item">
          	
          </view>
          <view class="uni-flex-item">
          	<view class="uni-h5">
          		积分余额
          	</view>
          	<view class="uni-h4">
          		10000
          	</view>
          </view>
    		</view>
        <view class="uni-flex uni-common-pt uni-common-pb uni-text-lighter">
        	<view class="uni-flex-item">
        		<view class="">
        			浏览量
        		</view>
            <view class="">
            	100
            </view>
        	</view>
          <view class="uni-flex-item">
          	<view class="">
          		评论量
          	</view>
          	<view class="">
          		100
          	</view>
          </view>
          <view class="uni-flex-item">
          	<view class="">
          		点赞量
          	</view>
          	<view class="">
          		100
          	</view>
          </view>
          <view class="uni-flex-item">
          	<view class="">
          		转发量
          	</view>
          	<view class="">
          		100
          	</view>
          </view>
        </view>
    	</view>
      
      <view class="uni-common-mt">
      	<user-card :title="cards[0].title" :items="cards[0].items"></user-card>
      </view>
      
      <view class="uni-common-mt">
      	<user-card :title="cards[1].title" :items="cards[1].items"></user-card>
      </view>
      
      <view class="uni-common-mt">
      	<user-card :title="cards[2].title" :items="cards[2].items"></user-card>
      </view>
      
      
    </view>
    
    
    
  </view>
</template>

<script>
  import UserCard from '../../components/user/user-card.vue';
   export default {
     components:{
       UserCard
     },
     data(){
       return {
         cards : [
           {title : '我的服务' ,items: [
             {text: '收支记录' , icon : 'trade'},
             {text: '商城订单' , icon : 'order'},
             {text: '我的售后' , icon : 'after'},
             {text: '我的团队' , icon : 'team'},
             {text: '我的评价' , icon : 'rate'},
             {text: '品牌申请' , icon : 'brand'},
           ]},
           {title : '我的足迹' ,items: [
             {text: '收货地址' , icon : 'address'},
             {text: '我的评论' , icon : 'comment'},
             {text: '我的收藏' , icon : 'like'},
             {text: '我的评测' , icon : 'posts'}
           ]},
           {title : '每日任务' ,items: [
             {text: '推荐注册' , icon : 'invite-reg'},
             {text: '登录签到' , icon : 'daily-sign'},
             {text: '文章评论' , icon : 'post-comment'},
             {text: '内容点赞' , icon : 'post-like'}
           ]}
         ]
       }
     }
   }
</script>

<style>
  .page-user-head {
    background: #ff5c44;
    color: #FFFFFF;
    padding-bottom: 150upx;
    padding-top: 120upx;
  }
  
  .page-user-head-title {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    padding-top: 48upx;
    background: #ff5c44;
    z-index: 10000;
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
</style>