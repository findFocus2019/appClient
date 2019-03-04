<template>
	<view class="uni-page-body">
		<view class="">
			<view class="uni-bg-white uni-border-top">
			  
				<view class="uni-flex uni-common-pa uni-border-bottom">
					<view class="uni-flex-item">
						<text>订单号:</text>
			      <text class="uni-text-gray">{{ order.order_no }}</text>
					</view>
			    <view class="uni-right">
			    	
			    </view>
				</view>
			  
        <view class="">
          
        	<view class="uni-flex uni-common-pa " v-for="(item,index) in goodsItems" :key="index">
        		<view class="" style="width: 200upx;height: 200upx;">
        			<image lazy-load="true"  :src="item.cover" mode="scaleToFill" style="width: 200upx;height: 200upx;border-radius: 8upx;"></image>
        		</view>
        	  <view class="uni-flex-item uni-common-pl">
        	  	<view class="uni-ellipsis-2 uni-text-dark" style="height: 100upx;line-height: 50upx;">
        	  		{{ item.title }}
        	  	</view>
        	    <view class="uni-text-small uni-text-gray">
        	    	<view class="uni-flex-item uni-text-small uni-text-gray"  v-if="order.score_use">
        	    		<text>使用积分抵扣:</text>
        	    		<money :num="item.price_score_sell" v-if="!order.vip" />
        	    		<money :num="item.price_score_vip" v-else/>
                  <text class="uni-common-pl"> x {{ item.num }}</text>
        	    	</view>
        	    	<view class="uni-flex-item uni-text-small uni-text-gray " v-else>
        	    		未使用积分抵扣
        	    	</view>
        	    </view>
        	    <view class="uni-flex">
        	    	<view class="uni-flex-item uni-text-red uni-h4">
        	    		<money :nums="[item.price_sell,item.price_score_sell]" size="30" v-if="!order.vip" />
        	    		<money :nums="[item.price_vip,item.price_score_vip]" size="30" v-else/>
        	    	</view>
        	      <view class="uni-flex-item uni-right">
        	      	x {{ item.num }}
        	      </view>
        	    </view>
        	  </view>
        	</view>
          
        </view>
        
			  <view class="uni-flex uni-common-pa uni-border-top">
			    <view class="uni-flex-item">
			      <text class="uni-text-dark uni-bold">售后类别:</text>
			    </view>
			    <view class="uni-right" @tap="chooseCategory">
			      <text class="uni-text-gray uni-text-small">{{ postData.category }}</text>
			      <uni-icon type="arrowright" size="22"></uni-icon>
			    </view>
			  </view>
			  

        <view class="uni-flex uni-common-pa uni-border-top">
          <view class="uni-flex-item">
            <text class="uni-text-dark uni-bold">申请原因:</text>
          </view>
          <view class="uni-right" @tap="chooseType">
            <text class="uni-text-gray uni-text-small">{{ postData.type }}</text>
            <uni-icon type="arrowright" size="22"></uni-icon>
          </view>
        </view>
        
        <view class="uni-common-pa uni-border-top">
          <view class="">
            <text class="uni-text-dark uni-bold">详细描述:</text>
          </view>
          <view class="uni-bg-gray uni-common-pa uni-common-mt-sm">
            <textarea v-model="postData.info" placeholder="请输入申请原因详细描述" class=" " style="width: 100%;" placeholder-class="uni-text-small"/>
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
            		<image lazy-load="true"  :src="img" mode="scaleToFill" style="width: 100upx;height: 100upx;"></image>
            	</view>
            </view>
        	</view>
        </view>
    
			</view>
      
      <view class="uni-common-pa" @tap="confirm">
      	<button type="warn" class="uni-border-btn-radius">提交</button>
      </view>
      
      <view class="uni-common-pa uni-left uni-text-gray uni-text-small">
      	<view class="">
      		1.提交成功后将会有工作人员在24小时内与您进行联系办理售后事宜
      	</view>
        <view class="">
        	2.商品在收货7个工作日内可进行退货操作
        </view>
      </view>
		</view>
	</view>
</template>

<script>
  import {mapState} from "vuex";
  import Request from '@/store/request.js';
  import uniIcon from '@/components/uni-icon.vue';
  import money from '@/components/money.vue';
  export default {
   components:{
     uniIcon,
     money
   },
   data(){
     return {
       postData:{
         order_id: 0,
         goods_ids: [],
         type:'',
         category:'',
         imgs:[],
         info:''
       },
       order:{},
       goodsItems:[],
       categorys:[
         '退货',
         '换货',
         '其他'
       ],
       types:[
         '缺件，少件',
         '商品降价',
         '发错货',
         '质量问题',
         '商品与页面描述不符',
         '其他'
       ],
       imgs:[]
     }
   },
   computed:{
     ...mapState(['mallAfterData'])
   },
   methods:{
     chooseType(){
       uni.showActionSheet({
       	itemList:this.types,
        success: (e) => {
          let index = e.tapIndex
        	this.postData.type = this.types[index]
        }
       })
     },
     chooseCategory(){
       uni.showActionSheet({
       	itemList:this.categorys,
        success: (e) => {
          let index = e.tapIndex
        	this.postData.category = this.categorys[index]
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
     async doUploadFile(path){
       let ret = await Request.upload(path)
       return ret
     },
     async confirm(){
     	if(!this.postData.type){
         uni.showToast({
         	icon:'none',
           title:'请选择售后申请原因'
         })
         return
       }
       
       uni.showLoading({
       	mask:true,
         title:'数据提交中'
       })
       
       this.postData.imgs = []
       for (var i = 0; i < this.imgs.length; i++) {
       	let img = this.imgs[i]
         let uploadRet = await this.doUploadFile(img)
         this.postData.imgs.push(uploadRet)
       }
       
       let postData = this.postData
       let ret = await this.$store.dispatch('mallOrderAfterApply' , postData)
       uni.hideLoading()
       if(ret.code == 0){
         uni.showToast({
         	icon:'success',
          title:'提交成功'
         })
         uni.redirectTo({
         	url:'/pagesUser1/user/orderAfters'
         })
       }else {
         uni.showToast({
         	icon:'none',
           title:'提交失败，' + ret.message
         })
       }
       
     },
   },
   onLoad() {
   	let orderAfterData = this.mallAfterData
    console.log('onLoad' , orderAfterData)
    this.order = orderAfterData.order
    this.goodsItems = orderAfterData.goodsItems
    this.postData.order_id = orderAfterData.order.id
    
    let goodsIds = []
    orderAfterData.goodsItems.forEach(item=>{
      goodsIds.push(item.id)
    })
    this.postData.goods_ids = goodsIds
    
    if ((parseInt(Date.now() / 1000) - this.order.update_time) > (7 * 3600 * 24)) {
    	this.categorys.splice(0,1)
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
