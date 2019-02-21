import Request from './../request.js'

export default {

	mallChangeType(store, data) {
		let type = store.state.mallType
		store.state.mallType = (type === 1) ? 2 : 1
	},
	// 获取商城分类列表
	async getGoodsCategory(store, data) {
		let type = store.state.mallType
		let ret = await Request.post('mall/categorys', {
			type: type
		})
		if (ret.code == 0) {
			console.log('getGoodsCategory', JSON.stringify(ret.data))
			store.state.mallCategorysData[type] = ret.data
		}
		return ret
	},

	async getGooddList(store, data) {

		let ret = await Request.post('mall/goodsList', data)
		return ret
	},
	// 	async getGoodsList(store, data){
	// 		console.log('getGoodsList data' , JSON.stringify(data))
	// 		let category = data.category
	// 		if(!store.state.mallGoodsList.hasOwnProperty(category)){
	// 			store.state.mallGoodsList[category] = {}
	// 			store.state.mallGoodsList[category].rows = []
	// 			store.state.mallGoodsList[category].page = 1
	// 			store.state.mallGoodsList[category].order = []
	// 		}
	// 		console.log('getGoodsList mallGoodsList[category]' , category, store.state.mallGoodsList[category])
	// 		
	//     let mallSearch = store.state.mallSearch
	//     let search = ''
	//     if(mallSearch.hasDone && mallSearch.text){
	//       search = mallSearch.text
	//     }
	// 		
	// 		let type = store.state.mallType
	// 		let page = store.state.mallGoodsList[category].page
	// 		let limit = store.state.goodsLimit || 10
	// 		let timestamp = data.timestamp || store.state.mallGoodsList[category].timestamp || store.state.goodsTimestamp 
	// 		
	// 		let pramas = {type: type, page: page, limit:limit, category: category,timestamp:timestamp , search: search}
	// 		console.log('getGoodsList pramas' , JSON.stringify(pramas))
	// 		let ret = await Request.post('mall/goodsList' , pramas)
	// 		if(ret.code == 0){
	// 			console.log('getGoodsCategory' ,category, JSON.stringify(ret.data))
	// 			let rows = ret.data.rows
	// 			console.log('getGoodsCategory mallGoodsList rows' , category,store.state.mallGoodsList[category].rows)
	// 			if(rows.length){
	// 				for (var i = 0; i < rows.length; i++) {
	// 					let item = rows[i]
	// 					store.state.mallGoodsList[category].rows.push(item)
	// 				}
	// 				
	// 				store.state.mallGoodsList[category].page++
	// 			}
	// 
	// 			store.state.mallGoodsList[category].count = ret.data.count
	// 			store.state.mallGoodsList[category].timestamp = timestamp // 更新时间戳
	// 			// console.log('getGoodsCategory mallGoodsList rows' , category, JSON.stringify(store.state.mallGoodsList[category]))
	// 			
	// 			if(rows.length < limit){
	// 				store.state.mallGoodsList[category].loadingType = 2
	// 			}else {
	// 				store.state.mallGoodsList[category].loadingType = 1
	// 			}
	// 		}else {
	// 			
	// 			store.state.mallGoodsList[category].loadingType = 2
	// 		}
	// 	},

	async getGoodsInfo(store, data) {
		let ret = await Request.post('mall/goodsInfo', {
			goods_id: data.id,
			share_id: data.share_id
		})
		console.log('getGoodsInfo ret', ret)
		store.state.mallGoodsInfo = ret.data.info
		return ret
	},

	async mallOrderCreate(store, data) {
		let ret = await Request.post('mall/orderCreate', data)
		console.log('mallOrderCreate ret', ret)
		// store.state.mallGoodsInfo = ret.data.info
		return ret
	},

	async mallOrderPayPre(store, data) {
		let ret = await Request.post('mall/orderPayPre', data)
		console.log('mallOrderCreate ret', ret)
		if (ret.code == 0) {
			store.state.mallPayment.orderIds = []
		}
		// store.state.mallGoodsInfo = ret.data.info
		return ret
	},

	async mallOrderPayConfirm(store, data) {
		let ret = await Request.post('mall/orderPayConfirm', data)
		console.log('mallOrderPayConfirm ret', ret)
		if (ret.code == 0) {
			store.state.mallPayment.id = 0
			store.state.mallPayment.orderIds = []
		}
		return ret
	},

	async mallOrderListGet(store, data) {
		let ret = await Request.post('mall/orderList', data)
		return ret
	},

	async mallOrderInfoGet(store, data) {
		let ret = await Request.post('mall/orderInfo', data)
		return ret
	},

	async mallOrderCancel(store, data) {
		let ret = await Request.post('mall/orderCancel', data)
		return ret
	},

	async mallOrderComplete(store, data) {
		let ret = await Request.post('mall/orderComplete', data)
		return ret
	},

	async mallOrderItemListGet(store, data) {
		let ret = await Request.post('mall/orderItemList', data)
		return ret
	},

	async mallOrderItemInfoGet(store, data) {
		let ret = await Request.post('mall/orderItemInfo', data)
		return ret
	},

	async mallOrderItemRate(store, data) {
		let ret = await Request.post('mall/orderRate', data)
		return ret
	},

	async mallOrderAfterListGet(store, data) {
		let ret = await Request.post('mall/orderAfterList', data)
		return ret
	},

	async mallOrderAfterApply(store, data) {
		let ret = await Request.post('mall/orderAfterApply', data)
		return ret
	},

	async mallSearchList(store) {
		let listStr = uni.getStorageSync('mall_search_list') || ''
		return listStr ? JSON.parse(listStr) : []
	},

	async mallSearchListAdd(store, data) {
		let item = data.item
		let listStr = uni.getStorageSync('mall_search_list') || ''
		let list = listStr ? JSON.parse(listStr) : [];

		let index = list.indexOf(item)
		if (index > -1) {
			list.splice(index, 1)
		}

		list.unshift(item)
		uni.setStorageSync('mall_search_list', JSON.stringify(list))

		return list
	}


}
