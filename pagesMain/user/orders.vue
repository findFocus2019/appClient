<template>
  <view class="uni-page-body">

    <view class="order-status-items">
      <view class="uni-flex uni-bg-white uni-common-pa uni-border-top">
        <view class="uni-flex-item uni-center" v-for="(item,i) in statusItems" :key="i" @tap="changeStatus(item.status)">
          <text v-if="status === item.status" class="uni-bold uni-text-red">{{item.text}}</text>
          <text v-else>{{item.text}}</text>
        </view>
      </view>
    </view>


    <view v-if="orderListData.count" class="">

      <view class="uni-bg-white uni-common-mt-md" v-for="(order,index) in orderListData.list" :key="index">

        <view class="uni-flex uni-common-pa" @tap="goToDetail(order)">
          <view class="uni-flex-item">
            {{order.order_no}}
          </view>
          <view class="">
            <text class="uni-bold">{{orderTypes[order.order_type]}}</text>
          </view>
        </view>

        <view class="uni-border-top  uni-common-pb" @tap="goToDetail(order)">

          <view class="uni-flex uni-common-pl uni-common-pr uni-common-pt" v-for="(item,index1) in order.goods_items"
            :key="index1">
            <view class="" style="width: 200upx;height: 200upx;">
              <image lazy-load="true"  :src="item.cover" mode="scaleToFill" style="width: 200upx;height: 200upx;border-radius: 8upx;"></image>
            </view>
            <view class="uni-flex-item uni-common-pl">
              <view class="uni-ellipsis-2 uni-text-dark" style="height: 100upx;line-height: 50upx;">
                {{ item.title }}
              </view>
              <view class="uni-text-small uni-text-gray">
                积分可抵扣
                <money :num="item.price_score_sell" v-if="!order.vip" />
                <money :num="item.price_score_vip" v-else />
              </view>
              <view class="uni-flex">
                <view class="uni-flex-item uni-text-red uni-h4">
                  <money :nums="[item.price_sell,item.price_score_sell]" size="36" v-if="!order.vip" />
                  <money :nums="[item.price_vip,item.price_score_vip]" size="36" v-else />
                </view>
                <view class="uni-flex-item uni-right">
                  x {{ item.num }}
                </view>
              </view>
            </view>
          </view>

        </view>

        <view class="uni-border-top uni-common-pa uni-right" @tap="goToDetail(order)">
          <!-- <text class="uni-text-small uni-text-light uni-common-mr-sm ">
           	共4件
           </text> -->
          <view class="uni-text-small uni-text-light uni-common-mr-sm uni-inline-block" v-if="order.score_use">
            使用积分抵扣:
            <money :num="order.score" v-if="!order.vip" />
            <money :num="order.score_vip" v-else />
          </view>
          <view class="uni-text-small uni-text-light uni-common-mr-sm uni-inline-block" v-else>
            未使用积分抵扣
          </view>
          <view class="uni-inline-block" style="line-height: 1;">
            合计:<view class="uni-text-red uni-h3 uni-inline-block">
              <view v-if="order.score_use">
                <money :num="order.total" size="36" v-if="!order.vip" />
                <money :num="order.total_vip" size="36" v-else />
              </view>
              <view v-else>
                <money :nums="[order.total, order.score]" size="36" v-if="!order.vip" />
                <money :nums="[order.total_vip, order.score_vip]" size="36" v-else />
              </view>
            </view>
          </view>
        </view>


        <view class="uni-flex uni-border-top uni-common-pa uni-bg-white">
          <view class="uni-flex-item uni-text-small uni-text-light">
            {{ order.create_date}}
          </view>
          <view class="" v-if="order.status == 0">
            <text class="order-btn" @tap="goCancel(order)">取消</text>
            <text class="order-btn uni-bg-red" @tap="goPayment(order)">去支付</text>
          </view>
          <view class="" v-if="order.status == 2">
            <text class="order-btn " @tap="goComplete(order)">确认收货</text>
          </view>
          <view class="" v-if="order.status == 9">
            <!-- <text class="order-btn" @tap="goRate(order)">评价</text> -->
            <text class="order-btn" @tap="goAfter(order)">申请售后</text>
          </view>
        </view>

      </view>

    </view>

    <view class="uni-common-pa uni-center" v-else>
      无数据
    </view>

    <view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>

  </view>
</template>

