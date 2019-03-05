<template>
	<view class="page">
    
    <view class="uni-center uni-common-mt" v-if="cartInfo && cartInfo.count === 0">
    	购物车什么都没有~
    </view>
    
		<view class="" v-for="(list,index) in cartInfo.list" :key="index">
			<view class="uni-common-mt" v-if="list.length">
				<view class="uni-bg-white uni-border-top uni-common-pa uni-flex" >
					<view class="" style="width: 70upx;" @tap="cartCheckType(index)">
						<uni-icon type="checkbox-filled" size="22" v-if="cartInfo.checkAllType[index]" color="#d81e06"></uni-icon>
						<uni-icon type="circle" size="22"  v-else></uni-icon> 
					</view>
					<view class="uni-h4 uni-flex-item">
						<view class="" v-if="index == 1">
							自营商城
						</view>
						<view class="" v-if="index == 2">
							京选商城
						</view>
					</view>
				</view>
				
				<view class="uni-bg-white uni-border-top" v-for="(item,index2) in list" :key="index2">
					<scroll-view class="scroll-view_H cart-list" scroll-x="true" @scroll="scroll" scroll-left="0">
						<view class="scroll-view-item_H">
				      <view class="">
				      	<view class="uni-flex">
									<view class="cart-list-check uni-flex-item uni-center uni-text-small" v-if="item.check === null">
										无货
									</view>
				      		<view class="cart-list-check uni-flex-item uni-center" @tap="cartCheck(item)" v-else>
				      			<uni-icon type="checkbox-filled" size="22" v-if="item.check" color="#d81e06"></uni-icon>
										<uni-icon type="circle" size="22"  v-else></uni-icon>
				      		</view>
				      		<view class="cart-list-cover uni-common-pt uni-flex-item">
				      			<image lazy-load="true"  :src="item.cover" mode="" style="width: 180upx;height: 180upx;"></image>
				      		</view>
				      		<view class="uni-flex-item uni-common-pt uni-common-pl uni-common-pr cart-list-item" >
				      			<view class=" cart-list-title uni-bold" style="width: 410upx;">
				             {{item.title}} 
				      			</view>
				            <view class="uni-flex">
				            	<view class="uni-flex-item uni-text-small uni-text-gray">
				            		积分可抵扣:
                        <money :num="item.price_score_sell" size="24" v-if="!isVip"/> 
                        <money :num="item.price_score_vip" size="24" v-else/> 
				            	</view>
				            </view>
				            <view class="uni-flex">
				              <view class="uni-text-red uni-flex-item">
				              	<money :num="item.price_sell" size="36" v-if="!isVip" />
                        <money :num="item.price_vip" size="36" v-else />
				              </view>
				            	<view class="uni-right uni-flex-item">
				            		<uni-number-box  @change="onNumberChange" :value="item.num" :cartItem="item"></uni-number-box>
				            	</view>
				            </view>
				      		</view>
				      	</view>
				      </view>
	    
					  </view>
						<view class="scroll-view-item_H uni-center" style="background: #d81e06;width: 100upx;color: #fff;" @tap="cartDel(item)">
				      <view class="" style="display: inline-block;vertical-align: middle;" >
				      	<view class="">
				      		<uni-icon type="trash" size="24"></uni-icon>
				      	</view>
				        <view class="">
				          删除
				        </view>
				      </view>
				      
				    </view>
					</scroll-view>
				</view>
				
			</view>

			<view v-if="index == 2 && list.length" class="uni-bg-white">
				<user-address :address="userAddressCurrent" v-if="userAddressCurrent.id"></user-address>
				
				<view class="uni-common-pa uni-flex uni-border-top">
					<view class="uni-flex-item">
						运费
					</view>
					<view class="uni-right">
						<view class="" v-if="priceExpress">
							<money :num="priceExpress"></money>
						</view>
						<view class="" v-if="priceExpress === 0">
							0
						</view>
						<view class="" v-if="priceExpress === ''">
							未获取
						</view>
					</view>
				</view>
			</view>
    </view>
		
    <view class="" style="height: 100upx;">
    	
    </view>
		<view class="cart-toolbar uni-flex uni-center uni-bg-white">
			<view class="uni-flex">
				<view class="" style="width: 70upx;line-height: 100upx;" @tap="cartCheckAll">
					<uni-icon type="checkbox-filled" size="22" v-if="cartInfo.checkAll" color="#d81e06"></uni-icon>
					<uni-icon type="circle" size="22"  v-else></uni-icon> 
				</view>
				<view style="line-height: 100upx;">全选
				</view>
			</view>
			<view class="uni-flex-item uni-left uni-common-pl" >
        <view class="" style="line-height: 50upx;">
          <text>总计:</text>
        	<view class="uni-text-red uni-inline-block"> 
            <money :num="cartInfo.total" size="32" v-if="!isVip"/>
            <money :num="cartInfo.totalVip" size="32" v-else/>
          </view>
        </view>
				<view class="" style="line-height: 50upx;">
					<text class="uni-text-small uni-text-gray">积分可抵扣:</text>
					<view  class="uni-text-small uni-text-gray uni-inline-block">
					<money :num="cartInfo.score" size="24" v-if="!isVip"/>
          <money :num="cartInfo.scoreVip" size="24" v-else/>
          </view>
				</view>
			</view>
			<view class="uni-center uni-common-pr" style="" @tap="cartToOrder">
				
        <view class="uni-bg-red" style="border-radius: 50upx;height: 60upx;margin-top: 20upx;line-height: 60upx;width: 100upx;">
        	结算
        </view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
	  mapState,
	  mapActions
	} from 'vuex'
  import Cart from '@/static/js/cart.js';
  import uniNumberBox from '@/components/uni-number-box.vue';
  import uniIcon from '@/components/uni-icon.vue';
 import money from '@/components/money.vue';
 import userAddress from '@/components/user/user-address.vue';
  export default {
    data(){
      return {
        cartInfo:{},
				priceExpress:''
      }
    },
    components:{
      uniNumberBox,
      uniIcon,
      money,
			userAddress
    },
    computed:{
      ...mapState(['hasLogin','isVip','mallOrderConfirm' , 'userAddressList','userAddressCurrent'])
    },
    methods:{
      ...mapActions(['goToLoginPage']),
      
      scroll: function(e) {
				console.log(e)
				// this.old.scrollTop = e.detail.scrollTop
			},
      async onNumberChange(data){
        console.log('onNumberChange:' ,data)
        let item = data.item
        let num = item.num - data.val
        if(num > 0){
          Cart.minus(item ,num)
        }else if(num < 0){
          Cart.plus(item , -num)
        }
        
        if (item.type == 2){
          let stockRet = await this.getStockJd(item.uuid, item.num)
          if(!stockRet){
          	Cart.check(item , null)
          }else {
          	Cart.check(item , item.check || false)
          }
          
        }

        this.cartInfo = Cart.info()	
				this.getFeight()
      },
      cartDel(item){
        Cart.minus(item ,item.num)
        this.cartInfo = Cart.info()
				
				this.getFeight()
      },
			cartCheck(item){
				Cart.check(item)
				this.cartInfo = Cart.info()
				
				this.getFeight()
			},
			cartCheckType(index){
				Cart.checkAllByType(index)
				this.cartInfo = Cart.info()
				
				this.getFeight()
			},
			cartCheckAll(){
				Cart.checkAllAction()
				this.cartInfo = Cart.info()
				
				this.getFeight()
			},
			cartToOrder(){
        let total = Cart.total
        if(!total){
          uni.showToast({
              title: '请选择商品结算',
              icon:'none',
              duration: 2000
          });
          return
        }
				
				console.log('this.priceExpress' , this.priceExpress)
				if(this.priceExpress === ''){
					uni.showToast({
					    title: '京选商品运费获取失败，稍后重试',
					    icon:'none',
					    duration: 2000
					});
					return
				}
				
        if(!this.hasLogin){
          this.goToLoginPage()
        }else {
          // 发票默认不选
          this.$store.state.mallOrderConfirm.invoice = 0 //
					this.$store.state.mallOrderConfirm.priceExpress = this.priceExpress
          // return 
          uni.showLoading({
          	title:'提交中'
          })
					
					let page = '/pagesMall/mall/cartConfirm'
					let jdOrder = 0
					this.cartInfo.list[2].forEach(item => {
						if(item.check){
							jdOrder = 1
						}
					})
					page += '?jdOrder=' + jdOrder
          setTimeout(() => {
            uni.navigateTo({
            	url:page
            })
            uni.hideLoading()
          }, 500)
          
        }
				
			},
			async checkJdGoods(){
				let cartInfo = Cart.info()
				let jdList = cartInfo.list[2]
        console.log('checkJdGoods=================' ,jdList)
				if(!jdList.length){
					return 
				}
				for (let i = 0; i < jdList.length; i++) {
					let goods = jdList[i]
					let stockRet = await this.getStockJd(goods.uuid, goods.num)
					if(!stockRet){
						Cart.check(goods , null)
					}else {
						Cart.check(goods , goods.check || false)
					}
				}
				
				this.cartInfo = Cart.info()
				
				console.log('this.cartInfo' , this.cartInfo)
			},
			async getStockJd(skuId, num) {
			  let address = this.userAddressCurrent
			  if(!address.id){
					
			    return false
			  }
			  let areas = [address.province , address.city, address.county, address.town]
			  let area = areas.join('_')
			  let skuNums = JSON.stringify([{
			      skuId: skuId,
			      num: num
			    }])
			  let ret = await this.$store.dispatch('getJdGoodsStock', {
			    skuNums:skuNums ,
			    area: area
			  })
			  console.log('getJdGoodsStock ret:' + JSON.stringify(ret))
			  if(ret.code == 0){
			    let rets = ret.data
			    let stockStateId= 0
			    rets.forEach(item => {
			      if(item.skuId == skuId){
			        stockStateId = item.stockStateId
			      }
			    })
			    
			    if(stockStateId != 33){
			      return false
			    }
			  }else {
			    return false
			  }
			  
			  // return false
			  return true;
			},
			async getFeight(){
				let cartInfo = Cart.info()
				let jdList = cartInfo.list[2]
				if(!jdList.length){
					this.priceExpress = 0
					return 
				}
				
        console.log('getFeight===============')
				let address = this.userAddressCurrent
				if(!address.id){
					this.priceExpress = ''
				  return 
				}
				
				let sku = []
				for (let i = 0; i < jdList.length; i++) {
					let goods = jdList[i]
					if (goods.check){
						sku.push({skuId: goods.uuid , num: goods.num})
					}
				}
				if(!sku.length){
					this.priceExpress = 0
					return
				}
				
				let ret = await this.$store.dispatch('getJdFreight' , {
					sku: JSON.stringify(sku),
					province: address.province,
					city: address.city,
					county: address.county,
					town: address.town || 0,
				})
				
				console.log('getJdFreight ret' , ret)
				if(ret.code == 0){
					this.priceExpress = ret.data.freight
				}else {
					this.priceExpress = ''
				}
			}
    },
		
    onLoad() {
    	console.log('onLoad')
			if (this.hasLogin && !this.userAddressList.length) {
			  this.$store.dispatch('userAddressGet')
			}
			
			console.log('userAddressCurrent', this.userAddressCurrent)
    },
    async onShow() {
    	console.log('onShow')
			this.cartInfo = Cart.info()
			console.log('cart info :' + JSON.stringify(this.cartInfo))
			
			let address = this.userAddressCurrent
			console.log('onShow address' , address)
			await this.checkJdGoods()
			await this.getFeight()
    },
    onReady() {
    	console.log('onReady')
    }
  }
</script>

<style lang="less">
  
  .scroll-view_H {
		white-space: nowrap;
    height: 240upx;
		width: 100%;
	}
  
  .scroll-view-item {
		height: 240upx;
		// line-height: 240upx;
		text-align: center;
		// font-size: 36upx;
	}
  
  .scroll-view-item_H {
		display: inline-block;
		width: 100%;
		height: 240upx;
		line-height: 240upx;
		// text-align: center;
		// font-size: 36upx;
	}
  
  .scroll-view-item_H.delete {
    width: 100upx;
    background: #d81e06;
    color: #fff;
  }
  
  .cart-list {
    .cart-list-check {
      width: 100upx;
      line-height: 240upx;
    }
    
    .cart-list-cover {
      width: 180upx;
      
    }

    .cart-list-item {
      width: 470upx;
      line-height: 75upx;
      // flex-wrap:wrap;
      white-space:normal;
    }
    
    
  }
  
  .cart-list-title {
    // width: 300upx;
    // width: 300upx;
    height: 80upx;
    word-break: break-all;
    display: -webkit-box;
    overflow: hidden;
    line-height: 40upx;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    flex-shrink:0;
  }
  
  .cart-toolbar {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		background: #fff;
	}
  
</style>
