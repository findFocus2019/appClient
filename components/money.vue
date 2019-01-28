<template>
	<view class="" style="display: inline;">
		{{ money }}
	</view>
</template>

<script>
	export default {
    props:{
      num:{
        type: Number,
        default:0
      }
    },
		data() {
			return {
				money: 0
			};
		},
    created() {
      let numStr = this.num.toString()
      console.log(numStr)
      let numArr = numStr.split('.')
      if(numArr.length == 1){
        this.money = '￥' + numStr + '.00'
      }else {
        this.money = '￥' + numArr[0] + '.'
        if(numArr[1].length == 1){
          this.money += numArr[1] + '0'
        }else{
          this.money += numArr[1]
        }
      }
      
    	
    }
	}
</script>

<style>

</style>
