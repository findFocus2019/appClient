import Request from './../request.js'

export default {

  mallChangeType(store, data) {
    let type = store.state.mallType
    store.state.mallType = (type === 1) ? 2 : 1
  },
	
	async getGoodsCategory(store, data){
		let type = store.state.mallType
		let ret = await Request.post('mall/categorys' , {type: type})
		if(ret.code == 0){
			console.log('getGoodsCategory' , JSON.stringify(ret.data))
			store.state.mallCategorys = ret.data
		}
	},
	
	async getGoodsList(store, data){
		console.log('getGoodsList data' , JSON.stringify(data))
		let category = data.category
		if(!store.state.mallGoodsList.hasOwnProperty(category)){
			store.state.mallGoodsList[category] = {}
			store.state.mallGoodsList[category].rows = []
			store.state.mallGoodsList[category].page = 1
			store.state.mallGoodsList[category].order = []
		}
		console.log('getGoodsList mallGoodsList[category]' , store.state.mallGoodsList[category])
		
		
		let type = store.state.mallType
		let page = store.state.mallGoodsList[category].page
		let limit = store.state.goodsLimit || 10
		let timestamp = store.state.goodsTimestamp 
		
		let pramas = {type: type, page: page, limit:limit, category: category,timestamp:timestamp}
		console.log('getGoodsList pramas' , JSON.stringify(pramas))
		let ret = await Request.post('mall/goodsList' , pramas)
		if(ret.code == 0){
			console.log('getGoodsCategory' , JSON.stringify(ret.data))
			let rows = ret.data.rows
			console.log('getGoodsCategory mallGoodsList rows' ,store.state.mallGoodsList[category].rows)
			if(rows.length){
				for (var i = 0; i < rows.length; i++) {
					let item = rows[i]
					store.state.mallGoodsList[category].rows.push(item)
				}
				
				store.state.mallGoodsList[category].page++
			}

			store.state.mallGoodsList[category].count = ret.data.count
			console.log('getGoodsCategory mallGoodsList rows' ,JSON.stringify(store.state.mallGoodsList[category]))
			
			if(rows.length < limit){
				store.state.mallGoodsList[category].loadingType = 2
			}else {
				store.state.mallGoodsList[category].loadingType = 1
			}
		}else {
			
			store.state.mallGoodsList[category].loadingType = 2
		}
	}
}