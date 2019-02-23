import Request from './../request.js'

export default {

  async userInfoGet(store, data) {
    let ret = await Request.post('user/info')
    if (ret.code == 0) {
    	store.state.userInfo = ret.data.info
    	store.state.isVip = ret.data.isVip
    } 
    console.log('userInfoGet ret' , JSON.stringify(ret))
    return ret
  },
  async userInfoUpdate(store, data){
    let ret = await Request.post('user/infoUpdate' , data)
    return ret
  },
  async userIndexDataGet(store, data){
    let ret = await Request.post('user/centerData')
    console.log('userIndexDataGet ret' , JSON.stringify(ret))
    if(ret.code == 0){
      store.state.userIndexData = ret.data
    }
  },
  /**
   * 获取用户地址
   */
  async userAddressGet(store, data){
    let ret = await Request.post('user/address')
    if(ret.code === 0)
    store.state.userAddressList = ret.data.list || []
    
    if(!store.state.userAddressCurrent.id && store.state.userAddressList.length > 0){
      store.state.userAddressCurrent = store.state.userAddressList[0]
      // store.state.userAddressInfo = store.state.userAddressList[0]
    }
    
    return ret
  },
  async userAddressUpdate(store, data){
    let ret = await Request.post('user/addressUpdate', data)
    return ret
  },
  async userInvoiceGet(store, data){
    let ret = await Request.post('user/invoiceInfo')
    console.log('userInvoiceGet ========' , ret)
    if(ret.code === 0){
      store.state.userInvoice = ret.data
    }
    return ret
  },
  async userInvoiceUpdate(store, data){
    let ret = await Request.post('user/invoiceUpdate', data)
    return ret
  },
  async userEcardListGet(store,data){
    let ret = await Request.post('user/listEcard', data)
    console.log('userEcardListGet ========' , ret)
    if(ret.code == 0){
      store.state.userEcardList = ret.data.list || []
    }
    return ret
  },
  
  // 用户收藏
  async userCollectionListGet(store,data){
    let ret = await Request.post('user/listCollection' , data)
    return ret
  },
  async userCollectionAction(store, data){
    let ret = await Request.post('user/collectionAction' , data)
    return ret
  },
  
  // 
  async userOrderItemsListGet(store, data = {}){
    let ret = await Request.post('user/listOrderItem' , data)
    return ret
  },
  
  // 签到
  async userDailySignAction(store, data = {}){
    let ret = await Request.post('user/dailySign' , data)
    return ret
  },
  async userDailySignDataGet(store, data = {}){

    let ret = await Request.post('user/dailySignData' , data)
    return ret
  },
  
  // 邀请好友列表
  async userInviteListGet(store, data = {}){
    let ret = await Request.post('user/listInvite' , data)
    return ret
  },
  
  // 获取用户评测列表
  async userPostListGet(store, data = {}){
    let ret = await Request.post('user/listPost' , data)
    return ret
  },
  async userPostDelAction(store, data = {}){
    let ret = await Request.post('user/delPost' , data)
    return ret
  },
  
  // 用户评论
  async userCommentListGet(store, data = {}){
    let ret = await Request.post('user/listComment' , data)
    return ret
  },
  async userCommentDelAction(store, data = {}){
    let ret = await Request.post('user/delComment' , data)
    return ret
  },
  
  // 用户申请，申请为评测人，申请品牌
  async userApplyInfoGet(store, data = {}){
    let ret = await Request.post('user/applyInfo' , data)
    return ret
  },
  async userApplyAction(store, data = {}){
    let ret = await Request.post('user/applyAction' , data)
    return ret
  },
  
  // 收益记录
  async userTaskLogsListGet(store, data= {}){
    let ret = await Request.post('user/taskLogs' , data)
    return ret
  },
	
	//
	async userShareInfoGet(store, data= {}){
		let ret = await Request.post('user/shareAction' , data)
		return ret
	},
  // 提现申请
  async userTransOut(store, data) {
    let ret = await Request.post('user/transOutApply' , data)
    return ret
  },
  // 提现申请记录
  async userTransactionListGet(store ,data){
    let ret = await Request.post('user/transactionList' , data)
    return ret
  },
  // 设置支付密码
  async userPasswordTradeSet(store, data){
    let ret = await Request.post('user/passwordTradeSet' , data)
    return ret
  },
  // #ifdef APP-PLUS
  async userPushInfo(store, data = {}){
    let ret = await Request.post('user/pushInfo' , data)
    return ret
  },
  // #endif
  
}