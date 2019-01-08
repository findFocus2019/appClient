import Request from './../request.js'

export default {

  async userInfoGet(store, data) {
    let ret = await Request.post('user/info')
    store.state.userInfo = ret.data.info
  }
}