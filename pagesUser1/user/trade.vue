<template>
	<view class="uni-page-body uni-bg-white">
		<view class="uni-flex uni-common-pa uni-bg-white uni-border-top">
			<view class="uni-flex-item uni-right uni-common-pr" @tap="changeType(1)">
				<text v-if="type == 1" class="uni-bold">现金收益</text>
        <text v-else>现金收益</text>
			</view>
      <view class="uni-flex-item" @tap="changeType(2)">
      	<text v-if="type == 2" class="uni-bold">积分收益</text>
      	<text v-else>积分收益</text>
      </view>
		</view>
    
    <view class="uni-flex uni-bg-gray uni-common-pa">
    	<view class="uni-flex-item">
    		<picker mode="date" :value="date1" :start="startDate" :end="endDate" @change="bindDateChangeStart">
            <view class="uni-input">{{date1}}</view>
        </picker>
    	</view>
      <view class="uni-flex-item uni-center">
      至
      </view>
      <view class="uni-flex-item">
      	<picker mode="date" :value="date2" :start="startDate" :end="endDate" @change="bindDateChangeEnd">
      	    <view class="uni-input">{{date2}}</view>
      	</picker>
      </view>
    </view>
    
    <view class="">
    	<view class="" v-show="type == 1">
        <view class="" v-if="listData[type].count">
        	<view class="uni-flex uni-border-bottom uni-common-pa"  v-for="(item,index) in listData[type].list" :key="index">
        		<view class="uni-flex-item">
        			<view class="uni-text-dark">
        				{{item.task.title}}
                <text class="uni-text-small uni-text-red uni-common-ml" v-if="item.status == 0">未结算</text>
                <!-- <text class="uni-text-" v-if="item.status == 1">已结算</text> -->
                <text class="uni-text-small uni-text-gray uni-common-ml" v-if="item.status == -1">已失效</text>
        			</view>
        	    <view class="uni-text-small uni-text-gray">
        	    	{{ item.create_date}}
        	    </view>
        		</view>
        	  <view class="uni-flex-item uni-right uni-h3">
        	  	{{item.balance}}
        	  </view>
        	</view>
        </view>
        <view class="uni-center uni-common-pa uni-text-gray" v-else>
        	无数据
        </view>
        
        
    	</view>
      
      <view class="" v-show="type == 2">
        
        <view class="" v-if="listData[type].count">
        	<view class="uni-flex uni-border-bottom uni-common-pa" v-for="(item,index) in listData[type].list" :key="index">
        		<view class="uni-flex-item">
        			<view class="uni-text-dark">
        				{{item.task.title}}
        			</view>
        	    <view class="uni-text-small uni-text-gray">
        	    	{{ item.create_date}}
        	    </view>
        		</view>
        	  <view class="uni-flex-item uni-right uni-h3">
        	  	{{item.score}}
        	  </view>
        	</view>
        </view>
      	
        <view class="uni-center uni-common-pa uni-text-gray" v-else>
        	无数据
        </view>
        
      </view>
    </view>
	</view>
</template>

<script>
  export default {
    data(){
      return {
        type: 1,
        date1:'',
        date2:'',
        listData:[
          {},
          {
            page:1,
            list:[],
            count:0,
            start_date:0,
            end_date:0
          },{
            page:1,
            list:[],
            count:0,
            start_date:0,
            end_date:0
          }
        ],
        showLoadMore: false,
        loadMoreText:'加载中...',
      }
    },
    computed: {
        startDate() {
            return this.getDate('start');
        },
        endDate() {
            return this.getDate('end');
        }
    },
    methods:{
      changeType(i){
        this.type = i
        let type = this.type
        this.date1 = this.listData[type].start_date || this.getDate('start')
        this.date2 = this.listData[type].end_date || this.getDate('end')
        
        this.listData[type].start_date  = this.date1
        this.listData[type].end_date = this.date2
        
        if(this.listData[type].list.length == 0){
          this.getData()
        }
      },
      bindDateChangeStart(e){
        console.log('bindDateChangeStart' , this.date1)
        this.date1 = e.target.value
        
        if(this.date1.replace('-','') > this.date2.replace('-','')){
          console.log('bindDateChangeStart 超出')
          this.date1 = this.date2
          
        }
        
        let type= this.type
        this.listData[type].page = 1
        this.listData[type].count = 0
        this.listData[type].start_date = this.date1
        this.listData[type].end_date = this.date2
        this.listData[type].list = []
        
        this.getData()
        
        return
        
      },
      bindDateChangeEnd(e){
        
        this.date2 = e.target.value
        if(this.date2.replace('-','') < this.date1.replace('-','')){
          this.date2 = this.date1
          
        }
        
        let type= this.type
        this.listData[type].page = 1
        this.listData[type].count = 0
        this.listData[type].start_date = this.date1
        this.listData[type].end_date = this.date2
        this.listData[type].list = []
        
        this.getData()
        
        return
      },
      getDate(type) {
        const date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (type === 'start') {
            day = 1
        } 
        month = month > 9 ? month : '0' + month;;
        day = day > 9 ? day : '0' + day;
        return `${year}-${month}-${day}`;
      },
      async getData(){
        let type = this.type
        let listDataItem = this.listData[type]
        
        let params = {}
        params.page = listDataItem.page
        params.start_date = listDataItem.start_date
        params.end_date = listDataItem.end_date
        params.type = type
        console.log('userTaskLogsListGet params: ============' , JSON.stringify(params))
        let ret = await this.$store.dispatch('userTaskLogsListGet' , params)
        console.log('userTaskLogsListGet ret:' , JSON.stringify(ret))
        if(ret.code == 0){
          this.listData[type].page += 1
          this.listData[type].count = ret.data.count
          this.listData[type].start_date = ret.data.start_date
          this.listData[type].end_date = ret.data.end_date
          
          let rows = ret.data.rows
          rows.forEach(row => {
            this.listData[type].list.push(row)
          })
          
          if(rows.length == 0){
            this.showLoadMore = '无更多'
          }
        }
      }
    },
    onLoad() {
      let type = this.type
      this.listData[type].start_date = this.getDate('start')
      this.listData[type].end_date = this.getDate('end')
      
    	this.date1 = this.listData[type].start_date
      this.date2 = this.listData[type].end_date
      
      this.getData()
    },
    async onPullDownRefresh() {
    	let type= this.type
      this.listData[type].page = 1
      this.listData[type].count = 0
      // this.listData[type].start_date = this.getDate('start')
      // this.listData[type].end_date = this.getDate('end')
      this.listData[type].list = []
      
      await this.getData()
      uni.stopPullDownRefresh()
    },
    async onReachBottom() {
    	this.showLoadMore = true
    	await this.getData()
    	
    	setTimeout(() => {
    	  this.showLoadMore = false
    	} , 1000)
    }
  }
</script>

<style>
</style>
