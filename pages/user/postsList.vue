<template>
	<view class="uni-page-body">

    <view class="uni-bg-white uni-common-pt uni-common-pb uni-common-mt" v-for="(item,index) in listData.list" :key="index" >
      
      <view class="uni-right uni-common-pl uni-common-pr" style="position: relative;height: 0;" v-if="item.status == 0">
      	<image src="../../static/img/user/audit-no.png" mode="widthFix" style="width: 160upx;"></image>
      </view>
      
      <view class="uni-flex uni-common-pl uni-common-pr">
      	<view class="" style="width: 80upx;height: 80upx;">
      		<image :src="userInfo.avatar" mode="" style="width: 80upx;height: 80upx;border-radius: 80upx;"></image>
      	</view>
        <view class="uni-flex-item uni-h4 uni-common-pl">
        	<text style="">{{ userInfo.nickname}}</text>
        </view>
        <view class="uni-flex-item uni-text-gray uni-right" >
        	<text style="" v-if="item.status == 1">{{ item.create_date }}</text>
        </view>
      </view>
      
      <view class="uni-bold uni-common-mt-sm uni-common-pl uni-common-pr" @tap="goToDetail(item)">
      	{{item.title}}
      </view>
      
      <view class="uni-common-pl uni-common-pr" @tap="goToDetail(item)">
      	<view class="uni-common-pa uni-bg-gray uni-common-mt-sm uni-text-small uni-text-light">
      		{{item.description}}
      	</view>
      </view>
      
      <view class="uni-flex uni-common-mt uni-common-pl" @tap="goToDetail(item)">
      	<view class="uni-flex-item uni-common-pr" v-for="(img,index1) in item.imgs" :key="index1" v-if="index1 < 3">
      		<image :src="img.url" mode="scaleToFill" style="width: 100%;height: 400upx;" v-if="item.imgs.length == 1"></image>
          <image :src="img.url" mode="scaleToFill" style="width: 100%;height: 240upx;" v-if="item.imgs.length == 2"></image>
          <image :src="img.url" mode="scaleToFill" style="width: 100%;height: 160upx;" v-if="item.imgs.length >= 3"></image>
      	</view>
      </view>
      
      <view class="uni-flex uni-common-mt-sm uni-common-pl uni-common-pr uni-text-gray">
      	<view class="" style="width: 36upx;height: 36upx;padding-top: 6upx;">
      	  <image src="/static/icon/posts/eye.png" mode="" style="width: 36upx;height: 36upx;"></image>  
      	</view>
      	<view class="uni-flex-item uni-common-ml-sm">
      	  <text >{{item.views}}</text> 
      	</view>
      	<view class="" style="width: 36upx;height: 36upx;padding-top: 6upx;">
      	  <image src="/static/icon/posts/zan.png" mode="" style="width: 36upx;height: 36upx;display: inline-block;"></image> 
      	 </view>
      	<view class="uni-flex-item uni-common-ml-sm">
      		<text>{{item.likes}}</text> 
      	</view>
      	<view class="" style="width: 36upx;height: 36upx;padding-top: 6upx;">
      	  <image src="/static/icon/posts/share.png" mode="" style="width: 36upx;height: 36upx;display: inline-block;"></image> 
      	 </view>
      	<view class="uni-flex-item uni-common-ml-sm">
      		<text>{{item.shares}}</text> 
      	</view>
        <view class="uni-flex-item uni-right" @tap="userPostDelTap({item: item, i:index})">
        	删除
        </view>
      </view>
    	
    </view>
    
    <view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>
</template>

<script>
  import {mapState,mapActions} from 'vuex';
  
  export default {
    data(){
      return {
        listData:{},
        showLoadMore: false,
        loadMoreText:'加载中...',
      }
    },
    computed:{
      ...mapState(['userInfo','userPostData'])
    },
    methods:{
      async getData(){
        let page = this.userPostData.page || 1
        let params = {
          page: page
        }
        let ret = await this.$store.dispatch('userPostListGet' , params)
        console.log('userPostListGet ret' , JSON.stringify(ret))
        if(ret.code == 0){
 
          this.userPostData.count = ret.data.count
          this.userPostData.page += 1
          
          let rows = ret.data.rows
          
          if(rows.length == 0){
            this.loadMoreText = '无更多...'
          }
          rows.forEach(row => {
            this.userPostData.list.push(row)
          })
        }
        
        return ret
      },
      // 删除
      async userPostDelTap(data){
        let item = data.item
        let i = data.i
        uni.showModal({
          title: '确认删除？',
          content: '',
          success: (res) => {
              if (res.confirm) {
                  console.log('用户点击确定');
                  this.userPostDel(item , i)
              } else if (res.cancel) {
                  console.log('用户点击取消');
              }
          }
        })
      },
      async userPostDel(item, i){
        console.log('userPostDel。。。。' , item.id , i)
        let ret = await this.$store.dispatch('userPostDelAction' , {id: item.id})
        if(ret.code == 0){
          uni.showToast({
          	icon:'success',
            title:'删除成功'
          })
          
          this.listData.list.splice(i , 1)
          // this.refresh()
        }else {
          console.log('userPostDel , ' , ret.message)
          uni.showToast({
          	icon:'none',
            title:'删除失败'
          })
        }
      },
      goToDetail(item){
        if(item.status != 1){
          return
        }
        
        uni.navigateTo({
        	url:'/pages/posts/detail?id=' + item.id
        })
      },
      async refresh(){
        console.log('refresh ==============')
        this.userPostData.page = 1
        this.userPostData.list = []
        this.userPostData.count = 0
        
        await this.getData()
      }
    },
    async onPullDownRefresh() {
    	await this.refresh()
    	uni.stopPullDownRefresh()
    },
    async onReachBottom() {
    	this.showLoadMore = true
    	await this.getData()
    	
    	setTimeout(() => {
    	  this.showLoadMore = false
    	} , 1000)
    },
    onLoad() {
    	this.listData = this.userPostData
      
      if(!this.listData.list || this.listData.list.length == 0){
        this.getData()
      }
    }
  }
</script>

<style>
</style>
