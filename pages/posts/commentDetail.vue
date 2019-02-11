<template>
	<view class="uni-page-body ">
		<view class="uni-flex uni-common-pa uni-bg-white" v-if="item">
		  <view class="uni-common-pr" v-if="item.user_info && item.user_info.avatar">
		    <image :src="item.user_info.avatar" mode="" style="width: 60upx;height: 60upx;border-radius: 30upx;"></image>
		  </view>
		  <view class="uni-flex-item">
		    <view class="uni-flex">
		      <view class="uni-flex-item" v-if="item.user_info && item.user_info.avatar">
		        {{item.user_info.nickname}}
		      </view>
		      <view class="uni-right" >
		        <image src="../../static/icon/posts/zan.png" mode="" style="width: 40upx;height: 40upx;"></image>
		      </view>
		      <view class="uni-right uni-text-gray uni-common-ml-sm uni-common-pr" >
		        {{ item.likes }}
		      </view>
		      <view class="uni-right" >
		        <image src="../../static/icon/posts/comment.png" mode="" style="width: 40upx;height: 40upx;"></image>
		      </view>
		      <view class="uni-right uni-text-gray uni-common-ml-sm" >
		        {{ item.replys.length }}
		      </view>
		    </view>
		
		    <view class="uni-text-gray uni-text-small">
		      {{ item.create_date }}
		    </view>
		
		    <view class="uni-comment-content" >
		      {{ item.info }}
		    </view>
		
		    <view class="uni-common-pa uni-bg-gray uni-common-mt" v-if="item.replys.length" >
		
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
</template>

<script>
  import {mapState} from 'vuex';
  import uniIcon from '@/components/uni-icon.vue';
  
  export default {
  	components:{
      uniIcon
    },
    data(){
      return {
        item:null
      }
    },
    computed:{
      ...mapState(['hasLogin'])
    },
    async onLoad(opt) {
    	let commentId = opt.comment_id
      let ret = await this.$store.dispatch('postCommentDetailGet', {comment_id: commentId})
      console.log('postCommentDetailGet ret' , ret)
      if(ret.code == 0){
        this.item = ret.data
      }
    }
  }
</script>

<style>
</style>
