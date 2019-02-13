// const apiDomain = 'http://127.0.0.1:5001';
import config from './config.js'; 
const apiDomain = config.apiDomain
// const apiDomain = 'http://47.91.250.144:5001'
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
        header: {},
        success: (res) => {
          // console.log('request response ', JSON.stringify(res.data));
          r(res.data)
          let ret = res.data
           console.log('request response code:', ret.code);
           console.log('request response code:', ret.message);
          // this.text = 'request success';
          if(ret.code == -100){
            uni.showToast({
              icon:'none',
              title: '登录信息已过期，请重新登录',
              duration: 1500,
              success() {
              	uni.navigateTo({
              		url:'/pages/auth/login'
              	})
              }
            });
            
          }else if (ret.code == -101){
            uni.showToast({
              icon:'none',
              title: '网络异常，请稍后再试！',
              duration: 2000
            });
            r({
              code: -1,
              message: '网络异常，请稍后再试！'
            })
          }
        },
        fail: () => {
          uni.showToast({
            icon:'none',
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
    // console.log('obj:', JSON.stringify(obj))
    let str = Buffer.from(JSON.stringify(obj)).toString('base64')
    // console.log('base64str:', str)
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
  
  async upload(path){
    
    return new Promise((r,j) => {
      uni.uploadFile({
          url: apiDomain + '/upload', //仅为示例，非真实的接口地址
          filePath: path,
          name: 'file',
          dataType: 'json',
          formData: {},
          success: (uploadFileRes) => {
              console.log('uploadFileRes' , uploadFileRes.data);
              let ret = JSON.parse(uploadFileRes.data)
              if(ret.code == 0){
                r(ret.data.url)
              }else {
                console.log('uploadFileRes err msg' , ret.message)
                j(null)
              }
              // r(uploadFileRes.data)
          },
          fail: (err) => {
            console.log(err)
          	j(null)
          }
      });
    })
    
  }
}

export default new Request