import React, {Component} from 'react'
import NavBar from '../common-components/nav-bar'
import withTabBar from '../common-components/tab-bar'
import styles from './index.less'
@withTabBar
export default class Compass extends Component {
  render() {
    const {
      history
    } = this.props
    console.log(this.props)
    return(
      <div>
        <NavBar title="发现" iconLeft="#back" leftClick={() => history.goBack()} />
      </div>
    )
  }
}