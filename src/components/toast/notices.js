import React, { Component } from 'react'
import cls from 'classnames'
import styles from './index.less'
import PropTypes from 'prop-types'

const noticeProps = {
  duration: PropTypes.number,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  onClose: PropTypes.func,
}

const defaultProps = {
  duration: 2,
  content: '',
  onClose: () => {},
}

const animationDuration = 300
const prefixCls = 'notice'

export default class Notice extends Component {
  static defaultProps = defaultProps
  static propTypes = noticeProps
  constructor(props) {
    super(props)
    this.state = {
      shouldClose: false,
    }
  }

  componentDidMount() {
    if (this.props.duration) {
      this.closeTimer = setTimeout(() => {
        this.onClose()
      }, (this.props.duration * 1000) - animationDuration)
    }
  }

  componentWillUnmount() {
    this.clearCloseTimer()
  }

  onClose() {
    this.clearCloseTimer()
    this.setState({ shouldClose: true })
    this.timer = setTimeout(() => {
      if (this.props.onClose) {
        this.props.onClose()
      }
      clearTimeout(this.timer)
    }, animationDuration)
  }

  clearCloseTimer = () => {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer)
      this.closeTimer = null
    }
  }

  render() {
    const { shouldClose } = this.state
    const { content } = this.props
    return (
      <div className={cls([styles[`${prefixCls}-container`], { [styles.leave]: shouldClose }])}>
        <div className={styles[`${prefixCls}-content`]}>
          {content}
        </div>
      </div>
    )
  }
}
