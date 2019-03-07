<template>
  <view class="page">
    <view class="uni-common-pa uni-bg-white uni-center uni-border-top">
      <view class="uni-common-pt uni-h4">账单金额</view>
      <view class="uni-h2 uni-common-pb uni-text-red">
        <money :num="mallPayment.totals" size="48" />
      </view>
    </view>

    <view class="uni-bg-white uni-border-top uni-common-mt uni-common-pl uni-common-pr">
      
      <view class="uni-common-pt uni-common-pb uni-flex">
        <view class="uni-flex-item">
        	请选择支付方式
        </view>
        <view class="uni-flex-item uni-right">
          <view class="" v-if="mallPayment.ecardAmount" >
            <text>代金券:</text>
            <view class="uni-inline-block uni-text-red">
            	<money :num="mallPayment.ecardAmount" size="30"></money>
            </view>
          	
          </view>
        	
        </view>
      </view>
    </view>
    
    <view class="uni-bg-white uni-common-pl uni-common-pr" v-if="isVipOrder == 0">
    	<view class="uni-common-pt uni-common-pb uni-border-top uni-flex" >
        <view class="uni-flex-item uni-bold ">
        	代金券
        </view>
        <view class="uni-flex-item uni-right" @tap="payTypeCheck(1)">
        	<view class v-if="ecardCountCanUse > 0">
        	  <text style="margin-right: 10upx;">x {{ ecardCountCanUse }}</text>
        	  <uni-icon
        	    type="checkbox-filled"
        	    size="22"
        	    v-if="mallPayment.payTypeCheck == 1 && mallPayment.ecardId"
        	    color="#d81e06"
        	  ></uni-icon>
        	  <uni-icon type="circle" size="22" v-else></uni-icon>
        	</view>
        	<view class v-else>无可用代金券</view>
        </view>
      
      </view>
    	
    	<view class=""  v-if="mallPayment.payTypeCheck == 1 && needAmount1 > 0">
      <view class="uni-common-pt uni-common-pb uni-right ">
        <text class="uni-text-gray">
          代金券金额不足，还需使用在线支付金额
        </text>
        <view class="uni-inline-block uni-text-red">
        	<money :num="needAmount1" size="30"></money>
        </view>
      	 
      </view>
        <view class="uni-border-top uni-flex uni-common-pt uni-common-pb" v-for="(item,index) in payMethods" :key="index" @tap="payMethodChoose(item)">
        	<view class="uni-flex-item uni-common-pl">
        		{{ item.name }}
        	</view>
        	<view class="uni-flex-item uni-right" >
        		<uni-icon
        		  type="checkbox-filled"
        		  size="22"
        		  v-if="mallPayment.payMethodCheck == item.pay_method"
        		  color="#d81e06"
        		></uni-icon>
        		<uni-icon type="circle" size="22" v-else></uni-icon>
        	</view>
        </view>
    		
    	</view>
    </view>
    
    
    <view class="uni-bg-white uni-common-pl uni-common-pr"  v-if="isVipOrder == 0">
    	<view class="uni-common-pt uni-common-pb uni-border-top uni-flex" >
        <view class="uni-flex-item uni-bold ">
        	账户余额
        </view>
        <view class="uni-flex-item uni-right" @tap="payTypeCheck(2)" v-if="userInfo.balance">
          <money :num="userInfo.balance"></money>
        	<uni-icon
        	  type="checkbox-filled"
        	  size="22"
        	  v-if="mallPayment.payTypeCheck == 2"
        	  color="#d81e06"
        	></uni-icon>
        	<uni-icon type="circle" size="22" v-else></uni-icon>
        </view>
        <view class="" v-else>
        	0
        </view>
      </view>
    	
    	<view class=""  v-if="mallPayment.payTypeCheck == 2 && needAmount2 > 0">
        <view class="uni-common-pt uni-common-pb uni-right ">
          <text class="uni-text-gray">
            账户余额不足，还需使用在线支付金额
          </text>
          <view class="uni-inline-block uni-text-red">
          	<money :num="needAmount2" size="30"></money>
          </view>
        	 
        </view>
        <view class="uni-border-top uni-flex uni-common-pt uni-common-pb" v-for="(item,index) in payMethods" :key="index" @tap="payMethodChoose(item)">
        	<view class="uni-flex-item uni-common-pl">
        		{{ item.name }}
        	</view>
        	<view class="uni-flex-item uni-right" >
        		<uni-icon
        		  type="checkbox-filled"
        		  size="22"
        		  v-if="mallPayment.payMethodCheck == item.pay_method"
        		  color="#d81e06"
        		></uni-icon>
        		<uni-icon type="circle" size="22" v-else></uni-icon>
        	</view>
        </view>
    		
    	</view>
    </view>
    
    <view class="uni-bg-white uni-common-pl uni-common-pr">
    	<view class="uni-common-pt uni-common-pb uni-border-top uni-flex" >
        <view class="uni-flex-item uni-bold ">
        	在线支付
        </view>
        <view class="uni-flex-item uni-right" @tap="payTypeCheck(3)">
        	<uni-icon
        	  type="checkbox-filled"
        	  size="22"
        	  v-if="mallPayment.payTypeCheck == 3"
        	  color="#d81e06"
        	></uni-icon>
        	<uni-icon type="circle" size="22" v-else></uni-icon>
        </view>
  
      </view>
    	
    	<view class=""  v-if="mallPayment.payTypeCheck == 3">
        <view class="uni-border-top uni-flex uni-common-pt uni-common-pb" v-for="(item,index) in payMethods" :key="index" @tap="payMethodChoose(item)">
        	<view class="uni-flex-item uni-common-pl">
        		{{ item.name }}
        	</view>
        	<view class="uni-flex-item uni-right" >
        		<uni-icon
        		  type="checkbox-filled"
        		  size="22"
        		  v-if="mallPayment.payMethodCheck == item.pay_method"
        		  color="#d81e06"
        		></uni-icon>
        		<uni-icon type="circle" size="22" v-else></uni-icon>
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
          id:3,
          name: "代金券",
          pay_type: "1",
          pay_method: "ecard"
        },
        {
          id:4,
          name: "账户余额",
          pay_type: "2",
          pay_method: "balance"
        }    
      ],
      payMethods: [
        {
          id:1,
          name: "微信支付",
          pay_type: "3",
          pay_method: "wxpay"
        },
        {
          id:2,
          name: "支付宝",
          pay_type: "3",
          pay_method: "alipay"
        }
      ],
      ecardCountCanUse: 0,
      paymentInfo: {
        id: 0
      },
			isVipOrder:0,
      isMpWeixin:0,
      needAmount1:0,
      needAmount2:0,
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
        this.$store.state.ordersListStatus = 1
        this.$store.state.userDataRefresh = true
        uni.showToast({
        	title:'交易成功',
          success: () => {
            
          	uni.redirectTo({
          		url: '/pagesMain/user/orders?status=1'
          	})
          }
        })
      }else {
        uni.showToast({
        	icon:'none',
          title:'交易失败:' + ret.message
        })
      }
    },
    
    async paymentCreate() {
      uni.showLoading({
        title: "支付提交中...",
        mask:true
      });
      console.log("paymentCreate", this.$store.state.mallPayment);
      if (!this.mallPayment.payTypeCheck || this.mallPayment.payMethodCheck) {
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
        pay_method: this.$store.state.mallPayment.payMethodCheck,
        ecard_id: ecardId
      };
      
      // #ifdef MP-WEIXIN
      data.is_mp_wx = 1
      // #endif

      let ret = await this.$store.dispatch("mallOrderPayPre", data);
      uni.hideLoading();
      if (ret.code == 0) {
        //           uni.reLaunch({
        //           	url:'/pagesMall/mall/paymentSuccess'
        //           })
        this.paymentInfo = ret.data;
        console.log('paymentInfo id:' + this.paymentInfo.id)
    
        if (this.paymentInfo.amount > 0) {
          // 去第三方下单
//           uni.showToast({
//             title: "调用第三方支付，金额：" + this.paymentInfo.amount
//           });
          
          if(data.pay_method == 'alipay' || data.pay_method == 'wxpay'){
            console.log('orderInfo'+ this.paymentInfo.info)
            let paymentData = this.paymentInfo.info
            if(data.is_mp_wx){
              paymentData = JSON.parse(this.paymentInfo.info)
            }
            
            console.log('orderInfo'+ JSON.stringify(paymentData)) 
            let provider = data.pay_method
            uni.requestPayment({
                provider: provider,
                // #ifndef MP-WEIXIN
                orderInfo: this.paymentInfo.info, //微信、支付宝订单数据
                // #endif
                // #ifdef MP-WEIXIN
                timeStamp: paymentData.timeStamp.toString(),
                nonceStr: paymentData.nonceStr,
                package: paymentData.package,
                signType: 'MD5',
                paySign: paymentData.sign,
                // #endif
                success: (res) => {
                    console.log('success:' + JSON.stringify(res));
                    this.$store.state.ordersListStatus = 1
                    this.$store.state.userDataRefresh = true
                    uni.showToast({
                    	icon:'success',
                      title:'支付成功',
                      success: () => {
                        if(this.isVipOrder){
                          // vip订单返回用户首页
                          this.userInfoGet().then(ret => {
                            uni.switchTab({
                            	url:'/pages/user/index'
                            })
                          })
                          
                        }else {
                          uni.redirectTo({
                          	url:'/pagesMain/user/orders?status=1'
                          })
                        }
                      	
                      }
                    })
                    
                },
                fail: (err) => {
                    console.log('fail:' + JSON.stringify(err));
                    uni.showToast({
                    	icon:'none',
                      title:err.errMsg,
                      success: () => {
                        
                      	uni.navigateBack({
                      		delta:1
                      	})
                      }
                    })
                }
            });
          }else {
            // 微信支付
            uni.showToast({
              title: "不支持的支付方式"
            });
          }

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
    payTypeCheck(type = 1){
      this.$store.state.mallPayment.payTypeCheck = type;
      this.$store.state.mallPayment.payMethodCheck = ''
      this.$store.state.mallPayment.ecardId = 0
      this.$store.state.mallPayment.ecardAmount = 0
      
      if(type == 1){
        if (this.ecardCountCanUse > 0) {
          uni.navigateTo({
            url: "/pagesMain/user/ecard?type=choose"
          });
        } else {
          this.$store.state.mallPayment.payTypeCheck = 0
          this.$store.state.mallPayment.payMethodCheck = ''
          uni.showToast({
            title: "无可用代金券",
            icon: "none"
          });
        	return;
        }
      }else if (type == 2){
        if (this.userInfo.balance < this.mallPayment.totals) {
          this.$store.state.mallPayment.payMethodCheck = ''
          this.needAmount2 = this.mallPayment.totals - this.userInfo.balance
        }else {
          this.$store.state.mallPayment.payMethodCheck = 'balance'
          this.needAmount2 = 0
        }
      }
    },
    payMethodChoose(item){
      this.$store.state.mallPayment.payMethodCheck = item.pay_method
    }

  },
  onShow() {
  	console.log('onShow===============')
    let ecardAmount = this.$store.state.mallPayment.ecardAmount
    if(ecardAmount){
      this.needAmount1 = this.$store.state.mallPayment.totals - ecardAmount
      this.$store.state.mallPayment.payMethodCheck = ''
      console.log('needAmount1======' , this.needAmount1)
    }
    
  },
  async onLoad(opt) {
    if (!this.hasLogin) {
      this.goToLoginPage();
      return;
    }
    
    // h5引导下载
//     // #ifdef H5
//     uni.navigateTo({
//     	url:'/pages/auth/guide'
//     })
//     return
//     // #endif

    this.userInfoGet();

    console.log("onLoad =========", this.$store.state.mallPayment);
    this.$store.state.mallPayment.totals = parseFloat(this.$store.state.mallPayment.totals).toFixed(2)
    
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
    this.$store.state.mallPayment.payMethodCheck = ''
    
    console.log('this.$store.state.mallPayment:' , this.$store.state.mallPayment)
    
		let isVipOrder = opt.isVipOrder || 0
		this.isVipOrder = isVipOrder
		if(isVipOrder){
      
		}
    
    // #ifdef MP-WEIXIN
    this.isMpWeixin = 1
    this.payMethods.splice(1,1)
    // #endif

  }
};
</script>

<style>
</style>
