import CommonActions from './actions/common.js'
import AuthActions from './actions/auth'
import UserActions from './actions/user.js'
import MallActions from "./actions/mall.js"
import PostsActions from './actions/posts.js'

export default {
  ...CommonActions,
  ...AuthActions,
  ...UserActions,
  ...MallActions,
  ...PostsActions
}