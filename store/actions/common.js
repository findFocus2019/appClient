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
  }
}
