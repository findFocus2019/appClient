/**
 * 购物车类
 * 商品类别 0:电子代金券 1:自营商城 2:京东商城
 */
const cartStorageKey = 'mall_cart_data'

class Cart {
  constructor(arg) {
    let cart = uni.getStorageSync(cartStorageKey);
    if(!cart){
      uni.setStorageSync(cartStorageKey, JSON.stringify([]))
      cart = uni.getStorageSync(cartStorageKey);
    }
    
    this.cart = JSON.parse(cart)
    this._init()
  }
  
  _init(){
    this.count = 0
    this.total = 0
    this.totalVip = 0
    this.score = 0
    this.scoreVip = 0
    this.checkAll = false
  }
  
  _setData(){
    console.log('set cart data', JSON.stringify(this.cart))
    uni.setStorageSync(cartStorageKey, JSON.stringify(this.cart))
  }
  
  info(){
    let list = this.list()
    
    return {
      list: list,
      count: this.count,
      total: this.total,
      totalVip: this.totalVip,
      score: this.score,
      scoreVip: this.scoreVip,
      checkAll: this.checkAll
    }
  }
  
  /**
   * 获取购物车列表
   */
  list(){
    let datas = [[],[],[]]
    
    let checkCount = 0
    
    this._init()
    this.cart.forEach(item => {
      let type = item.type 
      if([0,1,2].indexOf(type) > -1){
        datas[type].push(item)
        
        this.count += item.num
        if(item.isCheck){
          this.total += parseInt(item.price_sell* 100) / 100
          this.totalVip = parseInt(item.price_vip * 100) / 100
          this.score = parseInt(item.price_score_sell * 100) / 100
          this.scoreVip = parseInt(item.price_score_vip * 100) / 100
          checkCount++
        }
        
      }
    })
    
    if(checkCount > 0 && checkCount == this.cart.length){
      this.checkAll = true
    }
    
    return datas
  }
  
  /**
   * 勾选产品
   */
  check(data){
    this.cart.forEach(item => {
      if(data.id === item.id){
        data.check = !data.check
      }
    })
    
    this._setData()
  }
  
  /**
   * 全选
   */
  checkAll(){
    let isCheckCount = 0
    this.cart.forEach(item => {
      if(item.check){
        isCheckCount++
      }
    })
    
    let setCheck = false
    if(isCheckCount < this.cart.length){
      setCheck = true
    }
    
    this.cart.forEach(item => {
      item.check = setCheck
    })
    
    this._setData()
    
  }
  
  /**
   * 添加数量
   */
  plus(data, num = 1){
    let isHave = 0
    console.log(num)
    this.cart.forEach(item => {
      console.log(item)
      if(data.id === item.id){
        item.num += num
        isHave = 1
      }
      console.log(item)
    })
    
    
    if(!isHave){
      data.num = num
      this.cart.push(data)
    }
    
    this._setData()
    
  }
  
  /**
   * 减去数量
   */
  minus(data, num = 1){
    this.cart.forEach((item,i) => {
      if(data.id === item.id){
        if(item.num <= num){
          // 删除
          this.cart.splice(i, 1)
        }else{
          // 减去数目
          item.num -= num
        }
      }
    })
    
    this._setData()
  }
  
  /**
   * 清空
   */
  clear(){
    this.cart = []
    this._setData()
  }
  
}

export default new Cart