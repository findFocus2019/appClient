import Request from './../request.js'

export default {

  goCart(store) {
    uni.navigateTo({
      url: '/pages/mall/cart'
    })
  },

  goToLoginPage(store) {
    uni.navigateTo({
      url: '/pages/auth/login'
    })
  },

  async callServicePhone(store) {
    uni.makePhoneCall({
      phoneNumber: '18676669410' //仅为示例
    });
  },
  
  async getConfigs(store){
    let ret = await Request.post('pub/configs')
    if(ret.code == 0){
      let data =ret.data
      console.log('configs' ,data)
      store.state.configs = data
    }
  },
  
  async getNoticeList(store, data){
    let ret = await Request.post('pub/notices' , data)
    return ret
  }
}
