<template>
  <view class="content">
    
  </view>
</template>

<script>
// import { mapState } from "vuex";
var bitmap1=null;
export default {
  computed: {
   
  },
  onShow() {
  	var icon = plus.nativeObj.View.getViewById("icon");
    console.log('icon' , icon)
  		if (icon) {
  			setTimeout(function(){
  				icon.show();
  			},100)
  		}
  },
  onLoad() {
   console.log("App onLoad");
    bitmap1 = new plus.nativeObj.Bitmap('bmp1');
   	bitmap1.load('static/img/logo.png',function(){
   		console.log('bmp1.png load success!');
   	},function(e){
   		console.log('bmp1.png load failed! '+JSON.stringify(e));
   	});
   	this.createtab();
  },
  methods:{
     createtab: function() {
    		//console.log('App onLoad');
    		// 设置水平居中位置
    		var leftPos = Math.ceil((plus.screen.resolutionWidth - 60) / 2);
    		var view = new plus.nativeObj.View('icon', {
    			bottom: '11px',
    			left:  leftPos+'px',
    			width: '60px',
    			height: '60px'
    		});
    		view.drawBitmap(bitmap1,
    			{
    				tag: 'font',
    				id: 'icon',
    				//text: '\ue510', //此为字体图标Unicode码'\e600'转换为'\ue600'
    				src: '../../static/img/logo.png',
    				position: {
    					top: '0px',
    					left: '5px',
    					width: '50px',
    					height: '100%'
    				}
    			}
    		);
    		view.addEventListener("click", function(e) {
    
    			uni.switchTab({
    				url: '/pages/auth/login'
    			})
    		}, false);
    		view.show();
    	}
  }
};
</script>

<style>
.hello {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.title {
  color: #8f8f94;
  margin-top: 50upx;
}

.ul {
  font-size: 30upx;
  color: #8f8f94;
  margin-top: 50upx;
}

.ul > view {
  line-height: 50upx;
}
</style>
