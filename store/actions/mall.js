import Request from './../request.js'

export default {

  mallChangeType(store, data) {
    let type = store.state.mallType
    store.state.mallType = (type === 1) ? 2 : 1
  }
}