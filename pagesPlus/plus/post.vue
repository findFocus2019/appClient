<template>
  <view class="uni-page-body uni-bg-white">
    
    <view class="progress-box">
        <progress :percent="plusPostData.progress" activeColor="red" active stroke-width="8" />
    </view>
            
    <view class="uni-common-pa">
      <view class="uni-border-bottom uni-common-pa">
        <input type="text" placeholder="评测标题" v-model="plusPostData.title"/>
      </view>
      <view class="uni-border-bottom uni-common-pa uni-flex" @tap="toChooseGoods">
        <view class="">
          
          <view class="uni-ellipsis" v-if="plusPostData.goods.id" style="width: 600upx;">
          	{{plusPostData.goods.title}}
          </view>
          <view class="uni-text-gray" v-else>
          	选择评测产品
          </view>
        </view>
        <view class="uni-right uni-flex-item">
          <uni-icon type="arrowright" size="24"></uni-icon>
        </view>
      </view>

      <view class="uni-border-bottom ">
        
        <view class="uni-common-pa">
        	评测详情
        </view>
        
        <view class="uni-common-pl uni-common-pr " v-for="(content, index1) in plusPostData.contents" :key="index1">
   
          <view class="uni-border-top uni-common-pt uni-common-pb">
            <view class="content-textarea ">
              <textarea v-model="content.text" placeholder="请输入段落文字" class=""/>
            </view>
            <view class="uni-common-mt-sm pre-imgs" v-if="content.paths && content.paths.length" >
              <view class="pre-img-item" v-for="(path,index2) in content.paths" :key="index2" @tap="preImg(content.paths , path)">
                <image lazy-load="true"  :src="path" mode="scaleToFill" style="width: 100upx;height: 100upx;"></image>
              </view>
              
            </view>
            
            <view class="uni-common-mt-sm uni-right">
            	<text class="uni-text-gray uni-text-small" @tap="delContent(index1)">删除</text>
            </view>
          </view>
          
        	
        </view>

      </view>

      <view class="plus-items uni-common-pa uni-border-bottom">
        <view class="uni-text-gray uni-text-small  uni-common-mb-sm">
        	添加图文详情段落
        </view>
        <view class="plus-item" v-for="(item,key) in plusTypes" :key="key" @tap="contentTypeChoose(key)">
          <uni-icon :type="item.icon" size="24"></uni-icon>
        </view>
      </view>
      
      <view class="" v-if="plusPostData.video || plusPostData.audio"></view>
      <view class="plus-items uni-common-pa" v-else>
        <view class="uni-text-gray uni-text-small  uni-common-mb-sm">
        	添加视频/音频
        </view>
        <view class="plus-item" v-for="(item,key) in mediaTypes" :key="key" @tap="contentMediaChoose(key)">
          <uni-icon :type="item.icon" size="24"></uni-icon>
        </view>
      </view>
      
      <view class="uni-common-pa" v-if="plusPostData.video">
      	<video :src="plusPostData.video" controls style="width: 100%;"></video>
        <view class="uni-common-mt-sm uni-right">
        	<text class="uni-text-gray uni-text-small" @tap="delContentVideo">删除</text>
        </view>
      </view>
      
      <view class="uni-common-pa uni-center" v-if="recorderManagerStart" @tap="endRecord">
      	 <text style="text-decoration: underline;">录音完毕</text>
      </view>
      
      <view class="uni-common-pa" v-if="plusPostData.audio">
      	<audio :src="plusPostData.audio" :name="plusPostData.title" author="暂无" controls style="width: 100%;"></audio>
        <view class="uni-common-mt-sm uni-right">
        	<text class="uni-text-gray uni-text-small" @tap="delContentAudio">删除</text>
        </view>
      </view>
      
       
    </view>
    
    <view class="" style="height: 200upx;">
    	
    </view>
    
    <view class="uni-fixed-bottom uni-bg-white uni-flex uni-border-top plus-post-bottom">

    	<view class="pre-pub">
        <navigator url="/pagesPlus/plus/pre">
          <uni-icon type="eye" size="24"></uni-icon> <text class="uni-common-ml-sm uni-text-small">预览</text> 
        </navigator>
    		 
    	</view>
      <view class="uni-flex-item uni-right " @tap="confirm">
      	<text class="btn-pub" :style="{background:pubBtnBg}">发布</text>
      </view>
    </view>
  </view>
</template>

<script>
  import {mapState} from 'vuex';
  import uniIcon from '@/components/uni-icon.vue';
  import Request from '@/store/request.js';
  
  const recorderManager = uni.getRecorderManager();
  const innerAudioContext = uni.createInnerAudioContext();

