export default {
  /**
   * 是否需要强制登录
   */
  forcedLogin: false,
  hasLogin: false,
  userInfo:{},
  userIndexData:{
    balance:0,
    score:0,
    count: {
      views:0,
      comments:0,
      likes:0,
      shares:0
    }
  },
  userAddressList:[],
  userAddressInfo:{},
  userAddressCurrent:{id:0},
  userInvoice:{id:0},
  userEcardList:[],
  userEcardInfo:{},
  oAuthId: 0,
  brandApplyInfo:{},
  // 商城相关
  mallType: 1, // 1:自营商城2:京东商城
	goodsLimit: 10,
	goodsTimestamp:0,
	mallCategorys:[],
  mallGoodsList:{},
  mallGoodsInfo:{},
  mallSearch:{
    open:false,
    text:'',
    hasDone: false
  },
  mallOrderTypes: [{
    name: 'default',
    text: '综合',
    type: 'desc'
  }, {
    name: 'sales',
    text: '销量',
    type: 'desc'
  }, {
    name: 'price',
    text: '价格',
    type: 'desc'
  }],
  mallOrderActive: {
    name:'default',
    type:'desc'
  },
	mallOrderConfirm: {
		list : [],
    invoice : 0
	},
  mallPayment:{
    orderIds:[],
    totals:0,
    payTypeCheck:0,
    payMethodCheck:'',
    ecardId:0,
    ecardAmount:0,
    payMethodExt:''
  }
}