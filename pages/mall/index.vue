<template>
	<view class="uni-tab-bar">
		<!-- #ifndef MP -->
		<!-- 固定在顶部的导航栏 -->
		<uni-nav-bar color="#333333" background-color="#FFFFFF" fixed="true" @click-left="search" @click-right="cart">
			<block slot="left">
				<view class="uni-common-pl">
					<uni-icon type="search" size="22" color="#666666"></uni-icon>
				</view>
			</block>
			<view class="input-view uni-flex uni-center" v-if="mallType == 1">
				<text class="uni-h4  uni-flex-item">自营商城</text>
				<text class="uni-flex-item" @tap="changeType">京东商城</text>
			</view>
			<view class="input-view uni-flex uni-center" v-if="mallType == 2">
				<text class="uni-flex-item" @tap="changeType">自营商城</text>
				<text class="uni-h4 uni-flex-item">京东商城</text>
			</view>
			<block slot="right">
				<view class="uni-common-pr">
					<uni-icon type="search" size="22" color="#666666"></uni-icon>
				</view>
			</block>
		</uni-nav-bar>
		<!-- 使用非原生导航栏后需要在页面顶部占位 -->
		<view :style="{height:topHideViewStyle + 'px'}" class="uni-common-pa">&nbsp;</view>
		<!-- #endif -->
		<scroll-view id="tab-bar" class="uni-swiper-tab uni-bg-white" scroll-x :scroll-left="scrollLeft" :style="{position:'fixed' , top:topHideViewStyle + 'px',zIndex:198}" v-if="mallCategorys && mallCategorys.length">
			<view v-for="(tab,index) in mallCategorys" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :id="tab.id"
			 :data-current="index" @click="tapTab(index)">{{tab.name}}</view>
		</scroll-view>
		<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab" :style="{position:'relative' , paddingTop:topHideViewStyle + 'px'}">
			<swiper-item v-for="(tab,index1) in tabDatas" :key="index1">
				<scroll-view class="list" scroll-y @scrolltolower="loadMore(index1)">
					<block v-for="(item,index2) in tab.rows" :key="index2">
						<view class="">
							<view class="" style="width: 100%;">
								<image :src="item.cover" mode="widthFix" style="width: 100%;"></image>
							</view>
							<view class="uni-bg-white uni-common-pa ">
								<view class="">
									<view class="uni-text-darker uni-title">
										{{ item.title }}
									</view>
									<view class="uni-text-small uni-text-light uni-flex">

										<view class="uni-flex-item uni-common-pr " style="width: 80%;">
											<view class="uni-text-red">
												￥ {{ item.price_sell }}
											</view>
											<view class="uni-text-small uni-ellipsis" style="width: 100%;">
												{{ item.description }}
											</view>

										</view>

										<view class="uni-right" style="width: 20%;">

										</view>
									</view>

								</view>



							</view>
						</view>
					</block>
					<view class="uni-tab-bar-loading">
						<uni-load-more :loadingType="tab.loadingType" :contentText="loadingText"></uni-load-more>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	import uniIcon from '@/components/uni-icon.vue';
	import uniNavBar from '@/components/uni-nav-bar.vue';
	import mediaList from '@/components/tab-nvue/mediaList.vue';
	import uniLoadMore from '@/components/uni-load-more.vue';
	import {
		mapState,
		mapActions
	} from "vuex";
	export default {
		components: {
			uniIcon,
			uniNavBar,
			mediaList,
			uniLoadMore
		},
		data() {
			return {
				topHideViewStyle: 0,
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				scrollLeft: 0,
				isClickChange: false,
				tabIndex: 0,
				tabDatas: [],
				}
		},
		computed: {
			...mapState(['mallType', 'mallGoodsList','mallCategorys'])
		},
		methods: {
			...mapActions(['mallChangeType']),
			changeType() {
				this.mallChangeType()
			},
			goDetail(item) {
				uni.navigateTo({
					url: '/pages/mall/goods?id=' + item.id
				})
			},
			loadMore(e) {
				this.tabDatas[e].loadingType = 1;
				setTimeout(() => {
					this.addData(e);
				}, 1200);
			},
			addData(e) {
				console.log('addData' , e)
			},
			async changeTab(e) {
				let index = e.detail.current;
				if (this.isClickChange) {
					this.tabIndex = index;
					this.isClickChange = false;
					return;
				}
				let tabBar = await this.getElSize("tab-bar"),
					tabBarScrollLeft = tabBar.scrollLeft;
				let width = 0;

				for (let i = 0; i < index; i++) {
					let result = await this.getElSize(this.mallCategorys[i].id);
					width += result.width;
				}
				let winWidth = uni.getSystemInfoSync().windowWidth,
					nowElement = await this.getElSize(this.mallCategorys[index].id),
					nowWidth = nowElement.width;
				if (width + nowWidth - tabBarScrollLeft > winWidth) {
					this.scrollLeft = width + nowWidth - winWidth;
				}
				if (width < tabBarScrollLeft) {
					this.scrollLeft = width;
				}
				this.isClickChange = false;
				this.tabIndex = index; //一旦访问data就会出问题
				
				this.getNexTabData(index)
			},
			getElSize(id) { //得到元素的size
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select('#' + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				});
			},
			async tapTab(index) { //点击tab-bar
				if (this.tabIndex === index) {
					return false;
				} else {
					let tabBar = await this.getElSize("tab-bar"),
						tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = true;
					this.tabIndex = index;
				}

				this.getNexTabData(index)
			},
			async getNexTabData(index){
				if(!this.mallCategorys[index + 1]){
					return
				}
				let category = this.mallCategorys[index + 1].id
				
				await this.$store.dispatch('getGoodsList' , {category: category})
			}
		},
		async onReady() {
			console.log('onReady')
			let navbar = uni.createSelectorQuery().select('.uni-navbar')
			navbar.boundingClientRect(data => {
				console.log("得到布局位置信息" + JSON.stringify(data));
				this.topHideViewStyle = data.height
			}).exec();
		},
		async onLoad() {
			console.log('onLoad')
			
			this.$store.state.goodsTimestamp = parseInt(Date.now() / 1000)
			await this.$store.dispatch('getGoodsCategory')
			let mallCategorys = this.$store.state.mallCategorys
			console.log('mallCategorys', JSON.stringify(mallCategorys))
			let category = mallCategorys[0].id
			console.log('category', category)
			await this.$store.dispatch('getGoodsList' , {category: category})
			if(mallCategorys.length > 1){
				let category = mallCategorys[1].id
				console.log('category', category)
				await this.$store.dispatch('getGoodsList' , {category: category})
			}
			
			// this.tabDatas = this.randomfn()
			this.tabDatas = this.$store.state.mallGoodsList
		},
	}
</script>

<style>
	/* #ifdef MP-ALIPAY */
	.swiper-tab-list {
		display: inline-block;
	}
	
	/* #endif */
	
	.swiper-tab-list.active {
		color: #333333;
		font-size: 32upx;
	}
	
	.order-type-item.active {
	  color: #ff5c44;
	}

	.input-view {
		width: 92%;
		display: flex;
		background-color: #e7e7e7;
		height: 30px;
		border-radius: 15px;
		padding: 0 4%;
		flex-wrap: nowrap;
		margin: 7px 0;
		line-height: 30px;
	}

	.input-view .uni-icon {
		line-height: 30px !important;
	}

	.input-view .input {
		height: 30px;
		line-height: 30px;
		width: 94%;
		padding: 0 3%;
	}
</style>
