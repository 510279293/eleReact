import React, { PureComponent } from 'react'
import NavBar from '../common-components/nav-bar'
import withTabBar from '../common-components/tab-bar'
import styles from './index.less'

@withTabBar
export default class Order extends PureComponent {
  render() {
    const { history } = this.props
    return (
      <div className={styles.order}>
        <NavBar title="订单" iconLeft="#back" leftClick={() => history.goBack()} />
      </div>
    )
  }
}
