import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Notice from './notices'
import styles from './index.less'

const prefixCls = 'notification'
let noticeNumber = 0
const getUuid = () => `notification-${+new Date()}-${noticeNumber++}`

export default class Notification extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notices: [],
      hasMask: false,
    }
  }

  getNoticeDOM = () => {
    const { notices } = this.state
    return notices.map((notice) => {
      return <Notice key={notice.key} {...notice} />
    })
  }

  getMaskDOM = () => {
    const { notices, hasMask } = this.state
    if (notices.length && hasMask) {
      return <div className={styles.mask} />
    }
  }

  add = (notice) => {
    const key = notice.key || getUuid()
    const mask = notice.mask || false
    this.setState((preState) => {
      const { notices } = preState
      if (!notices.find(v => v.key === key)) {
        return {
          notices: [...notices, { ...notice, key }],
          hasMask: mask,
        }
      }
    })
  }

  remove = (key) => {
    this.setState((preState) => {
      return {
        notices: preState.notices.filter(v => v.key === key),
      }
    })
  }

  static newInstance(properties, callback) {
    const { ...props } = properties || {}
    const div = document.createElement('div')
    document.body.appendChild(div)

    let called = false
    function ref(notification) {
      if (called) return
      called = true
      callback({
        notice(noticeProps) {
          notification.add(noticeProps)
        },
        removeNotice(key) {
          notification.remove(key)
        },
        destroy() {
          ReactDOM.unmountComponentAtNode(div)
          div && div.parentNode.removeChild(div)
        },
      })
    }
    ReactDOM.render(<Notification {...props} ref={ref} />, div)
  }

  render() {
    const noticesDOM = this.getNoticeDOM()
    const maskDOM = this.getMaskDOM()
    return (
      <div className={styles[`${prefixCls}-container`]}>
        {maskDOM}
        <div className={styles[`${prefixCls}-box`]}>
          {noticesDOM}
        </div>
      </div>
    )
  }
}
