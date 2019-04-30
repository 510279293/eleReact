import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import asyncLoad from 'components/async-loade.js'
import Loading from './common-components/lazy-loading/index.js'
import { bindActionCreators } from 'redux'
import { globalUpdate } from '../stores/global'

const Home = asyncLoad(() => import('./home/index.js'), <Loading />)
const Compass = asyncLoad(() => import('./compass/index.js'), <Loading />)
const Order = asyncLoad(() => import('./order'), <Loading />)
const Profile = asyncLoad(() => import('./profile'), <Loading />)
const Login = asyncLoad(() => import('./login'), <Loading />)
const SearchAddress = asyncLoad(() => import('./address-nearby'), <Loading />)
const Address = asyncLoad(() => import('./address'), <Loading />)
const AddressEdit = asyncLoad(() => import('./address-edit'), <Loading />)


@connect(() => ({}), dispatch => bindActionCreators({
  globalUpdate,
}, dispatch))
class AuthComponent extends Component {
  async componentDidMount() {
    try {
      const { data } = await getUserInfo()
      this.props.globalUpdate({
        isLogin: true,
        userInfo: data,
      })
    } catch (err) {
      this.props.globalUpdate({
        globalUpdate: false,
        userInfo: {},
      })
    }
  }
  render() {
    return null
  }
}

export default () => (
  <Fragment>
    <AuthComponent />
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/home" />} />
      <Route path="/home" component={Home} />
      <Route path="/compass" component={Compass} />
      <Route path="/order" component={Order} />
      <Route path="/profile" component={Profile} />
      <Route path="/login" component={Login} />
      <Route path="/search-address" component={SearchAddress} />
      <Route path="/address" component={Address} />
      <Route path="/address-edit" component={AddressEdit} />
    </Switch>
  </Fragment>
)
