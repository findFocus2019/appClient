<template>
	<view class="uni-page-body uni-bg-white">
    
    <view class="" v-if="goodsItems.count">
    	
      <view class="uni-flex uni-common-pa uni-border-bottom" v-for="(item,index) in goodsItems.list" :key="index" @tap="chooseGoods(item)">
      	<view class="" v-if="item.good">
      		<image :src="item.good.cover" mode="" style="width: 100upx;height: 100upx;"></image>
      	</view>
        <view class="uni-flex-item uni-common-pl">
          <view class="uni-ellipsis" style="width: 400upx;">
          	{{ item.good.title}}
          </view>
          <view class="uni-text-small uni-text-gray">
          	购买时间：{{ item.create_date }}
          </view>
        </view>
        <view class="">
        	<uni-icon type="checkbox-filled" size="24" v-if="item.goods_id == chooseId" color="red"></uni-icon>
          <uni-icon type="checkbox-filled" size="24" v-else></uni-icon>
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
        goodsItems:{
          page:1,
          list:[],
          count:0
        },
        chooseId:0
      }

    },
    computed:{
      ...mapState(['hasLogin','userInfo','plusPostData'])
    },
    methods:{
      async getDatas(){
        let page = this.goodsItems.page
        let ret = await this.$store.dispatch('userOrderItemsListGet', {page:page})
        console.log('userOrderItemsListGet' , ret)
        if(ret.code == 0){
          this.goodsItems.list =  ret.data.rows
          this.goodsItems.count = ret.data.count
          this.goodsItems.page += 1
        }
      },
      chooseGoods(item){
        this.plusPostData.goods = {
          id: item.goods_id,
          title: item.good.title
        }
        
        uni.navigateBack({
        	delta:1
        })
      }
    },
    onLoad() {
    	this.getDatas()
      
      this.chooseId = this.plusPostData.goods.id || 0
    }
  }
</script>

<style>
</style>
