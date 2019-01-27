<template>
	<view class="page">
    <view class="" v-for="(ecard,index) in userEcardList" :key="index">
    	<user-ecard :ecard="ecard" @ecardItemTap="ecardItemTap"></user-ecard>
    </view>
	</view>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import userEcard from '@/components/user/user-ecard.vue'
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

          uni.navigateBack({
          	delta:1
          })
        }
        // this.$store.state.userEcardInfo = item
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
