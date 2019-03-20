import React, {Component} from 'react'
import SvgIcon from 'components/icon-svg'
import withTabBar from '../common-components/tab-bar'
import cls from 'classnames'
import styles from './index.less'
import NavBar from '../common-components/nav-bar';

@withTabBar
export default class Profile extends Component{
  render() {
    return(
      <div className={styles.root}>
         <NavBar title="我的" iconLeft="#back" />
      </div>
    )
  }
}