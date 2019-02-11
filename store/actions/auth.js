import Request from './../request.js'

export default {

  async authLogout(store, data) {
    await Request.post('user/logout')
    store.state.hasLogin = false
    uni.setStorageSync("user_auth_token", "");
  },
  
  async authCodeToSession(store, data){
    let ret = await Request.post('pub/codeToSession' , {jscode: data.jscode})
    return ret
  }
}