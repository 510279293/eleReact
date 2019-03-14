import React, {Component} from 'react'
import SvgIcon from 'components/icon-svg'
import cls from 'classnames'
import styles from './index.less'
export default class TopBar extends Component{
  render(){
    const clsname = cls({
      [styles.header]: true
    })
    return(
    <div className={styles.header}>
      <div className={styles.location}>
        <SvgIcon className={styles.icon} name="#location" />
        <h1 className={styles.address}>浙江省杭州市</h1>
        <SvgIcon className={styles.down} name="#triangle_down_fill" />
      </div>
      <div className={styles.search}>
         <p className={styles.desc}>搜索饿了么商家、商品名称</p>
      </div>
    </div>)
  }
}