<template>
  <view class="uni-page-body">
    
  	<view class="uni-bg-white uni-border-top">
      
  		<view class="uni-flex uni-common-pa ">
        
  			<view class="" style="width: 160upx;height: 160upx;">
  				<image :src="info.goods_cover" mode="scaleToFill" style="width: 160upx;height: 160upx;border-radius: 8upx;"></image>
  			</view>
  		  <view class="uni-flex-item uni-common-pl">
  		  	<view class="uni-ellipsis-2 uni-text-dark" style="height: 100upx;line-height: 50upx;">
  		  		{{ info.goods_title }}
  		  	</view>
  		    <view class="uni-flex">
  		    	<view class="uni-flex-item uni-text-red uni-h4">
  		    		<money :num="info.goods_amount" size="36" />
  		    	</view>
  		      <view class="uni-flex-item uni-right">
  		      	x 2
  		      </view>
  		    </view>
  		  </view>

  		</view>
      
      <view class="uni-common-pa uni-border-top">
        <view class="uni-flex ">
        	<view class="">
        		星级评价
        	</view>
        	<view class="uni-right uni-flex-item">
        		<view class="uni-inline-block" v-for="(level,index2) in levels" :key="index2" @tap="chooseLevel(level)">
							<view v-if="level <= rate.level">
								<uni-icon type="star-filled" size="30" color="yellow" ></uni-icon>
							</view>
        			<view v-else>
								<uni-icon type="star-filled" size="30" color="gray"></uni-icon>
							</view>
							
        		</view>
        	</view>
        </view>
      	
      </view>
      
      <view class="uni-common-pa uni-border-top">
      	<view class="">
      		<view class="">
      			评价详情
      		</view>
      	  <view class="uni-common-mt uni-bg-gray uni-common-pa">
      	  	<textarea v-model="rate.info" placeholder="请填写你的评价详情" placeholder-class="uni-text-small" maxlength="500"/>
      	  </view>
      	</view>
      </view>
			
			<view class="uni-common-pa uni-border-top">
				<view class="">
					<view class="">
						上传图片
					</view>
				  <view class="uni-common-mt">
            <view class="btn-upload" @tap="uploadImgs">
            	<uni-icon type="camera" size="24"></uni-icon>
            </view>
				  </view>
          <view class="uni-common-mt uni-flex">
          	<view class="uni-common-mr-sm imgs-pre-item" v-for="(img , index1) in imgs" :key="index1" @tap="preImg(rate.imgs, img)">
          		<image :src="img" mode="scaleToFill" style="width: 100upx;height: 100upx;"></image>
          	</view>
          </view>
				</view>
			</view>

  	</view>
    
    <view class="uni-common-pa">
    	<button type="warn" class="uni-border-btn-radius" @tap="rateConfirm">提交评价</button>
    </view>
  </view>
</template>

<script>
	import {mapState,mapActions} from 'vuex';
  import Request from '@/store/request.js';
	import money from '@/components/money.vue';
	import uniIcon from '@/components/uni-icon.vue';
	export default {
		components:{
			money,
			uniIcon
		},
		data(){
			return {
				info:{},
				rate:{
					level:0,
					info:'',
					imgs:[]
				},
				levels:[1,2,3,4,5],
        imgs:[]
			}
		},
		methods:{
			async rateConfirm(){
				if(!this.rate.level){
          uni.showToast({
          	icon:'none',
            title:'请选择评级星级'
          })
          return
        }
        
        uni.showLoading({
        	mask:true,
          title:'数据提交中'
        })
        
        this.rate.imgs = []
        for (var i = 0; i < this.imgs.length; i++) {
        	let img = this.imgs[i]
          let uploadRet = await this.doUploadFile(img)
          this.rate.imgs.push(uploadRet)
        }
        
        let params = {}
        params.id = this.info.id
        params.rate = this.rate
        let ret = await this.$store.dispatch('mallOrderItemRate' , params)
        uni.hideLoading()
        if(ret.code == 0){
          let score = ret.data.score || 0
          let title = '提交成功'
          if(score){
            title += '，获取' + score + '积分奖励'
          }
          uni.showToast({
          	icon:'success',
            title:title
          })
          uni.navigateBack({
          	delta:1
          })
        }else {
          uni.showToast({
          	icon:'none',
            title:'提交失败，' + ret.message
          })
        }
        
			},
      async doUploadFile(path){
        let ret = await Request.upload(path)
        return ret
      },
      uploadImgs(){
        uni.chooseImage({
        	count:6,
          success:(res)=> {
            let tempFiles= res.tempFiles
            let errIndex = []
            this.imgs = []
            tempFiles.forEach((file,i) => {
              if(file.size > 5 * 1024 * 1024 ){
                errIndex.push(i+1)
              }else {
                this.imgs.push(file.path)
              }
              
              if(errIndex.length){
                uni.showToast({
                  icon:'none',
                  title: '第' + errIndex.join(',') + '张图片大小超过限制'
                })
              }
              
            })
            
          }
        })
      },
      preImg(paths, current){
        uni.previewImage({
            urls: paths,
            current: current,
            indicator:'number'
        });
      },
			chooseLevel(level){
				console.log('level' , level)
				this.rate.level = level
			}
		},
		async onLoad(opt) {
			let id = opt.id
			let ret = await this.$store.dispatch('mallOrderItemInfoGet',{id: id})
			console.log('mallOrderItemInfoGet ret' , ret)
			if(ret.code == 0){
				this.info = ret.data.info
				this.rate.info = ret.data.info.rate_info
				this.rate.level = ret.data.info.rate_level
				this.rate.imgs = ret.data.info.rate_imgs
				
				
			}
		}
	}
</script>

<style>
	.btn-upload {
    display: inline-block;
    width: 100upx;
    height: 100upx;
    border: 1px dashed #999999;
    text-align: center;
    line-height: 100upx;
  }
  
  .imgs-pre-item {
    width: 100upx;
    height: 100upx;
    border: 1px solid #EEEEEE;
    border-radius: 4upx;
  }
</style>
