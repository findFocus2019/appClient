import Request from './../request.js'

export default {

  async userInfoGet(store, data) {
    let ret = await Request.post('user/info')
    store.state.userInfo = ret.data.info
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
  }
}