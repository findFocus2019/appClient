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
          <view class="uni-flex-item uni-flex">
            <view class="uni-flex-item" >
              <picker @change="chooseProvince" :value="provinceIndex" :range="privincesArr">
                  <view class="">{{privincesArr[provinceIndex] || ''}}</view>
              </picker>
            </view>
            <view class="uni-flex-item">
            	<picker @change="chooseCity" :value="cityIndex" :range="citysArr">
            	      <view class="">{{citys[cityIndex] ? citys[cityIndex].name : ''}}</view>
            	  </picker>
            </view>
            <view class="uni-flex-item">
            	<picker @change="chooseCounty" :value="countyIndex" :range="countysArr">
            	      <view class="">{{countys[countyIndex] ? countys[countyIndex].name : ''}}</view>
            	  </picker>
            </view>
            <view class="uni-flex-item" >
            	<picker @change="chooseTown" :value="townIndex" :range="townsArr">
            	      <view class="">{{towns[townIndex] ? towns[townIndex].name : ''}}</view>
            	 </picker>
            </view>
          </view>
        </view>

        <view class="uni-flex uni-common-pa uni-bg-white uni-border-bottom">
          <view class="uni-text-dark input-label">
            详细地址
          </view>
          <view class="uni-flex-item">
            <textarea type="text" v-model="postData.info" placeholder="详细地址请填写到楼栋号" style="width: 500upx;height: 200upx;"/>
          </view>
          <!-- <view class="uni-right" @tap="chooseAddress">
            <uni-icon type="location" size="22"></uni-icon>
          </view> -->
        </view>

      </view>

      <view class="uni-common-pa ">
        <button type="warn" formType="submit" >保存</button>
      </view>
      <view class="uni-common-pa uni-center uni-text-light " @tap="addressDel" v-if="postData.id">
      	删除
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
          info: '',
          province:0,
          city:0,
          county:0,
          town:0,
          address:''
        },
        privinces:[
          // {id: 1, name: '北京市'}
        ],
        citys:[],
        countys:[],
        towns:[],
        privincesArr:[],
        citysArr:[],
        countysArr:[],
        townsArr:[],
        address: [],
        provinceIndex:0,
        cityIndex:0,
        countyIndex:0,
        townIndex:0,
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
        this.postData.address = this.address.join('')
        let postData = this.postData
        
        console.log(postData)
        let checkRes = graceChecker.check(postData, this.rules);
        
        if(!checkRes){
          uni.showToast({ title: graceChecker.error, icon: "none" });
          return
        }
        
        // return 
        
        await this.$store.dispatch('userAddressUpdate' , postData)
        await this.$store.dispatch('userAddressGet')
        uni.navigateBack({
        	delta:1
        })
      },
      async getProvices(){
        let list = await this.getAddressLevel('province' , 0)
        this.provinces = list
        // this.provinceIndex = e.detail.value || 0
        

        this.provinces.forEach((item,index) => {
          // console.log(item.name)
          this.privincesArr.push(item.name)
          if(item.id == this.postData.province){
            this.provinceIndex = index
          }
        })
        
        this.postData.province = this.provinces[this.provinceIndex] ? this.provinces[this.provinceIndex].id : 0
        this.address[0] = this.provinces[this.provinceIndex] ? this.provinces[this.provinceIndex].name : ''
        return this.provinceIndex
      },
      async chooseProvince(e){
        console.log(e.detail)
        
        this.provinceIndex = e.detail.value || 0
        this.postData.province = this.provinces[this.provinceIndex] ? this.provinces[this.provinceIndex].id : 0
        this.address[0] = this.provinces[this.provinceIndex] ? this.provinces[this.provinceIndex].name : ''
        
        let id = this.postData.province || 0
        if(!id){
          return
        }
        let list = await this.getAddressLevel('city' , id)
        this.citys = list
        
        this.citysArr = []
        console.log('this.postData.city =========' + this.postData.city)
        this.citys.forEach((item,index) => {
          // console.log(item.name)
          this.citysArr.push(item.name)
          if(item.id == this.postData.city){
            this.cityIndex = index
          }
        })
        
        // this.cityIndex = 0
        this.postData.city = this.citys[this.cityIndex] ? this.citys[this.cityIndex].id : 0
        this.address[1] = this.citys[this.cityIndex] ? this.citys[this.cityIndex].name : ''
        return this.cityIndex
        // this.provinceIndex = 0
      },
      async chooseCity(e){
        this.cityIndex = e.detail.value
        this.postData.city = this.citys[this.cityIndex] ? this.citys[this.cityIndex].id : 0
        this.address[1] = this.citys[this.cityIndex] ? this.citys[this.cityIndex].name : ''
        let id = this.postData.city || 0
        
        if(!id){
          return
        }
        
        let list = await this.getAddressLevel('county' , id)
        this.countys = list
        // this.postData.county = this.countys[this.countyIndex] ? this.countys[this.countyIndex].id : 0
        
        this.countysArr = []
        console.log('this.postData.county =========' + this.postData.county)
        this.countys.forEach((item,index) => {
          // console.log(item.name)
          this.countysArr.push(item.name)
          if(item.id == this.postData.county){
            this.countyIndex = index
          }
        })
        console.log('this.countyIndex =========' + this.countyIndex)
        // this.countyIndex = 0
        this.postData.county = this.countys[this.countyIndex] ? this.countys[this.countyIndex].id : 0
        this.address[2] = this.countys[this.countyIndex] ? this.countys[this.countyIndex].name : ''
        return this.countyIndex
      },
      async chooseCounty(e){
        this.countyIndex = e.detail.value
        this.postData.county = this.countys[this.countyIndex] ? this.countys[this.countyIndex].id : 0
        this.address[2] = this.countys[this.countyIndex] ? this.countys[this.countyIndex].name : ''
        let id = this.postData.county || 0
        
        if(!id){
          return
        }
        
        let list = await this.getAddressLevel('town' , id)
        console.log('list==========' , list)
        this.towns = list
        // this.postData.town = this.towns[this.townIndex] ? this.towns[this.townIndex].id : 0
        
        this.townsArr = []
        this.towns.forEach((item,index) => {
          console.log(item.name)
          this.townsArr.push(item.name)
          if(item.id == this.postData.town){
            this.townIndex = index
          }
        })
        console.log('this.townsArr==========' , this.townsArr)
        // this.townIndex = 0
        this.postData.town = this.towns[this.townIndex] ? this.towns[this.townIndex].id : 0
        this.address[3] = this.towns[this.townIndex] ? this.towns[this.townIndex].name : ''
        return this.townIndex
      },
      async chooseTown(e){
        this.townIndex = e.detail.value
        this.postData.town = this.towns[this.townIndex] ? this.towns[this.townIndex].id : 0
        this.address[3] = this.towns[this.townIndex] ? this.towns[this.townIndex].name : ''
      },
      
      async getAddressLevel(type, id){
        let ret = await this.$store.dispatch('getAddressLevel' , {type: type, id: id})
        // console.log('getAddressLevel=======' + JSON.stringify(ret))
        if(ret.code == 0){
          let list = ret.data
          return list
        }else {
          return []
        }
      },
      chooseAddress(){
        uni.chooseLocation({
            success: (res)=> {
                console.log('位置名称：' + res.name);
                console.log('详细地址：' + res.address);
                console.log('纬度：' + res.latitude);
                console.log('经度：' + res.longitude);
                
                this.postData.info = res.address + res.name
            }
        });
      },
      addressDel(){
        uni.showActionSheet({
        	itemList:['确认删除'],
          success: async (e) =>  {
          	if(e.tapIndex == 0){
              console.log('删除地址')
              let ret = await this.$store.dispatch('userAddressDelete' , {address_id: this.postData.id})
              if (ret.code == 1){
                uni.showToast({
                  icon:'none',
                	title: ret.message,
                	mask: false,
                	duration: 1500
                });
                return
              }
              await this.$store.dispatch('userAddressGet')
              uni.navigateBack({
              	delta:1
              })
            }
          }
        })
      }
    },
    async onLoad(opt) {
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
              id: address.id,
              province: address.province,
              city: address.city,
              county: address.county,
              town: address.town
            }
            
            this.$store.state.userAddressCurrent = address
          }
        })
      }
      
//       let ret = await this.$store.dispatch('getAddressLevel' , {type: 'province' , id: 0})
//       console.log('getAddressLevel=======' + JSON.stringify(ret))
//       if(ret.code == 0){
//         let list = ret.data
//         this.provinces = list
//       }
//       console.log(this.provinces)
//       this.provinces.forEach((item) => {
//         console.log(item.name)
//         this.privincesArr.push(item.name)
//       })
//       this.provinceIndex = 0
//       console.log(this.privincesArr)

      let provinceIndex = await this.getProvices()
      let cityIndex = await this.chooseProvince({detail:{value:provinceIndex}})
      console.log('cityIndex ===========' + cityIndex)
      let countyIndex = await this.chooseCity({detail:{value:cityIndex}})
      console.log('countyIndex ===========' + countyIndex)
      let townIndex = await this.chooseCounty({detail:{value:countyIndex}})
      await this.chooseTown({detail:{value:townIndex}})
    }
  }
</script>

<style>
 
</style>
