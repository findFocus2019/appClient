import Request from './../request.js'

export default {

  async authLogout(store, data) {
    await Request.post('user/logout')
    store.state.hasLogin = false
  }
}