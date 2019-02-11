<template>
  <view class="page">

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
            <textarea type="text" v-model="remark" placeholder="详细说明不能为空" auto-height="true" style="width: 500upx;"/>
          </view>
        </view>

      </view>

      <view class="uni-common-pa">
        <button type="warn" formType="submit" class="uni-border-btn-radius" v-if="applyData.id == 0" @tap="formSubmit">提交</button>
        
        <view class="uni-center uni-common-pa" v-else>
        	<view class="" v-if="applyData.status == 1">
        		已提交
        	</view>
          <view class="" v-if="applyData.status == -1">
          	审核不通过
          </view>
        </view>
      </view>


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
          title:'',
        },
        remark:'',
        rules: [
          {name:"name", checkType : "string", checkRule:"1,64",  errorMsg:"姓名不能为空"},
          {name:"mobile", checkType : "phoneno", checkRule:"",  errorMsg:"请输入正确的手机号码"},
          {name:"title", checkType : "string", checkRule:"1,64",  errorMsg:"品牌名称不能为空"},
        ],
        applyData:{
          id: 0
        }
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
        
        let data = {}
        data.info = postData
        data.remark = this.remark
        data.type = 2
        
        let ret = await this.$store.dispatch('userApplyAction' , data)
        if(ret.code == 0){
          await this.getApplyData()
        }else {
          uni.showToast({
          	icon:'none',
            title:ret.message
          })
        }
        
  
      },
      async getApplyData(){
        let ret = await this.$store.dispatch('userApplyInfoGet' ,{type: 2})
        console.log('userApplyInfoGet ret ' , JSON.stringify(ret))
        if(ret.code == 0 && ret.data){
          this.applyData.id = ret.data.id || 0
          this.applyData.status= ret.data.status
          
          let info = ret.data.info
          this.postData.name = info.name
          this.postData.mobile = info.mobile
          this.postData.title = info.title
          
          this.remark = ret.data.remark

        }
      }
    },
    onLoad(opt) {
      if(!this.hasLogin){
        this.goToLoginPage()
        return
      }
      
      this.getApplyData()
    }
  }
</script>

<style>
 
</style>
