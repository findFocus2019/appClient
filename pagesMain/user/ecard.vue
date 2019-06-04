<template>
	<view class="page">
    <view class="" v-for="(ecard,index) in userEcardList" :key="index">
    	<user-ecard :ecard="ecard" @ecardItemTap="ecardItemTap"></user-ecard>
    </view>
    
   <view class="uni-center uni-common-pt" v-if="userEcardList && userEcardList.length > 1">
     <text class="uni-text-blue" @click="ecardCombine">合并可用代金券</text>
   </view>
	</view>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import userEcard from '@/components/user/user-ecard.vue';
	import money from '@/components/money.vue';
	
  export default {
    data(){
      return {
        pageType:''
      }
    },
    components:{
      userEcard
    },
    computed:{
      ...mapState(['hasLogin','userEcardList'])
    },
    methods:{
      ...mapActions(['goToLoginPage']),
      ecardItemTap(item){
        console.log('ecard item' , item)
        if(this.pageType == 'choose'){
          
          this.$store.state.mallPayment.ecardId = item.id
          this.$store.state.mallPayment.ecardAmount = item.amount
          this.$store.state.mallPayment.payTypeCheck = 1
          this.$store.state.mallPayment.payMethodCheck = 'ecard'

          uni.navigateBack({
          	delta:1
          })
        }
        // this.$store.state.userEcardInfo = item
      },
      ecardCombine(){
        uni.showModal({
          title:'确认',
          content:'合并可用代金券？',
          success:  async (res) => {
              if (res.confirm) {
                  console.log('用户点击确定');
                  
                  let ret = await this.$store.dispatch('userEcardCombine')
                  if (ret.code == 0){
                    this.$store.dispatch('userEcardListGet')
                  }else {
                    uni.showToast({
                      title: ret.message,
                      mask: false,
                      duration: 1500
                    });
                  }
              } else if (res.cancel) {
                 
              }
          }
        })
      }
    },
    onLoad(opt) {
    	if(!this.hasLogin){
    	  this.goToLoginPage()
    	  return
    	}
      
      this.$store.dispatch('userEcardListGet')
      console.log('=======================userEcardListGet')
      this.pageType = opt.type || ''
    }
  }
</script>

<style>
</style>
