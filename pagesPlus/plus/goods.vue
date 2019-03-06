<template>
	<view class="uni-page-body">
		
    <view class="" v-if="listData.count">
    	
      <view class="uni-common-mt-md uni-bg-white" v-for="(item,index) in listData.list" :key="index">
      	<view class="" @tap="goToDetail(item)">
      		<image :src="item.cover" mode="widthFix" style="width: 100%;"></image>
      	</view>
        <view class="uni-common-pa">
        	<view class="uni-bold uni-h4" @tap="goToDetail(item)">
        		{{item.title}}
        	</view>
          
          <view class="uni-flex">
          	<view class="uni-flex-item" @tap="goToDetail(item)"> 
              <view class="uni-flex uni-common-mt-sm">
                <view class="uni-flex-item">
                  <text>价格</text>
                  <view class="uni-text-red uni-inline-block">
                    <money :nums="[item.price_sell,item.price_score_sell]" size="36"></money>
                  </view>
                </view>
                <view class="uni-flex-item">
                  <text>单件奖励</text>
                  <view class="uni-text-green uni-inline-block">
                    <money :num="(item.price_sell - item.price_cost) / 2" size="36"></money>
                  </view>
                </view>
              </view>
              
              <view class="uni-flex">
                <view class="uni-flex-item">
                	<text>库存:</text>
                	<text>{{ (item.stock >= 0 ) ? item.stock : '充足'}}</text>
                </view>
                <view class="uni-flex-item">
                	已有{{item.sales}}人付款
                </view>
              	
              </view>
              
          	</view>

            <view class="uni-right" @tap="goodsShare(item)">
            	<view class=" uni-center uni-bold uni-inline-block" style="color: #ffffff;background:#7798ff;padding:20upx;width:80upx;height: 80upx;line-height:40upx;border-radius: 100%;border:10upx solid #e4eaff;">
            		一键代言
            	</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <view class="" v-else>
    	
    </view>
    
    <view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>
</template>

<script>
  import {mapState,mapActions} from 'vuex';
  import Share from '@/static/js/share.js';
  import money from '@/components/money.vue';
  export default {
    components:{
      money
    },
    data(){
      return {
        listData:{
          page:1,
          count:0,
          list:[],
          timestamp:0
        },
        showLoadMore: false,
        loadMoreText:'加载中...',
      }
    },
    computed:{
      ...mapState(['hasLogin','userInfo','userShareGoodsData', 'miniAppId', 'miniAppOrId','webDomain'])
    },
    methods:{
      async getData(){
        let page = this.userShareGoodsData.page || 1
        let timestamp  = this.userShareGoodsData.timestamp || 0
        let params = {
          page: page,
          timestamp: timestamp,
          is_share: 1
        }
        let ret = await this.$store.dispatch('getGooddList' , params)
        console.log('getGoodsList ret' , JSON.stringify(ret))
        if(ret.code == 0){
 
          this.userShareGoodsData.count = ret.data.count
          this.userShareGoodsData.timestamp = ret.data.timestamp
          this.userShareGoodsData.page += 1
          
          let rows = ret.data.rows
          
          if(rows.length == 0){
            this.loadMoreText = '无更多...'
          }
          rows.forEach(row => {
            this.userShareGoodsData.list.push(row)
          })
        }
        
        return ret
      },
 
      goToDetail(item){
   
        uni.navigateTo({
        	url:'/pagesMall/mall/goods?id=' + item.id
        })
      },
      async refresh(){
        console.log('refresh ==============')
        this.userShareGoodsData.page = 1
        this.userShareGoodsData.list = []
        this.userShareGoodsData.count = 0
        
        await this.getData()
      },
      async goodsShare(item){
 
        // #ifndef APP-PLUS
        uni.navigateTo({
        	url:'/pages/auth/guide'
        })
        return
        // #endif
        // 分享
        if(!this.hasLogin){
          uni.navigateTo({
          	url:'/pages/auth/login'
          })
          return
        }
        
        let shareId = 0
        let params = {}
        params.category = 'goods'
        params.post_id = 0
        params.goods_id = item.id || 0
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
        
        let sharePage = 'pagesMall/mall/goods'
        sharePage = sharePage + '?id=' + item.id + '&puid=' + this.userInfo.user_id + '&share_id=' + shareId
        let shareUrl = this.webDomain + '/' + sharePage
        let imgUrl = 'https://img-juren.oss-cn-shenzhen.aliyuncs.com/assets/images/share.png';
        // let postType = this.postInfo.type
        // console.log()
        console.log('分享 ：' , shareUrl)
        let shareData = {
          title: item.title,
          description: item.description,
          href: shareUrl,
          // imgUrl: item.cover + '!goodsCover',
          imgUrl:imgUrl,
          miniAppId: this.miniAppOrId,
          miniPage: sharePage
        }
        console.log('share shareData' , JSON.stringify(shareData))
        uni.showActionSheet({
        	itemList:['分享给QQ好友','分享到微信朋友圈','分享到微信好友'],
          success: (e) => {
          	let index = e.tapIndex
            if(index == 0){
              Share.qq(shareData)
            }else if(index == 1){
              Share.wx(shareData, 1)
            } else if (index == 2){
              // Share.mini(shareData , 0)
              Share.wx(shareData,0)
            }
          }
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
    	this.listData = this.userShareGoodsData
      
      if(!this.listData.list || this.listData.list.length == 0){
        this.getData()
      }
    }
  }
</script>

<style>
</style>

