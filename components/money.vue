<template>
	<view class="" style="display: inline;">
		<text :style="{fontSize: size / 2 + 'px'}">{{ money }}</text>
	</view>
</template>

<script>
	export default {
    props:{
      num:{
        type: Number|String,
        default:0
      },
      size:{
        type: String,
        default:'24'
      },
      nums:{
        type:Array,
        default(){
          return []
        }
      }
    },
		data() {
			return {
				money: '0'
			};
		},
    methods:{
      formatNum(){
        if(this.num || this.num === 0 || this.num === '0'){
          let numStr = parseFloat(this.num).toFixed(2).toString()
          console.log(numStr)
          this.money = ' ￥' + numStr
//           let numArr = numStr.split('.')
//           if(numArr.length == 1){
//             this.money = '￥' + numStr + '.00'
//           }else {
//             this.money = '￥' + numArr[0] + '.'
//             if(numArr[1].length == 1){
//               this.money += numArr[1] + '0'
//             }else{
//               this.money += numArr[1]
//             }
//           }
        }
      },
      formatNums(){
        if(this.nums.length){
          let num = 0
          this.nums.forEach(n => {
            console.log('formatNums =========== n' , n)
            num += parseFloat(n)    
          })
          console.log('formatNums =========== num' , num)
          let numStr = parseFloat(num).toFixed(2)
          
          numStr = numStr.toString()
          this.money = ' ￥' + numStr
          // console.log(numStr)
//           let numArr = numStr.split('.')
//           if(numArr.length == 1){
//             this.money = '￥' + numStr + '.00'
//           }else {
//             this.money = '￥' + numArr[0] + '.'
//             if(numArr[1].length == 1){
//               this.money += numArr[1] + '0'
//             }else{
//               this.money += numArr[1]
//             }
//           }
          
        }
      }
    },
    created() {
      this.formatNum()
      this.formatNums()
    },
    watch:{
      num(newVal,oldVal){
        console.log('newVal' , newVal)
        this.formatNum()
      },
      nums(newVal,oldVal){
        this.formatNums()
      }
    }
	}
</script>

<style>

</style>
