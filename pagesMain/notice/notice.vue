<template>
  <view class="uni-page-body">
    <view class="" v-if="listData.count">
      <view class="uni-common-pa uni-border-top uni-bg-white uni-flex" @tap="goToDetail(item)" v-for="(item,index) in listData.list" :key="index">
        <view class="post-list-cover-sm">
          <image lazy-load="true"  :src="item.cover" mode="scaleToFill" class="post-list-cover-sm"></image>
        </view>
        <view class="uni-flex-item uni-common-pl">
          <view class="uni-ellipsis-2" style="line-height: 40upx;">
            {{ item.title }}
          </view>
          <view class="uni-flex">
            <view class="uni-flex-item uni-text-small uni-text-gray">
              {{ item.create_date }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
  </view>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex';

  export default {
    data() {
      return {
        listData: {},
        showLoadMore: false,
        loadMoreText: '加载中...',
      }
    },
    computed: {
      ...mapState(['userInfo', 'appNoticeData'])
    },
    methods: {
      async getData() {
        let page = this.appNoticeData.page || 1
        let params = {
          page: page
        }
        let ret = await this.$store.dispatch('getNoticeList', params)
        console.log('getNoticeList ret', JSON.stringify(ret))
        if (ret.code == 0) {

          this.appNoticeData.count = ret.data.count
          this.appNoticeData.page += 1

          let rows = ret.data.rows

          if (rows.length == 0) {
            this.loadMoreText = '无更多...'
          }
          rows.forEach(row => {
            this.appNoticeData.list.push(row)
          })
        }

        return ret
      },

      goToDetail(item) {
        this.appNoticeData.info = item
        
        uni.navigateTo({
          url: '/pagesMain/notice/detail'
        })
      },
      async refresh() {
        console.log('refresh ==============')
        this.appNoticeData.page = 1
        this.appNoticeData.list = []
        this.appNoticeData.count = 0

        await this.getData()
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
      }, 1000)
    },
    onLoad() {
      this.listData = this.appNoticeData

      if (!this.listData.list || this.listData.list.length == 0) {
        this.getData()
      }
    }
  }
</script>

<style>
  .post-list-title {
    height: 80upx;
    word-break: break-all;
    display: -webkit-box;
    overflow: hidden;
    line-height: 40upx;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    flex-shrink: 0;
  }
</style>
