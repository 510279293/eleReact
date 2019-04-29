import React from 'react'
import NavBar from '../common-components/nav-bar'
import SvgIcon from 'components/icon-svg'
import styles from './index.less'

export default class Address extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      loading: false,
    }
  }
  goEdit = (val = false) => {
    console.log('dffffdfd')
  }
  render() {
    return (
      <div className={styles.address}>
        <NavBar title="我的地址" iconLeft="#back" leftClick={() => this.props.history.goBack()} />
        <button className={styles.add} onClick={() => this.goEdit()}>
          <div className={styles.icon}>
            <SvgIcon name="#round_add" />
          </div>
          <span>新增收货地址</span>
        </button>
      </div>
    )
  }
}
