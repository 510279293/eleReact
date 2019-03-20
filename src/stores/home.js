/* eslint-disable import/prefer-default-export */
import omit from 'lodash.omit'

import { getGeolocation } from '../api'

const UPDATE = 'HOME_UPDATE'

const initState = {
  init: false,
  locationInfo: {},
}

export const home = (state = initState, action) => {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export const homeUpdate = (params) => {
  return {
    payload: params,
    type: UPDATE,
  }
}

export const homeInit = () => {
  return async (dispatch, getState) => {
    const { init } = getState().home
    let { locationInfo } = getState().home
    if (init) return
    try {
      if (!locationInfo.latitude && !locationInfo.longitude) {
        const geoInfo = await getGeolocation()
        dispatch(homeUpdate({ locationInfo: geoInfo.data }))
        locationInfo = geoInfo.data      // eslint-disable-line
      }
      const location = { ...omit(locationInfo, ['address']) }
      console.log(location)
    } catch ({ err }) {
      console.log(err)
    }
  }
}
