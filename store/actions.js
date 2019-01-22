import AuthActions from './actions/auth'
import UserActions from './actions/user.js'
import MallActions from "./actions/mall.js"

export default {
  ...AuthActions,
  ...UserActions,
  ...MallActions,
}