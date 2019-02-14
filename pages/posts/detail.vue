<template>

  <scroll-view class="page" scroll-y="true" style="height: 100%;overflow-x: auto;" @scroll="pageScroll">

    <view class="uni-bg-white uni-common-pa" id="post-content">
      <view class="uni-bold">
        {{postInfo.title}}
      </view>
      <view class="uni-common-mt-sm uni-text-gray uni-text-small">
        发布时间: {{postInfo.publish_time}}
      </view>

      <view class="uni-common-pt-sm uni-text-gray uni-flex">
        <view class="" style="width: 36upx;height: 36upx;padding-top: 6upx;">
          <image lazy-load="true"  src="/static/icon/posts/eye.png" mode="" style="width: 36upx;height: 36upx;"></image>
        </view>
        <view class="uni-flex-item uni-common-ml-sm">
          <text>{{postInfo.views}}</text>
        </view>
        <view class="" style="width: 36upx;height: 36upx;padding-top: 6upx;">
          <image lazy-load="true"  src="/static/icon/posts/zan.png" mode="" style="width: 36upx;height: 36upx;display: inline-block;"></image>
        </view>
        <view class="uni-flex-item uni-common-ml-sm">
          <text>{{postInfo.likes}}</text>
        </view>
        <view class="" style="width: 36upx;height: 36upx;padding-top: 6upx;">
          <image lazy-load="true"  src="/static/icon/posts/share.png" mode="" style="width: 36upx;height: 36upx;display: inline-block;"></image>
        </view>
        <view class="uni-flex-item uni-common-ml-sm">
          <text>{{postInfo.shares}}</text>
        </view>
      </view>
    </view>

    <view class="uni-common-mt uni-bg-white ">
      <view class="uni-common-pa" v-if="postInfo.video">
      	<video :src="postInfo.video" controls style="width: 100%;"></video>
      </view>
      
      <view class="uni-common-pa" v-if="postInfo.audio">
      	<audio :src="postInfo.audio" :name="postInfo.title" controls></audio>
      </view>
      
    	<view class="uni-common-pa post-content">
    	  <rich-text :nodes="postInfo.content" class="content-html"></rich-text>
    	</view>
    </view>
    
    
    <view class="uni-bg-white uni-common-pa" v-if="postInfo.goods_id">
      <navigator :url="'/pages/mall/goods?id=' + postInfo.goods_id + '&post_id=' + postInfo.id + '&share_id=' + shareId">
        <button type="warn" class="uni-border-btn-radius">产品链接</button>
      </navigator>
    </view>

    <view class="uni-bg-white uni-common-mt post-comments" v-if="commentList.length">
      <view class="uni-center uni-common-pa">
        全部评论
      </view>
      <view class="">

        <view class="uni-flex uni-common-pa" v-for="(item, index) in commentList" :key="index">
          <view class="uni-common-pr">
            <image lazy-load="true"  :src="item.user_info.avatar" mode="" style="width: 60upx;height: 60upx;border-radius: 30upx;"></image>
          </view>
          <view class="uni-flex-item">
            <view class="uni-flex">
              <view class="uni-flex-item">
                {{item.user_info.nickname}}
              </view>
              <view class="uni-right" @tap="commentLike(item)">
                <image lazy-load="true"  src="../../static/icon/posts/zan.png" mode="" style="width: 40upx;height: 40upx;"></image>
              </view>
              <view class="uni-right uni-text-gray uni-common-ml-sm uni-common-pr" @tap="commentLike(item)">
                {{ item.likes }}
              </view>
              <view class="uni-right" @tap="commentReply(item)">
                <image lazy-load="true"  src="../../static/icon/posts/comment.png" mode="" style="width: 40upx;height: 40upx;"></image>
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

            <view class="uni-common-pa uni-bg-gray uni-common-mt-sm" v-if="item.replys.length" @tap="goToCommentDetail(item)">

              <view class="uni-common-mb-sm" v-for="(reply, index1) in item.replys" :key="index1">
                <view class="uni-text-dark">
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
      <view class="uni-center uni-border-top uni-common-pa" v-if="commentCount > 10">
        <navigator :url="'/pages/posts/commentList?post_id=' + postInfo.uuid">查看更多</navigator>
      </view>
    </view>

    <view class="uni-bg-white uni-common-mt post-comments" v-else>
      <view class="uni-common-pa uni-center">
        暂无评论
      </view>
    </view>

    <view class="" style="height: 120upx;">

    </view>


    <view class="uni-bg-white uni-flex uni-common-pt uni-common-pb post-bottom">
      <view class="uni-flex-item uni-common-pl uni-common-pr" @tap="commentPost">
        <view class="comment-text uni-bg-gray uni-ellipsis" style="width: 350upx;">
          <text class="uni-text-gray">{{commentText}}</text>
        </view>
      </view>
      <view class="uni-flex-item uni-flex uni-center uni-common-pr">
        <view class="uni-flex-item" @tap="postLike" style="height: 48upx;">
          <image lazy-load="true"  src="/static/icon/posts/zan.png" mode="" style="width: 48upx;height: 48upx;"></image>
        </view>
        <view class="uni-flex-item" @tap="postCollection">
          <uni-icon type="star-filled" size="24" v-if="postInfo.isCollection == 1" color="#d81e06" ></uni-icon>
          <uni-icon type="star" size="24" v-if="postInfo.isCollection == 0" ></uni-icon>
          <uni-icon type="star" size="24" v-if="postInfo.isCollection == -1" ></uni-icon>
        </view>
        <view class="uni-flex-item" @tap="postShare" style="height: 48upx;">
          <image lazy-load="true"  src="/static/icon/posts/share.png" mode="" style="width: 48upx;height: 48upx;"></image>
        </view>
      </view>
    </view>

    <uni-popup msg="" :show="commentPopupShow" type="bottom" @hidePopup="commentPopupHide">

      <view class="uni-common-pa">
        <view class="uni-flex">
          <view class="">
            <text @tap="commentPopupHide">取消</text>
          </view>
          <view class="uni-right uni-flex-item">
            <text @tap="commentConfirm" style="background: #d81e06;color: #FFFFFF;padding: 8upx 16upx;border-radius: 8upx;">发布</text>
          </view>
        </view>
        <view class="uni-left uni-bg-gray uni-common-pa uni-common-mt">
          <textarea v-model="commentTextVal" :placeholder="commentTextPlaceholder" maxlength="140" placeholder-class="uni-text-small"
            style="height: 100upx;line-height: 50upx;font-size: 24upx;" />
          </view>
      </view>
        
    </uni-popup>
  	
  </scroll-view>
  