<script>
  import money from '@/components/money.vue';
  import {
    mapState,
    mapActions
  } from "vuex";
  export default {
    components: {
      money
    },
    data() {
      return {
        showLoadMore: false,
        loadMoreText: '加载中...',
        statusItems: [{
            status: 0,
            text: '待付款'
          },
          {
            status: 1,
            text: '待发货'
          },
          {
            status: 2,
            text: '待收货'
          },
          {
            status: 9,
            text: '已完成'
          },
        ],
        orderTypes: ['', '自营', '京选'],
        status: 0,
        orderListDatas: [],
        orderListData: {}
      }
    },
    computed: {
      ...mapState(["hasLogin", "userDataRefresh", "ordersListStatus"])
    },
    methods: {
      changeStatus(status) {
        this.status = status
        if (!this.orderListDatas[this.status] || this.orderListDatas[this.status].list.length == 0) {
          this.getData()
        }

        this.orderListData = this.orderListDatas[this.status]

      },
      goToDetail(order) {
        uni.navigateTo({
          url: '/pagesMain/user/orderDetail?id=' + order.id
        })
      },
      goRate(order){
        uni.navigateTo({
        	url: '/pagesUser1/user/orderRatePost?id=' + order.id
        });
      },
      goAfter(order){
        uni.navigateTo({
        	url: '/pagesUser1/user/orderAfterApply?id=' + order.id
        });
      },
      goComplete(order) {
        uni.showModal({
          title: '订单完成',
          content: '确认收到货物完成订单',
          success: async (res) => {
            if (res.confirm) {
              console.log('用户点击确定');
              let ret = await this.$store.dispatch('mallOrderComplete', {
                order_id: order.id
              })
              console.log('mallOrderComplete ret', ret)
              if (ret.code == 0) {
                uni.showToast({
                  icon: 'success',
                  title: '操作成功',
                  mask: false,
                  duration: 1500
                });
        
                uni.startPullDownRefresh({
                  success: async (res) => {
                    await this.getData()
                    uni.stopPullDownRefresh();
                  }
                });
        
              } else {
                uni.showToast({
                  icon: 'none',
                  title: '操作成功，' + ret.message,
                  mask: false,
                  duration: 1500
                });
              }
        
        
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });
      },
      goCancel(order) {
        uni.showModal({
          title: '取消订单',
          content: '确认取消当前订单',
          success: async (res) => {
            if (res.confirm) {
              console.log('用户点击确定');
              let ret = await this.$store.dispatch('mallOrderCancel', {
                order_id: order.id
              })
              console.log('mallOrderCancel ret', ret)
              if (ret.code == 0) {
                uni.showToast({
                  icon: 'success',
                  title: '操作成功',
                  mask: false,
                  duration: 1500
                });

                uni.startPullDownRefresh({
                  success: async (res) => {
                    await this.getData()
                    uni.stopPullDownRefresh();
                  }
                });

              } else {
                uni.showToast({
                  icon: 'none',
                  title: '操作失败，' + ret.message,
                  mask: false,
                  duration: 1500
                });
              }


            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });
      },
      goPayment(order) {
        this.$store.state.mallPayment.orderIds = [order.id]
        let isVip = order.vip
        let useScore = order.score_use
        let totalVip = order.total_vip * 100
        let scoreVip = order.score_vip * 100
        let total = order.total * 100
        let score = order.score * 100
        let totals = isVip ? (useScore ? totalVip : totalVip + scoreVip) : (useScore ? total : total + score)
        totals = totals / 100
        this.$store.state.mallPayment.totals = totals
        
        let page = '/pagesMall/mall/payment'
        if(order.order_type == 0){
          page += '?isVipOrder=1'
        }
        uni.redirectTo({
        	url: page
        })
      },
      async getData() {
        let params = {}
        params.status = this.status

        if (!this.orderListDatas[this.status]) {
          this.orderListDatas[this.status] = {
            page: 1,
            list: [],
            count: 0
          }
        }

        let orderListData = this.orderListDatas[this.status]
        params.page = orderListData.page

        let ret = await this.$store.dispatch('mallOrderListGet', params)
        console.log('mallOrderListGet ret', JSON.stringify(ret))
        if (ret.code == 0) {
          this.orderListDatas[this.status].page += 1
          this.orderListDatas[this.status].count = ret.data.count

          let rows = ret.data.rows
          if (rows.length == 0) {
            this.loadMoreText = '无更多'
          }
          rows.forEach(row => {
            this.orderListDatas[this.status].list.push(row)
          })
        }
      }
    },
    async onLoad(opt) {
      this.status = opt.status || 0
      this.ordersListStatus = this.status
      await this.getData()
      
      console.log('onLoad =========status' , this.status)

      this.orderListData = this.orderListDatas[this.status]
    },
    async onPullDownRefresh() {
      this.orderListDatas[this.status].page = 1
      this.orderListDatas[this.status].count = 0
      this.orderListDatas[this.status].list = []

      await this.getData()
      this.orderListData = this.orderListDatas[this.status]
      uni.stopPullDownRefresh()

    },
    async onReachBottom() {
      this.showLoadMore = true
      await this.getData()
      this.showLoadMore = false
    },
    async onShow() {
      console.log('onShow ==================')
      if (this.userDataRefresh) {
        console.log('onShow userDataRefresh  =====================')
        this.status = this.ordersListStatus
        uni.startPullDownRefresh({
          success: async () => {
            this.orderListDatas[this.status].page = 1
            this.orderListDatas[this.status].count = 0
            this.orderListDatas[this.status].list = []

            await this.getData()
            this.orderListData = this.orderListDatas[this.status]
            uni.stopPullDownRefresh()
            this.$store.state.userDataRefresh = false
          }
        })
      }
    }

  }
</script>

<style>
  .order-btn {
    display: inline-block;
    padding: 8upx 16upx;
    border: 1px solid #999999;
    border-radius: 24upx;
    color: #999999;
    line-height: 32upx;
    margin-left: 10upx;
    width: 120upx;
    text-align: center;
    font-size: 24upx;
  }
</style>
