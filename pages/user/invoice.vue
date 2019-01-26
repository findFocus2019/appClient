<template>
  <view class="page">
    <view class="uni-common-pa uni-bg-white uni-border-top">
      发票类型
    </view>
    <view class="uni-common-pa uni-bg-white uni-border-top">
      <radio-group class="uni-flex" name="category" @change="categoryChange">
        <label v-for="item in categorys" :key="item.id">
          <radio :value="item.id" v-if="postData.category == item.id" checked="true"/> 
          <radio :value="item.id" v-else />
          {{item.text}}
        </label>
      </radio-group>
    </view>

    <view class="uni-common-pa uni-bg-white uni-border-top uni-common-mt">
      发票抬头
    </view>
    <view class="uni-common-pa uni-bg-white uni-border-top">
      <radio-group class="uni-flex" name="type" @change="typeChange">
        <label v-for="item in types" :key="item.id">
          <radio :value="item.id" v-if="postData.type == item.id" checked="true"/> 
          <radio :value="item.id" v-else />
          {{item.text}}
        </label>
      </radio-group>
    </view>
    <view class="uni-bg-white uni-border-top">
      <view class="" v-if="postData.type == 1">
      	<view class="uni-flex uni-common-pa uni-bg-white">
      	  <view class="uni-text-dark input-label">
      	    个人姓名
      	  </view>
      	  <view class="uni-flex-item">
      	    <input type="text" v-model="postData.title" placeholder="填写个人真实姓名" />
      	  </view>
      	</view>
      </view>
      <view class="" v-else>
      	<view class="uni-flex uni-common-pa uni-bg-white">
      	  <view class="uni-text-dark input-label">
      	    公司名称
      	  </view>
      	  <view class="uni-flex-item">
      	    <input type="text" v-model="postData.company_title" placeholder="填写公司全称" />
      	  </view>
      	</view>
        <view class="uni-flex uni-common-pa uni-bg-white">
          <view class="uni-text-dark input-label">
            纳税识别号
          </view>
          <view class="uni-flex-item">
            <input type="text" v-model="postData.company_no" placeholder="填写纳税人识别号" />
          </view>
        </view>
      </view>
    </view>

    <view class="uni-common-pa uni-bg-white uni-border-top uni-common-mt">
      发票内容
    </view>
    <view class="uni-common-pa uni-bg-white uni-border-top">
      <radio-group class="uni-flex" name="info" @change="infoChange">
        <label v-for="item in infos" :key="item.id">
          <radio :value="item.id" v-if="postData.info == item.id" checked="true"/> 
          <radio :value="item.id" v-else />
          {{item.text}}
        </label>
      </radio-group>
      <view class="uni-text-small uni-common-pt uni-text-gray">
      	{{ infoText[postData.info] }}
      </view>
    </view>

    <view class="uni-fixed-bottom uni-center uni-bg-red" @tap="saveVoice">
      保存
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex';
  const graceChecker = require("../../common/graceChecker.js");
  export default {
    data(){
      return {
        from:'user',
        postData: {
          category: 1,
          type: 1,
          info: 1,
          title: '',
          company_no: '',
          company_title: ''
        },
        categorys: [{id: '1', text: '普通增值税发票'}],
        types:[{id: '1', text: '个人'} , {id: '2', text: '公司' }],
        infos:[{id: '1', text: '商品明细'} , {id: '2', text: '商品类别' } ],
        infoText: ['','发票内容显示详细商品名称及价格信息' , '发票内容显示商品类别及价格信息'],
        rules1: [
          {name:"title", checkType : "string", checkRule:"1,",  errorMsg:"请填写个人抬头"}
        ],
        rules2:[
          {name:"company_title", checkType : "string", checkRule:"1,",  errorMsg:"请填写公司名称"},
          {name:"company_no", checkType : "string", checkRule:"1,",  errorMsg:"请填写纳税识别号"}
        ]
      }
    },
    computed: {
      ...mapState(['hasLogin', 'userInvoice'])
    },
    methods: {
      ...mapActions(['goToLoginPage']),
      infoChange(e){
        console.log(e)
        this.postData.info = e.detail.value
      },
      typeChange(e){
        console.log(e)
        this.postData.type = e.detail.value
      },
      categoryChange(e){
        console.log(e)
        this.postData.category = e.detail.value
      },
      async saveVoice(){
        let postData= this.postData
        let rules = []
        if(postData.type == 1){
          rules = this.rules1
        }else if(postData.type == 2) {
          rules = this.rules2
        }
        
        console.log('rules' , rules)
        let checkRes = graceChecker.check(postData, rules);
         console.log('checkRes' , checkRes)
        if(!checkRes){
          uni.showToast({ title: graceChecker.error, icon: "none" });
          return
        }
        
        console.log('postData' , postData)
        // return
        let ret = await this.$store.dispatch('userInvoiceUpdate' , postData)
        if(ret.code === 0){
          this.$store.state.mallOrderConfirm.invoice = 1;
           
          this.$store.dispatch('userInvoiceGet')
          uni.navigateBack({
          	delta:1
          })
        }
      }
    },
    async onLoad(opt) {
      if (!this.hasLogin) {
        this.goToLoginPage()
        return
      }

      if (!this.userInvoice.id) {
        await this.$store.dispatch('userInvoiceGet')
        console.log('this.userInvoice' ,this.$store.state.userInvoice)
        
      }
      
      this.postData.category = this.userInvoice.category || 1
      this.postData.type = this.userInvoice.type || 1
      this.postData.info = this.userInvoice.info || 1
      
      this.postData.title = this.userInvoice.title || ''
      this.postData.company_title = this.userInvoice.company_title || ''
      this.postData.company_no = this.userInvoice.company_no || ''
      
      console.log('onLoad' , this.postData)

    }
  }
</script>

<style>
</style>
