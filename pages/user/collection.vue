<template>
	<view class="uni-page-body">
		<view class="uni-common-pa uni-bg-white uni-border-top">
			<view class="uni-common-pl uni-common-pr uni-flex uni-center">
				<view class="uni-flex-item" v-for="(item ,i) in types" :key="i" @tap="changeType(item , i)">
					<text v-if="category == item.category && item.type == type" class="uni-bold">{{item.name}}</text>
          <text v-else>{{item.name}}</text>
				</view>
        
			</view>
		</view>
    
    <view class="uni-common-mt">
    	<view class="content">
    	  <view v-show="current === 0">
          
    	    <view class="uni-common-pa uni-bg-white uni-flex">
    	    	<view class="" style="width: 200upx;height: 200upx;">
    	    		<image src="" mode="" style="width: 200upx;height: 200upx;"></image>
    	    	</view>
            <view class="uni-flex-item uni-common-pl">
            	<view class="list-title">
            		产品标题产品标题产品标题产品标题产品标题产品标题产品标题产品标题产品标题
            	</view>
              <view class="uni-text-small uni-text-gray">
              	积分可抵扣
              </view>
              <view class="uni-flex">
              	<view class="uni-flex-item uni-bold uni-text-red">
              		￥ 29.0
              	</view>
                <view class="uni-flex-item uni-right">
                	<text class="uni-text-small">删除</text>
                </view>
              </view>
            </view>
    	    </view>
          
          
    	  </view>
    	  <view v-show="current === 1">

          <view class="uni-common-pa uni-bg-white uni-flex">
          	<view class="" style="width: 200upx;height: 200upx;">
          		<image src="" mode="" style="width: 200upx;height: 200upx;"></image>
          	</view>
            <view class="uni-flex-item uni-common-pl">
            	<view class="list-title">
            		新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题
            	</view>
              <view class="uni-text-small uni-text-gray">
              	发布时间
              </view>
              <view class="uni-flex">
              	<view class="uni-flex-item uni-text-small">
              		浏览
              	</view>
                <view class="uni-flex-item uni-text-small">
                	点赞
                </view>
                <view class="uni-flex-item uni-text-small">
                	分享
                </view>
                <view class="uni-flex-item uni-right uni-text-small">
                	<text class="">删除</text>
                </view>
              </view>
            </view>
          </view>
          
           
    	  </view>
    	  <view v-show="current === 2">

          <view class="uni-common-pa uni-bg-white uni-flex">
          	<view class="" style="width: 200upx;height: 200upx;">
          		<image src="" mode="" style="width: 200upx;height: 200upx;"></image>
          	</view>
            <view class="uni-flex-item uni-common-pl">
            	<view class="list-title">
            		新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题新闻标题
            	</view>
              <view class="uni-text-small uni-text-gray">
              	积分可抵扣
              </view>
              <view class="uni-flex">
              	<view class="uni-flex-item uni-bold uni-text-red">
              		￥ 29.0
              	</view>
                <view class="uni-flex-item uni-right">
                	<text class="uni-text-small">删除</text>
                </view>
              </view>
            </view>
          </view>
          
          
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
      changeType(item , i){
        console.log(this.current)
        this.current = i
        this.type = item.type
        this.category = item.category
      }
    }
  }
</script>

<style lang="less">
  
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
