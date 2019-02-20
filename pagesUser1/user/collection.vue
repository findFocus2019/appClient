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

          <view class="uni-common-pa uni-common-mb uni-bg-white uni-flex" v-for="(item,index) in listDataGoods.list" :key="index" @tap="goToDetail(item , 'goods')">
            <view class="" style="width: 200upx;height: 200upx;">
              <image lazy-load="true"  :src="item.info.cover" mode="" style="width: 200upx;height: 200upx;"></image>
            </view>
            <view class="uni-flex-item uni-common-pl">
              <view class="list-title">
                {{ item.info.title}}
              </view>
              <view class="uni-text-small uni-text-gray">
                积分可抵扣 ￥{{item.info.score}}
              </view>
              <view class="uni-flex">
                <view class="uni-flex-item uni-bold uni-text-red">
                  ￥ {{item.info.price}}
                </view>
                <view class="uni-flex-item uni-right" @tap="delCollectionTap({item:item,i:index})">
                  <text class="uni-text-small uni-text-gray">删除</text>
                </view>
              </view>
            </view>
          </view>
          
          <view class="uni-center uni-common-pa" v-if="listDataGoods.count == 0">
          	无数据
          </view>


        </view>
        <view v-show="current === 1">

          <view class="uni-common-pa uni-common-mb uni-bg-white uni-flex" v-for="(item,index) in listDataPosts[current].list" :key="index"  @tap="goToDetail(item , 'posts')">
            <view class="" style="width: 200upx;height: 200upx;">
              <image lazy-load="true"  :src="item.info.cover" mode="" style="width: 200upx;height: 200upx;"></image>
            </view>
            <view class="uni-flex-item uni-common-pl">
              <view class="list-title">
                {{ item.info.title }}
              </view>
              <view class="uni-text-small uni-text-gray">
                {{ item.info.pub_date }}
              </view>
              <view class="uni-flex">
                <view class="" style="width: 36upx;height: 36upx;padding-top: 6upx;">
                  <image lazy-load="true"  src="/static/icon/posts/eye.png" mode="" style="width: 36upx;height: 36upx;"></image>
                </view>
                <view class="uni-flex-item uni-common-ml-sm">
                  <text>{{item.info.views}}</text>
                </view>
                <view class="" style="width: 36upx;height: 36upx;padding-top: 6upx;">
                  <image lazy-load="true"  src="/static/icon/posts/zan.png" mode="" style="width: 36upx;height: 36upx;display: inline-block;"></image>
                </view>
                <view class="uni-flex-item uni-common-ml-sm">
                  <text>{{item.info.likes}}</text>
                </view>
                <view class="" style="width: 36upx;height: 36upx;padding-top: 6upx;">
                  <image lazy-load="true"  src="/static/icon/posts/share.png" mode="" style="width: 36upx;height: 36upx;display: inline-block;"></image>
                </view>
                <view class="uni-flex-item uni-common-ml-sm">
                  <text>{{item.info.shares}}</text>
                </view>
                <view class="uni-flex-item uni-right" @tap="delCollectionTap({item:item,i:index})">
                  <text class="uni-text-small uni-text-gray">删除</text>
                </view>
              </view>
            </view>
          </view>

          <view class="uni-center uni-common-pa" v-if="listDataPosts[current].count == 0">
          	无数据
          </view>
        </view>
        <view v-show="current === 2">

          <view class="uni-common-pa uni-common-mb uni-bg-white uni-flex" v-for="(item,index) in listDataPosts[current].list" :key="index" @tap="goToDetail(item , 'posts')">
            <view class="" style="width: 200upx;height: 200upx;">
              <image lazy-load="true"  :src="item.info.cover" mode="" style="width: 200upx;height: 200upx;"></image>
            </view>
            <view class="uni-flex-item uni-common-pl">
              <view class="list-title">
                {{ item.info.title }}
              </view>
              <view class="uni-text-small uni-text-gray">
                {{ item.info.pub_date }}
              </view>
              <view class="uni-flex">
                <view class="" style="width: 36upx;height: 36upx;padding-top: 6upx;">
                  <image lazy-load="true"  src="/static/icon/posts/eye.png" mode="" style="width: 36upx;height: 36upx;"></image>
                </view>
                <view class="uni-flex-item uni-common-ml-sm">
                  <text>{{item.info.views}}</text>
                </view>
                <view class="" style="width: 36upx;height: 36upx;padding-top: 6upx;">
                  <image lazy-load="true"  src="/static/icon/posts/zan.png" mode="" style="width: 36upx;height: 36upx;display: inline-block;"></image>
                </view>
                <view class="uni-flex-item uni-common-ml-sm">
                  <text>{{item.info.likes}}</text>
                </view>
                <view class="" style="width: 36upx;height: 36upx;padding-top: 6upx;">
                  <image lazy-load="true"  src="/static/icon/posts/share.png" mode="" style="width: 36upx;height: 36upx;display: inline-block;"></image>
                </view>
                <view class="uni-flex-item uni-common-ml-sm">
                  <text>{{item.info.shares}}</text>
                </view>
                <view class="uni-flex-item uni-right" @tap="delCollectionTap({item:item,i:index})">
                  <text class="uni-text-small uni-text-gray">删除</text>
                </view>
              </view>
            </view>
          </view>

           <view class="uni-center uni-common-pa" v-if="listDataPosts[current].count == 0">
           	无数据
           </view>
        </view>

        <view v-show="current === 3">

          <view class="uni-common-pa uni-common-mb uni-bg-white uni-flex" v-for="(item,index) in listDataPosts[current].list" :key="index" @tap="goToDetail(item , 'posts')">
            <view class="" style="width: 200upx;height: 200upx;">
              <image lazy-load="true"  :src="item.info.cover" mode="" style="width: 200upx;height: 200upx;"></image>
            </view>
            <view class="uni-flex-item uni-common-pl">
              <view class="list-title">
                {{ item.info.title }}
              </view>
              <view class="uni-text-small uni-text-gray">
                {{ item.info.pub_date }}
              </view>
              <view class="uni-flex">
                <view class="" style="width: 36upx;height: 36upx;padding-top: 6upx;">
                  <image lazy-load="true"  src="/static/icon/posts/eye.png" mode="" style="width: 36upx;height: 36upx;"></image>
                </view>
                <view class="uni-flex-item uni-common-ml-sm">
                  <text>{{item.info.views}}</text>
                </view>
                <view class="" style="width: 36upx;height: 36upx;padding-top: 6upx;">
                  <image lazy-load="true"  src="/static/icon/posts/zan.png" mode="" style="width: 36upx;height: 36upx;display: inline-block;"></image>
                </view>
                <view class="uni-flex-item uni-common-ml-sm">
                  <text>{{item.info.likes}}</text>
                </view>
                <view class="" style="width: 36upx;height: 36upx;padding-top: 6upx;">
                  <image lazy-load="true"  src="/static/icon/posts/share.png" mode="" style="width: 36upx;height: 36upx;display: inline-block;"></image>
                </view>
                <view class="uni-flex-item uni-common-ml-sm">
                  <text>{{item.info.shares}}</text>
                </view>
                <view class="uni-flex-item uni-right" @tap="delCollectionTap({item:item,i:index})">
                  <text class="uni-text-small uni-text-gray">删除</text>
                </view>
              </view>
            </view>
          </view>
          
          <view class="uni-center uni-common-pa" v-if="listDataPosts[current].count == 0">
          	无数据
          </view>

        </view>
      </view>
    </view>

    <view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
  </view>
