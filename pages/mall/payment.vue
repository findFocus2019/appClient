<template>
  <view class="page">
    <view class="uni-common-pa uni-bg-white uni-center uni-border-top">
      <view class="uni-common-pt">付款金额</view>
      <view class="uni-h2 uni-common-pb uni-text-red">
        <money :num="mallPayment.totals * 100 / 100" size="48" />
      </view>
    </view>

    <view class="uni-bg-white uni-border-top uni-common-mt uni-common-pl uni-common-pr">
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
                <view class v-if="item.id == 4">
                  
                  <view class v-if="userInfo.balance > mallPayment.totals">
                    <view class="uni-common-mb-sm uni-inline-block">
                    	<money :num="userInfo.balance" />
                    </view>
                    <uni-icon
                      type="checkbox-filled"
                      size="22"
                      v-if="mallPayment.payTypeCheck == item.pay_type && mallPayment.payMethodCheck == item.pay_method "
                      color="#d81e06"
                    ></uni-icon>
                    <uni-icon type="circle" size="22" v-else></uni-icon>
                  </view>
                  <view
                    class="uni-text-small uni-text-light"
                    v-else
                  >账户余额不足,剩余:
                  <money :num="userInfo.balance" />
                  </view>
                </view>

                <view class v-if="item.id == 3">
                  <view class v-if="ecardCountCanUse > 0">
                    <text style="margin-right: 10upx;">x {{ ecardCountCanUse }}</text>
                    <uni-icon
                      type="checkbox-filled"
                      size="22"
                      v-if="mallPayment.payTypeCheck == item.pay_type && mallPayment.payMethodCheck == item.pay_method && mallPayment.ecardId"
                      color="#d81e06"
                    ></uni-icon>
                    <uni-icon type="circle" size="22" v-else></uni-icon>
                  </view>
                  <view class v-else>无可用代金券</view>
                </view>

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

    <view
      class="uni-common-pt uni-common-pb uni-text-small uni-text-light uni-center"
      v-if="mallPayment.totals - mallPayment.ecardAmount > 0 && mallPayment.payTypeCheck == 1 && mallPayment.ecardId"
    >代金券余额不足时，可使用账户余额或在线支付方式补齐
      <view class="uni-common-pt uni-text-light uni-center">
        <view class>
          <text>还需支付</text>
          <text class="uni-text-red">￥ {{ (mallPayment.totals - mallPayment.ecardAmount) * 100 / 100}}</text>
        </view>
        <view class="uni-flex uni-common-mt">
          <view
            class="uni-flex-item"
            v-for="(item , index3) in payMethodExts"
            :key="index3"
            @tap="payMethodExtChoose(item)"
          >
            <text
              v-if="mallPayment.payMethodExt == item.method"
              class="uni-text-red"
            >{{ item.text }}</text>
            <text v-else>{{ item.text }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="uni-common-pa uni-bg-white">
      <view class="uni-common-pt" @tap="paymentCreate" v-if="paymentInfo.id == 0">
        <button type="warn" class="uni-border-btn-radius">确认支付</button>
      </view>
      <view class="uni-common-pt uni-center" @tap="paymentCancel">取消</view>
    </view>

    <view class="uni-bg-white" style="height: 100upx;"></view>
    
    <password-trade :title="passwordTradeData.title" :description="passwordTradeData.description" :show="passwordTradeData.show" @confirm="passwordTradeConfirm"></password-trade>
  </view>
</template>

<script>
import { mapState, mapActions } from "vuex";
import uniIcon from "@/components/uni-icon.vue";
import money from '@/components/money.vue';
import passwordTrade from '@/components/user/password_trade.vue';
export default {
  components: {
    uniIcon,
    money,
    passwordTrade
  },
  data() {
    return {
      passwordTradeData:{
        show: false,
        title: '',
        description: '',
        password:''
      },
      payTypes: [
        {
          name: "在线支付",
          items: [
            {
              id: 1,
              name: "微信支付",
              pay_type: "3",
              pay_method: "wx"
            },
            {
              id: 2,
              name: "支付宝",
              pay_type: "3",
              pay_method: "alipay"
            }
          ]
        },
        {
          items: [
            {
              id: 3,
              name: "代金券",
              pay_type: "1",
              pay_method: "ecard"
            }
          ]
        },
        {
          items: [
            {
              id: 4,
              name: "账户余额",
              pay_type: "2",
              pay_method: "balance"
            }
          ]
        }
      ],
      payMethodExts: [
        { id: 1, text: "账户余额", method: "balance" },
        { id: 1, text: "微信支付", method: "wx" },
        { id: 1, text: "支付宝", method: "alipay" }
      ],
      ecardCountCanUse: 0,
      paymentInfo: {
        id: 0
      },
			isVipOrder:0
      // payTypeCheck:0,
      // payMethodCheck:'',
    };
  },
  computed: {
    ...mapState(["hasLogin","isVip", "userInfo", "mallPayment", "userEcardList"])
  },
  methods: {
    ...mapActions(["goToLoginPage", "userInfoGet"]),
    passwordTradeConfirm(password){
      console.log('passwordTradeConfirm ==============' , password)
      this.passwordTradeData.password = password
      
      this.paymentConfirm()
      
    },
    async paymentConfirm(){
      let params = {}
      params.payment_id = this.paymentInfo.id
      params.password = this.passwordTradeData.password
      console.log('paymentConfirm payment_id' , params)
      uni.showLoading({
        title: "提交中...",
        mask:true
      });
      
      let ret = await this.$store.dispatch('mallOrderPayConfirm', params)
      uni.hideLoading()
      if(ret.code == 0){
        uni.showToast({
        	title:'操作成功',
          success: () => {
          	uni.redirectTo({
          		url: '/pages/user/orders?status=1'
          	})
          }
        })
      }else {
        uni.showToast({
        	icon:'none',
          title:'操作失败:' + ret.message
        })
      }
    },
    
    async paymentCreate() {
      uni.showLoading({
        title: "支付提交中...",
        mask:true
      });
      console.log("paymentCreate", this.$store.state.mallPayment);
      if (!this.mallPayment.payTypeCheck) {
        uni.showToast({
          title: "请选择支付方式",
          icon: "none"
        });
        return;
      }

      let ecardId = this.$store.state.mallPayment.ecardId;
      if (this.mallPayment.payTypeCheck == 1) {
        if (!ecardId) {
          uni.showToast({
            title: "请选择代金券",
            icon: "none"
          });
        }
      }

      let data = {
        order_ids: this.$store.state.mallPayment.orderIds,
        pay_type: this.$store.state.mallPayment.payTypeCheck,
        pay_method:
          this.$store.state.mallPayment.payMethodExt ||
          this.$store.state.mallPayment.payMethodCheck,
        ecard_id: ecardId
      };

      let ret = await this.$store.dispatch("mallOrderPayPre", data);
      uni.hideLoading();
      if (ret.code == 0) {
        //           uni.reLaunch({
        //           	url:'/pages/mall/paymentSuccess'
        //           })
        this.paymentInfo = ret.data;
    
        if (this.paymentInfo.amount > 0) {
          // 去第三方下单
          uni.showToast({
            title: "调用第三方支付，金额：" + this.paymentInfo.amount
          });
          let info = this.paymentInfo.info; // TODO
        } else {
          // 弹出密码框
          uni.showToast({
            icon:'none',
            title: "请输入密码确认",
            success:()=> {
            	this.passwordTradeData.show = true
            	this.passwordTradeData.title = '确认支付'
            	this.passwordTradeData.description = '<p>首次支付将设置为默认支付密码，请妥善牢记</p>'
            	// this.passwordTradeData.description = 'aaaaaa'
            }
          });
          
          
        }
      } else {
        uni.showToast({
          title: ret.message,
          icon: "none"
        });
      }
    },
    paymentCancel() {
      uni.reLaunch({
        url: "/pages/mall/list"
      });
    },
    payTypeChoose(item) {
      this.$store.state.mallPayment.payTypeCheck = item.pay_type;
      this.$store.state.mallPayment.payMethodCheck = item.pay_method;

      if (item.id == 3) {
        if (this.ecardCountCanUse > 0) {
          uni.navigateTo({
            url: "/pages/user/ecard?type=choose"
          });
        } else {
          uni.showToast({
            title: "无可用代金券",
            icon: "none"
          });
					return;
        }
      } else if (item.id == 4) {
        if (this.userInfo.balance < this.mallPayment.totals) {
          uni.showToast({
            title: "账户余额不足",
            icon: "none"
          });
          return;
        }
      }

      if (item.id != 3) {
        this.$store.state.mallPayment.ecardId = 0;
        this.$store.state.mallPayment.ecardAmount = 0;
        this.$store.state.mallPayment.payMethodExt = "";
      }
    },
    payMethodExtChoose(item) {
      if (item.method == "balance") {
        if (
          this.userInfo.balance <
          this.mallPayment.totals - this.mallPayment.ecardAmount
        ) {
          uni.showToast({
            title: "账户余额不足",
            icon: "none"
          });
          return;
        }
      }
      this.$store.state.mallPayment.payMethodExt = item.method;
    }
  },
  async onLoad(opt) {
    if (!this.hasLogin) {
      this.goToLoginPage();
      return;
    }

    this.userInfoGet();

    console.log("onLoad =========", this.$store.state.mallPayment);

    await this.$store.dispatch("userEcardListGet");

    let userEcardList = this.$store.state.userEcardList;
    userEcardList.forEach(item => {
      if (item.amount > 0 && item.status == 1) {
        this.ecardCountCanUse++;
      }
    });

    this.$store.state.mallPayment.payTypeCheck = 0;
    this.$store.state.mallPayment.ecardId = 0;
    this.$store.state.mallPayment.ecardAmount = 0;
    //       let data = {
    //         order_ids: this.$store.state.mallPayment.orderIds,
    //         pay_type : 3,
    //         pay_method: 'wx'
    //       }
    //     	this.$store.dispatch('mallOrderPayPre' , data)
		let isVipOrder = opt.isVipOrder || 0
		this.isVipOrder = isVipOrder
		if(isVipOrder){
			this.payTypes.splice(1,2)
		}
  }
};
</script>

<style>
</style>
