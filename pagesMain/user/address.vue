<template>
	<view class="page">
		<view class="uni-common-pa uni-center" v-if="userAddressList.length === 0">
			还未添加收货地址
		</view>
    
    <view class="" v-for="(address,index) in userAddressList" :key="index">
    	<user-address :address="address" :toPage="'/pagesMain/user/addressUpdate?id=' + address.id " :current="userAddressCurrent.id" @choose="choose"></user-address>
    </view>
    <view class="uni-fixed-bottom uni-center uni-bg-red" @tap="goToUpdate">
    	添加地址
    </view>
	</view>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex';
  import userAddress from '../../components/user/user-address.vue'
  export default {
    
    components:{
      userAddress
    },
    computed:{
      ...mapState(['hasLogin','userAddressList' , 'userAddressCurrent'])
    },
    methods:{
      ...mapActions(['goToLoginPage']),
      goToUpdate(address){
       
        uni.navigateTo({
        	url:'/pagesMain/user/addressUpdate'
        })
      },
      choose(address){
        console.log('choose id' , address)
        this.$store.state.userAddressCurrent = address
        uni.navigateBack({
        	delta:1
        })
      }
    },
    onLoad() {
    	if(!this.hasLogin){
        this.goToLoginPage()
        return
      }
      
      if(!this.userAddressList.length){
        this.$store.dispatch('userAddressGet')
        console.log('userAddressCurrent' , this.userAddressCurrent)
      }
      
    },
  }
</script>

<style>
</style>
