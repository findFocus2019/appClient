const apiDomain = 'http://127.0.0.1:5001'
const signKey = '123456'
import {
  sha256
} from 'js-sha256';

class Request {

  async post(url, data = {}, query = {}) {
    let uuid = '123456'
    query.token = uni.getStorageSync('user_auth_token') || '';
    let content = {
      body: data,
      query: query
    }
    let sign = this.signData(content).toUpperCase()
    return new Promise((r, j) => {
      uni.request({
        url: apiDomain + '/app/' + url, //仅为示例，并非真实接口地址。
        method: 'POST',
        dataType: 'json',
        data: {
          uuid: uuid,
          content: content,
          sign: sign
        },
        header: {
          'api_token': '123456' //自定义请求头信息
        },
        success: (res) => {
          console.log('request response ', JSON.stringify(res.data));
          r(res.data)
          // this.text = 'request success';
        },
        fail: () => {
          uni.showToast({
            title: '网络异常，请稍后再试！',
            duration: 2000
          });
          r({
            code: -1,
            message: '网络异常，请稍后再试！'
          })
        }
      });
    })
  }

  signData(obj) {
    console.log('obj:', JSON.stringify(obj))
    let str = Buffer.from(JSON.stringify(obj)).toString('base64')
    console.log('base64str:', str)
    return this.hash(signKey, str)
  }

  // objSortToBase64(obj) {
  //   let sdic = Object.keys(obj).sort()
  //   let json = {}
  //   for (let k in sdic) {
  //     if (obj[sdic[k]] !== '') {
  //       // strArr.push(sdic[k] + '=' + obj[sdic[k]])
  //       json[sdic[k]] = obj[sdic[k]]
  //     }
  //   }

  //   return Buffer.from(JSON.stringify(json)).toString('base64')
  // }

  hash(key, str) {
    let hash = sha256.hmac.create(key);
    hash.update(str);
    return hash.hex();
  }
}

export default new Request