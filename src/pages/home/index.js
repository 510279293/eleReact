import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TopBar from './top-bar/index.js'
import withTabBar from '../common-components/tab-bar'
import { homeUpdate, homeInit } from '../../stores/home'
const mapStateToProps = ({ home }) => ({
  init: home.init,
  banner: home.banner,
  entry: home.entry,
  locationInfo: home.locationInfo,
  shoplist: home.shoplist,
})
const mapActionsToProps = dispatch => bindActionCreators({
  homeUpdate,
  homeInit,
}, dispatch)

@connect(
  mapStateToProps,
  mapActionsToProps,
)
@withTabBar
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    console.log(props)
  }
  componentDidMount() {
    // this.props.homeInit()
  }
  render() {
    return (<div>
      <TopBar />
    </div>)
  }
}
