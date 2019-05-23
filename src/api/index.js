import HttpUtils from './http'

const position = new AMap.Geolocation({
  enableHighAccuracy: true,
  maximumAge: 0,
  convert: true,
})

// eslint-disable-next-line import/prefer-default-export
export const getGeolocation = () => {
  return new Promise((resolve, reject) => {
    position.getCurrentPosition((status, result) => {
      if (status === 'complete') {
        resolve({
          data: {
            latitude: result.position.lat,
            longitude: result.position.lng,
            address: result.formattedAddress,
          }
        })
      } else {
        reject({
          err: result.message
        })
      }
    })
  })
}

//  登陆 用户信息
export const mobileSendCode = (params) => { return HttpUtils.post('/elm/mobile_send_code', params) }
export const mobileCaptchas = (params) => { return HttpUtils.post('/elm/captchas', params) }
export const loginByMobile = (params) => { return HttpUtils.post('/elm/login_by_mobile', params) }
export const getUserInfo = (params) => { return HttpUtils.post('/elm/users', params) }

export const getAddress = (params) => { return HttpUtils.get('/elm/address', params) }
export const delAddress = (params) => { return HttpUtils.get('/elm/del_address', params) }
export const upAddress = (params) => { return HttpUtils.post('/elm/update_address', params) }
export const addAddress = (params) => { return HttpUtils.post('/elm/add_address', params) }

// 根据经纬度 关键词 获取地址
export const getNearby = (params) => { return HttpUtils.get('/elm/search_nearby', params) }