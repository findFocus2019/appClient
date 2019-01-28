<template>
	<view class="uni-page-body">
		<view class="uni-common-pa uni-bg-white uni-border-top">
			<view class="uni-common-pl uni-common-pr uni-flex uni-center">
				<view class="uni-flex-item" v-for="(item ,i) in types" :key="i" @tap="changeType(i)">
					<text v-if="category == item.category && item.type == type" class="uni-bold">{{item.name}}</text>
          <text v-else>{{item.name}}</text>
				</view>
        
			</view>
		</view>
    
    <view class="uni-common-mt">
    	<view class="content">
    	  <view v-show="current === 0">

          <view class="uni-flex uni-bg-white uni-common-pa" @touchmove="touchmove('1')" @touchend="touchEnd" @touchstart="touchStart">
          	
          </view>
    	    
    	  </view>
    	  <view v-show="current === 1">
    	1
    	  </view>
    	  <view v-show="current === 2">
    	2
    	  </view>
    	</view>
    </view>
	</view>
</template>

<script>
  import uniSegmentedControl from '@/components/uni-segmented-control.vue';
  import uniIcon from '@/components/uni-icon.vue';
  export default {
    components:{
      uniSegmentedControl,
      uniIcon
    },
    data(){
      return {
        items: [
          '产品收藏',
          '新闻收藏',
          '故事收藏'
        ],
        current: 0,
        types : [{
            category: 'goods',
            type:0,
            name: '产品收藏'
          },{
            category:'posts',
            type:1,
            name : '新闻收藏'
          },{
            category: 'posts',
            type: 2,
            name: '故事收藏'
          }
        ],
        type:0,
        category:'goods',
        itemXStart:0,
        itemXEnd:0,
        item:0
      }
    },
    methods:{
      getList(){
        
      },
      changeType(i){
        console.log(this.current)
        this.current = i
      },
      touchmove(i){
        console.log(i)
        this.item = i
      },
      touchStart(e){
        console.log(e)
        this.itemXStart = e.changedTouches[0].pageX
      },
      touchEnd(e){
        console.log(e)
        this.itemXEnd = e.changedTouches[0].pageX
        this.item = 0
        
      }
    }
  }
</script>

<style lang="less">
  
  .scroll-view_H {
  	white-space: nowrap;
  	width: 100%;
    height: 300upx;
  }
  
  .scroll-view-item {
  	height: 300upx;
  	// line-height: 300upx;
  	// text-align: center;
  	// font-size: 36upx;
  }
  
  .scroll-view-item_H {
  	display: inline-block;
  	width: 100%;
  	height: 300upx;
  	line-height: 300upx;
  	// text-align: center;
  	// font-size: 36upx;
  }
  
  .scroll-view-item_H.delete {
    width: 100upx;
    background: #d81e06;
    color: #fff;
  }
  
  .list-title {
    // width: 300upx;
    // width: 300upx;
    height: 100upx;
    word-break: break-all;
    display: -webkit-box;
    overflow: hidden;
    line-height: 50upx;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    flex-shrink:0;
  }
  
</style>
