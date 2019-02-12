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
  		    		<money :num="info.goods_amount" size="36"></money>
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
							<text v-if="level <= rate.level">
								<uni-icon type="star-filled" size="24" color="yellow"   ></uni-icon>
							</text>
        			<text v-else>
								<uni-icon type="star" size="24"></uni-icon>
							</text>
							
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
      	  	<textarea v-model="rate.info" placeholder="请填写你的评价详情" />
      	  </view>
      	</view>
      </view>
			
			<view class="uni-common-pa uni-border-top">
				<view class="">
					<view class="">
						上传图片
					</view>
				  <view class="uni-common-mt uni-common-pa">
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
				levels:[1,2,3,4,5]
			}
		},
		methods:{
			rateConfirm(){
				
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
	
</style>
