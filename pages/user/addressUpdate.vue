<template>
  <view class="page">
    <form @submit="formSubmit" >
      <view class="uni-border-top">
        <view class="uni-flex uni-common-pa uni-bg-white uni-border-bottom">
          <view class="uni-text-dark input-label">
            收货人
          </view>
          <view class="uni-flex-item">
            <input type="text" v-model="postData.name" placeholder="姓名" />
          </view>
        </view>

        <view class="uni-flex uni-common-pa uni-bg-white uni-border-bottom">
          <view class="uni-text-dark input-label">
            联系方式
          </view>
          <view class="uni-flex-item">
            <input type="text" v-model="postData.mobile" placeholder="电话号码" />
          </view>
        </view>

        <view class="uni-flex uni-common-pa uni-bg-white uni-border-bottom">
          <view class="uni-text-dark input-label">
            所在地区
          </view>
          <view class="uni-flex-item">

          </view>
        </view>

        <view class="uni-flex uni-common-pa uni-bg-white uni-border-bottom">
          <view class="uni-text-dark input-label">
            详细地址
          </view>
          <view class="uni-flex-item">
            <textarea type="text" v-model="postData.info" placeholder="详细地址请填写到楼栋号" auto-height="true" style="width: 500upx;"/>
          </view>
          <view class="uni-right" @tap="chooseAddress">
            <uni-icon type="location" size="22"></uni-icon>
          </view>
        </view>

      </view>

      <view class="uni-common-pa">
        <button type="warn" formType="submit" >保存</button>
      </view>

    </form>

  </view>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex';
  import uniIcon from '../../components/uni-icon.vue';
  const graceChecker = require("../../common/graceChecker.js");
  export default {
    components: {
      uniIcon
    },
    data() {
      return {
        postData: {
          name: '',
          mobile: '',
          info: ''
        },
        rules: [
          {name:"name", checkType : "string", checkRule:"1,64",  errorMsg:"姓名不能为空"},
          {name:"mobile", checkType : "phoneno", checkRule:"",  errorMsg:"请输入正确的手机号码"},
          {name:"info", checkType : "string", checkRule:"1,255",  errorMsg:"详细地址不能为空"},
        ]
      }
    },
    computed:{
      ...mapState(['hasLogin','userAddressList','userAddressCurrent'])
    },
    methods:{
      ...mapActions(['goToLoginPage']),
      async formSubmit(){
        let postData = this.postData
        let checkRes = graceChecker.check(postData, this.rules);
        
        if(!checkRes){
          uni.showToast({ title: graceChecker.error, icon: "none" });
          return
        }
        
        await this.$store.dispatch('userAddressUpdate' , postData)
        await this.$store.dispatch('userAddressGet')
        uni.navigateBack({
        	delta:1
        })
      }
    },
    onLoad(opt) {
      if(!this.hasLogin){
        this.goToLoginPage()
        return
      }
      
      if(opt.id){
        console.log('onload =========' , opt.id)
        let addressList = this.userAddressList
        
        addressList.forEach(address => {
          if(address.id == opt.id){
            this.postData = {
              name: address.name,
              mobile:address.mobile,
              info: address.info,
              id: address.id
            }
            
            this.$store.state.userAddressCurrent = address
          }
        })
      }
    }
  }
</script>

<style>
 
</style>
