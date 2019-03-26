import React, { Component } from 'react'
import Notification from './Notification'
import PropTypes from 'prop-types'
import cls from 'classnames'
import SvgIcon from '../icon-svg'
import styles from './index.less'

let messageInstance

const getMesageInstance = (props = {}, callback) => {
  if (messageInstance) {
    messageInstance.destroy()
    messageInstance = null
  }
  Notification.newInstance(props, (notification) => {
    callback && callback(notification)
  })
}

const notice = (content, duration, mask = true, onClose) => {
  getMesageInstance({}, (notification) => {
    messageInstance = notification
    notification.notice({
      duration,
      mask,
      content,
      onClose: () => {
        if (onClose) onClose()
        notification.destroy()
        messageInstance = null
      },
    })
  })
}

const WithIcon = ({ name, content, isLoading = false }) => (
  <div className={styles.notice}>
    <SvgIcon className={cls([styles.icon, { [styles.isLoading]: isLoading }])} name={name} />
    <p className={styles.desc}>{content}</p>
  </div>
)

WithIcon.propTypes = {
  isLoading: PropTypes.bool,
  name: PropTypes.string,
  content: PropTypes.string,
}

export default {
  info: (content, duration, mask = true, onClose) => (notice(content, duration, mask, onClose)),
  success: (content, duration, mask = true, onClose) => (notice(<WithIcon content={content} name="#success" />, duration, mask, onClose)),
  fail: (content, duration, mask = true, onClose) => (notice(<WithIcon content={content} name="#cry" />, duration, mask, onClose)),
  loading: (content, duration, mask = true, onClose) => (notice(<WithIcon content={content} name="#refresh" isLoading={true} />, duration, mask, onClose)),
  hide: () => {
    if (messageInstance) {
      messageInstance.destroy()
      messageInstance = null
    }
  },
}
// export default class Toast extends Component {
//   render() {
//     return (
//       <div>
//         <Notification />
//       </div>
//     )
//   }
// }
