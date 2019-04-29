import React, { PureComponent } from 'react'
import cls from 'classnames'
import Proptypes from 'prop-types'
import SvgIcon from 'components/icon-svg'
import styles from './index.less'

export default class NavBar extends PureComponent {
  constructor() {
    super()
    this.state = {
      title: 'navbar',
    }
  }
  static proptypes = {
    iconLeft: Proptypes.string,
    iconRight: Proptypes.string,
    leftClick: Proptypes.func,
    rightClick: Proptypes.func,
    title: Proptypes.string,
    className: Proptypes.string,
  }

  static defaultProps = {
    iconLeft: '',
    iconRight: '',
    leftClick: () => {},
    rightClick: () => {},
    title: '',
  }
  render() {
    const {
      iconLeft,
      iconRight,
      leftClick,
      rightClick,
      title,
      className,
    } = this.props
    return (
      <div className={cls(styles.nav, className)}>
        {
          iconLeft ? (
            <div className={styles.icon} onClick={leftClick}>
              <SvgIcon name={iconLeft} />
            </div>
          ) : null
        }
        <div className={styles.title}>{title}</div>
        {
          iconRight ? (
            <div className={styles.icon} onClick={rightClick}>
              <SvgIcon name={iconRight} />
            </div>
          ) : null
        }
      </div>
    )
  }
}
