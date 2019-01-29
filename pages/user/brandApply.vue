<template>
  <view class="page">
    <form @submit="formSubmit" >
      <view class="uni-border-top">
        <view class="uni-flex uni-common-pa uni-bg-white uni-border-bottom">
          <view class="uni-text-dark input-label">
            联系人
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
            品牌名称
          </view>
          <view class="uni-flex-item">
<input type="text" v-model="postData.title" placeholder="品牌名称" />
          </view>
        </view>

        <view class="uni-flex uni-common-pa uni-bg-white uni-border-bottom">
          <view class="uni-text-dark input-label">
            详细说明
          </view>
          <view class="uni-flex-item">
            <textarea type="text" v-model="postData.info" placeholder="详细说明不能为空" auto-height="true" style="width: 500upx;"/>
          </view>
        </view>

      </view>

      <view class="uni-common-pa">
        <button type="warn" formType="submit" class="uni-border-btn-radius">保存</button>
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
  // const graceChecker = require("../../common/graceChecker.js");
  export default {
    components: {
      uniIcon
    },
    data() {
      return {
        postData: {
          name: '',
          mobile: '',
          title:'',
          info: ''
        },
        rules: [
          {name:"name", checkType : "string", checkRule:"1,64",  errorMsg:"姓名不能为空"},
          {name:"mobile", checkType : "phoneno", checkRule:"",  errorMsg:"请输入正确的手机号码"},
          {name:"mobile", checkType : "string", checkRule:"1,64",  errorMsg:"品牌名称不能为空"},
          {name:"info", checkType : "string", checkRule:"1,255",  errorMsg:"详细说明不能为空"},
        ]
      }
    },
    computed:{
      ...mapState(['hasLogin','brandApplyInfo'])
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
        
        await this.$store.dispatch('brandApplyUpdate' , postData)
        await this.$store.dispatch('brandApplyGet')
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
    }
  }
</script>

<style>
 
</style>
