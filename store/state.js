import config from './config.js';
export default {
  version:config.version,
  miniAppId:config.miniAppId,
  webDomain: config.webDomain,
  apiDomain: config.apiDomain,
	// apiDomain: 'http://47.91.250.144:5001',
  configs:{},
  mainSearchText:'',
  appNoticeData:{
    page:1,
    count:0,
    list:[],
    info:{}
  },
  plusPostData:{
    title: '',
    goods: {},
    contents: [],
    video:'',
    audio:'',
    progress:0
  },
  userShareGoodsData:{
    page:1,
    list:[],
    count:0,
    timestamp:0
  },
  /**
   * 是否需要强制登录
   */
  forcedLogin: false,
  hasLogin: false,
  userInfo:{},
	// 邀请人id，参数puid
	inviteUserId:0,
	// 邀请分享id，参数share_id
	inviteShareId:0,
	invitePostId:0,
	
  isVip:0,
  userDataRefresh:false,
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
  
  // 我的评测
  userPostData:{
    page:1,
    list:[],
    count:0
  },
  // 我的评论
  userCommentData:{
    page:1,
    list:[],
    count:0
  },
  
  oAuthId: 0,
  brandApplyInfo:{},
  // 商城相关
  mallType: 1, // 1:自营商城2:京东商城
	goodsLimit: 10,
	goodsTimestamp:0,
	mallCategorysData:[,[],[]],
  mallGoodsListData:[,{},{}],
  mallGoodsInfo:{},
  mallSearch:{
    open:false,
    text:''
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
    payMethodExt:'',
		isVipOrder:0
  },
  mallAfterData:{
    order:0,
    goodsItems:[],
    info:{}
  },
	cartListBuyItem:{},
  ordersListStatus: 0,
  // 资讯相关
  postInfo:{},
  postChannels:[],
  newsDatas:{},
  recommendDatas:{},
  focusDatas:{
    story:{},
    activity:{}
  },
  postsListDatas:{} //焦点评测
}