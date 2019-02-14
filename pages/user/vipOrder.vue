<template>
  <view class="page">
    <view class="uni-common-pa uni-bg-white uni-center uni-border-top">
      <view class="uni-common-pt uni-bold uni-h3">充值VIP</view>
			
      <view class="uni-h1 uni-common-pb uni-text-red">
				<money :num="goods.price_sell" size="100"/>
			</view>
			
			<view class="uni-text-gray">
				{{goods.description}}
			</view>
    </view>

<!--    <view class="uni-bg-white uni-border-top uni-common-mt uni-common-pl uni-common-pr">
      <view class="uni-common-pt uni-common-pb">请选择支付方式</view>
      <view class="uni-border-top" v-for="(type,index) in payTypes" :key="index">
        <view class>
          <view
            class="uni-common-pt uni-common-pb uni-text-dark uni-bold"
            v-if="type.name"
          >{{type.name}}</view>
          <view
            class="uni-common-pt uni-common-pb"
            v-for="(item,index2) in type.items"
            :key="index2"
          >
            <view class="uni-flex">
              <view class="uni-flex-item">{{item.name}}</view>
              <view class="uni-right" @tap="payTypeChoose(item)">

                <view class v-if="item.id == 1 || item.id == 2">
                  <view class>
                    <uni-icon
                      type="checkbox-filled"
                      size="22"
                      v-if="mallPayment.payTypeCheck == item.pay_type && mallPayment.payMethodCheck == item.pay_method "
                      color="#d81e06"
                    ></uni-icon>
                    <uni-icon type="circle" size="22" v-else></uni-icon>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
 -->
    <view class="uni-common-pa uni-bg-white">
      <view class="uni-common-pt" @tap="orderCreate" >
        <button type="warn" class="uni-border-btn-radius">确认</button>
      </view>
    </view>

    <view class="uni-bg-white" style="height: 100upx;"></view>
  </view>
</template>

<script>
import { mapState, mapActions } from "vuex";
import uniIcon from "@/components/uni-icon.vue";
import money from "@/components/money.vue";
export default {
  components: {
    uniIcon,
		money
  },
  data() {
    return {
			goods:{},
//       payTypes: [
//         {
//           name: "在线支付",
//           items: [
//             {
//               id: 1,
//               name: "微信支付",
//               pay_type: "3",
//               pay_method: "wx"
//             },
//             {
//               id: 2,
//               name: "支付宝",
//               pay_type: "3",
//               pay_method: "alipay"
//             }
//           ]
//         }
//       ],
//       paymentInfo: {
//         id: 0
//       }
      // payTypeCheck:0,
      // payMethodCheck:'',
    };
  },
  computed: {
    ...mapState(["hasLogin", "userInfo", "mallPayment"])
  },
  methods: {
    ...mapActions(["goToLoginPage", "userInfoGet"]),
//     async paymentCreate() {
//       uni.showLoading({
//         title: "支付提交中..."
//       });
//       console.log("paymentCreate", this.$store.state.mallPayment);
//       if (!this.mallPayment.payTypeCheck) {
//         uni.showToast({
//           title: "请选择支付方式",
//           icon: "none"
//         });
//         return;
//       }
// 
//       let data = {
//         order_ids: this.$store.state.mallPayment.orderIds,
//         pay_type: this.$store.state.mallPayment.payTypeCheck,
//         pay_method:this.$store.state.mallPayment.payMethodCheck
//       };
// 
//       let ret = await this.$store.dispatch("mallOrderPayPre", data);
//       uni.hideLoading();
//       if (ret.code == 0) {
//         //           uni.reLaunch({
//         //           	url:'/pages/mall/paymentSuccess'
//         //           })
//         this.paymentInfo = ret.data;
//         if (this.paymentInfo.amount > 0) {
//           // 去第三方下单
//           uni.showToast({
//             title: "调用第三方支付，金额：" + this.paymentInfo.amount
//           });
//           let info = this.paymentInfo.info; // TODO
//         } 
//       } else {
//         uni.showToast({
//           title: ret.message,
//           icon: "none"
//         });
//       }
//     },
//     paymentCancel() {
//       uni.navigateBack({
//       	delta:1
//       })
//       
//     },
//     payTypeChoose(item) {
//       this.$store.state.mallPayment.payTypeCheck = item.pay_type;
//       this.$store.state.mallPayment.payMethodCheck = item.pay_method;
//     }

		orderCreate(){
			let item = {}
			let goods = this.goods
			if(!goods){
			  uni.showToast({
					icon:'none',
			    title: '添加购物车失败'
			  }) 
			  return 
			}
			item.id = goods.id
			item.title = goods.title
			item.cover = goods.cover
			item.type = goods.type
			item.price_sell = goods.price_sell
			item.price_vip = goods.price_vip
			item.price_score_sell = goods.price_score_sell
			item.price_score_vip = goods.price_score_vip
			item.price_cost = goods.price_cost
			item.price_market = goods.price_market
			item.check = false
			item.share_id = 0
			item.post_id = 0
			
			item.num = 1
			this.$store.state.cartListBuyItem = item
			// 发票默认不选
			this.$store.state.mallOrderConfirm.invoice = 0 //
			// return 
			uni.navigateTo({
				url:'/pages/mall/cartConfirm?type=1&isVipOrder=1'
			})
		}
  },
  async onLoad() {
    if (!this.hasLogin) {
      this.goToLoginPage();
      return;
    }

    this.userInfoGet();
// 
//     console.log("onLoad =========", this.$store.state.mallPayment);
// 
//     this.$store.state.mallPayment.payTypeCheck = 0;
//     this.$store.state.mallPayment.ecardId = 0;
//     this.$store.state.mallPayment.ecardAmount = 0;

		let goodsRet = await this.$store.dispatch('getGoodsInfo' , {id: 9999})
		this.goods = this.$store.state.mallGoodsInfo
		
		console.log('getGoodsInfo' , this.goods)
  }
};
</script>

<style>
</style>
