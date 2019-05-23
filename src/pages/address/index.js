import React from 'react'
import { connect } from 'react-redux'
import NavBar from '../common-components/nav-bar'
import SvgIcon from 'components/icon-svg'
import styles from './index.less'
import Toast from 'components/toast'
import { getAddress } from '../../api'

@connect(({ globalState }) => ({
  isLogin: globalState.isLogin,
}))
export default class Address extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      loading: false,
    }
  }

  componentDidMount(){
    console.log(this.props)
    this.props.isLogin && this.getAddress()
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.isLogin && !this.state.loading){
      this.getAddress()
    }
  }

  async getAddress(){
    try{
      this.setState({loading: true})
      const { data } = await getAddress()
      console.log(data)
      this.setState({
        list: data,
        loading: false
      })
    }catch({err}){
      this.setState({loading: false})
      Toast.info(err)
    }
  }

  goEdit = (val = false) => {
    console.log('dffffdfd')
    this.props.history.push({
      pathname: '/address-edit',
      state: val,
    })
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