</template>

<script>
  import {mapState} from 'vuex';
  import Share from '@/static/js/share.js';
  import uniIcon from '@/components/uni-icon.vue';
  import uniPopup from '@/components/uni-popup.vue';
  export default {
    components:{
      uniIcon,
      uniPopup
    },
    data() {
      return {
        info: {

        },
        commentText:'写评论...',
        commentTextVal:'',
        commentTextPlaceholder:'写评论...',
        commentPopupShow: false,
        commentId: 0,
        commentList:[],
        commentCount:0,
        viewActionOpen: false,
				// shareId:0
      }
    },
    computed:{
      ...mapState(['hasLogin' ,'userInfo', 'postInfo' , 'webDomain' , 'miniAppId' ]),
			shareId(){
				return this.$store.state.inviteShareId
			}
    },
    methods:{
      postComments(){
        if(!this.hasLogin){
          uni.navigateTo({
          	url:'/pages/auth/login'
          })
          return
        }
        
        this.commentPopupShow = true
      },
      commentReply(item){
        this.commentId = item.id
        this.commentTextPlaceholder = '回复评论...'
        this.postComments()
      },
      commentPost(item){
        this.commentId = 0
        this.commentTextPlaceholder = '写评论...'
        this.postComments()
      },
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
          
          this.commentListGet()
        }else {
          uni.showToast({
          	title:ret.message,
            icon:'none'
          })
        }
      },
      async commentConfirm(){
        let postData = {}
        postData.post_id = this.postInfo.uuid
        postData.pid = this.commentId
        postData.info = this.commentTextVal
        
        if(postData.info === ''){
          uni.showToast({
          	title:'还未写下评论',
            icon:'none'
          })
          return
        }
        
        uni.showLoading({
        	title:'提交中...'
        })
        
        console.log('commentConfirm postData' , postData)
        let ret = await this.$store.dispatch('postCommentConfirm' , postData)
				console.log('postCommentConfirm ret' , JSON.stringify(ret))
        uni.hideLoading()
        if(ret.code == 0){
          if(ret.data.score){
            uni.showToast({
            	title:'发布评论获得'+ ret.data.score + '积分',
              icon:'success'
            })
          }else {
						uni.showToast({
							title:'发布评论成功',
						  icon:'success'
						})
					}
          
          this.commentTextVal = ''
          this.commentPopupHide()
          
          this.commentListGet()
        }else {
          uni.showToast({
          	title:ret.message,
            icon:'none'
          })
        }
        
      },
      commentPopupHide(){
        this.commentPopupShow = false
        this.commentText = this.commentTextVal || '写评论...'
      },
      goToCommentList(){
        uni.navigateTo({
        	url: '/pages/posts/commentList?post_id=' + this.postInfo.uuid
        })
      },
      goToCommentDetail(item){
        uni.navigateTo({
        	url: '/pages/posts/commentDetail?post_id=' + this.postInfo.uuid + '&comment_id=' + item.id
        })
      },
      async postCollection(){
        // 收藏
        if(!this.hasLogin){
          uni.navigateTo({
          	url:'/pages/auth/login'
          })
          return
        }
        
        console.log('postCollection')
        let params = {
          category:'posts',
          type: this.postInfo.type,
          post_id: this.postInfo.id
        }
        uni.showLoading({
        	mask:true,
          title:'提交中...'
        })
        let ret = await this.$store.dispatch('userCollectionAction' , params)
        console.log('userCollectionAction ret'  , JSON.stringify(ret))
        uni.hideLoading()
        if(ret.code== 0){
          let score = ret.data ? (ret.data.score || 0) : 0
          if(score){
            uni.showToast({
            	title:'收藏文章获得'+ ret.data.score + '积分',
              icon:'success'
            })
          }else {
            uni.showToast({
            	title:ret.message,
              icon:'success'
            })
          }
          this.$store.dispatch('postInfoGet' , {id: this.postInfo.id})
          console.log('postInfoGet again postInfo' , this.postInfo)
        }else {
          uni.showToast({
          	title:ret.message,
            icon:'none'
          })
        }
      },
      async postLike(){
        if(!this.hasLogin){
          uni.navigateTo({
          	url:'/pages/auth/login'
          })
          return
        }
        
        console.log('postLike')
        let params = {
          post_id: this.postInfo.uuid
        }
        uni.showLoading({
        	mask:true,
          title:'提交中...'
        })
        let ret = await this.$store.dispatch('postLikeAction' , params)
        console.log('postLikeAction ret' , ret)
        uni.hideLoading()
        if(ret.code== 0){
          let score = ret.data ? (ret.data.score || 0) : 0
          if(score){
            uni.showToast({
            	title:'点赞文章获得'+ ret.data.score + '积分',
              icon:'success'
            })
          }else {
            uni.showToast({
            	title:'点赞成功',
              icon:'success'
            })
          }
          await this.$store.dispatch('postInfoGet' , {id: this.postInfo.id})
          console.log('postInfoGet again postInfo' , this.postInfo)
        }else {
          uni.showToast({
          	title:ret.message,
            icon:'none'
          })
        }
      },
      async viewAction(){
        console.log('viewAction=========================start')
        let viewActionOpen = this.viewActionOpen
        console.log('viewAction=========================' , viewActionOpen)
        if(!this.viewActionOpen || !this.hasLogin){
          return
        }
        
        let params = {
          post_id: this.postInfo.uuid
        }
        
        let ret = await this.$store.dispatch('postViewAction' , params)
        console.log('viewAction ============= ret' , ret)
        if(ret.code== 0){
          if(ret.data){
            let score = ret.data.score || 0
            if(score){
              uni.showToast({
              	title:'阅读文章获得'+ ret.data.score + '积分',
                icon:'success'
              })
            }
          }
        }
      },
      async postShare(){
        // 分享
				if(!this.hasLogin){
				  uni.navigateTo({
				  	url:'/pages/auth/login'
				  })
				  return
				}
				
				let shareId = 0
				let params = {}
				params.category = 'posts'
				params.post_id = this.postInfo.id
				params.goods_id = this.postInfo.goods_id || 0
				let shareRet = await this.$store.dispatch('userShareInfoGet', params)
				if(shareRet.code == 0){
					let shareData = shareRet.data.info
					shareId = shareData.id
				}else {
					uni.showToast({
						icon:'none',
						title:'分享发生错误，请稍后重试'
					})
					return 
				}
				
        let sharePage = 'pages/posts/detail'
				sharePage = sharePage + '?id=' + this.postInfo.id + '&puid=' + this.userInfo.id + '&share_id=' + shareId
        let shareUrl = this.webDomain + '/' + sharePage
        let postType = this.postInfo.type
        // console.log()
        console.log('分享 postType' , postType , shareUrl)
        let shareData = {
          title: this.postInfo.title,
          description: this.postInfo.description,
          href: shareUrl,
          imgUrl: this.postInfo.cover,
          miniAppId: this.miniAppId,
          miniPage: sharePage
        }
        uni.showActionSheet({
        	itemList:['分享给QQ好友','分享到微信聊天','分享到微信朋友圈'],
          success: (e) => {
          	let index = e.tapIndex
            if(index == 0){
              Share.qq(shareData)
            }else if(index == 1){
              Share.mini(shareData, 0)
            } else if (index == 2){
              Share.mini(shareData , 1)
            }
          }
        })
      },
      async commentListGet(){
        let params = {
          post_id: this.postInfo.uuid
        }
        let commentRet = await this.$store.dispatch('postCommentListGet' , params)
        console.log('commentListGet ret' , commentRet)
        if(commentRet.code == 0){
          this.commentList = commentRet.data.rows
          this.commentCount = commentRet.data.count
        }
        return commentRet
      },
      pageScroll(e){
        // console.log('onPageScroll==================' , e.detail.scrollTop)
        this.viewActionOpen = true
      }
    },
    
    async onLoad(opt) {
      console.log('============= onLoad')
      this.$store.state.postInfo = {}
      
      let id = opt.id 
      let ret = await this.$store.dispatch('postInfoGet' , {id: id})
      console.log('onLoad postInfoGet ret ==============' , ret)
			
			// 分享
			let shareId = opt.share_id || 0
			if(shareId){
				this.$store.state.inviteShareId = shareId
			}
			let inviteUserId = opt.puid || 0
			if(inviteUserId){
				this.$store.state.inviteUserId = inviteUserId
			}
			
      
      // 获取评论列表
      this.commentListGet()
      
      if(this.postInfo.status == 0){
        uni.redirectTo({
        	url:'/pages/posts/error'
        })
      }
      
      setTimeout(() => {
        this.viewAction()
      }, 15000)
    },
    async onShow(){
      console.log('============= onShow')
      console.log(this.postInfo.id)
      if(this.postInfo.id){
        let ret = await this.$store.dispatch('postInfoGet' , {id: this.postInfo.id})
        console.log('onShow postInfoGet ret ==============' , ret)
        this.commentListGet()
      }
    },
    
    onNavigationBarButtonTap(e) {
    	if(e.index === 0){
       this.postShare()
     }
    },
    async onPullDownRefresh() {
    	let ret = await this.$store.dispatch('postInfoGet' , {id: this.postInfo.id})
    	console.log('onPullDownRefresh postInfoGet ret ==============' , ret)
    	this.commentListGet()
      
      uni.stopPullDownRefresh()
    },
    onHide() {
    	this.viewActionOpen = false;
    }
  }
</script>

<style lang="scss">
  
  .post-bottom {
    position: fixed;
    width: 100%;
    bottom: 0;
    
    .comment-text {
      border-radius: 24upx;
      padding: 0 24upx;
    }
  }
</style>