innerAudioContext.autoplay = true;
  export default {
    components: {
      uniIcon
    },
    data() {
      return {
//         contents: [
// 
//         ],
        plusTypes:{
          text: {
            icon:'plusempty'
          },
          image: {
            icon :'camera'
          }
 
        },
        mediaTypes:{
          video: {
            icon : 'videocam'
          },
          audio: {
            icon : 'mic'
          },
        },
        recorderManagerStart:false,
        pubBtnBg:'#d81e06'
      }
    },
    computed:{
      ...mapState(['hasLogin','userInfo','plusPostData'])
    },
    methods:{
      contentMediaChoose(key){
        if(key == 'video'){
          uni.chooseVideo({
          	count:1,
            success: (res) => {
              console.log('video size ' , res.size)
              if(res.size >= 5 * 1024 * 1024){
                uni.showToast({
                	icon:'none',
                  title:'视频大小超过限制'
                })
              }else {
                this.plusPostData.video = res.tempFilePath
              }
  
            }
          })
        }else if(key == 'audio'){
          this.startRecord()   
        }
      },
      contentTypeChoose(key){
        console.log('contentTypeChoose key' ,key)
        
        let content = {
          type: key,
          text: '',
        }
        
        if(key == 'image'){
          content.paths = []
          uni.chooseImage({
          	count:6,
            success:(res)=> {
              let tempFiles= res.tempFiles
              let errIndex = []
              tempFiles.forEach((file,i) => {
                if(file.size > 5 * 1024 * 1024 ){
                  errIndex.push(i+1)
                }else {
                  content.paths.push(file.path)
                }
                
                if(errIndex.length){
                  uni.showToast({
                    icon:'none',
                    title: '第' + errIndex.join(',') + '张图片大小超过限制'
                  })
                }
                
              })
              
              if(content.paths.length){
                this.plusPostData.contents.push(content)
              }
              
            }
          })
        }else {
          this.plusPostData.contents.push(content)
        }
        
        
      },
      preImg(paths, current){
        uni.previewImage({
            urls: paths,
            current: current,
            indicator:'number'
        });
      },
      delContent(index){
        this.plusPostData.contents.splice(index, 1)
      },
      delContentVideo(){
        this.plusPostData.video = ''
      },
      delContentAudio(){
        this.plusPostData.audio = ''
      },
      startRecord() {
            console.log('开始录音');
            this.recorderManagerStart = true
            recorderManager.start();
        },
        endRecord() {
            console.log('录音结束');
            this.recorderManagerStart = false
            recorderManager.stop();
        },
        playVoice() {
            console.log('播放录音');

            if (this.plusPostData.audio) {
                innerAudioContext.src = this.plusPostData.audio;
                innerAudioContext.play();
            }
        },
        async confirm(){
          
          if(!this.hasLogin){
            uni.navigateTo({
            	url:'/pages/auth/login'
            })
            return
          }
          
          if(this.plusPostData.progress != 0){
            // return
          }
  
          if(!this.plusPostData.title){
            uni.showToast({
              icon:'none',
              title: '请填写标题'
            })
            return
          }
          
          if(!this.plusPostData.goods.id){
            uni.showToast({
              icon:'none',
              title: '请选择评测的产品'
            })
            return
          }
          // TODO
          // this.plusPostData.goods = {id: 1}
          
          if(this.plusPostData.contents.length <= 0){
            uni.showToast({
              icon:'none',
              title: '请添加评测详细内容'
            })
            
            return
          }
          this.pubBtnBg = '#eeeeee';
          // 
          let plusPostData = this.plusPostData
          
          // 上传任务
          await this.uploadFiles()
    
          console.log('this.plusPostData  ====== ' , this.plusPostData)
          
          let ret = await this.$store.dispatch('postPlusByUser' , this.plusPostData)
          
          this.plusPostData.progress = 100
          this.pubBtnBg = '#d81e06'
          
          if(ret.code == 0){
            // 
            this.plusPostData.title = ''
              this.plusPostData.goods= {},
              this.plusPostData.contents= [],
              this.plusPostData.video= '',
              this.plusPostData.audio= '',
              this.plusPostData.progress= 0
            
            uni.navigateTo({
            	url:'/pagesPlus/plus/success'
            })
          }else {
//             uni.showToast({
//             	icon:'none',
//               title:ret.message
//             })
            this.plusPostData.progress = 0
            uni.navigateTo({
            	url:'/pagesPlus/plus/fail?msg=' + ret.message
            })
            
          }
          
        },
        async uploadFiles(){
  
          // 计算需要上传的
          let uploadsCount = this.getUploadsCount()
          console.log('uploadsCount =========' , uploadsCount)
          let processCount = uploadsCount + 1
          let processIndex = 0
          
          for (var i = 0; i < this.plusPostData.contents.length; i++) {
          	let content = this.plusPostData.contents[i]
            if(content.type == 'image'){
              let urls = []
              for (var j = 0; j < content.paths.length; j++) {
              	let path = content.paths[j]
                
                let uploadRet = await this.doUploadFile(path)
                
                processIndex++
                this.plusPostData.progress = parseInt(processIndex * 100 /processCount)
                
                urls.push(uploadRet)
              } 
              content.urls = urls
               
              this.plusPostData.contents[i] = content
            }

          }
          
          // 上传视频
          if(this.plusPostData.video){
            console.log('this.plusPostData.video ====== ' , this.plusPostData.video)
            let uploadVideoRet = await this.doUploadFile(this.plusPostData.video)
            this.plusPostData.video_url = uploadVideoRet
            processIndex++
            this.plusPostData.progress = parseInt(processIndex * 100 /processCount)
          }else {
            this.plusPostData.video_url = ''
          }
          
          // 上传音频
          if(this.plusPostData.audio){
            let uploadAudioRet = await this.doUploadFile(this.plusPostData.audio)
            this.plusPostData.audio_url = uploadAudioRet
            processIndex++
            this.plusPostData.progress = parseInt(processIndex * 100 /processCount)
          }else {
            this.plusPostData.audio_url = ''
          }
          
          
          // return this.plusPostData

        },
        getUploadsCount(){
          let count = 0
          let datas = this.plusPostData
          datas.contents.forEach(content => {
            if(content.type == 'image'){
              count += content.paths.length    
            }
          })
          
          if(datas.video){
            count++
          }
          
          if(datas.audio){
            count++
          }
          
          return count
        },
        async doUploadFile(path){
          let ret = await Request.upload(path)
          return ret
        },
        toChooseGoods(){
          uni.navigateTo({
          	url:'/pagesPlus/plus/choose'
          })
        }
        
        
    },
    async onLoad() {
      if(!this.hasLogin){
        uni.navigateTo({
        	url:'/pages/auth/login'
        })
        return
      }
      // 检查用户权限
      console.log(this.userInfo)
      if(this.userInfo.share_level != 1){
        uni.redirectTo({
        	url:'/pagesPlus/plus/fail?type=1&msg=' + '您还未通过评测权限申请！'
        })
      }
      
      // 获取用户购买商品列表
      let ret = await this.$store.dispatch('userOrderItemsListGet', {page:1})
      console.log('userOrderItemsListGet ret ' ,ret)
      if(ret.code == 0){
        let count = ret.data.count
        if(count <= 0){
          uni.redirectTo({
          	url:'/pagesPlus/plus/fail?type=1&msg=' + '您还未购买过商城商品，不能进行评测！'
          })
        }
      }else {
        uni.redirectTo({
        	url:'/pagesPlus/plus/fail?type=1&msg=' + '网络发生错误，请稍后重试!'
        })
      }
      
    	recorderManager.onStop((res)=> {
    	  console.log('recorder stop' + JSON.stringify(res))
    	  this.plusPostData.audio = res.tempFilePath
    	})
    }
  }
</script>

<style>
  .plus-item {
    width: 100upx;
    height: 100upx;
    border: 4px dashed #DDDDDD;
    color: #333333;
    margin-right: 20upx;
    display: inline-block;
    line-height: 100upx;
    text-align: center;
  }
  
  .content-textarea {
    
    background: #EEEEEE;
    padding: 20upx;
  }
  
  .content-textarea textarea {
    width: 100%;
    height: 80upx;
    line-height: 40upx;
    font-size: 24upx;
    color: #333333;
  }
  
  .btn-pub {
    /* background: #d81e06; */
    padding: 0upx 24upx;
    font-size: 24upx;
    border-radius: 8upx;
    color: #FFFFFF;
    line-height: 60upx;
    height: 60upx;
    display: inline-block;
    margin: 20upx 30upx;
  }
  
  .pre-pub {
    line-height: 60upx;
    height: 60upx;
    margin: 20upx 30upx;
  }
  
  .pre-img-item {
    width: 100upx;
    height: 100upx;
    margin-right: 20upx;
    display: inline-block;
  }
  
  .plus-post-bottom {
    z-index: 1000;
  }
</style>
