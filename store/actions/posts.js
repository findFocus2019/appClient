import Request from './../request.js'

export default {
  
  // 发布评测
  async postPlusByUser(store, data){
    let ret = await Request.post('posts/postAction' , data)
    return ret
  },
  // 获取新闻资讯类别
  async postChannelsGet(store,data){
    let type = data.type || 1
    let ret = await Request.post('posts/channels' , {type : type})
    if(ret.code == 0){
      store.state.postChannels = ret.data
    }
    
    return ret
  },
  // 获取新闻资讯列表
  async postListGet(store, data){
    let params = {}
    params.type = data.type || 0
    params.page = data.page || 1
    params.limit = data.limit || 10
    params.channel = data.channel || ''
    params.category = data.category || ''
    params.recommend = data.recommend || 0
    params.timestamp = data.timestamp || parseInt(Date.now() / 1000)
    
    let ret = await Request.post('posts/list' , params)
    
    return ret
    
  },
  // 获取新闻资讯详情
  async postInfoGet(store, data){
    let ret = await Request.post('posts/info' , {post_id: data.id, share_id: data.share_id})
    store.state.postInfo = ret.data
    
    return ret
  },
  // 评论
  async postCommentConfirm(store, data){
    let ret = await Request.post('posts/commentAction' , data)
    return ret
  },
  // 评论列表
  async postCommentListGet(store, data){
    let params = {}
    params.post_id = data.post_id
    params.page = data.page || 1
    params.limit = data.limit || 10
    params.timestamp = data.timestamp || parseInt(Date.now() / 1000)
    
    let ret = await Request.post('posts/commentList' , params)
    
    return ret
  },
  // 评论详情
  async postCommentDetailGet(store, data){
    let ret = await Request.post('posts/commentDetail' , data)
    return ret
  },
  // 阅读资讯
  async postViewAction(store, data){
    let ret = await Request.post('posts/viewAction' , data)
    return ret
  },
  // 点赞
  async postLikeAction(store, data){
    let ret = await Request.post('posts/likeAction' , data)
    return ret
  },
  // 评论点赞
  async postCommentLikeAction(store, data){
    let ret = await Request.post('posts/commentLikeAction' , data)
    return ret
  },
 
}