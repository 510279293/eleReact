import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NavBar from '../common-components/nav-bar'
import Loading from 'components/loading'
import SvgIcon from 'components/icon-svg'
import AddressRow from '../common-components/address-row'
import { getNearby, getGeolocation } from '../../api'
import styles from './index.less'
import { homeUpdate } from '../../stores/home'
// @connect(({ home }) => ({
//   locationInfo: home.locationInfo,
// }), dispatch => bindActionCreators({
//   homeUpdate,
// }, dispatch))
export default class AddressNearby extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      list: [],
    }
    console.log(props)
  }

  search = async (keyword = '') => {
    const { locationInfo } = this.props
    let { latitude, longitude } = locationInfo
    if (!locationInfo.latitude && !locationInfo.longitude) {
      try {
        const { data } = await getGeolocation()
        latitude = data.latitude
        longitude = data.longitude
        this.props.homeUpdate({
          locationInfo: data,
        })
      } catch ({ err }) {
        return Toast.info()
      }
    }
    try {
      const { data } = await getNearby({
        latitude,
        longitude,
        keyword,
        offset: 0,
        limit: 20,
      })
      this.setState({
        list: data,
        loading: false,
      })
    } catch ({ err }) {
      this.setState({
        loading: false,
      })
      Toast.info(err)
    }
  }

  searhChange = ({ target }) => {
    this.searchFn(target.value)
  }

  searchClick = () => {
    if (this.input) {
      this.search(this.input.value)
    }
  }

  handleRowClick = (val) => {
    const { addressClick, history } = this.props
    if (!addressClick) {
      this.props.homeUpdate({
        init: false,
        locationInfo: {
          address: val.address,
          latitude: val.latitude,
          longitude: val.longitude,
        },
      })
    } else {
      addressClick(val)
    }
    history.goBack()
  }

  render() {
    const { list, loading } = this.state
    const { history } = this.props
    console.log(this.props)
    return (
      <div className={styles.address}>
        <NavBar title="搜索地址" iconLeft="#back" leftClick={() => history.goBack()} />
        <div className={styles.list}>
          {
            loading ? <Loading style={{ marginTop: 20 }} /> :
            (
              <div>
                <div className={styles.search}>
                  <div className={styles.input}>
                    <SvgIcon name="#search" className={styles.icon} />
                    <input placeholder="请输入小区/写字楼/学校等" onChange={this.searhChange} ref={c => this.input = c} />
                  </div>
                  <button className={styles.btn} onClick={this.searchClick}>搜索</button>
                </div>
                {
                  list.length ? (
                    <div className={styles.container}>
                      {
                        list.map((v) => {
                          <AddressRow
                            data={v}
                            key={v.id}
                            handleClick={() => this.handleRowClick({
                              poi_type: 0,
                              st_geohash: v.geohash,
                              address: v.name,
                              address_detail: v.address,
                              latitude: v.latitude,
                              longitude: v.longitude,
                            })}
                          />
                        })
                      }
                    </div>
                  ) : null
                }
              </div>
            )
          }
        </div>
        address search
      </div>
    )
  }
}
