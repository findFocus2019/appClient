<template>
	<view class="uni-page-body">
    
    <view class="uni-border-top" v-if="listData.count">
    	
      <view class="uni-flex uni-common-mt uni-common-pa uni-bg-white uni-border-bottom" v-for="(item,index) in listData.list" :key="index">
      	<view class="">
      		<image :src="userInfo.avatar" mode="widthFix" style="width: 80upx;height: 80upx;border-radius: 40upx;"></image>
      	</view>
        <view class="uni-flex-item uni-common-pl">
        	<view class="uni-text-darker">
        		{{ userInfo.nickname }}
        	</view>
          <view class="uni-text-small uni-text-light">
          	{{ item.create_date }}
          </view>
          
          <view class="">
          	{{ item.info }}
          </view>
          
          <view class="uni-bg-gray uni-common-pa uni-flex" @tap="goToPostDetail(item.post)">
          	<view class="" style="width: 160upx;height: 100upx;">
          		<image :src="item.post.cover" mode="scaleToFill" style="width: 160upx;height: 100upx;"></image>
          	</view>
            <view class="uni-flex-item uni-ellipsis-2 uni-common-pl" style="height: 100upx;line-height: 50upx;">
            	{{ item.post.title}}
            </view>
            
          </view>
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
      ...mapState(['hasLogin','userInfo' , 'userCommentData'])
    },
    methods:{
      async getData(){
        let page = this.userCommentData.page || 1
        let params = {
          page: page
        }
        let ret = await this.$store.dispatch('userCommentListGet' , params)
        console.log('userPostListGet ret' , JSON.stringify(ret))
        if(ret.code == 0){
       
          this.userCommentData.count = ret.data.count
          this.userCommentData.page += 1
          
          let rows = ret.data.rows
          
          if(rows.length == 0){
            this.loadMoreText = '无更多...'
          }
          rows.forEach(row => {
            this.userCommentData.list.push(row)
          })
        }
        
        return ret
      },
      // 删除
      async userCommentDelTap(data){
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
      async userCommentDel(item, i){
        console.log('userCommentDel。。。。' , item.id , i)
        let ret = await this.$store.dispatch('userCommentDelAction' , {id: item.id})
        if(ret.code == 0){
          uni.showToast({
          	icon:'success',
            title:'删除成功'
          })
          
          this.userCommentData.list.splice(i , 1)
          // this.refresh()
        }else {
          console.log('userCommentDel , ' , ret.message)
          uni.showToast({
          	icon:'none',
            title:'删除失败'
          })
        }
      },
      async refresh(){
        console.log('refresh ==============')
        this.userCommentData.page = 1
        this.userCommentData.list = []
        this.userCommentData.count = 0
        
        await this.getData()
      },
      goToPostDetail(post){
        uni.navigateTo({
        	url:'/pages/posts/detail?id=' + post.id
        })
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
    	this.listData = this.userCommentData
      
      if(!this.listData.list || this.listData.list.length == 0){
        this.getData()
      }
    }
  }
</script>

<style>
</style>