</template>

<script>
  import uniSegmentedControl from '@/components/uni-segmented-control.vue';
  import uniIcon from '@/components/uni-icon.vue';
  export default {
    components: {
      uniSegmentedControl,
      uniIcon
    },
    data() {
      return {
        current: 0,
        type: 0,
        category: 'goods',
        types: [{
            category: 'goods',
            type: 0,
            name: '产品'
          }, {
            category: 'posts',
            type: 1,
            name: '新闻'
          }, {
            category: 'posts',
            type: 2,
            name: '故事'
          },
          {
            category: 'posts',
            type: 3,
            name: '评测'
          }
        ],
        listDataGoods: {
          page: 1,
          count: 0,
          list: []
        },
        listDataPosts: [{},
          {
            page: 1,
            count: 0,
            list: []
          },
          {
            page: 1,
            count: 0,
            list: []
          },
          {
            page: 1,
            count: 0,
            list: []
          }
        ],
        showLoadMore: false,
        loadMoreText: '加载中...',
      }
    },
    methods: {

      async changeType(item, i) {
        console.log(this.current)
        this.current = i
        this.type = item.type
        this.category = item.category

        let listLen = 0
        if (this.category == 'posts') {
          listLen = this.listDataPosts[this.type].list ? this.listDataPosts[this.type].list.length : 0
        } else {
          listLen = this.listDataGoods.list ? this.listDataGoods.list.length : 0
        }

        if (!listLen) {
          await this.getData()
        }
      },
      async getData() {
        let page = 1
        let category = this.category
        let type = this.type
        if (category == 'posts') {
          page = this.listDataPosts[type].page

        } else {
          page = this.listDataGoods.page

        }

        let params = {
          page: page,
          category: this.category,
          type: this.type
        }
        let ret = await this.$store.dispatch('userCollectionListGet', params)
        console.log('userCollectionListGet ret', JSON.stringify(ret))
        if (ret.code == 0) {

          if (category == 'posts') {
            this.listDataPosts[type].page += 1
            this.listDataPosts[type].count = ret.data.count
          } else {
            this.listDataGoods.page += 1
            this.listDataGoods.count = ret.data.count
          }


          let rows = ret.data.rows
          if (rows.length == 0) {
            this.loadMoreText = '无更多...'
          }

          if (category == 'posts') {

            rows.forEach(row => {
              this.listDataPosts[type].list.push(row)
            })
          } else {
            rows.forEach(row => {
              this.listDataGoods.list.push(row)
            })
          }

        }

        return ret
      },
      async refresh() {
        let category = this.category
        let type = this.type
        if (category == 'posts') {
          this.listDataPosts[type].page = 1
          this.listDataPosts[type].count = 0
          this.listDataPosts[type].list = []
        } else {
          this.listDataGoods.page = 1
          this.listDataGoods.count = 0
          this.listDataGoods.list = []
        }

        await this.getData()
      },
      delCollectionTap(data) {
        let item = data.item
        let i = data.i
        console.log('delCollection' , item , i)
        uni.showModal({
          title: '确认删除？',
          content: '',
          success: (res) => {
            if (res.confirm) {
              console.log('用户点击确定');
              this.delCollectionAction(item , i)
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        })
      },
      async delCollectionAction(item , i){
        if (!this.$store.state.hasLogin) {
          uni.navigateTo({
          	url:'/pages/auth/login'
          })
          return
        }
 
        console.log('postCollection')
        let params = {
          category:this.category,
          type: this.type
        }
        if(this.category == 'posts'){
          params.post_id = item.post_id
        }else {
          params.goods_id = item.goods_id
        }
        
        uni.showLoading({
        	mask:true,
          title:'提交中...'
        })
        let ret = await this.$store.dispatch('userCollectionAction' , params)
        uni.hideLoading()
        console.log('userCollectionAction ==========' , ret)
        if(ret.code== 0){
          if(this.category == 'posts'){
            this.listDataPosts[this.type].list.splice(i , 1)
          }else{
            this.listDataGoods.list.splice(i , 1)
          }
          // this.$store.dispatch('getGoodsInfo' , {id: this.mallGoodsInfo.id})
        }else {
          uni.showToast({
          	title:ret.message,
            icon:'none'
          })
        }
      },
			
			
			async goToDetail(item , type){
				if(type == 'goods'){
					uni.navigateTo({
						url: '/pagesMall/mall/goods?id=' + item.goods_id
					})
				}else if(type == 'posts'){
					uni.navigateTo({
						url: '/pages/posts/detail?id=' + item.post_id
					})
				}
			}
    },
    onLoad() {
      this.getData()
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
      }, 1000)
    },
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
    flex-shrink: 0;
  }
</style>
