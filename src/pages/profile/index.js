import React, { Component } from 'react'
import SvgIcon from 'components/icon-svg'
import withTabBar from '../common-components/tab-bar'
import cls from 'classnames'
import styles from './index.less'
import NavBar from '../common-components/nav-bar';

@withTabBar
export default class Profile extends Component {
  constructor() {
    super()
    this.state = {
      avatar: '',
      isLogin: false,
      username: 'zyy',
    }
  }
  render() {
    const { history, userInfo, isLogin } = this.props
    const changePage = path => history.push(path)
    const getItemContent = (icon, style, count, unit) => (
      isLogin ? (
        <div className={cls(styles.count, style)}>
          <span>{count}</span>
          <span className={styles.unit}>{unit}</span>
        </div>
      ) : (
        <div className={styles.icon}>
          <SvgIcon name={icon} />
        </div>
      )
    )
    const getListsContent = obj => (
      <div className={styles.list}>
        <div className={styles.item} onClick={obj.func}>
          <div className={styles.icon}>
            <SvgIcon name={obj.icon} />
          </div>
          <p className={styles.desc}>{obj.title}</p>
          <SvgIcon name="#right" className={styles['icon-right']} />
        </div>
      </div>
    )
    const lists = [
      {
        icon: '#drumstick',
        title: '我的订单',
        func: () => changePage('/order')
      },
      {
        icon: '#carrot',
        title: '我的地址',
        func: () => changePage('/address')
      }
    ]
    return (
      <div className={styles.root}>
        <NavBar title="我的" iconLeft="#back" leftClick={() => history.goBack()} />
        <div className={styles['profile-info']} onClick = {() => changePage('/login')}>
          <div className={styles.avatar}>
            {
                this.state.avatar ? (
                  <img src={this.state.avatar} className={styles.img} />
                ) : <SvgIcon name="#avatar" className={styles.icon} />
              }
          </div>
          <div className={styles.desc}>
            <p className={styles.info}>
              {!this.state.isLogin ? '登录/注册' : this.state.username}
            </p>
            <p className={styles.text}>
              <SvgIcon name="#iphone" className={styles.icon} />
              <span>
                {
                    !this.state.isLogin ? '登陆后享受更多特权' : 'your number'
                  }
              </span>
            </p>
          </div>
          <SvgIcon name="#right" className={styles['icon-right']} />
        </div>

        <div className={styles.column}>
          <div className={styles.item}>
            {
              getItemContent('#purse', styles.blue, 0, '元')
            }
            <p className={styles.desc}>钱包</p>
          </div>
          <div className={styles.item}>
            {
              getItemContent('#red-packet', styles.red, 0, '个')
            }
            <p className={styles.desc}>红包</p>
          </div>
          <div className={styles.item}>
            {
              getItemContent('#gold', styles.green, 0, '个')
            }
            <p className={styles.desc}>金币</p>
          </div>
        </div>
        {
          lists.map(v => (
            getListsContent(v)
          ))
        }

      </div>
    )
  }
}
