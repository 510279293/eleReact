import axios from 'axios'

const successCode = 0
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8888/api',
  withCredentials: true, // 跨域类型时是否在请求中协带cookie
})

export default class HttpUtil {
  static get(url, params = {}) {
    return new Promise((resolve, reject) => {
      instance.get(url, { params }).then(({ data }) => {
        if (data.code === successCode) {
          const { result } = data
          resolve({ data: result })
        } else {
          reject({ err: data.errmsg, name: data.name || '' })
        }
      }).catch((err) => {
        reject({ err: JSON.stringify(err) })
      })
    })
  }

  static post(url, params = {}) {
    return new Promise((resolve, reject) => {
      instance.post(url, { params }).then(({ data }) => {
        if (data.code === successCode) {
          const { result } = data
          resolve({ data: result })
        } else {
          reject({ err: data.errmsg, name: data.name || '' })
        }
      }).catch((err) => {
        reject({ err: JSON.stringify(err) })
      })
    })
  }

}
