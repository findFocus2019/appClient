<template>
	<view class="uni-page-body">
		<view class="uni-bg-white uni-common-pa" id="post-content">
		  <view class="uni-bold">
		    {{postInfo.title}}
		  </view>
		  <view class="uni-common-mt-sm uni-text-gray uni-text-small">
		    
		  </view>
		
		  <view class="uni-common-pt-sm uni-text-gray uni-flex">
		    <view class="" style="width: 36upx;height: 36upx;padding-top: 6upx;">
		      <image lazy-load="true"  src="/static/icon/posts/eye.png" mode="" style="width: 36upx;height: 36upx;"></image>
		    </view>
		    <view class="uni-flex-item uni-common-ml-sm">
		      <text>0</text>
		    </view>
		    <view class="" style="width: 36upx;height: 36upx;padding-top: 6upx;">
		      <image lazy-load="true"  src="/static/icon/posts/zan.png" mode="" style="width: 36upx;height: 36upx;display: inline-block;"></image>
		    </view>
		    <view class="uni-flex-item uni-common-ml-sm">
		      <text>0</text>
		    </view>
		    <view class="" style="width: 36upx;height: 36upx;padding-top: 6upx;">
		      <image lazy-load="true"  src="/static/icon/posts/share.png" mode="" style="width: 36upx;height: 36upx;display: inline-block;"></image>
		    </view>
		    <view class="uni-flex-item uni-common-ml-sm">
		      <text>0</text>
		    </view>
		  </view>
      
		</view>
    
    <view class="uni-common-mt uni-bg-white ">
      <view class="uni-common-pa" v-if="postInfo.video">
      	<video :src="postInfo.video" controls style="width: 100%;"></video>
      </view>
      
      <view class="uni-common-pa" v-if="postInfo.audio">
      	<audio :src="postInfo.audio" :name="postInfo.title" author="暂无" controls style="width: 100%;"></audio>
      </view>
      
    	<view class="uni-common-pa post-content">
    	  <rich-text :nodes="postInfo.content"></rich-text>
    	</view>
    </view>
  
    <view class="uni-bg-white uni-common-pa" v-if="postInfo.goods && postInfo.goods.id"> 
       <button type="warn" class="uni-border-btn-radius">产品链接</button>
    </view>
	</view>
</template>

<script>
  
  export default {
    data(){
      return {
        postInfo:{
          title: '',
          goods_id: 0,
          content: '',
          video:'',
          audio:''
        }
      }
    },
    methods:{
      contentsToHtml(contents){
        let html = ''
        contents.forEach(content => {
          html += '<p>' + content.text + '</p>'
          
          if(content.paths && content.paths.length){
            content.paths.forEach(path => {
              html += '<p><img src="' + path +'" /></p>'
            })
          }
        })
        
        return html
      }
    },
    onLoad() {
      
      let plusPostData = this.$store.state.plusPostData
      console.log(plusPostData)
    	this.postInfo.title = plusPostData.title
      this.postInfo.video = plusPostData.video
      this.postInfo.audio = plusPostData.audio
      this.postInfo.content = this.contentsToHtml(plusPostData.contents)
      this.postInfo.goods = plusPostData.goods
    }
  }
</script>

<style lang="scss">

</style>
