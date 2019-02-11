<template>
	<view class="uni-page-body">
		<view class="uni-bg-white post-comments" v-if="commentList.length">

      <view class="">

        <view class="uni-flex uni-common-pa" v-for="(item, index) in commentList" :key="index">
          <view class="uni-common-pr">
            <image :src="item.user_info.avatar" mode="" style="width: 60upx;height: 60upx;border-radius: 30upx;"></image>
          </view>
          <view class="uni-flex-item">
            <view class="uni-flex">
              <view class="uni-flex-item">
                {{item.user_info.nickname}}
              </view>
              <view class="uni-right" @tap="commentLike(item)">
                <image src="../../static/icon/posts/zan.png" mode="" style="width: 40upx;height: 40upx;"></image>
              </view>
              <view class="uni-right uni-text-gray uni-common-ml-sm uni-common-pr" @tap="commentLike(item)">
                {{ item.likes }}
              </view>
              <view class="uni-right" @tap="commentReply(item)">
                <image src="../../static/icon/posts/comment.png" mode="" style="width: 40upx;height: 40upx;"></image>
              </view>
              <view class="uni-right uni-text-gray uni-common-ml-sm" @tap="commentReply(item)">
                {{ item.replys.length }}
              </view>
            </view>

            <view class="uni-text-gray uni-text-small">
              {{ item.create_date }}
            </view>

            <view class="uni-comment-content" >
              {{ item.info }}
            </view>

            <view class="uni-common-pa uni-bg-gray uni-common-mt" v-if="item.replys.length" @tap="goToCommentDetail(item)">

              <view class="uni-common-mb" v-for="(reply, index1) in item.replys" :key="index1">
                <view class="">
                  {{ reply.user_info.nickname || ''}}
                </view>
                <view class="uni-text-small">
                  {{ reply.info }}
                </view>
              </view>

            </view>
          </view>
        </view>

      </view>


    </view>
    
    <view class="uni-common-mt post-comments" v-else>
      <view class="uni-common-pa uni-center">
        暂无评论
      </view>
    </view>
    
    <view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>
</template>

<script>
  import {mapState} from 'vuex';
  import uniIcon from '@/components/uni-icon.vue';
	export default {
		components:{
      uniIcon
    },
    data() {
      return {
        showLoadMore: false,
        loadMoreText:'加载中...',
        postId:'',
        commentId: 0,
        commentList:[],
        commentCount:0,
        commnetPage:1,
        commentTimestamp:0
      }
    },
    computed:{
      ...mapState(['hasLogin'])
    },
    methods:{
      
      async commentLike(item){
        if(!this.hasLogin){
          uni.navigateTo({
          	url:'/pages/auth/login'
          })
          return
        }

        let params = {
          comment_id: item.id
        }
        console.log('commentLike' , params)
        uni.showLoading({
        	mask:true,
          title:'提交中...'
        })
        let ret = await this.$store.dispatch('postCommentLikeAction' , params)
        uni.hideLoading()
        if(ret.code== 0){
          if(ret.data){
            let score = ret.data.score || 0
            if(score){
              uni.showToast({
              	title:'点赞评论获得'+ ret.data.score + '积分',
                icon:'success'
              })
            }
          }
          
          // this.commentListGet()
        }else {
          uni.showToast({
          	title:ret.message,
            icon:'none'
          })
        }
      },
      async commentListGet(){
        let params = {
          post_id: this.postId,
          page: this.commnetPage || 1,
          timestamp: this.commentTimestamp
        }
        console.log('commentListGet params' , params)
        let commentRet = await this.$store.dispatch('postCommentListGet' , params)
        console.log('commentListGet ret' , commentRet)
        if(commentRet.code == 0){
          let rows = commentRet.data.rows
          if(rows.length){
            rows.forEach(row => {
              this.commentList.push(row)
            })
            
            this.commentCount = commentRet.data.count
            this.commnetPage = commentRet.data.page + 1
            this.commentTimestamp = commentRet.data.timestamp
          }
 
        }
        return commentRet
      },
      goToCommentDetail(item){
        uni.navigateTo({
        	url: '/pages/posts/commentDetail?post_id=' + this.postId + '&comment_id=' + item.id
        })
      },
    },
    onLoad(opt) {
    	let postUuid = opt.post_id
      this.postId = postUuid
      
      this.commentListGet()
    },
    async onReachBottom() {
      this.showLoadMore = true;
      let ret = await this.commentListGet();
      if(ret.code == 0 && ret.data.rows.length == 0){
        this.loadMoreText = '没有更多了'
      }else {
        this.showLoadMore = false;
      }
      
    },
    async onPullDownRefresh() {
    	console.log('onPullDownRefresh');
      this.commnetPage = 1
      this.commentList = []
      this.commentTimestamp = 0;
      
    	await this.commentListGet()
      
      uni.stopPullDownRefresh();
    },
	}
</script>

<style>

</style>
